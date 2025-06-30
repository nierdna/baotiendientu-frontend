import Link from 'next/link';
import Image from 'next/image';
import { Home } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Không tìm thấy trang | Báo Tiền Điện Tử',
  description: 'Trang bạn đang tìm kiếm không tồn tại. Quay lại trang chủ để khám phá tin tức và phân tích về tiền điện tử mới nhất.',
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-block">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src="/logo.png"
                alt="Báo Tiền Điện Tử"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Báo Tiền Điện Tử</h1>
          </Link>
        </div>

        {/* 404 Error */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-red-500 mb-4">404</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Không tìm thấy trang
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi URL hoặc tạm thời không khả dụng.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Về trang chủ
          </Link>
          
        </div>

      </div>
    </div>
  );
} 