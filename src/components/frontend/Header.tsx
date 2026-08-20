import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { locales, localeNames, isRtl, type Locale } from '@/i18n/config';
import { Globe, Menu, X, ChevronDown } from 'lucide-react';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/products', label: t('products') },
    { href: '/custom', label: t('custom') },
    { href: '/about', label: t('about') },
    { href: '/news', label: t('news') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#1B3A5C]">
            <span className="text-lg font-bold text-white">B</span>
          </div>
          <span className="text-xl font-bold text-[#1B3A5C]">B2B<span className="text-[#E8720C]">Pro</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href === '/' ? '' : item.href}`}
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#1B3A5C]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{localeNames[locale]}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {langMenuOpen && (
              <div className={`absolute top-full mt-1 ${isRtl(locale) ? 'left-0' : 'right-0'} w-40 rounded-md border border-gray-200 bg-white py-1 shadow-lg`}>
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={`/${l}`}
                    className={`block px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${l === locale ? 'bg-blue-50 text-[#1B3A5C] font-medium' : 'text-gray-700'}`}
                    onClick={() => setLangMenuOpen(false)}
                  >
                    {localeNames[l]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href={`/${locale}/auth?mode=login`}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-[#1B3A5C] transition-colors hover:bg-gray-100"
            >
              {t('login')}
            </Link>
            <Link
              href={`/${locale}/auth?mode=register`}
              className="rounded-md bg-[#E8720C] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#d4660a]"
            >
              {t('register')}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href === '/' ? '' : item.href}`}
                className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-2 border-t border-gray-200 pt-3">
              <Link
                href={`/${locale}/auth?mode=login`}
                className="flex-1 rounded-md border border-[#1B3A5C] px-3 py-2 text-center text-sm font-medium text-[#1B3A5C]"
              >
                {t('login')}
              </Link>
              <Link
                href={`/${locale}/auth?mode=register`}
                className="flex-1 rounded-md bg-[#E8720C] px-3 py-2 text-center text-sm font-medium text-white"
              >
                {t('register')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
