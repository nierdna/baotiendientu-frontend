import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Search, Menu, Facebook, Twitter, Youtube } from "lucide-react";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Báo Tiền Điện Tử - Tin tức Cryptocurrency hàng đầu Việt Nam",
    template: "%s | Báo Tiền Điện Tử"
  },
  description: "Cập nhật tin tức mới nhất về tiền điện tử, Bitcoin, Ethereum, blockchain và công nghệ tài chính. Phân tích chuyên sâu từ các chuyên gia hàng đầu.",
  keywords: ['tiền điện tử', 'cryptocurrency', 'bitcoin', 'ethereum', 'blockchain', 'tin tức crypto', 'phân tích thị trường'],
  authors: [{ name: 'Báo Tiền Điện Tử' }],
  creator: 'Báo Tiền Điện Tử',
  publisher: 'Báo Tiền Điện Tử',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Báo Tiền Điện Tử - Tin tức Cryptocurrency hàng đầu Việt Nam',
    description: 'Nguồn tin tức tiền điện tử uy tín với các bài phân tích chuyên sâu về Bitcoin, Ethereum và thị trường crypto.',
    url: process.env.SITE_URL || 'http://localhost:3000',
    siteName: 'Báo Tiền Điện Tử',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Báo Tiền Điện Tử - Tin tức Cryptocurrency',
    description: 'Cập nhật tin tức mới nhất về tiền điện tử và blockchain.',
    creator: '@baotiendientu',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  const navigation = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Bitcoin', href: '/category/bitcoin' },
    { name: 'Ethereum', href: '/category/ethereum' },
    { name: 'Altcoin', href: '/category/altcoin' },
    { name: 'DeFi', href: '/category/defi' },
    { name: 'NFT', href: '/category/nft' },
    { name: 'Phân tích', href: '/category/analysis' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span>🔥 Tin nóng: Bitcoin vượt $50,000</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/about" className="hover:text-gray-300">Giới thiệu</Link>
              <Link href="/contact" className="hover:text-gray-300">Liên hệ</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
              BTC
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900">Báo Tiền Điện Tử</h1>
              <p className="text-sm text-gray-600">Crypto News Vietnam</p>
            </div>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm tin tức..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block border-t border-gray-200">
          <div className="flex space-x-8 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const footerLinks = {
    'Danh mục': [
      { name: 'Bitcoin', href: '/category/bitcoin' },
      { name: 'Ethereum', href: '/category/ethereum' },
      { name: 'Altcoin', href: '/category/altcoin' },
      { name: 'DeFi', href: '/category/defi' },
    ],
    'Công ty': [
      { name: 'Giới thiệu', href: '/about' },
      { name: 'Liên hệ', href: '/contact' },
      { name: 'Tuyển dụng', href: '/careers' },
      { name: 'Quảng cáo', href: '/advertise' },
    ],
    'Pháp lý': [
      { name: 'Chính sách bảo mật', href: '/privacy' },
      { name: 'Điều khoản sử dụng', href: '/terms' },
      { name: 'Quy chế hoạt động', href: '/regulations' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
                BTC
              </div>
              <span className="text-xl font-bold">Báo Tiền Điện Tử</span>
            </div>
            <p className="text-gray-300 mb-4">
              Nguồn tin tức tiền điện tử uy tín và cập nhật nhất tại Việt Nam. Cung cấp thông tin phân tích chuyên sâu về thị trường crypto.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Báo Tiền Điện Tử. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
