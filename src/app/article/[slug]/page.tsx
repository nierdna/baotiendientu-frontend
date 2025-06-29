import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Eye, Share2, Heart, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import parse from 'html-react-parser';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  publishedAt: string;
  views: number;
  likes: number;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  category: {
    name: string;
    slug: string;
    color?: string;
  };
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const baseUrl = process.env.SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/articles/${slug}`, {
      next: { revalidate: 300 }
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

async function getRelatedArticles(slug: string, categoryId: string): Promise<Article[]> {
  try {
    const baseUrl = process.env.SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/articles?category=${categoryId}&limit=4&exclude=${slug}`, {
      next: { revalidate: 300 }
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.data?.articles || [];
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: 'Bài viết không tồn tại',
      description: 'Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.',
    };
  }

  const baseUrl = process.env.SITE_URL || 'http://localhost:3000';

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    keywords: article.metaKeywords || article.tags,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
      images: [
        {
          url: article.featuredImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      url: `${baseUrl}/article/${article.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      images: [article.featuredImage],
    },
    alternates: {
      canonical: `/article/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(params.slug, article.category.slug);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Báo Tiền Điện Tử',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.SITE_URL || 'http://localhost:3000'}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.SITE_URL || 'http://localhost:3000'}/article/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
              <span>/</span>
              <Link href={`/category/${article.category.slug}`} className="hover:text-blue-600">
                {article.category.name}
              </Link>
              <span>/</span>
              <span className="text-gray-900 truncate">{article.title}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Article Header */}
              <header className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: article.category.color || '#3B82F6' }}
                  >
                    {article.category.name}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <time dateTime={article.publishedAt}>
                      {format(new Date(article.publishedAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                    </time>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {article.title}
                </h1>

                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between border-t border-b py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {article.author.avatar && (
                        <Image
                          src={article.author.avatar}
                          alt={article.author.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{article.author.name}</p>
                        <p className="text-sm text-gray-500">Tác giả</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{article.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{article.likes}</span>
                    </div>
                    <button className="flex items-center space-x-1 hover:text-blue-600">
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">Chia sẻ</span>
                    </button>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <div className="relative h-96 md:h-[500px]">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Article Content */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  {parse(article.content)}
                </div>

                {/* Tags */}
                {article.tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t">
                    <div className="flex items-center flex-wrap gap-2">
                      <Tag className="w-4 h-4 text-gray-500" />
                      {article.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/tag/${encodeURIComponent(tag)}`}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>

            {/* Author Bio */}
            {article.author.bio && (
              <div className="bg-white rounded-lg shadow mt-8 p-6">
                <h3 className="text-lg font-semibold mb-4">Về tác giả</h3>
                <div className="flex items-start space-x-4">
                  {article.author.avatar && (
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{article.author.name}</h4>
                    <p className="text-gray-600">{article.author.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết liên quan</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <article key={relatedArticle._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                      <Link href={`/article/${relatedArticle.slug}`}>
                        <div className="relative h-48">
                          <Image
                            src={relatedArticle.featuredImage}
                            alt={relatedArticle.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <span 
                              className="px-2 py-1 rounded text-xs text-white mr-2"
                              style={{ backgroundColor: relatedArticle.category.color || '#3B82F6' }}
                            >
                              {relatedArticle.category.name}
                            </span>
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{format(new Date(relatedArticle.publishedAt), 'dd/MM/yyyy', { locale: vi })}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                            {relatedArticle.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {relatedArticle.excerpt}
                          </p>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 