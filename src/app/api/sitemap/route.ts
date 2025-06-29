import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import Category from '@/models/Category';

export async function GET() {
  try {
    await connectDB();

    const baseUrl = process.env.SITE_URL || 'http://localhost:3000';
    
    // Get all published articles
    const articles = await Article.find({ status: 'published' })
      .select('slug updatedAt')
      .sort({ updatedAt: -1 })
      .lean();

    // Get all active categories
    const categories = await Category.find({ isActive: true })
      .select('slug updatedAt')
      .lean();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  ${categories.map(category => `
  <url>
    <loc>${baseUrl}/category/${category.slug}</loc>
    <lastmod>${category.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  
  ${articles.map(article => `
  <url>
    <loc>${baseUrl}/article/${article.slug}</loc>
    <lastmod>${article.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400'
      }
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
} 