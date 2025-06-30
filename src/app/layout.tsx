import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script'
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
