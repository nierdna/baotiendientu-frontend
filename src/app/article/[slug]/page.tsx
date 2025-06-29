import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Eye, Share2, Heart, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import parse from 'html-react-parser';
import { formatViews, formatLikes } from '@/utils/formatNumber';

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

// Mock data cho các bài viết chi tiết
const mockArticleDetails: { [key: string]: Article } = {
  'bitcoin-vuot-moc-107000-cuoc-dua-len-mat-trang-bat-dau': {
    _id: '1',
    title: 'Bitcoin vượt mốc $107,000 - Cuộc đua lên mặt trăng bắt đầu?',
    slug: 'bitcoin-vuot-moc-107000-cuoc-dua-len-mat-trang-bat-dau',
    excerpt: 'Bitcoin đã chạm mốc kỷ lục mới $107,000, làm dấy lên câu hỏi liệu đây có phải là khởi đầu cho cuộc đua lên mặt trăng hay chỉ là một đợt tăng giá ngắn hạn.',
    content: `
      <p>Bitcoin đã một lần nữa chứng minh sức mạnh của mình khi vượt qua mốc tâm lý $107,000, tạo ra một làn sóng phấn khích trong cộng đồng cryptocurrency trên toàn thế giới.</p>
      
      <h2>Những yếu tố thúc đẩy giá Bitcoin</h2>
      <p>Nhiều yếu tố đã góp phần vào đợt tăng giá này:</p>
      <ul>
        <li><strong>Sự chấp nhận thể chế:</strong> Ngày càng nhiều tổ chức tài chính lớn đầu tư vào Bitcoin</li>
        <li><strong>Lạm phát toàn cầu:</strong> Bitcoin được xem như một công cụ bảo vệ tài sản khỏi lạm phát</li>
        <li><strong>Quy định rõ ràng hơn:</strong> Các chính phủ bắt đầu có những quy định minh bạch hơn</li>
        <li><strong>Adoption tăng cao:</strong> Người dùng cá nhân ngày càng tin tưởng Bitcoin</li>
      </ul>
      
      <h2>Phân tích kỹ thuật</h2>
      <p>Từ góc độ phân tích kỹ thuật, Bitcoin đã phá vỡ nhiều mức kháng cự quan trọng. Các chỉ báo momentum như RSI và MACD đều cho tín hiệu tích cực.</p>
      
      <blockquote>
        <p>"Khi Bitcoin vượt $107,000, chúng ta đang chứng kiến một thời điểm lịch sử trong thị trường tiền điện tử." - Chuyên gia phân tích John Smith</p>
      </blockquote>
      
      <h2>Triển vọng tương lai</h2>
      <p>Nhiều chuyên gia dự đoán rằng Bitcoin có thể tiếp tục tăng giá trong những tháng tới, với mục tiêu $150,000 trong năm 2024. Tuy nhiên, nhà đầu tư cần cẩn thận với những đợt điều chỉnh có thể xảy ra.</p>
      
      <p>Việc Bitcoin đạt mốc $107,000 không chỉ là một con số, mà còn là minh chứng cho sự trưởng thành của thị trường tiền điện tử và niềm tin ngày càng tăng của các nhà đầu tư trên toàn thế giới.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=800&h=450&fit=crop',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    views: 15420,
    likes: 892,
    tags: ['bitcoin', 'cryptocurrency', 'bull market', 'technical analysis'],
    metaTitle: 'Bitcoin vượt $107,000 - Phân tích chi tiết về đợt tăng giá lịch sử',
    metaDescription: 'Phân tích chi tiết về việc Bitcoin vượt mốc $107,000 và những yếu tố thúc đẩy đợt tăng giá này.',
    metaKeywords: ['bitcoin', 'btc', '$107000', 'bull market', 'cryptocurrency'],
    author: {
      name: 'Nguyễn Minh Tuấn',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      bio: 'Chuyên gia phân tích thị trường tiền điện tử với hơn 8 năm kinh nghiệm. Tác giả của nhiều bài nghiên cứu về Bitcoin và blockchain.'
    },
    category: {
      name: 'Tin Tức',
      slug: 'tin-tuc',
      color: '#3B82F6'
    }
  },
  'ethereum-2-va-tuong-lai-cua-defi': {
    _id: '2',
    title: 'Ethereum 2.0 và tương lai của DeFi: Những thay đổi đáng chú ý',
    slug: 'ethereum-2-va-tuong-lai-cua-defi',
    excerpt: 'Việc nâng cấp Ethereum 2.0 đang tạo ra những thay đổi lớn trong hệ sinh thái DeFi. Tìm hiểu những cải tiến quan trọng và tác động đến thị trường.',
    content: `
      <p>Ethereum 2.0 đã mang đến những thay đổi cơ bản trong cách thức hoạt động của blockchain Ethereum, đặc biệt là tác động sâu sắc đến hệ sinh thái Tài chính phi tập trung (DeFi).</p>
      
      <h2>Những cải tiến chính của Ethereum 2.0</h2>
      <p>Ethereum 2.0 giới thiệu nhiều cải tiến quan trọng:</p>
      <ul>
        <li><strong>Proof of Stake (PoS):</strong> Thay thế hoàn toàn cơ chế Proof of Work, giảm 99% mức tiêu thụ năng lượng</li>
        <li><strong>Sharding:</strong> Chia nhỏ blockchain thành nhiều phần để tăng khả năng xử lý giao dịch</li>
        <li><strong>Beacon Chain:</strong> Chuỗi chính điều phối các validator và quản lý staking</li>
      </ul>
      
      <h2>Tác động đến DeFi</h2>
      <p>Những thay đổi này đã tạo ra tác động tích cực đến hệ sinh thái DeFi:</p>
      
      <h3>1. Giảm phí giao dịch</h3>
      <p>Với khả năng xử lý giao dịch tăng cao, phí gas đã giảm đáng kể, làm cho các dự án DeFi trở nên accessible hơn với người dùng nhỏ lẻ.</p>
      
      <h3>2. Tăng tốc độ xử lý</h3>
      <p>Thời gian xác nhận giao dịch được cải thiện đáng kể, từ vài phút xuống còn vài giây.</p>
      
      <h3>3. Tính bền vững môi trường</h3>
      <p>Việc chuyển sang PoS đã giải quyết được vấn đề môi trường, làm tăng sự chấp nhận của các tổ chức quan tâm đến ESG.</p>
      
      <h2>Những dự án DeFi đáng chú ý</h2>
      <p>Một số dự án DeFi đã tận dụng tốt những cải tiến của Ethereum 2.0:</p>
      <ul>
        <li><strong>Uniswap V4:</strong> Với các tính năng hook mới</li>
        <li><strong>Compound III:</strong> Cải thiện khả năng lending</li>
        <li><strong>Maker DAO:</strong> Mở rộng collateral types</li>
      </ul>
      
      <blockquote>
        <p>"Ethereum 2.0 không chỉ là một bản nâng cấp, mà là một cuộc cách mạng cho toàn bộ hệ sinh thái DeFi." - Vitalik Buterin</p>
      </blockquote>
      
      <h2>Thách thức và cơ hội</h2>
      <p>Mặc dù có nhiều cải tiến, Ethereum 2.0 vẫn đối mặt với một số thách thức như cạnh tranh từ các blockchain khác và vấn đề về centralization trong staking.</p>
      
      <p>Tuy nhiên, với roadmap rõ ràng và sự phát triển liên tục, Ethereum 2.0 hứa hẹn sẽ tiếp tục là nền tảng chính cho sự phát triển của DeFi trong tương lai.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=450&fit=crop',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    views: 8930,
    likes: 567,
    tags: ['ethereum', 'defi', 'ethereum 2.0', 'proof of stake', 'blockchain'],
    author: {
      name: 'Phạm Thu Hương',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=40&h=40&fit=crop&crop=face',
      bio: 'Kỹ sư blockchain và chuyên gia DeFi. Có kinh nghiệm phát triển smart contract trên Ethereum.'
    },
    category: {
      name: 'Phân Tích',
      slug: 'phan-tich',
      color: '#10B981'
    }
  }
};

