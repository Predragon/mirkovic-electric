#!/usr/bin/env node
/**
 * Get build logs for latest staging deployment
 */

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

async function getBuildLogs() {
  try {
    // Get latest deployment
    const deploymentsResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/me-staging/deployments`,
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
        }
      }
    );

    const deploymentsData = await deploymentsResponse.json();
    const latestDeployment = deploymentsData.result[0];

    console.log(`📋 Latest deployment: ${latestDeployment.id}`);
    console.log(`   Branch: ${latestDeployment.deployment_trigger.metadata.branch}`);
    console.log(`   Commit: ${latestDeployment.deployment_trigger.metadata.commit_hash?.substring(0, 7)}`);
    console.log(`   Status: ${latestDeployment.latest_stage.status}\n`);

    // Get build log
    const logResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/me-staging/deployments/${latestDeployment.id}/history/logs`,
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
        }
      }
    );

    const logData = await logResponse.json();

    console.log('📝 Build Log:\n');

    // Filter for relevant log lines
    const relevantLines = logData.result.data
      .filter(line =>
        line.message?.includes('getContentStatus') ||
        line.message?.includes('CF_PAGES_BRANCH') ||
        line.message?.includes('NEXT_PUBLIC_ENV') ||
        line.message?.includes('Fetching content') ||
        line.message?.includes('Failed to fetch') ||
        line.message?.includes('Error')
      );

    if (relevantLines.length > 0) {
      console.log('Relevant lines:');
      relevantLines.forEach(line => {
        console.log(`  ${line.timestamp} ${line.message}`);
      });
    } else {
      console.log('No relevant debug lines found. Showing last 50 lines:\n');
      logData.result.data.slice(-50).forEach(line => {
        if (line.message) {
          console.log(line.message);
        }
      });
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

getBuildLogs();
