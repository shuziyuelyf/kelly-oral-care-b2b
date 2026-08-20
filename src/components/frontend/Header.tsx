'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { locales, localeNames } from '@/i18n/config';

export default function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const params = useParams();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/products', label: t('nav.products') },
    { href: '/custom', label: t('nav.custom') },
    { href: '/about', label: t('nav.about') },
    { href: '/news', label: t('nav.news') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const switchLocale = useCallback((newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    window.location.href = newPath || '/';
  }, [pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1B3A5C] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B2B</span>
            </div>
            <span className="font-bold text-xl text-[#1B3A5C] hidden sm:block">
              {t('brand')}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href === '/' ? '' : item.href}`}
                className={`text-sm font-medium transition-colors hover:text-[#E8720C] ${
                  pathname === `/${locale}${item.href}` || (item.href !== '/' && pathname.startsWith(`/${locale}${item.href}`))
                    ? 'text-[#E8720C]'
                    : 'text-[#2D3748]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#2D3748] hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{localeNames[locale as keyof typeof localeNames] || locale}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  {locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => { switchLocale(l); setIsLangMenuOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${l === locale ? 'text-[#E8720C] font-medium' : 'text-[#2D3748]'}`}
                    >
                      {localeNames[l as keyof typeof localeNames] || l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth */}
            <Link
              href={`/${locale}/auth`}
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-white bg-[#1B3A5C] hover:bg-[#15304d] rounded-lg transition-colors"
            >
              {t('login')}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#2D3748] hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href === '/' ? '' : item.href}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-[#2D3748] hover:bg-gray-50 rounded-lg"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/auth`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-white bg-[#1B3A5C] rounded-lg text-center mt-4"
            >
              {t('login')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