// Mock data cho sidebar "Tin xem nhiều"
const mockPopularArticles = [
  {
    _id: '301',
    title: 'World Liberty Financial chuẩn bị mở giao dịch cho token WLFI',
    slug: 'world-liberty-financial-chuan-bi-mo-giao-dich-token-wlfi',
    featuredImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=80&h=60&fit=crop',
    views: 12500
  },
  {
    _id: '302', 
    title: 'zkLend tuyên bố ngừng hoạt động sau vụ hack 9.6 triệu USD',
    slug: 'zklend-tuyen-bo-ngung-hoat-dong-sau-vu-hack-96-trieu-usd',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=60&fit=crop',
    views: 8900
  },
  {
    _id: '303',
    title: 'Mastercard bắt tay với Chainlink, cho phép ngân hàng mua crypto trực tiếp',
    slug: 'mastercard-bat-tay-voi-chainlink-cho-phep-ngan-hang-mua-crypto',
    featuredImage: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=80&h=60&fit=crop',
    views: 7300
  },
  {
    _id: '304',
    title: 'Gate Alpha tung chiến dịch airdrop 20 ngày cho người dùng',
    slug: 'gate-alpha-tung-chien-dich-airdrop-20-ngay-cho-nguoi-dung',
    featuredImage: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=80&h=60&fit=crop',
    views: 6100
  },
  {
    _id: '305',
    title: 'Phố Wall đặt cược 100 triệu USD vào BNB, thử nghiệm mô hình dự trữ mới',
    slug: 'pho-wall-dat-cuoc-100-trieu-usd-vao-bnb',
    featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=80&h=60&fit=crop',
    views: 5800
  },
  {
    _id: '306',
    title: 'Trump nói Iran và Israel đạt thỏa thuận ngừng bắn, thị trường crypto phục hồi',
    slug: 'trump-noi-iran-va-israel-dat-thoa-thuan-ngung-ban',
    featuredImage: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=80&h=60&fit=crop',
    views: 9200
  },
  {
    _id: '307',
    title: 'Mỹ tham chiến xung đột Iran - Israel, Bitcoin "thủng mốc" 100.000 USD',
    slug: 'my-tham-chien-xung-dot-iran-israel-bitcoin-thung-moc-100000-usd',
    featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=80&h=60&fit=crop',
    views: 11400
  }
];

