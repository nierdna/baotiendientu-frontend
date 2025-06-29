import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, User, Eye, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface ArticleType {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  publishedAt: string;
  views: number;
  author: {
    name: string;
    avatar?: string;
  };
  category: {
    name: string;
    slug: string;
    color?: string;
  };
}

export const metadata: Metadata = {
  title: 'Báo Tiền Điện Tử - Tin tức và phân tích về Cryptocurrency',
  description: 'Cập nhật tin tức mới nhất về tiền điện tử, Bitcoin, Ethereum, blockchain và công nghệ tài chính. Phân tích chuyên sâu từ các chuyên gia hàng đầu.',
  keywords: ['tiền điện tử', 'cryptocurrency', 'bitcoin', 'ethereum', 'blockchain', 'tin tức crypto', 'phân tích thị trường'],
  openGraph: {
    title: 'Báo Tiền Điện Tử - Tin tức Cryptocurrency hàng đầu Việt Nam',
    description: 'Nguồn tin tức tiền điện tử uy tín với các bài phân tích chuyên sâu về Bitcoin, Ethereum và thị trường crypto.',
    type: 'website',
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Báo Tiền Điện Tử - Tin tức Cryptocurrency',
    description: 'Cập nhật tin tức mới nhất về tiền điện tử và blockchain.',
  }
};

async function getLatestArticles() {
  try {
    const baseUrl = process.env.SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/articles?limit=6&status=published`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch articles');
    }
    
    const data = await res.json();
    return data.data?.articles || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

async function getFeaturedArticles() {
  try {
    const baseUrl = process.env.SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/articles?limit=3&status=published&featured=true`, {
      next: { revalidate: 300 }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch featured articles');
    }
    
    const data = await res.json();
    return data.data?.articles || [];
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
}

export default async function HomePage() {
  const [latestArticles, featuredArticles] = await Promise.all([
    getLatestArticles(),
    getFeaturedArticles()
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Báo Tiền Điện Tử
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Nguồn tin tức tiền điện tử uy tín và cập nhật nhất tại Việt Nam
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/category/bitcoin"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Bitcoin
              </Link>
              <Link 
                href="/category/ethereum"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Ethereum
              </Link>
              <Link 
                href="/category/altcoin"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Altcoin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tin Nổi Bật</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredArticles.map((article: ArticleType) => (
              <article key={article._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <Link href={`/article/${article.slug}`}>
                  <div className="relative h-48">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {article.category?.name}
                      </span>
                      <Clock className="w-4 h-4 mx-2" />
                      <span>{format(new Date(article.publishedAt), 'dd/MM/yyyy', { locale: vi })}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-1" />
                        <span>{article.author?.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{article.views || 0}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Tin Mới Nhất</h2>
          <Link 
            href="/articles"
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold"
          >
            Xem tất cả
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {latestArticles.map((article: ArticleType) => (
            <article key={article._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={`/article/${article.slug}`}>
                <div className="relative h-48">
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span 
                      className="px-2 py-1 rounded text-xs text-white"
                      style={{ backgroundColor: article.category?.color || '#3B82F6' }}
                    >
                      {article.category?.name}
                    </span>
                    <Clock className="w-4 h-4 mx-2" />
                    <span>{format(new Date(article.publishedAt), 'dd/MM/yyyy', { locale: vi })}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      <span>{article.author?.name}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>{article.views || 0}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Đăng ký nhận tin tức mới nhất
            </h2>
            <p className="text-gray-300 mb-8">
              Nhận những tin tức và phân tích mới nhất về thị trường tiền điện tử
            </p>
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
