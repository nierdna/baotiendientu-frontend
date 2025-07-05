import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ChevronRight, Eye, ArrowUp, ArrowDown } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { formatViews } from '@/utils/formatNumber';

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

// Mock data cho các bài viết
const mockArticles: ArticleType[] = [
  {
    _id: "1",
    title: "Bitcoin vượt mốc $107,000 - Cuộc đua lên mặt trăng bắt đầu?",
    slug: "bitcoin-vuot-moc-107000-cuoc-dua-len-mat-trang-bat-dau",
    excerpt:
      "Bitcoin đã chạm mốc kỷ lục mới $107,000, làm dấy lên câu hỏi liệu đây có phải là khởi đầu cho cuộc đua lên mặt trăng hay chỉ là một đợt tăng giá ngắn hạn.",
    featuredImage:
      "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=800&h=450&fit=crop",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    views: 15420,
    author: {
      name: "Nguyễn Minh Tuấn",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    category: {
      name: "Tin Tức",
      slug: "tin-tuc",
      color: "#3B82F6",
    },
  },
  {
    _id: "2",
    title: "Ethereum 2.0 và tương lai của DeFi: Những thay đổi đáng chú ý",
    slug: "ethereum-2-va-tuong-lai-cua-defi",
    excerpt:
      "Việc nâng cấp Ethereum 2.0 đang tạo ra những thay đổi lớn trong hệ sinh thái DeFi. Tìm hiểu những cải tiến quan trọng và tác động đến thị trường.",
    featuredImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=450&fit=crop",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    views: 8930,
    author: {
      name: "Phạm Thu Hương",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=40&h=40&fit=crop&crop=face",
    },
    category: {
      name: "Phân Tích",
      slug: "phan-tich",
      color: "#10B981",
    },
  },
  {
    _id: "3",
    title: "Solana vs Cardano: Cuộc chiến của các blockchain thế hệ mới",
    slug: "solana-vs-cardano-cuoc-chien-blockchain-the-he-moi",
    excerpt:
      "So sánh chi tiết giữa Solana và Cardano - hai blockchain được coi là đối thủ tiềm năng của Ethereum. Ưu điểm, nhược điểm và triển vọng phát triển.",
    featuredImage:
      "https://images.unsplash.com/photo-1634704784915-aacf363b021f?w=800&h=450&fit=crop",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    views: 12340,
    author: {
      name: "Trần Văn Nam",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    category: {
      name: "So Sánh",
      slug: "so-sanh",
      color: "#8B5CF6",
    },
  },
  {
    _id: "4",
    title: "NFT Market 2024: Có phải đã hết thời?",
    slug: "nft-market-2024-co-phai-da-het-thoi",
    excerpt:
      "Thị trường NFT đã nguội lạnh nhiều so với thời kỳ đỉnh cao 2021-2022. Liệu NFT có thể hồi sinh hay sẽ trở thành một phần của lịch sử crypto?",
    featuredImage:
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&h=450&fit=crop",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    views: 6780,
    author: {
      name: "Lê Thị Mai",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    category: {
      name: "NFT",
      slug: "nft",
      color: "#F59E0B",
    },
  },
  {
    _id: "5",
    title: "Binance Coin (BNB): Hành trình từ ICO đến Top 4 thế giới",
    slug: "binance-coin-bnb-hanh-trinh-tu-ico-den-top-4",
    excerpt:
      "Câu chuyện thành công của BNB từ một token exchange thông thường trở thành một trong những cryptocurrency hàng đầu thế giới.",
    featuredImage:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=450&fit=crop",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    views: 9650,
    author: {
      name: "Hoàng Minh Đức",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    },
    category: {
      name: "Câu Chuyện",
      slug: "cau-chuyen",
      color: "#EF4444",
    },
  },
  {
    _id: "6",
    title: "Hướng dẫn đầu tư tiền điện tử an toàn cho người mới bắt đầu",
    slug: "huong-dan-dau-tu-tien-dien-tu-an-toan-cho-nguoi-moi",
    excerpt:
      "Bài hướng dẫn chi tiết về cách đầu tư tiền điện tử một cách an toàn, từ việc chọn sàn giao dịch đến chiến lược quản lý rủi ro.",
    featuredImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop",
    publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    views: 18750,
    author: {
      name: "Đinh Văn Long",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face",
    },
    category: {
      name: "Hướng Dẫn",
      slug: "huong-dan",
      color: "#06B6D4",
    },
  },
  {
    _id: "7",
    title: "XRP thắng kiện SEC: Cú hích mạnh cho thị trường altcoin",
    slug: "xrp-thang-kien-sec-cu-hich-manh-cho-thi-truong-altcoin",
    excerpt:
      "Phán quyết có lợi cho Ripple trong vụ kiện với SEC đã tạo ra làn sóng tích cực cho toàn bộ thị trường tiền điện tử, đặc biệt là các altcoin.",
    featuredImage:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=450&fit=crop",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    views: 11200,
    author: {
      name: "Võ Thị Lan",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
    },
    category: {
      name: "Tin Tức",
      slug: "tin-tuc",
      color: "#3B82F6",
    },
  },
  {
    _id: "8",
    title: "DeFi Summer 2024: Những dự án đáng chú ý nhất",
    slug: "defi-summer-2024-nhung-du-an-dang-chu-y-nhat",
    excerpt:
      "Khám phá những dự án DeFi nổi bật nhất năm 2024, từ yield farming đến các giao thức lending mới với APY hấp dẫn.",
    featuredImage:
      "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&h=450&fit=crop",
    publishedAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    views: 7890,
    author: {
      name: "Bùi Quang Minh",
      avatar:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face",
    },
    category: {
      name: "DeFi",
      slug: "defi",
      color: "#EC4899",
    },
  },
];

// Mock data cho bài viết nổi bật
const mockFeaturedArticles = mockArticles.slice(0, 4);

// Mock data cho banner slides
const mockBannerSlides = [
  {
    id: 1,
    title:
      "BingX tăng tốc chuyển đổi số trong nửa đầu 2025: Đầu tư lớn vào AI, Web3 và an toàn người dùng",
    description: "Empowering Traders",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
    bgColor: "bg-gradient-to-r from-blue-600 to-purple-600",
    textColor: "text-white",
    link: "/article/bingx-tang-toc-chuyen-doi-so-trong-nua-dau-2025",
  },
  {
    id: 2,
    title: "Gate dẫn đầu mảng giao dịch phái sinh với volume tăng trưởng 70%",
    description: "Ta-Derivatives volume has nearly 70% boost",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
    bgColor: "bg-gradient-to-r from-gray-800 to-gray-900",
    textColor: "text-white",
    link: "/article/gate-dan-dau-mang-giao-dich-phai-sinh-voi-volume-tang-truong-70",
  },
  {
    id: 3,
    title: "RBAR (TRDR) niêm yết trên BitMart",
    description: "Trading Open",
    image:
      "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=200&fit=crop",
    bgColor: "bg-gradient-to-r from-green-600 to-blue-600",
    textColor: "text-white",
    link: "/article/rbar-trdr-niem-yet-tren-bitmart",
  },
  {
    id: 4,
    title:
      'BingX: Bitcoin bất lại mốc 107,000 USD khi nhà đầu tư trang thụ "bắt đáy"',
    description: "Bitcoin Trading Analysis",
    image:
      "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=200&fit=crop",
    bgColor: "bg-gradient-to-r from-blue-500 to-green-500",
    textColor: "text-white",
    link: "/article/bingx-bitcoin-bat-lai-moc-107000-usd",
  },
  {
    id: 5,
    title: "Trải nghiệm CoinEx Demo Trading",
    description: "Start with Demo!",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop",
    bgColor: "bg-gradient-to-r from-teal-500 to-cyan-600",
    textColor: "text-white",
    link: "/article/trai-nghiem-coinex-demo-trading",
  },
  {
    id: 6,
    title: "CARV công bố lộ trình phát triển mới, tập trung vào Web3 và AI",
    description: "THE RISE OF AI BEINGS",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
    bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
    textColor: "text-white",
    link: "/article/carv-cong-bo-lo-trinh-phat-trien-moi",
  },
];

// Mock data cho bài viết kiến thức
const mockKnowledgeArticles = [
  {
    _id: "k1",
    title: "Solana ETF là gì? Những điều bạn cần biết về Solana ETF",
    slug: "solana-etf-la-gi-nhung-dieu-ban-can-biet",
    views: 2340,
  },
  {
    _id: "k2",
    title:
      "OnceBalance là gì? Nền tảng API giúp ứng dụng Web3 tương tác với ...",
    slug: "oncebalance-la-gi-nen-tang-api-giup-ung-dung-web3",
    views: 1890,
  },
  {
    _id: "k3",
    title:
      "Spark (SPK) là gì? Nền tảng cho vay vừa được niêm yết trên Binance...",
    slug: "spark-spk-la-gi-nen-tang-cho-vay-vua-duoc-niem-yet-tren-binance",
    views: 3450,
  },
  {
    _id: "k4",
    title: "Yupp là gì? Dự án mô hình AI đánh cho người dùng phổ thông",
    slug: "yupp-la-gi-du-an-mo-hinh-ai-danh-cho-nguoi-dung-pho-thong",
    views: 1670,
  },
  {
    _id: "k5",
    title:
      "Neutral Trade là gì? Nền tảng giao dịch đa chiến lược cho người dùng...",
    slug: "neutral-trade-la-gi-nen-tang-giao-dich-da-chien-luoc",
    views: 2230,
  },
  {
    _id: "k6",
    title: "Believe là gì? Launchpad cho memecoin bằng cách tương tác trên X",
    slug: "believe-la-gi-launchpad-cho-memecoin-bang-cach-tuong-tac-tren-x",
    views: 1560,
  },
  {
    _id: "k7",
    title: "RISE Chain là gì? Dự án Layer 2 trên Ethereum hướng tới tốc độ...",
    slug: "rise-chain-la-gi-du-an-layer-2-tren-ethereum-huong-toi-toc-do",
    views: 2890,
  },
  {
    _id: "k8",
    title:
      "Lagrange là gì? Dự án kiểm chứng dữ liệu chính xác của AI qua mô hình ...",
    slug: "lagrange-la-gi-du-an-kiem-chung-du-lieu-chinh-xac-cua-ai",
    views: 1780,
  },
];

// Mock data cho E-magazine articles
const mockEMagazineArticles = [
  {
    _id: "m1",
    title: "Tạp chí số: Chặng đường phát triển của Sui sau 1 năm mainnet",
    slug: "tap-chi-so-chang-duong-phat-trien-cua-sui-sau-1-nam-mainnet",
    subtitle: "Tạp chí trực tuyến lần 1",
    featuredImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=600&fit=crop",
    bgGradient: "bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900",
    textColor: "text-white",
    size: "large", // for different card sizes
  },
  {
    _id: "m2",
    title: "Tiền tiền mã hóa: Từ sự kiện đến cơ hội đầu tư của năm 2023",
    slug: "tien-tien-ma-hoa-tu-su-kien-den-co-hoi-dau-tu-cua-nam-2023",
    subtitle: "Tạp chí tài chính số",
    featuredImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=600&fit=crop",
    bgGradient: "bg-gradient-to-br from-orange-600 via-red-600 to-pink-600",
    textColor: "text-white",
    size: "medium",
  },
  {
    _id: "m3",
    title: "Tạp chí đầu tư: Vỡ bọt hóa hoa, để chế FTX đã tan tành thế nào?",
    slug: "tap-chi-dau-tu-vo-bot-hoa-hoa-de-che-ftx-da-tan-tanh-the-nao",
    subtitle: "E-magazine Đầu tư",
    featuredImage:
      "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=400&h=600&fit=crop",
    bgGradient: "bg-gradient-to-br from-red-800 via-red-700 to-red-600",
    textColor: "text-white",
    size: "medium",
  },
  {
    _id: "m4",
    title:
      "Tạp chí Blockchain: Ứng dụng Binance năm của BingX và những bước tiến vượt bậc",
    slug: "tap-chi-blockchain-ung-dung-binance-nam-cua-bingx",
    subtitle: "E-magazine Blockchain",
    featuredImage:
      "https://images.unsplash.com/photo-1634704784915-aacf363b021f?w=400&h=600&fit=crop",
    bgGradient: "bg-gradient-to-br from-blue-700 via-blue-800 to-purple-800",
    textColor: "text-white",
    size: "medium",
  },
  {
    _id: "m5",
    title: "E-magazine Tether: Finally the Last One Standing",
    slug: "e-magazine-tether-finally-the-last-one-standing",
    subtitle: "E-magazine Stablecoin",
    featuredImage:
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=600&fit=crop",
    bgGradient: "bg-gradient-to-br from-teal-700 via-green-700 to-emerald-700",
    textColor: "text-white",
    size: "large",
  },
];

// Mock data cho bài viết góc nhìn
const mockPerspectiveArticles = [
  {
    _id: "101",
    title: 'Góc nhìn: Bitcoin có thực sự là "vàng số" của tương lai?',
    slug: "goc-nhin-bitcoin-co-thuc-su-la-vang-so-cua-tuong-lai",
    excerpt:
      'Phân tích sâu về tính chất store of value của Bitcoin và so sánh với vàng truyền thống. Liệu Bitcoin có xứng đáng với danh hiệu "vàng số"?',
    featuredImage:
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=450&fit=crop",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    views: 5430,
    author: {
      name: "PGS.TS Nguyễn Văn Kinh",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
    },
    category: {
      name: "Góc Nhìn",
      slug: "goc-nhin",
      color: "#7C3AED",
    },
  },
  {
    _id: "102",
    title: 'Góc nhìn: Liệu CBDC có "giết chết" Bitcoin?',
    slug: "goc-nhin-lieu-cbdc-co-giet-chet-bitcoin",
    excerpt:
      "Những lo ngại về việc các ngân hàng trung ương phát hành tiền số (CBDC) có thể thay thế hoàn toàn Bitcoin và các cryptocurrency khác.",
    featuredImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop",
    publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    views: 3920,
    author: {
      name: "TS. Lê Minh Hoàng",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    category: {
      name: "Góc Nhìn",
      slug: "goc-nhin",
      color: "#7C3AED",
    },
  },
  {
    _id: "103",
    title: "Góc nhìn: Web3 - Cách mạng hay chỉ là hype?",
    slug: "goc-nhin-web3-cach-mang-hay-chi-la-hype",
    excerpt:
      "Đánh giá thực tế về tiềm năng của Web3 trong việc thay đổi internet như chúng ta biết, hay chỉ là một trend marketing đơn thuần.",
    featuredImage:
      "https://images.unsplash.com/photo-1639815188546-c43c240ff4df?w=800&h=450&fit=crop",
    publishedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    views: 6710,
    author: {
      name: "ThS. Phạm Thu Trang",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    category: {
      name: "Góc Nhìn",
      slug: "goc-nhin",
      color: "#7C3AED",
    },
  },
];

export const metadata: Metadata = {
  title: "Báo Tiền Điện Tử - Tin tức và phân tích về Cryptocurrency",
  description:
    "Cập nhật tin tức mới nhất về tiền điện tử, Bitcoin, Ethereum, Ripple, Dogecoin, Altcoin, và Blockchain và công nghệ tài chính. Phân tích chuyên sâu từ các chuyên gia hàng đầu.",
  keywords: [
    "tiền điện tử",
    "cryptocurrency",
    "bitcoin",
    "ethereum",
    "blockchain",
    "tin tức crypto",
    "phân tích thị trường",
  ],
  openGraph: {
    title: "Báo Tiền Điện Tử - Tin tức Cryptocurrency hàng đầu Việt Nam",
    description:
      "Nguồn tin tức tiền điện tử uy tín với các bài phân tích chuyên sâu về Bitcoin, Ethereum, Ripple, Dogecoin, Altcoin và thị trường crypto.",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Báo Tiền Điện Tử - Tin tức Cryptocurrency",
    description: "Cập nhật tin tức mới nhất về tiền điện tử và blockchain.",
  },
};

async function getLatestArticles() {
  // Trả về mock data thay vì gọi API
  return mockArticles;
}

async function getFeaturedArticles() {
  // Trả về mock data thay vì gọi API
  return mockFeaturedArticles;
}

async function getPerspectiveArticles() {
  // Trả về mock data thay vì gọi API
  return mockPerspectiveArticles;
}

// Mock data for crypto prices (in production, this would come from a crypto API)
const baseCryptoData = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 107000,
    change24h: 2.5,
    icon: "₿",
    color: "bg-gradient-to-r from-red-500 to-yellow-500",
  },
  {
    name: "TRON",
    symbol: "TRX",
    price: 0.24,
    change24h: -1.2,
    icon: "T",
    color: "bg-red-600",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3420,
    change24h: 1.8,
    icon: "Ξ",
    color: "bg-blue-500",
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    price: 692,
    change24h: 3.2,
    icon: "B",
    color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 245,
    change24h: -0.8,
    icon: "S",
    color: "bg-gradient-to-r from-purple-500 to-indigo-500",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: 1.12,
    change24h: 4.1,
    icon: "₳",
    color: "bg-gradient-to-r from-blue-600 to-cyan-500",
  },
  {
    name: "Ripple",
    symbol: "XRP",
    price: 2.45,
    change24h: -2.3,
    icon: "X",
    color: "bg-gradient-to-r from-gray-600 to-gray-800",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    price: 8.95,
    change24h: 1.7,
    icon: "●",
    color: "bg-gradient-to-r from-pink-500 to-rose-500",
  },
];

// Double the data for infinite scroll
const cryptoData = [...baseCryptoData, ...baseCryptoData];

export default async function HomePage() {
  const [latestArticles, featuredArticles, perspectiveArticles] =
    await Promise.all([
      getLatestArticles(),
      getFeaturedArticles(),
      getPerspectiveArticles(),
    ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Crypto Ticker Section - Infinite Scroll Animation */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="crypto-ticker">
          <div className="animate-scroll flex items-center space-x-12 py-2">
            {cryptoData.map((crypto, index) => (
              <div
                key={`${crypto.symbol}-${index}`}
                className="flex items-center space-x-3 flex-shrink-0"
              >
                <div
                  className={`w-8 h-8 ${crypto.color} rounded-full flex items-center justify-center shadow-md`}
                >
                  <span className="text-white font-bold text-sm">
                    {crypto.icon}
                  </span>
                </div>
                <div className="whitespace-nowrap">
                  <div className="text-xs font-bold text-gray-900">
                    {crypto.name} ({crypto.symbol})
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-gray-900">
                      $
                      {crypto.price < 1
                        ? crypto.price.toFixed(3)
                        : crypto.price.toLocaleString()}
                    </span>
                    <span
                      className={`flex items-center text-xs font-medium ${
                        crypto.change24h >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {crypto.change24h >= 0 ? (
                        <ArrowUp className="w-2 h-2 mr-1" />
                      ) : (
                        <ArrowDown className="w-2 h-2 mr-1" />
                      )}
                      {crypto.change24h > 0 ? "+" : ""}
                      {crypto.change24h}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot News Section - Layout like image */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Hot News List */}
            <div className="bg-pink-50 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-red-500 mr-2"></div>
                <h2 className="text-lg font-bold text-gray-900">Hot News</h2>
              </div>

              <div className="space-y-4">
                {latestArticles.slice(0, 6).map((article: ArticleType) => (
                  <article key={article._id} className="group">
                    <Link href={`/article/${article.slug}`} className="block">
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <div className="relative w-16 h-12 rounded overflow-hidden">
                            <Image
                              src={article.featuredImage}
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-500 mb-1">
                            {format(new Date(article.publishedAt), "dd/MM", {
                              locale: vi,
                            })}
                          </div>
                          <h3 className="text-sm font-medium text-gray-900 group-hover:text-red-500 transition-colors line-clamp-2 leading-tight">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            {/* Right Grid - Featured Articles 2x3 */}
            <div className="lg:col-span-3">
              {featuredArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredArticles.slice(0, 6).map((article: ArticleType) => (
                    <article key={article._id} className="group">
                      <Link href={`/article/${article.slug}`} className="block">
                        <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                          <Image
                            src={article.featuredImage}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          {/* Category Tag */}
                          <div className="absolute top-3 left-3">
                            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                              {article.category?.name}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-white font-bold text-sm md:text-base leading-tight line-clamp-3 mb-2">
                              {article.title}
                            </h3>
                            <div className="flex items-center text-white text-xs opacity-90">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>
                                {format(
                                  new Date(article.publishedAt),
                                  "dd/MM/yyyy",
                                  { locale: vi }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Banner Slider Section */}
      <section className="bg-white py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="banner-slider">
            <div className="animate-slide-infinite flex items-center space-x-6">
              {[...mockBannerSlides, ...mockBannerSlides].map(
                (slide, index) => (
                  <Link
                    key={`${slide.id}-${index}`}
                    href={slide.link}
                    className="flex-shrink-0 group"
                  >
                    <div
                      className={`relative w-80 h-32 ${slide.bgColor} rounded-lg overflow-hidden shadow-md hover-glow`}
                    >
                      <div className="absolute inset-0 flex items-center">
                        <div className="flex-1 p-4 pr-2">
                          <p
                            className={`text-xs ${slide.textColor} opacity-80 mb-1`}
                          >
                            {slide.description}
                          </p>
                          <h3
                            className={`text-sm font-bold ${slide.textColor} line-clamp-3 leading-tight text-hover`}
                          >
                            {slide.title}
                          </h3>
                        </div>
                        <div className="w-24 h-full relative overflow-hidden">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover image-scale"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles List - Coin68 Style */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tin tổng hợp */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-red-500 mr-3"></span>
                  Tin tổng hợp
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {latestArticles.slice(0, 8).map((article: ArticleType) => (
                    <article
                      key={article._id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden card-hover"
                    >
                      <Link href={`/article/${article.slug}`}>
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={article.featuredImage}
                            alt={article.title}
                            fill
                            className="object-cover image-scale"
                          />
                          <div className="absolute top-2 left-2">
                            <span
                              className="px-2 py-1 text-xs font-medium text-white rounded"
                              style={{
                                backgroundColor:
                                  article.category?.color || "#3B82F6",
                              }}
                            >
                              {article.category?.name}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 hover:text-red-500 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{article.author?.name}</span>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{formatViews(article.views)}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>

              {/* Góc nhìn */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-red-500 mr-3"></span>
                  Góc nhìn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {perspectiveArticles.map((article: ArticleType) => (
                    <article
                      key={article._id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden card-hover"
                    >
                      <Link href={`/article/${article.slug}`}>
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={article.featuredImage}
                            alt={article.title}
                            fill
                            className="object-cover image-scale"
                          />
                          <div className="absolute top-2 right-2">
                            <span className="bg-red-100 text-red-600 px-2 py-1 text-xs font-medium rounded">
                              Góc nhìn
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 hover:text-red-500 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3">
                            {article.excerpt}
                          </p>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <Link
                  href="/articles"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover-lift"
                >
                  Xem thêm tin tức
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Sidebar - Kiến thức */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-1 h-6 bg-red-500 mr-3"></span>
                    Kiến thức
                  </h2>
                  <div className="space-y-4">
                    {mockKnowledgeArticles.map((article) => (
                      <article
                        key={article._id}
                        className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                      >
                        <Link
                          href={`/article/${article.slug}`}
                          className="group"
                        >
                          <h3 className="text-sm font-medium text-gray-900 group-hover:text-red-500 transition-colors line-clamp-3 mb-2">
                            {article.title}
                          </h3>
                          <div className="flex items-center text-xs text-gray-500">
                            <Eye className="w-3 h-3 mr-1" />
                            <span>{formatViews(article.views)}</span>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link
                      href="/knowledge"
                      className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center justify-center text-hover"
                    >
                      Xem thêm kiến thức
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E-magazine Section */}
      <section className="py-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-500 mb-2">E-magazine</h2>
            <div className="w-10 h-1 bg-red-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEMagazineArticles.map((magazine) => (
              <article
                key={magazine._id}
                className="group"
              >
                <div className="relative flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300">
                  {/* Header with gradient background and image */}
                  <div className="relative mx-4 mt-4 h-40 overflow-hidden rounded-xl bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                    <Image
                      src={magazine.featuredImage}
                      alt={magazine.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0" />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs text-white/90 uppercase tracking-wide font-medium bg-white/20 px-2 py-1 rounded">
                        {magazine.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased group-hover:text-blue-600 transition-colors">
                      {magazine.title.length > 50 ? `${magazine.title.substring(0, 50)}...` : magazine.title}
                    </h5>
                    <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased line-clamp-3">
                      {magazine.title.length > 60 ? `${magazine.title.substring(0, 60)}...` : magazine.title}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="p-6 pt-0">
                    <Link href={`/article/${magazine.slug}`}>
                      <button 
                        type="button" 
                        className="select-none rounded-lg bg-primary py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full"
                      >
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Big Cap */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover-scale-sm">
              <h3 className="text-lg font-bold text-gray-900 p-4 border-b flex items-center">
                <span className="w-1 h-6 bg-red-500 mr-3"></span>
                Big Cap
              </h3>
              <div className="p-4">
                {/* Main Article */}
                <article className="mb-4">
                  <Link href="/article/charles-hoskinson-de-xuat-chuyen-doi-100-trieu-usd-ada">
                    <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
                        alt="Charles Hoskinson"
                        fill
                        className="object-cover image-scale"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 hover:text-red-500 transition-colors line-clamp-2 mb-2">
                      Charles Hoskinson đề xuất chuyển đổi 100 triệu USD ADA
                      thành...
                    </h4>
                  </Link>
                </article>

                {/* Sub Articles */}
                <div className="space-y-3 border-t pt-3">
                  <article className="flex space-x-3">
                    <div className="w-12 h-12 bg-green-600 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">PH</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href="/article/polyhedra-tuyen-bo-mua-lai-token-zkj">
                        <p className="text-sm text-gray-900 hover:text-red-500 transition-colors line-clamp-2">
                          Polyhedra tuyên bố mua lại token ZKJ để trả giá sau cú
                          ...
                        </p>
                      </Link>
                    </div>
                  </article>

                  <article className="flex space-x-3">
                    <div className="w-12 h-12 bg-orange-600 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">ETF</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href="/article/etf-bitcoin-spot-chiem-25-phan-giao-dich">
                        <p className="text-sm text-gray-900 hover:text-red-500 transition-colors line-clamp-2">
                          ETF Bitcoin spot chiếm 25% thị phần giao dịch BTC toàn
                          ...
                        </p>
                      </Link>
                    </div>
                  </article>
                </div>
              </div>
            </div>

            {/* DeFi */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover-scale-sm">
              <h3 className="text-lg font-bold text-gray-900 p-4 border-b flex items-center">
                <span className="w-1 h-6 bg-red-500 mr-3"></span>
                DeFi
              </h3>
              <div className="p-4">
                {/* Main Article */}
                <article className="mb-4">
                  <Link href="/article/cetus-protocol-tai-khoi-dong-sau-vu-tan-cong">
                    <div className="relative h-40 rounded-lg overflow-hidden mb-3 bg-black flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-red-500 text-4xl mb-2">⚠️</div>
                        <div className="text-cyan-400 text-2xl font-bold">
                          CETUS
                        </div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 hover:text-red-500 transition-colors line-clamp-2 mb-2">
                      Cetus Protocol tái khởi động sau vụ tấn công 223 triệu USD
                    </h4>
                  </Link>
                </article>

                {/* Sub Articles */}
                <div className="space-y-3 border-t pt-3">
                  <article className="flex space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">LQ</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href="/article/giao-thuc-liquid-staking-meta-pool">
                        <p className="text-sm text-gray-900 hover:text-red-500 transition-colors line-clamp-2">
                          Giao thức liquid staking Meta Pool bị tấn công 27
                          triệu...
                        </p>
                      </Link>
                    </div>
                  </article>

                  <article className="flex space-x-3">
                    <div className="w-12 h-12 bg-pink-600 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">SPK</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href="/article/spark-airdrop-3-phan-tram-tong-cung-token">
                        <p className="text-sm text-gray-900 hover:text-red-500 transition-colors line-clamp-2">
                          Spark airdrop 3% tổng cung token SPK cho cộng đồng
                        </p>
                      </Link>
                    </div>
                  </article>
                </div>
              </div>
            </div>

            {/* NFT & GameFi */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover-scale-sm">
              <h3 className="text-lg font-bold text-gray-900 p-4 border-b flex items-center">
                <span className="w-1 h-6 bg-red-500 mr-3"></span>
                NFT & GameFi
              </h3>
              <div className="p-4">
                {/* Main Article */}
                <article className="mb-4">
                  <Link href="/article/bo-suu-tap-nft-pudgy-penguins-ra-mat-game">
                    <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                      <Image
                        src="https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=250&fit=crop"
                        alt="Pudgy Penguins Game"
                        fill
                        className="object-cover image-scale"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 hover:text-red-500 transition-colors line-clamp-2 mb-2">
                      Bộ sưu tập NFT Pudgy Penguins ra mắt game Pengu Clash trên
                      T...
                    </h4>
                  </Link>
                </article>

                {/* Sub Articles */}
                <div className="space-y-3 border-t pt-3">
                  <article className="flex space-x-3">
                    <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">OS</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href="/article/opensea-trien-khai-phien-ban-os2">
                        <p className="text-sm text-gray-900 hover:text-red-500 transition-colors line-clamp-2">
                          OpenSea triển khai phiên bản OS2, vẫn chưa hé lộ gì về
                          ...
                        </p>
                      </Link>
                    </div>
                  </article>

                  <article className="flex space-x-3">
                    <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">CP</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href="/article/sau-cryptopunks-bo-suu-tap-nft-moonbirds">
                        <p className="text-sm text-gray-900 hover:text-red-500 transition-colors line-clamp-2">
                          Sau CryptoPunks, bộ sưu tập NFT Moonbirds cũng
                          &ldquo;đổi chủ&rdquo;...
                        </p>
                      </Link>
                    </div>
                  </article>
                </div>
              </div>
            </div>

            {/* Thư viện */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover-scale-sm">
              <h3 className="text-lg font-bold text-gray-900 p-4 border-b flex items-center">
                <span className="w-1 h-6 bg-red-500 mr-3"></span>
                Thư viện
              </h3>
              <div className="p-4">
                {/* Main Article */}
                <article className="mb-4">
                  <Link href="/article/spark-spk-la-gi-nen-tang-cho-vay">
                    <div className="relative h-40 rounded-lg overflow-hidden mb-3 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">✨</div>
                        <div className="text-2xl font-bold">Spark</div>
                        <div className="text-sm opacity-80">
                          Nền tảng cho vay
                        </div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 hover:text-red-500 transition-colors line-clamp-2 mb-2">
                      Spark (SPK) là gì? Nền tảng cho vay vừa được niêm yết trên
                      B...
                    </h4>
                  </Link>
                </article>

                {/* Sub Articles */}
                <div className="space-y-3 border-t pt-3">
                  <article className="flex space-x-3">
                    <div className="w-12 h-12 bg-teal-600 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">SOL</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href="/article/solana-etf-la-gi-nhung-dieu-ban-can-biet">
                        <p className="text-sm text-gray-900 hover:text-red-500 transition-colors line-clamp-2">
                          Solana ETF là gì? Những điều bạn cần biết về Solana
                          ETF
                        </p>
                      </Link>
                    </div>
                  </article>

                  <article className="flex space-x-3">
                    <div className="w-12 h-12 bg-purple-600 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">YP</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href="/article/yupp-la-gi-du-an-mo-hinh-ai">
                        <p className="text-sm text-gray-900 hover:text-red-500 transition-colors line-clamp-2">
                          Yupp là gì? Dự án mô hình AI dành cho người dùng phổ
                          th...
                        </p>
                      </Link>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Pháp lý */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <h3 className="text-lg font-bold text-gray-900 p-4 border-b flex items-center">
                <span className="w-1 h-6 bg-red-500 mr-3"></span>
                Pháp lý
              </h3>
              <div className="p-4">
                {/* Main Article */}
                <article className="mb-4">
                  <Link href="/article/arizona-noi-sinh-du-luat-du-tru-crypto">
                    <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                      <Image
                        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=200&fit=crop"
                        alt="Arizona Bitcoin"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 hover:text-red-500 transition-colors line-clamp-2 mb-2">
                      Arizona &ldquo;nổi sinh&rdquo; dự luật dự trữ crypto sau
                      khi bổ phiếu là...
                    </h4>
                  </Link>
                </article>

                <div className="space-y-2">
                  <article>
                    <Link href="/article/bang-texas-thong-qua-luat-thanh-lap-quy-du-tru-bitcoin">
                      <p className="text-sm text-gray-900 hover:text-red-500 transition-colors line-clamp-2">
                        Bang Texas thông qua luật thành lập quỹ dự trữ Bitcoin
                        ...
                      </p>
                    </Link>
                  </article>
                  <article>
                    <Link href="/article/na-uy-muon-cam-mo-moi-trai-dao-coin-tu-nam-2025">
                      <p className="text-sm text-gray-900 hover:text-red-500 transition-colors line-clamp-2">
                        Na Uy muốn cấm mở mới trại đào coin từ năm 2025
                      </p>
                    </Link>
                  </article>
                </div>
              </div>
            </div>

            {/* Tin tổng hợp */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <h3 className="text-lg font-bold text-gray-900 p-4 border-b flex items-center">
                <span className="w-1 h-6 bg-red-500 mr-3"></span>
                Tin tổng hợp
              </h3>
              <div className="p-4">
                {/* Main Article */}
                <article className="mb-4">
                  <Link href="/article/tuan-san-coin68-lo-lua-trung-dong-ha-nhiet">
                    <div className="relative h-32 rounded-lg overflow-hidden mb-3 bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-2xl font-bold">BTC</div>
                        <div className="text-lg">$107,562.50</div>
                        <div className="text-sm text-green-300">+5.16%</div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 hover:text-red-500 transition-colors line-clamp-2 mb-2">
                      Tuần san Coin68 (23/06 - 29/06): &ldquo;Lò lửa&rdquo;
                      Trung Đông hạ nhiệt...
                    </h4>
                  </Link>
                </article>

                <div className="space-y-2">
                  <article>
                    <Link href="/article/polychain-thu-ve-hon-80-trieu-usd-chi-tu-ban-phan-thuong">
                      <p className="text-sm text-gray-900 hover:text-red-500 transition-colors line-clamp-2">
                        Polychain thu về hơn 80 triệu USD chỉ từ bán phần
                        thưởng...
                      </p>
                    </Link>
                  </article>
                  <article>
                    <Link href="/article/etf-bitcoin-mua-vao-2-2-ty-usd-trong-tuan-nay">
                      <p className="text-sm text-gray-900 hover:text-red-500 transition-colors line-clamp-2">
                        ETF Bitcoin mua vào 2,2 tỷ USD trong tuần này
                      </p>
                    </Link>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
