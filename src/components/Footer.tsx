'use client';

import Link from "next/link";
import Image from "next/image";
import { Twitter, Send } from "lucide-react";

export default function Footer() {
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
                <Link
                  target="_blank"
                  href="https://x.com/henry0xx"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </Link>
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