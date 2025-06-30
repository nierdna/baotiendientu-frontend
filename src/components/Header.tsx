'use client';

import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, User, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

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

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

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
            {/* Login */}
            <Link
              href="/login"
              className="flex items-center space-x-1 text-primary hover:text-primary/70 font-medium"
            >
              <User className="w-5 h-5" />
              <span>Đăng nhập</span>
            </Link>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {/* Mobile menu panel */}
        <div 
          className={`absolute top-0 right-0 h-full w-[300px] bg-white shadow-xl transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="h-full overflow-y-auto">
            <div className="px-4 py-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <div key={item.name} className="py-2">
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(item.name)}
                          className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${
                              openSubmenu === item.name ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        <div
                          className={`mt-2 space-y-1 ${
                            openSubmenu === item.name ? 'block' : 'hidden'
                          }`}
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block pl-10 pr-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 