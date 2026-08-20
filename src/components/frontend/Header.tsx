'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Globe, User, Search } from 'lucide-react';
import { locales, localeNames } from '@/i18n/config';

export default function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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

  const isActive = (href: string) => {
    if (href === '/') return pathname === `/${locale}`;
    return pathname.startsWith(`/${locale}${href}`);
  };

  return (
    <>
      {/* Spacer for fixed nav */}
      <div className="h-20" />

      {/* Pill Navbar */}
      <header
        className={`fixed top-3 left-3 right-3 z-50 transition-all duration-500 ${
          isScrolled ? 'top-2' : 'top-3'
        }`}
      >
        <nav
          className={`max-w-6xl mx-auto rounded-full transition-all duration-500 ${
            isScrolled
              ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
              : 'bg-white/70 backdrop-blur-lg shadow-[0_2px_20px_rgba(0,0,0,0.06)]'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-3">
            {/* Left Nav Items */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.slice(0, 3).map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href === '/' ? '' : item.href}`}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-[#1B2A4A] text-white'
                      : 'text-[#4a4a4a] hover:text-[#1B2A4A] hover:bg-gray-100/80'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Center Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#1B2A4A] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">PM</span>
              </div>
              <span className="font-bold text-lg text-[#1B2A4A] hidden sm:block tracking-tight">
                {t('brand')}
              </span>
            </Link>

            {/* Right Nav Items + Actions */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.slice(3).map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href === '/' ? '' : item.href}`}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-[#1B2A4A] text-white'
                      : 'text-[#4a4a4a] hover:text-[#1B2A4A] hover:bg-gray-100/80'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Divider */}
              <div className="w-px h-5 bg-gray-200 mx-2" />

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-[#4a4a4a] hover:bg-gray-100/80 rounded-full transition-colors"
                >
                  <Globe className="w-4 h-4" />
                </button>
                {isLangMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 min-w-[160px] overflow-hidden">
                    {locales.map((l) => (
                      <button
                        key={l}
                        onClick={() => { switchLocale(l); setIsLangMenuOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                          locale === l ? 'text-[#1B2A4A] font-semibold bg-gray-50' : 'text-[#4a4a4a]'
                        }`}
                      >
                        {localeNames[l]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search */}
              <button className="p-2 text-[#4a4a4a] hover:bg-gray-100/80 rounded-full transition-colors">
                <Search className="w-4 h-4" />
              </button>

              {/* Account */}
              <Link
                href={`/${locale}/auth`}
                className="p-2 text-[#4a4a4a] hover:bg-gray-100/80 rounded-full transition-colors"
              >
                <User className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#4a4a4a] hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden max-w-6xl mx-auto mt-2 bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="py-4 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href === '/' ? '' : item.href}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-[#1B2A4A] text-white'
                      : 'text-[#4a4a4a] hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between px-4">
                <div className="relative">
                  <button
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-[#4a4a4a]"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{localeNames[locale as typeof locales[number]]}</span>
                  </button>
                  {isLangMenuOpen && (
                    <div className="absolute left-0 bottom-full mb-2 bg-white rounded-2xl shadow-xl border py-2 min-w-[160px]">
                      {locales.map((l) => (
                        <button
                          key={l}
                          onClick={() => { switchLocale(l); setIsLangMenuOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 ${
                            locale === l ? 'text-[#1B2A4A] font-semibold' : 'text-[#4a4a4a]'
                          }`}
                        >
                          {localeNames[l]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Link href={`/${locale}/auth`} className="p-2 text-[#4a4a4a]">
                  <User className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
