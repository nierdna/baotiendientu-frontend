import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.SITE_URL || 'http://localhost:3000';
  
  const robotsTxt = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

Disallow: /admin/
Disallow: /api/
Disallow: /auth/
Disallow: /_next/
Disallow: /static/

Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for all bots
Crawl-delay: 1`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
} 