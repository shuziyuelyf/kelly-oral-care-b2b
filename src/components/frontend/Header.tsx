'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, Globe, ChevronDown, ChevronRight, ArrowRight, MessageCircle } from 'lucide-react';
import { locales, localeNames } from '@/i18n/config';
import { mockCategories } from '@/lib/mock/data';
import { getI18nValue } from '@/lib/utils-i18n';

type MenuKey = 'products' | 'privateLabel' | 'oemOdm' | 'factory' | 'quality' | 'resources' | null;

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
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const isClickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    if (isClickingRef.current) return;
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

  const categories = mockCategories.filter(c => c.status === 1);

  // ============ MENU LINK DATA ============
  const privateLabelLinks = [
    { name: tm('plWhy'), href: '/private-label#why' },
    { name: tm('plStartup'), href: '/private-label#packages' },
    { name: tm('plSampleMoq'), href: '/private-label#sample' },
    { name: tm('plFaq'), href: '/private-label#faq' },
  ];

  const oemOdmLinks = [
    { name: tm('oemMfg'), href: '/customized-services#oem' },
    { name: tm('odmDev'), href: '/customized-services#odm' },
    { name: tm('advCustom'), href: '/customized-services#advanced' },
    { name: tm('sampleMoq'), href: '/customized-services#sample' },
  ];

  const factoryLinks = [
    { name: tm('prodLines'), href: '/about#production-lines' },
    { name: tm('rdCenter'), href: '/about#rd-center' },
    { name: tm('qc'), href: '/about#quality-control' },
  ];

  const qualityLinks = [
    { name: tm('certs'), href: '/about#certificates' },
    { name: tm('testing'), href: '/about#testing' },
    { name: tm('qualitySys'), href: '/about#quality-system' },
  ];

  const resourcesLinks = [
    { name: tm('solutions'), href: '/news?cat=solutions' },
    { name: tm('blog'), href: '/news?cat=blog' },
    { name: tm('faq'), href: '/news?cat=faq' },
  ];

  // ============ PANEL MOUSE HANDLERS ============
  const panelMouseHandlers = {
    onMouseEnter: () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    },
    onMouseLeave: () => {
      closeTimeoutRef.current = setTimeout(() => {
        setIsPanelVisible(false);
        setTimeout(() => setActiveMenu(null), 200);
      }, 300);
    },
  };

  // ============ MEGA MENU PANELS ============
  const renderProductsPanel = () => (
    <div className="absolute left-0 right-0 top-full pt-3 px-4 z-50" {...panelMouseHandlers}>
      <div className={`max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100/80 p-6 transition-all duration-200 ${isPanelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">{tm('productCategories')}</p>
            <ul className="space-y-0.5">
              <li>
                <Link href={`/${locale}/products`} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#173A63] hover:bg-[#EAF7FD] hover:text-[#008FD5] transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                  {tm('allProducts')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products?cat=toothpaste`} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#173A63] hover:bg-[#EAF7FD] hover:text-[#008FD5] transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                  {tm('toothpaste')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products?cat=mouthwash`} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#173A63] hover:bg-[#EAF7FD] hover:text-[#008FD5] transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                  {tm('mouthwash')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products?cat=tooth-powder`} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#173A63] hover:bg-[#EAF7FD] hover:text-[#008FD5] transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                  {tm('toothPowder')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products?cat=toothbrush`} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#173A63] hover:bg-[#EAF7FD] hover:text-[#008FD5] transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                  {tm('toothbrush')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-5">
            <Link href={`/${locale}/products`} className="group relative rounded-xl overflow-hidden h-44 block">
              <img src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#173A63]/80 to-[#173A63]/30 z-10" />
              <div className="relative z-20 h-full flex flex-col justify-end p-5">
                <p className="text-white font-bold text-lg">{tm('browseAllOralCare')}</p>
                <p className="text-white/70 text-sm mt-1">{tm('browseAllDesc')}</p>
                <span className="inline-flex items-center gap-1 mt-3 text-white text-sm font-medium">
                  {tm('viewAllProducts')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSimplePanel = (links: { name: string; href: string }[], imageCard?: { title: string; desc: string; href: string; image: string }) => (
    <div className="absolute left-0 right-0 top-full pt-3 px-4 z-50" {...panelMouseHandlers}>
      <div className={`max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100/80 p-6 transition-all duration-200 ${isPanelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <div className="grid grid-cols-12 gap-6">
          <div className={imageCard ? 'col-span-7' : 'col-span-12'}>
            <ul className="space-y-0.5">
              {links.map((link, i) => (
                <li key={i}>
                  <Link href={`/${locale}${link.href}`} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#173A63] hover:bg-[#EAF7FD] hover:text-[#008FD5] transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {imageCard && (
            <div className="col-span-5">
              <Link href={`/${locale}${imageCard.href}`} className="group relative rounded-xl overflow-hidden h-40 block">
                <img src={imageCard.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#173A63]/80 to-[#173A63]/30 z-10" />
                <div className="relative z-20 h-full flex flex-col justify-end p-4">
                  <p className="text-white font-bold text-base">{imageCard.title}</p>
                  <p className="text-white/70 text-sm mt-1">{imageCard.desc}</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMegaMenuPanel = () => {
    if (!activeMenu) return null;
    switch (activeMenu) {
      case 'products': return renderProductsPanel();
      case 'privateLabel': return renderSimplePanel(privateLabelLinks, {
        title: tm('plPanelTitle'),
        desc: tm('plPanelDesc'),
        href: '/private-label',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600',
      });
      case 'oemOdm': return renderSimplePanel(oemOdmLinks, {
        title: tm('oemPanelTitle'),
        desc: tm('oemPanelDesc'),
        href: '/customized-services',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
      });
      case 'factory': return renderSimplePanel(factoryLinks);
      case 'quality': return renderSimplePanel(qualityLinks);
      case 'resources': return renderSimplePanel(resourcesLinks);
      default: return null;
    }
  };

  // Menu items config
  const menuItems: { key: NonNullable<MenuKey>; href: string }[] = [
    { key: 'products', href: '/products' },
    { key: 'privateLabel', href: '/private-label' },
    { key: 'oemOdm', href: '/customized-services' },
    { key: 'factory', href: '/about#factory' },
    { key: 'quality', href: '/about#quality' },
    { key: 'resources', href: '/news' },
  ];

  return (
    <header ref={headerRef} className="fixed top-3 left-0 right-0 z-50">
      {/* Single Pill Capsule */}
      <div className="max-w-6xl mx-auto px-4">
        <div className={`flex items-center justify-between h-14 rounded-full px-4 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-xl' : 'bg-white/85 backdrop-blur-xl shadow-md'}`}>
          {/* Left: Menu Items */}
          <div className="flex items-center gap-0.5 flex-1">
            {menuItems.map(({ key, href }) => {
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
                    className={`flex items-center gap-1 px-3 py-2 text-[13px] font-medium rounded-full transition-all whitespace-nowrap ${active ? 'text-[#008FD5]' : 'text-[#173A63] hover:text-[#008FD5] hover:bg-gray-100/60'}`}
                  >
                    {t(`nav.${key}`)}
                    <ChevronDown className={`w-3 h-3 transition-transform ${activeMenu === key ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Center: Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0 mx-3">
            <span className="text-lg font-extrabold tracking-tight text-[#173A63] whitespace-nowrap">{t('nav.brand')}</span>
          </Link>

          {/* Right: Language + WhatsApp */}
          <div className="flex items-center gap-0.5 flex-1 justify-end">
            {/* Language Selector */}
            <div
              className="relative"
              onMouseEnter={handleLangEnter}
              onMouseLeave={handleLangLeave}
            >
              <button className="p-2 text-[#173A63]/70 hover:text-[#008FD5] rounded-full hover:bg-gray-100/60 transition-colors">
                <Globe className="w-[18px] h-[18px]" />
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 top-full pt-2 z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100/80 p-2 min-w-[160px]">
                    {locales.map(l => (
                      <button
                        key={l}
                        onClick={() => { switchLocale(l); setIsLangMenuOpen(false); }}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${l === locale ? 'bg-[#008FD5]/10 text-[#008FD5]' : 'text-[#173A63] hover:bg-gray-50'}`}
                      >
                        <span className="text-base">{localeNames[l]?.flag}</span>
                        <span>{localeNames[l]?.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/8613800138000"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#21C96B] text-white text-xs font-semibold rounded-full hover:bg-[#1DB95E] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-[#173A63] rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mega Menu Panels */}
        {renderMegaMenuPanel()}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100/80 p-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map(({ key, href }) => {
              const active = isActive(href);
              const isExpanded = mobileExpanded === key;
              const subLinks = key === 'products' ? [{ name: tm('allProducts'), href: '/products' }, { name: tm('toothpaste'), href: '/products?cat=toothpaste' }, { name: tm('mouthwash'), href: '/products?cat=mouthwash' }, { name: tm('toothPowder'), href: '/products?cat=tooth-powder' }, { name: tm('toothbrush'), href: '/products?cat=toothbrush' }]
                : key === 'privateLabel' ? privateLabelLinks
                : key === 'oemOdm' ? oemOdmLinks
                : key === 'factory' ? factoryLinks
                : key === 'quality' ? qualityLinks
                : resourcesLinks;

              return (
                <div key={key}>
                  <div className="flex items-center">
                    <Link
                      href={`/${locale}${href}`}
                      className={`flex-1 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${active ? 'bg-[#008FD5]/10 text-[#008FD5]' : 'text-[#173A63] hover:bg-gray-50'}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(`nav.${key}`)}
                    </Link>
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : key)}
                      className="p-2 text-gray-400 hover:text-[#173A63] transition-colors"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="pl-4 pb-2 space-y-0.5">
                      {subLinks.map((l, i) => (
                        <Link key={i} href={`/${locale}${l.href}`} className="block px-4 py-2 text-sm text-gray-600 hover:text-[#008FD5] rounded-lg hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                          {l.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between px-4">
            <a
              href="https://wa.me/8613800138000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#21C96B] text-white text-sm font-semibold rounded-full hover:bg-[#1DB95E] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <div className="flex gap-1">
              {locales.map(l => (
                <button key={l} onClick={() => { switchLocale(l); setIsMobileMenuOpen(false); }} className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${l === locale ? 'bg-[#008FD5] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
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
