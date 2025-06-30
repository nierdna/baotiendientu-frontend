import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, User, Twitter, Send } from "lucide-react";
import Script from 'next/script'

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
    <html lang="vi" className="scroll-smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WZX1L5Y0B6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-WZX1L5Y0B6');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-gray-50`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  const navigation = [
    { 
      name: 'Tin tức', 
      href: '/news',
      submenu: [
        { name: 'Big Cap', href: '/category/big-cap' },
        { name: 'DeFi', href: '/category/defi' },
        { name: 'NFT & GameFi', href: '/category/nft-gamefi' },
        { name: 'Pháp lý', href: '/category/phap-ly' },
        { name: 'Tin tổng hợp', href: '/category/tin-tong-hop' },
      ]
    },
    { name: 'Báo cáo', href: '/reports' },
    { name: 'Sự kiện', href: '/events' },
    { name: 'Nổi bật', href: '/featured' },
    { name: 'Bitcoin TV', href: '/tv' },
    { name: 'E-Magazine', href: '/magazine' },
    { name: 'Góc nhìn', href: '/perspective' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 py-2">
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Báo Tiền Điện Tử"
              width={180}
              height={80}
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center text-primary hover:text-primary/70 font-medium transition-colors py-2"
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="w-4 h-4 ml-1" />}
                </Link>

                {/* Dropdown menu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-700/70 hover:bg-gray-100"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {/* <div className="hidden lg:block relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-64 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div> */}

            {/* Login */}
            <Link
              href="/login"
              className="flex items-center space-x-1 text-primary hover:text-primary/70 font-medium"
            >
              <User className="w-5 h-5" />
              <span>Đăng nhập</span>
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
          {navigation.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-500"
              >
                {item.name}
              </Link>
              {item.submenu && (
                <div className="pl-6 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-red-500"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#180d18] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo và mô tả */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/logo-white.png"
                alt="Báo Tiền Điện Tử"
                width={180}
                height={80}
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Nguồn tin tức tiền điện tử uy tín và cập nhật nhất tại Việt Nam.
              Cung cấp thông tin phân tích chuyên sâu về thị trường crypto.
            </p>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4">
                Kết nối với chúng tôi
              </h4>
              <div className="flex space-x-4">
                <Link
                  target="_blank"
                  href="https://t.me/henry0xx"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Send className="w-6 h-6" />
                </Link>
                {/* <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </Link> */}
                <Link
                  target="_blank"
                  href="https://x.com/henry0xx"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </Link>
                {/* <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Youtube className="w-6 h-6" />
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </Link> */}
              </div>
            </div>
          </div>

          {/* Danh mục */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Danh mục</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/bitcoin"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Bitcoin
                </Link>
              </li>
              <li>
                <Link
                  href="/category/ethereum"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Ethereum
                </Link>
              </li>
              <li>
                <Link
                  href="/category/defi"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  DeFi
                </Link>
              </li>
              <li>
                <Link
                  href="/category/nft-gamefi"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  NFT & GameFi
                </Link>
              </li>
              <li>
                <Link
                  href="/category/phap-ly"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Pháp lý
                </Link>
              </li>
            </ul>
          </div>

          {/* Thông tin */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Thông tin</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Báo Tiền Điện Tử. Tất cả quyền được bảo
            lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
