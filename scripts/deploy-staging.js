#!/usr/bin/env node
/**
 * Trigger deployment for me-staging
 */

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

async function deploy() {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/me-staging/deployments`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ branch: 'staging' })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Deployment failed:', JSON.stringify(data, null, 2));
      process.exit(1);
    }

    console.log('✅ Staging deployment triggered!');
    console.log(`Deployment ID: ${data.result.id}`);
    console.log(`URL: ${data.result.url}`);
    console.log(`Status: ${data.result.latest_stage.status}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

deploy();
