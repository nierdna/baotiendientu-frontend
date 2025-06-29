import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import User from '@/models/User';
import { getServerSession } from 'next-auth';

interface ArticleQuery {
  status: string;
  category?: string;
  $or?: Array<Record<string, unknown>>;
}

// GET /api/articles - Lấy danh sách bài viết
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const status = searchParams.get('status') || 'published';
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Build query
    const query: ArticleQuery = { status };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const articles = await Article.find(query)
      .populate('author', 'name avatar')
      .populate('category', 'name slug color')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Article.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: {
        articles,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/articles - Tạo bài viết mới
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      tags,
      status,
      metaTitle,
      metaDescription,
      metaKeywords
    } = body;

    // Check if slug already exists
    const existingArticle = await Article.findOne({ slug });
    if (existingArticle) {
      return NextResponse.json(
        { success: false, error: 'Slug already exists' },
        { status: 400 }
      );
    }

    // Get user by email
    const user = await User.findOne({ email: session.user?.email });
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const article = new Article({
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      tags: tags || [],
      status: status || 'draft',
      author: user._id,
      metaTitle,
      metaDescription,
      metaKeywords: metaKeywords || [],
      publishedAt: status === 'published' ? new Date() : undefined
    });

    await article.save();

    const populatedArticle = await Article.findById(article._id)
      .populate('author', 'name avatar')
      .populate('category', 'name slug color');

    return NextResponse.json({
      success: true,
      data: populatedArticle
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 