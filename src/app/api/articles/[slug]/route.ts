import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

interface RouteParams {
  params: {
    slug: string;
  };
}

// GET /api/articles/[slug] - Lấy chi tiết bài viết theo slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    // Find and increment view count in one operation
    const article = await Article.findOneAndUpdate(
      { 
        slug: params.slug,
        status: 'published'
      },
      { $inc: { views: 1 } },
      { new: true }
    )
    .populate('author', 'name avatar bio')
    .populate('category', 'name slug color');

    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: article
    });

  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 