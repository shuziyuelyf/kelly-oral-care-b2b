import { locales } from '@/i18n/config';

const baseUrl = process.env.COZE_PROJECT_DOMAIN_DEFAULT || 'https://example.com';
const pages = ['', '/products', '/custom', '/about', '/news', '/contact'];

export async function GET() {
  const urls: string[] = [];

  for (const locale of locales) {
    for (const page of pages) {
      urls.push(`${baseUrl}/${locale}${page}`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls.map((url) => `<url><loc>${url}</loc></url>`).join('\n  ')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
