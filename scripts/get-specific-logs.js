#!/usr/bin/env node
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const DEPLOYMENT_ID = process.argv[2];

async function getLogs() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/me-staging/deployments/${DEPLOYMENT_ID}/history/logs`,
    {
      headers: { 'Authorization': `Bearer ${API_TOKEN}` }
    }
  );
  const data = await response.json();

  console.log('Looking for debug logs...\n');

  const filteredLines = data.result.data.filter(line =>
    line.message && (
      line.message.includes('getContent') ||
      line.message.includes('CF_PAGES') ||
      line.message.includes('===') ||
      line.message.includes('FETCH')
    )
  );

  if (filteredLines.length > 0) {
    console.log(`Found ${filteredLines.length} relevant log lines:\n`);
    filteredLines.forEach(line => console.log(line.message));
  } else {
    console.log('No debug logs found. Showing last 30 lines instead:\n');
    data.result.data.slice(-30).forEach(line => {
      if (line.message) console.log(line.message);
    });
  }
}

getLogs();
