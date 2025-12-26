import { getContentStatus, getPageContent } from '@/lib/content'

export const metadata = {
  title: 'Debug Info',
}

export default async function DebugPage() {
  const status = getContentStatus();
  const content = await getPageContent('homepage', status);

  const buildInfo = {
    CF_PAGES_BRANCH: process.env.CF_PAGES_BRANCH || 'not set',
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV || 'not set',
    detectedStatus: status,
    contentFetched: Object.keys(content).length > 0,
    contentKeys: Object.keys(content),
    buildTime: new Date().toISOString(),
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Build Debug Info</h1>

      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
        <pre className="bg-white p-4 rounded overflow-auto">
          {JSON.stringify(buildInfo, null, 2)}
        </pre>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Fetched Content</h2>
        <pre className="bg-white p-4 rounded overflow-auto">
          {JSON.stringify(content, null, 2)}
        </pre>
      </div>
    </div>
  );
}
