/**
 * Migrates service data from /lib/services.ts to D1 database
 * Generates SQL INSERT statements that can be executed via wrangler
 *
 * Usage: node scripts/migrate-services.js > scripts/services-data.sql
 * Then run: wrangler d1 execute mirkovic-electric-content --file=./scripts/services-data.sql
 */

const fs = require('fs');
const path = require('path');

// Read and parse services.ts
const servicesPath = path.join(__dirname, '../lib/services.ts');
const servicesContent = fs.readFileSync(servicesPath, 'utf-8');

// Extract services object (basic parsing - works for our structured data)
const servicesMatch = servicesContent.match(/export const services: Record<string, Service> = ({[\s\S]+?^})/m);
if (!servicesMatch) {
  console.error('Could not find services object in services.ts');
  process.exit(1);
}

// Evaluate the services object (using eval is safe here since we control the file)
const servicesStr = servicesMatch[1];
const services = eval('(' + servicesStr + ')');

// Helper function to escape SQL strings
function escapeSql(str) {
  if (!str) return '';
  return str.replace(/'/g, "''");
}

// Helper function to sanitize JSON for SQL
function jsonToSql(obj) {
  return escapeSql(JSON.stringify(obj));
}

console.log('-- Service data migration generated from /lib/services.ts');
console.log('-- Generated on:', new Date().toISOString());
console.log('');

// Process each service
let serviceOrder = 0;
for (const [slug, service] of Object.entries(services)) {
  console.log(`-- Service: ${service.title}`);

  // Insert service record
  console.log(`INSERT INTO services (slug, title, subtitle, description, order_index, visible)`);
  console.log(`VALUES (
  '${escapeSql(service.slug)}',
  '${escapeSql(service.title)}',
  '${escapeSql(service.subtitle)}',
  '${escapeSql(service.description)}',
  ${serviceOrder},
  1
);`);
  console.log('');

  // Get the service ID (we need to use LAST_INSERT_ROWID())
  const serviceIdVar = `service_${slug.replace(/-/g, '_')}_id`;
  console.log(`-- Get the service ID for ${slug}`);
  console.log(`-- Note: In actual execution, you'll need to use the returned ID`);
  console.log('');

  // Insert sections
  if (service.sections && service.sections.length > 0) {
    service.sections.forEach((section, idx) => {
      const isArray = Array.isArray(section.content);
      const contentType = isArray ? 'list' : 'text';
      const contentValue = isArray ? JSON.stringify(section.content) : section.content;

      console.log(`-- Section ${idx + 1}: ${section.heading}`);
      console.log(`INSERT INTO service_sections (service_id, heading, content, content_type, order_index)`);
      console.log(`SELECT id, '${escapeSql(section.heading)}', '${escapeSql(contentValue)}', '${contentType}', ${idx}`);
      console.log(`FROM services WHERE slug = '${escapeSql(service.slug)}';`);
      console.log('');
    });
  }

  // Insert metadata (applications, whoItFor, whyItMatters)
  if (service.applications) {
    console.log(`-- Applications metadata`);
    console.log(`INSERT INTO service_metadata (service_id, meta_key, meta_value)`);
    console.log(`SELECT id, 'applications', '${jsonToSql(service.applications)}'`);
    console.log(`FROM services WHERE slug = '${escapeSql(service.slug)}';`);
    console.log('');
  }

  if (service.whoItFor) {
    console.log(`-- WhoItFor metadata`);
    console.log(`INSERT INTO service_metadata (service_id, meta_key, meta_value)`);
    console.log(`SELECT id, 'whoItFor', '${escapeSql(service.whoItFor)}'`);
    console.log(`FROM services WHERE slug = '${escapeSql(service.slug)}';`);
    console.log('');
  }

  if (service.whyItMatters) {
    console.log(`-- WhyItMatters metadata`);
    console.log(`INSERT INTO service_metadata (service_id, meta_key, meta_value)`);
    console.log(`SELECT id, 'whyItMatters', '${escapeSql(service.whyItMatters)}'`);
    console.log(`FROM services WHERE slug = '${escapeSql(service.slug)}';`);
    console.log('');
  }

  console.log('-- ' + '-'.repeat(60));
  console.log('');

  serviceOrder++;
}

console.log('-- Migration complete!');
console.log(`-- Total services migrated: ${Object.keys(services).length}`);
