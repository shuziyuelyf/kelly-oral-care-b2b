'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, Globe, User, Search, ChevronDown, ArrowRight, ChevronRight } from 'lucide-react';
import { locales, localeNames } from '@/i18n/config';
import { mockCategories } from '@/lib/mock/data';
import { getI18nValue } from '@/lib/utils-i18n';

type MenuKey = 'products' | 'custom' | 'about' | 'news' | null;

export default function Header() {
  const t = useTranslations('common');
  const tm = useTranslations('megaMenu');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!(target as HTMLElement).closest('[data-mega-menu]')) {
        setActiveMenu(null);
        setIsPanelVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleMenuEnter = useCallback((key: MenuKey) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(key);
    // Small delay for animation
    requestAnimationFrame(() => setIsPanelVisible(true));
  }, []);

  const handleMenuLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsPanelVisible(false);
      setTimeout(() => setActiveMenu(null), 200);
    }, 300);
  }, []);

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

  // Get categories for mega menu
  const categories = mockCategories.filter(c => c.status === 1);

  // Application/Industry links
  const applications = [
    { name: tm('appAutomotive'), href: '/products?industry=automotive' },
    { name: tm('appAerospace'), href: '/products?industry=aerospace' },
    { name: tm('appMedical'), href: '/products?industry=medical' },
    { name: tm('appEnergy'), href: '/products?industry=energy' },
    { name: tm('appConsumer'), href: '/products?industry=consumer' },
  ];

  // Custom services links
  const customServices = [
    { name: tm('serviceOem'), href: '/custom?type=oem' },
    { name: tm('serviceOdm'), href: '/custom?type=odm' },
    { name: tm('servicePrivateLabel'), href: '/custom?type=private-label' },
    { name: tm('servicePackaging'), href: '/custom?type=packaging' },
    { name: tm('serviceSample'), href: '/custom?type=sample' },
  ];

  // About links
  const aboutLinks = [
    { name: tm('aboutProfile'), href: '/about' },
    { name: tm('aboutFactory'), href: '/about#factory' },
    { name: tm('aboutCerts'), href: '/about#certifications' },
    { name: tm('aboutCareers'), href: '/about#careers' },
    { name: tm('aboutContact'), href: '/contact' },
  ];

  // News links
  const newsLinks = [
    { name: tm('newsCompany'), href: '/news?cat=company' },
    { name: tm('newsIndustry'), href: '/news?cat=industry' },
    { name: tm('newsPress'), href: '/news?cat=press' },
  ];

  // ============ MEGA MENU PANELS ============

  const ProductsMegaMenu = () => (
    <div
      className={`absolute left-0 right-0 top-full pt-2 transition-all duration-200 ${
        isPanelVisible && activeMenu === 'products'
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 grid grid-cols-12 gap-8">
          {/* Left: Categories */}
          <div className="col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
              {tm('productCategories')}
            </p>
            <ul className="space-y-1">
              <li>
                <Link
                  href={`/${locale}/products`}
                  className="group flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-[#1B2A4A] hover:bg-gray-50 transition-all"
                >
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  <span className="font-medium">{tm('allProducts')}</span>
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/${locale}/products?category=${cat.id}`}
                    className="group flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-[#1B2A4A] hover:bg-gray-50 transition-all"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span>{getI18nValue(cat.i18n, locale, 'categoryName')}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B2A4A] text-white text-sm font-medium rounded-full hover:bg-[#2a3d5e] transition-colors"
              >
                {tm('viewAllProducts')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Middle: By Industry */}
          <div className="col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
              {tm('byIndustry')}
            </p>
            <ul className="space-y-1">
              {applications.map((app) => (
                <li key={app.href}>
                  <Link
                    href={`/${locale}${app.href}`}
                    className="group flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-[#1B2A4A] hover:bg-gray-50 transition-all"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span>{app.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Image Cards */}
          <div className="col-span-5 grid grid-cols-2 gap-4">
            <Link
              href={`/${locale}/custom`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5]"
            >
              <img
                src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=400"
                alt="Custom Manufacturing"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-semibold text-sm">{tm('customMfg')}</p>
                <p className="text-white/70 text-xs mt-1">{tm('customMfgDesc')}</p>
              </div>
            </Link>
            <Link
              href={`/${locale}/products`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5]"
            >
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400"
                alt="Featured Products"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-semibold text-sm">{tm('featuredProducts')}</p>
                <p className="text-white/70 text-xs mt-1">{tm('featuredProductsDesc')}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const CustomMegaMenu = () => (
    <div
      className={`absolute left-0 right-0 top-full pt-2 transition-all duration-200 ${
        isPanelVisible && activeMenu === 'custom'
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-8 grid grid-cols-12 gap-8">
          {/* Left: Services */}
          <div className="col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
              {tm('ourServices')}
            </p>
            <ul className="space-y-1">
              {customServices.map((svc) => (
                <li key={svc.href}>
                  <Link
                    href={`/${locale}${svc.href}`}
                    className="group flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-[#1B2A4A] hover:bg-gray-50 transition-all"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span>{svc.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link
                href={`/${locale}/custom`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B2A4A] text-white text-sm font-medium rounded-full hover:bg-[#2a3d5e] transition-colors"
              >
                {tm('getQuote')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Factory Image */}
          <div className="col-span-7">
            <Link
              href={`/${locale}/custom`}
              className="group relative rounded-2xl overflow-hidden h-full min-h-[280px]"
            >
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800"
                alt="Factory"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A4A]/80 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center p-8">
                <p className="text-white font-bold text-xl max-w-[200px] leading-tight">
                  {tm('trustedPartner')}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#1B2A4A] text-sm font-medium rounded-full w-fit group-hover:bg-[#E8720C] group-hover:text-white transition-colors">
                  {tm('getQuote')}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const SimpleDropdown = ({ links, menuKey }: { links: { name: string; href: string }[]; menuKey: MenuKey }) => (
    <div
      className={`absolute left-0 right-0 top-full pt-2 transition-all duration-200 ${
        isPanelVisible && activeMenu === menuKey
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="max-w-xs mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className="group flex items-center justify-between px-4 py-3 rounded-xl text-sm text-gray-600 hover:text-[#1B2A4A] hover:bg-gray-50 transition-all"
            >
              <span>{link.name}</span>
              <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  // ============ MOBILE MENU ============

  const MobileSubmenu = ({ links }: { links: { name: string; href: string }[] }) => (
    <div className="ml-4 mt-1 space-y-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={`/${locale}${link.href}`}
          onClick={() => setIsMobileMenuOpen(false)}
          className="block px-4 py-2.5 rounded-xl text-sm text-gray-500 hover:text-[#1B2A4A] hover:bg-gray-50 transition-colors"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      {/* Spacer for fixed nav */}
      <div className="h-20" />

      {/* Pill Navbar */}
      <header
        className={`fixed top-3 left-3 right-3 z-50 transition-all duration-500 ${
          isScrolled ? 'top-2' : 'top-3'
        }`}
        data-mega-menu
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
              {/* Products - with mega menu */}
              <div
                className="relative"
                onMouseEnter={() => handleMenuEnter('products')}
                onMouseLeave={handleMenuLeave}
              >
                <Link
                  href={`/${locale}/products`}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive('/products')
                      ? 'bg-[#1B2A4A] text-white'
                      : 'text-[#4a4a4a] hover:text-[#1B2A4A] hover:bg-gray-100/80'
                  }`}
                >
                  {t('nav.products')}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'products' ? 'rotate-180' : ''}`} />
                </Link>
                {activeMenu === 'products' && <ProductsMegaMenu />}
              </div>

              {/* Custom Manufacturing - with mega menu */}
              <div
                className="relative"
                onMouseEnter={() => handleMenuEnter('custom')}
                onMouseLeave={handleMenuLeave}
              >
                <Link
                  href={`/${locale}/custom`}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive('/custom')
                      ? 'bg-[#1B2A4A] text-white'
                      : 'text-[#4a4a4a] hover:text-[#1B2A4A] hover:bg-gray-100/80'
                  }`}
                >
                  {t('nav.custom')}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'custom' ? 'rotate-180' : ''}`} />
                </Link>
                {activeMenu === 'custom' && <CustomMegaMenu />}
              </div>

              {/* About - simple dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMenuEnter('about')}
                onMouseLeave={handleMenuLeave}
              >
                <Link
                  href={`/${locale}/about`}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive('/about')
                      ? 'bg-[#1B2A4A] text-white'
                      : 'text-[#4a4a4a] hover:text-[#1B2A4A] hover:bg-gray-100/80'
                  }`}
                >
                  {t('nav.about')}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'about' ? 'rotate-180' : ''}`} />
                </Link>
                {activeMenu === 'about' && <SimpleDropdown links={aboutLinks} menuKey="about" />}
              </div>

              {/* News - simple dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMenuEnter('news')}
                onMouseLeave={handleMenuLeave}
              >
                <Link
                  href={`/${locale}/news`}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive('/news')
                      ? 'bg-[#1B2A4A] text-white'
                      : 'text-[#4a4a4a] hover:text-[#1B2A4A] hover:bg-gray-100/80'
                  }`}
                >
                  {t('nav.news')}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'news' ? 'rotate-180' : ''}`} />
                </Link>
                {activeMenu === 'news' && <SimpleDropdown links={newsLinks} menuKey="news" />}
              </div>

              {/* Contact - no dropdown */}
              <Link
                href={`/${locale}/contact`}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive('/contact')
                    ? 'bg-[#1B2A4A] text-white'
                    : 'text-[#4a4a4a] hover:text-[#1B2A4A] hover:bg-gray-100/80'
                }`}
              >
                {t('nav.contact')}
              </Link>
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
            <div className="py-4 px-4 max-h-[70vh] overflow-y-auto">
              {/* Home */}
              <Link
                href={`/${locale}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/') ? 'bg-[#1B2A4A] text-white' : 'text-[#4a4a4a] hover:bg-gray-50'
                }`}
              >
                {t('nav.home')}
              </Link>

              {/* Products - accordion */}
              <div>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === 'products' ? null : 'products')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-[#4a4a4a] hover:bg-gray-50 transition-colors"
                >
                  {t('nav.products')}
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'products' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === 'products' && (
                  <MobileSubmenu links={[
                    { name: tm('allProducts'), href: '/products' },
                    ...categories.map(c => ({
                      name: getI18nValue(c.i18n, locale, 'categoryName'),
                      href: `/products?category=${c.id}`,
                    })),
                  ]} />
                )}
              </div>

              {/* Custom - accordion */}
              <div>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === 'custom' ? null : 'custom')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-[#4a4a4a] hover:bg-gray-50 transition-colors"
                >
                  {t('nav.custom')}
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'custom' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === 'custom' && <MobileSubmenu links={customServices} />}
              </div>

              {/* About - accordion */}
              <div>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === 'about' ? null : 'about')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-[#4a4a4a] hover:bg-gray-50 transition-colors"
                >
                  {t('nav.about')}
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'about' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === 'about' && <MobileSubmenu links={aboutLinks} />}
              </div>

              {/* News - accordion */}
              <div>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === 'news' ? null : 'news')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-[#4a4a4a] hover:bg-gray-50 transition-colors"
                >
                  {t('nav.news')}
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'news' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === 'news' && <MobileSubmenu links={newsLinks} />}
              </div>

              {/* Contact */}
              <Link
                href={`/${locale}/contact`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive('/contact') ? 'bg-[#1B2A4A] text-white' : 'text-[#4a4a4a] hover:bg-gray-50'
                }`}
              >
                {t('nav.contact')}
              </Link>

              {/* Bottom actions */}
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
                <div className="flex items-center gap-2">
                  <Link href={`/${locale}/auth`} className="p-2 text-[#4a4a4a]">
                    <User className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
