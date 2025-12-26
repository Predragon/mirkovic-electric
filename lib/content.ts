/**
 * Content fetching utilities for page-specific content from D1 database
 */

interface PageContent {
  [sectionId: string]: string;
}

/**
 * Fetch page content from the admin API
 * @param pageId - The page identifier (e.g., 'homepage')
 * @param status - 'draft' for staging, 'published' for production
 * @returns Object mapping section IDs to content values (image URLs, text, etc.)
 */
export async function getPageContent(
  pageId: string,
  status: 'draft' | 'published' = 'published'
): Promise<PageContent> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://admin.mirkovicelectric.com';
  const url = `${apiBaseUrl}/api/public/content?page=${pageId}&status=${status}`;

  console.log('='.repeat(80));
  console.log('[getPageContent] FETCH START');
  console.log(`  Page: ${pageId}, Status: ${status}`);
  console.log(`  URL: ${url}`);
  console.log('='.repeat(80));

  try {
    const response = await fetch(url, {
      next: { revalidate: status === 'published' ? 3600 : 0 }
    });

    console.log(`[getPageContent] Response: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[getPageContent] ❌ FETCH FAILED:`, errorText);
      return {};
    }

    const data = await response.json();
    const contentKeys = Object.keys(data.content || {});
    console.log(`[getPageContent] ✅ SUCCESS - Fetched ${contentKeys.length} items:`, contentKeys);

    return data.content || {};
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[getPageContent] ❌ EXCEPTION:`, errorMsg);
    return {};
  }
}

/**
 * Get image URL for a section, with fallback to default
 * @param content - Page content object
 * @param sectionId - Section identifier
 * @param fallback - Default image path if section not found
 */
export function getImageUrl(
  content: PageContent,
  sectionId: string,
  fallback: string
): string {
  return content[sectionId] || fallback;
}

/**
 * Determine content status based on environment
 * Returns 'draft' for staging, 'published' for production
 */
export function getContentStatus(): 'draft' | 'published' {
  // Cloudflare Pages provides CF_PAGES_BRANCH during build
  // For staging deployments, it will be 'staging'
  // For production deployments, it will be 'main'
  const branch = process.env.CF_PAGES_BRANCH;

  console.log('[getContentStatus] CF_PAGES_BRANCH:', branch);
  console.log('[getContentStatus] NEXT_PUBLIC_ENV:', process.env.NEXT_PUBLIC_ENV);

  // Check if we're in staging environment
  const isStaging =
    branch === 'staging' ||
    process.env.NEXT_PUBLIC_ENV === 'staging' ||
    process.env.VERCEL_ENV === 'preview';

  const status = isStaging ? 'draft' : 'published';
  console.log('[getContentStatus] Returning status:', status);

  return status;
}