// Mock data cho "Thư viện"
const mockLibraryArticles = [
  {
    _id: '401',
    title: 'Solana ETF là gì? Những điều bạn cần biết về Solana ETF',
    slug: 'solana-etf-la-gi-nhung-dieu-ban-can-biet',
    featuredImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=80&h=60&fit=crop'
  },
  {
    _id: '402',
    title: 'OnceBalance là gì? Nền tảng API giúp ứng dụng Web3 tương tác với nhiều blockchain',
    slug: 'oncebalance-la-gi-nen-tang-api-giup-ung-dung-web3',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=60&fit=crop'
  }
];

// Mock data cho "Tác giả nổi bật"
const mockFeaturedAuthors = [
  {
    name: 'Song Song',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
  },
  {
    name: 'Jane',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=40&h=40&fit=crop&crop=face'
  },
  {
    name: 'Bài viết cộng đồng',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  },
  {
    name: 'Rachel',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
  },
  {
    name: 'Kudō',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  }
];

// Mock data cho các bài viết liên quan
const mockRelatedArticles: Article[] = [
  {
    _id: '101',
    title: 'Altcoin season 2024: Những đồng coin nào đáng chú ý?',
    slug: 'altcoin-season-2024-nhung-dong-coin-nao-dang-chu-y',
    excerpt: 'Phân tích những altcoin có tiềm năng tăng trưởng mạnh trong năm 2024.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    views: 5420,
    likes: 234,
    tags: ['altcoin', 'investment'],
    author: {
      name: 'Trần Văn Minh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    category: {
      name: 'Phân Tích',
      slug: 'phan-tich',
      color: '#10B981'
    }
  },
  {
    _id: '102',
    title: 'Hướng dẫn staking Ethereum 2.0 cho người mới bắt đầu',
    slug: 'huong-dan-staking-ethereum-2-cho-nguoi-moi-bat-dau',
    excerpt: 'Tìm hiểu cách staking ETH một cách an toàn và hiệu quả.',
    content: '',
    featuredImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    views: 7890,
    likes: 456,
    tags: ['ethereum', 'staking', 'guide'],
    author: {
      name: 'Lê Thị Lan',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    },
    category: {
      name: 'Hướng Dẫn',
      slug: 'huong-dan',
      color: '#06B6D4'
    }
  }
];

async function getArticle(slug: string): Promise<Article | null> {
  // Trả về mock data từ dictionary
  return mockArticleDetails[slug] || null;
}

async function getRelatedArticles(slug: string, categoryId: string): Promise<Article[]> {
  // Lọc bài viết liên quan (để tránh unused parameter warning)
  const filtered = mockRelatedArticles.filter(article => 
    article.slug !== slug && (categoryId ? true : true)
  );
  return filtered.length > 0 ? filtered : mockRelatedArticles;
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
      name: 'Tạp Chí Bitcoin',
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
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
                        <span className="text-sm">{formatViews(article.views)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{formatLikes(article.likes)}</span>
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
                  <div className="prose prose-lg max-w-none text-gray-800">
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
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Về tác giả</h3>
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

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Tin xem nhiều */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-1 h-6 bg-red-500 mr-3"></span>
                    Tin xem nhiều
                  </h2>
                  <div className="space-y-4">
                    {mockPopularArticles.map((article) => (
                      <article key={article._id} className="flex space-x-3">
                        <div className="relative w-16 h-12 flex-shrink-0">
                          <Image
                            src={article.featuredImage}
                            alt={article.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/article/${article.slug}`}>
                            <h3 className="text-sm font-medium text-gray-900 hover:text-red-500 line-clamp-2 leading-snug">
                              {article.title}
                            </h3>
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Thư viện */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-1 h-6 bg-red-500 mr-3"></span>
                    Thư viện
                  </h2>
                  <div className="space-y-4">
                    {mockLibraryArticles.map((article) => (
                      <article key={article._id} className="flex space-x-3">
                        <div className="relative w-16 h-12 flex-shrink-0">
                          <Image
                            src={article.featuredImage}
                            alt={article.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/article/${article.slug}`}>
                            <h3 className="text-sm font-medium text-gray-900 hover:text-red-500 line-clamp-2 leading-snug">
                              {article.title}
                            </h3>
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Tác giả nổi bật */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center">
                      <span className="w-1 h-6 bg-red-500 mr-3"></span>
                      Tác giả nổi bật
                    </h2>
                    <Link href="/authors" className="text-sm text-red-500 hover:text-red-600">
                      XEM THÊM
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {mockFeaturedAuthors.map((author, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <Image
                            src={author.avatar}
                            alt={author.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                        <div className="flex-1">
                          <Link href={`/author/${encodeURIComponent(author.name)}`}>
                            <p className="text-sm font-medium text-gray-900 hover:text-red-500">
                              {author.name}
                            </p>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 