#!/usr/bin/env node
/**
 * Check recent deployments for me-staging
 */

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

async function checkDeployments() {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/me-staging/deployments`,
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Failed:', JSON.stringify(data, null, 2));
      process.exit(1);
    }

    console.log('📋 Recent deployments for me-staging:\n');
    data.result.slice(0, 5).forEach((dep, i) => {
      console.log(`${i + 1}. ${dep.id}`);
      console.log(`   Created: ${dep.created_on}`);
      console.log(`   Status: ${dep.latest_stage.status}`);
      console.log(`   Branch: ${dep.deployment_trigger.metadata.branch}`);
      console.log(`   Commit: ${dep.deployment_trigger.metadata.commit_hash?.substring(0, 7)}`);
      console.log(`   URL: ${dep.url || dep.aliases?.[0]}`);
      console.log('');
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkDeployments();
