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
  const langCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (headerRef.current && !headerRef.current.contains(target)) {
        setActiveMenu(null);
        setIsPanelVisible(false);
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuEnter = useCallback((key: MenuKey) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(key);
    requestAnimationFrame(() => setIsPanelVisible(true));
  }, []);

  const handleMenuLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsPanelVisible(false);
      setTimeout(() => setActiveMenu(null), 200);
    }, 300);
  }, []);

  const handleLangEnter = useCallback(() => {
    if (langCloseTimeoutRef.current) {
      clearTimeout(langCloseTimeoutRef.current);
      langCloseTimeoutRef.current = null;
    }
    setIsLangMenuOpen(true);
  }, []);

  const handleLangLeave = useCallback(() => {
    langCloseTimeoutRef.current = setTimeout(() => {
      setIsLangMenuOpen(false);
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

  // Industry/application links for mega menu
  const industryLinks = [
    { name: tm('appAutomotive'), href: '/products?industry=automotive' },
    { name: tm('appAerospace'), href: '/products?industry=aerospace' },
    { name: tm('appMedical'), href: '/products?industry=medical' },
    { name: tm('appEnergy'), href: '/products?industry=energy' },
    { name: tm('appConsumer'), href: '/products?industry=consumer' },
  ];

  // Custom services for mega menu
  const customServices = [
    { name: tm('serviceOem'), href: '/custom#oem' },
    { name: tm('serviceOdm'), href: '/custom#odm' },
    { name: tm('servicePrivateLabel'), href: '/custom#private-label' },
    { name: tm('servicePackaging'), href: '/custom#packaging' },
    { name: tm('serviceSample'), href: '/custom#sample' },
  ];

  // About links
  const aboutLinks = [
    { name: tm('aboutProfile'), href: '/about#profile' },
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
  const renderProductsPanel = () => (
    <div className="absolute left-0 right-0 top-full pt-3 px-4 z-50">
      <div className={`max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100/80 p-8 transition-all duration-200 ${isPanelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <div className="grid grid-cols-12 gap-8">
          {/* Left: Categories */}
          <div className="col-span-4">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{tm('productCategories')}</p>
            <ul className="space-y-1">
              <li><Link href={`/${locale}/products`} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 hover:text-[#E8720C] transition-colors group"><span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#E8720C] transition-colors" />{tm('allProducts')}</Link></li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link href={`/${locale}/products?cat=${cat.id}`} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 hover:text-[#E8720C] transition-colors group">
                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#E8720C] transition-colors" />
                    {getI18nValue(cat.i18n, locale, 'categoryName')}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link href={`/${locale}/products`} className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1B2A4A] text-white text-sm font-semibold rounded-full hover:bg-[#2D4A7A] transition-colors">
                {tm('viewAllProducts')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          {/* Middle: By Industry */}
          <div className="col-span-3">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{tm('byIndustry')}</p>
            <ul className="space-y-1">
              {industryLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 hover:text-[#E8720C] transition-colors group">
                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#E8720C] transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Right: Image Cards */}
          <div className="col-span-5 flex flex-col gap-4">
            <Link href={`/${locale}/custom`} className="group relative rounded-2xl overflow-hidden h-36 block">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A4A]/85 to-[#1B2A4A]/40 z-10" />
              <div className="relative z-20 h-full flex flex-col justify-between p-5">
                <div className="self-end w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors"><ArrowRight className="w-4 h-4 text-white" /></div>
                <div>
                  <p className="text-white font-bold text-lg">{tm('customMfg')}</p>
                  <p className="text-white/70 text-sm mt-0.5">{tm('customMfgDesc')}</p>
                </div>
              </div>
            </Link>
            <Link href={`/${locale}/products`} className="group relative rounded-2xl overflow-hidden h-36 block">
              <img src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A4A]/85 to-[#1B2A4A]/40 z-10" />
              <div className="relative z-20 h-full flex flex-col justify-between p-5">
                <div className="self-end w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors"><ArrowRight className="w-4 h-4 text-white" /></div>
                <div>
                  <p className="text-white font-bold text-lg">{tm('featuredProducts')}</p>
                  <p className="text-white/70 text-sm mt-0.5">{tm('featuredProductsDesc')}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomPanel = () => (
    <div className="absolute left-0 right-0 top-full pt-3 px-4 z-50">
      <div className={`max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100/80 p-8 transition-all duration-200 ${isPanelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-5">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">{tm('ourServices')}</p>
            <ul className="space-y-1">
              {customServices.map((s, i) => (
                <li key={i}>
                  <Link href={s.href} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 hover:text-[#E8720C] transition-colors group">
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#E8720C] transition-colors" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link href={`/${locale}/custom`} className="inline-flex items-center gap-2 px-8 py-3 bg-[#1B2A4A] text-white font-semibold rounded-full hover:bg-[#2D4A7A] transition-colors text-sm">
                {t('nav.custom')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="col-span-7">
            <div className="relative rounded-2xl overflow-hidden h-72">
              <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800" alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/80 via-transparent to-transparent z-10" />
              <div className="relative z-20 h-full flex flex-col justify-end p-8">
                <p className="text-white font-bold text-2xl mb-2">{tm('trustedPartner')}</p>
                <p className="text-white/80 text-sm mb-4 max-w-sm">{tm('customMfgDesc')}</p>
                <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#1B2A4A] font-semibold rounded-full hover:bg-gray-100 transition-colors text-sm w-fit">
                  {tm('getQuote')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSimpleDropdown = (links: { name: string; href: string }[]) => (
    <div className="absolute left-0 right-0 top-full pt-3 px-4 z-50">
      <div className={`max-w-xs mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100/80 p-3 transition-all duration-200 ${isPanelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <ul className="space-y-0.5">
          {links.map((link, i) => (
            <li key={i}>
              <Link href={link.href} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-[#1B2A4A] hover:bg-gray-50 hover:text-[#E8720C] transition-colors">
                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderMegaMenuPanel = () => {
    if (!activeMenu) return null;
    switch (activeMenu) {
      case 'products': return renderProductsPanel();
      case 'custom': return renderCustomPanel();
      case 'about': return renderSimpleDropdown(aboutLinks);
      case 'news': return renderSimpleDropdown(newsLinks);
      default: return null;
    }
  };

  return (
    <header ref={headerRef} className="fixed top-3 left-0 right-0 z-50">
      {/* Single Pill Capsule */}
      <div className={`max-w-6xl mx-auto px-6 transition-all duration-300 ${isScrolled ? 'shadow-xl' : 'shadow-md'}`}>
        <div className={`flex items-center justify-between h-14 rounded-full px-6 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl' : 'bg-white/85 backdrop-blur-xl'}`}>
          {/* Left: Menu Items */}
          <div className="flex items-center gap-1 flex-1">
            {(['products', 'custom', 'about', 'news'] as MenuKey[]).map(key => {
              const href = key === 'products' ? '/products' : key === 'custom' ? '/custom' : key === 'about' ? '/about' : '/news';
              const active = isActive(href);
              return (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => handleMenuEnter(key)}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link
                    href={`/${locale}${href}`}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${active ? 'text-[#E8720C]' : 'text-[#1B2A4A] hover:text-[#E8720C] hover:bg-gray-100/60'}`}
                  >
                    {t(`nav.${key}`)}
                    {(key === 'products' || key === 'custom' || key === 'about' || key === 'news') && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === key ? 'rotate-180' : ''}`} />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Center: Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0 mx-4">
            <span className="text-xl font-extrabold tracking-tight text-[#1B2A4A]">{t('nav.brand')}</span>
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center gap-1 flex-1 justify-end">
            {/* Language Selector - hover based */}
            <div
              className="relative"
              onMouseEnter={handleLangEnter}
              onMouseLeave={handleLangLeave}
            >
              <button className="p-2.5 text-[#1B2A4A]/70 hover:text-[#E8720C] rounded-full hover:bg-gray-100/60 transition-colors">
                <Globe className="w-[18px] h-[18px]" />
              </button>
              {/* Dropdown */}
              {isLangMenuOpen && (
                <div className="absolute right-0 top-full pt-2 z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100/80 p-2 min-w-[160px]">
                    {locales.map(l => (
                      <button
                        key={l}
                        onClick={() => { switchLocale(l); setIsLangMenuOpen(false); }}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${l === locale ? 'bg-[#E8720C]/10 text-[#E8720C]' : 'text-[#1B2A4A] hover:bg-gray-50'}`}
                      >
                        <span className="text-base">{localeNames[l]?.flag}</span>
                        <span>{localeNames[l]?.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href={`/${locale}/contact`} className="p-2.5 text-[#1B2A4A]/70 hover:text-[#E8720C] rounded-full hover:bg-gray-100/60 transition-colors hidden lg:flex">
              <Search className="w-[18px] h-[18px]" />
            </Link>
            <Link href={`/${locale}/auth`} className="p-2.5 text-[#1B2A4A]/70 hover:text-[#E8720C] rounded-full hover:bg-gray-100/60 transition-colors hidden lg:flex">
              <User className="w-[18px] h-[18px]" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2.5 text-[#1B2A4A] rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mega Menu Panels - rendered inside header for positioning */}
        {renderMegaMenuPanel()}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100/80 p-4 max-h-[70vh] overflow-y-auto">
          {/* Mobile menu items */}
          <div className="space-y-1">
            {(['products', 'custom', 'about', 'news'] as MenuKey[]).map(key => {
              const href = key === 'products' ? '/products' : key === 'custom' ? '/custom' : key === 'about' ? '/about' : '/news';
              const active = isActive(href);
              const isExpanded = mobileExpanded === key;
              const hasSubmenu = key === 'products' || key === 'custom' || key === 'about' || key === 'news';

              return (
                <div key={key}>
                  <div className="flex items-center">
                    <Link
                      href={`/${locale}${href}`}
                      className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${active ? 'bg-[#E8720C]/10 text-[#E8720C]' : 'text-[#1B2A4A] hover:bg-gray-50'}`}
                      onClick={() => !hasSubmenu && setIsMobileMenuOpen(false)}
                    >
                      {t(`nav.${key}`)}
                    </Link>
                    {hasSubmenu && (
                      <button
                        onClick={() => setMobileExpanded(isExpanded ? null : key ?? null)}
                        className="p-2 text-gray-400 hover:text-[#1B2A4A] transition-colors"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  {/* Accordion content */}
                  {isExpanded && key === 'products' && (
                    <div className="pl-4 pb-2 space-y-0.5">
                      <Link href={`/${locale}/products`} className="block px-4 py-2 text-sm text-gray-600 hover:text-[#E8720C] rounded-lg hover:bg-gray-50">{tm('allProducts')}</Link>
                      {categories.map(cat => (
                        <Link key={cat.id} href={`/${locale}/products?cat=${cat.id}`} className="block px-4 py-2 text-sm text-gray-600 hover:text-[#E8720C] rounded-lg hover:bg-gray-50">{getI18nValue(cat.i18n, locale, 'categoryName')}</Link>
                      ))}
                    </div>
                  )}
                  {isExpanded && key === 'custom' && (
                    <div className="pl-4 pb-2 space-y-0.5">
                      {customServices.map((s, i) => <Link key={i} href={s.href} className="block px-4 py-2 text-sm text-gray-600 hover:text-[#E8720C] rounded-lg hover:bg-gray-50">{s.name}</Link>)}
                    </div>
                  )}
                  {isExpanded && key === 'about' && (
                    <div className="pl-4 pb-2 space-y-0.5">
                      {aboutLinks.map((l, i) => <Link key={i} href={l.href} className="block px-4 py-2 text-sm text-gray-600 hover:text-[#E8720C] rounded-lg hover:bg-gray-50">{l.name}</Link>)}
                    </div>
                  )}
                  {isExpanded && key === 'news' && (
                    <div className="pl-4 pb-2 space-y-0.5">
                      {newsLinks.map((l, i) => <Link key={i} href={l.href} className="block px-4 py-2 text-sm text-gray-600 hover:text-[#E8720C] rounded-lg hover:bg-gray-50">{l.name}</Link>)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between px-4">
            <div className="flex gap-2">
              <Link href={`/${locale}/contact`} className="p-2 text-gray-500 hover:text-[#E8720C] transition-colors"><Search className="w-5 h-5" /></Link>
              <Link href={`/${locale}/auth`} className="p-2 text-gray-500 hover:text-[#E8720C] transition-colors"><User className="w-5 h-5" /></Link>
            </div>
            <div className="flex gap-1">
              {locales.map(l => (
                <button key={l} onClick={() => { switchLocale(l); setIsMobileMenuOpen(false); }} className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${l === locale ? 'bg-[#E8720C] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                  {localeNames[l]?.flag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
