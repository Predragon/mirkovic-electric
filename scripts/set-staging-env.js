#!/usr/bin/env node
/**
 * Set NEXT_PUBLIC_ENV=staging for me-staging Cloudflare Pages project
 */

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!ACCOUNT_ID || !API_TOKEN) {
  console.error('❌ Missing required environment variables');
  process.exit(1);
}

async function setEnvVar() {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/me-staging`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          deployment_configs: {
            production: {
              env_vars: {
                NEXT_PUBLIC_ENV: {
                  type: 'plain_text',
                  value: 'staging'
                }
              }
            }
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Failed to set environment variable:');
      console.error(JSON.stringify(data, null, 2));
      process.exit(1);
    }

    console.log('✅ Successfully set NEXT_PUBLIC_ENV=staging for me-staging project');
    console.log(JSON.stringify(data.result.deployment_configs.production.env_vars, null, 2));
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setEnvVar();
