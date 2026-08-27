'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { Menu, X, Globe, ChevronDown, ChevronRight, ArrowRight, MessageCircle } from 'lucide-react';
import { locales, localeNames } from '@/i18n/config';

type MenuKey = 'products' | 'privateLabel' | 'oemOdm' | 'factory' | 'quality' | 'resources' | null;

const ALL_MENU_ITEMS: { key: NonNullable<MenuKey>; href: string }[] = [
  { key: 'products', href: '/products' },
  { key: 'privateLabel', href: '/private-label' },
  { key: 'oemOdm', href: '/customized-services' },
  { key: 'factory', href: '/factory' },
  { key: 'quality', href: '/quality' },
  { key: 'resources', href: '/resources' },
];

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('common');
  const tm = useTranslations('megaMenu');
  // locale is now passed as prop
  const pathname = usePathname();

  // ---- Progressive collapse state ----
  const [visibleCount, setVisibleCount] = useState(ALL_MENU_ITEMS.length); // default: all visible
  const [isMeasuring, setIsMeasuring] = useState(true); // hide menu during first measurement
  const capsuleRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const rafRef = useRef<number>(0);

  // ---- Existing state ----
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [panelLeft, setPanelLeft] = useState<number>(0);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [burgerExpanded, setBurgerExpanded] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const burgerAutoCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const isClickingRef = useRef(false);
  const rightFixedRef = useRef<HTMLDivElement>(null); // language + WhatsApp only (no burger)

  // Scroll listener — detect direction for hide-on-scroll-down / show-on-scroll-up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);

      // Always show at the very top
      if (currentY < 80) {
        setIsHidden(false);
      } else if (currentY > lastScrollY.current + 8) {
        // Scrolling down — hide
        setIsHidden(true);
        setActiveMenu(null);
        setIsPanelVisible(false);
      } else if (currentY < lastScrollY.current - 4) {
        // Scrolling up — show immediately
        setIsHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close panels
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (headerRef.current && !headerRef.current.contains(target)) {
        setActiveMenu(null);
        setIsPanelVisible(false);
        setIsLangMenuOpen(false);
        setIsBurgerOpen(false);
        setBurgerExpanded(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ---- Progressive Collapse: Measure & Calculate ----
  const calculateVisibleCount = useCallback(() => {
    const capsule = capsuleRef.current;
    if (!capsule) return ALL_MENU_ITEMS.length;

    const capsuleWidth = capsule.offsetWidth;
    const capsuleStyle = window.getComputedStyle(capsule);
    const paddingLeft = parseFloat(capsuleStyle.paddingLeft);
    const paddingRight = parseFloat(capsuleStyle.paddingRight);
    const availableWidth = capsuleWidth - paddingLeft - paddingRight;

    // Three-zone layout: left zone | logo (centered) | right zone
    const logoWidth = logoRef.current?.offsetWidth ?? 130;
    const rightWidth = rightFixedRef.current?.offsetWidth ?? 120;
    const burgerWidth = 44;

    const halfWidth = (availableWidth - logoWidth) / 2;

    // Check mobile mode
    const mobileThreshold = rightWidth + burgerWidth + 16;
    if (halfWidth < mobileThreshold + 40) {
      return 0;
    }

    // Available width for left menu items
    const leftAvailable = halfWidth - 4;

    if (leftAvailable <= 0) return 0;

    // Measure each item width
    const itemWidths: number[] = [];
    for (let i = 0; i < ALL_MENU_ITEMS.length; i++) {
      const el = itemRefs.current[i];
      itemWidths.push(el?.offsetWidth ?? 75);
    }

    let totalWidth = 0;
    let count = 0;
    const itemGap = 2; // gap-0.5
    for (let i = 0; i < itemWidths.length; i++) {
      if (totalWidth + itemWidths[i] + (count > 0 ? itemGap : 0) <= leftAvailable) {
        totalWidth += itemWidths[i] + (count > 0 ? itemGap : 0);
        count++;
      } else {
        break;
      }
    }

    return count;
  }, []);

  // Run measurement after render
  useLayoutEffect(() => {
    const measure = () => {
      const count = calculateVisibleCount();
      setVisibleCount(count);
      setIsMeasuring(false);
    };

    // Initial measurement
    measure();

    // Observe container resize
    const capsule = capsuleRef.current;
    if (!capsule) return;

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setIsMeasuring(true);
        requestAnimationFrame(() => {
          measure();
        });
      });
    });

    observer.observe(capsule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [calculateVisibleCount, locale]); // re-measure when locale changes

  // ---- Menu handlers ----
  const handleMenuEnter = useCallback((key: MenuKey) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(key);
    // Calculate panel position based on the button's position
    const itemIndex = ALL_MENU_ITEMS.findIndex(item => item.key === key);
    const itemEl = itemIndex >= 0 ? itemRefs.current[itemIndex] : null;
    if (itemEl) {
      const rect = itemEl.getBoundingClientRect();
      setPanelLeft(rect.left);
    }
    requestAnimationFrame(() => setIsPanelVisible(true));
  }, []);

  const handleMenuLeave = useCallback(() => {
    if (isClickingRef.current) return;
    closeTimeoutRef.current = setTimeout(() => {
      setIsPanelVisible(false);
      setTimeout(() => setActiveMenu(null), 200);
    }, 1000);
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

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  const isActive = (href: string) => {
    if (href === '/') return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(`/${locale}${href}`);
  };

  // ---- Sub-link data ----
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
    { name: tm('prodLines'), href: '/factory' },
    { name: tm('rdCenter'), href: '/factory' },
    { name: tm('qc'), href: '/factory' },
  ];

  const qualityLinks = [
    { name: tm('certs'), href: '/quality' },
    { name: tm('testing'), href: '/quality' },
    { name: tm('qualitySys'), href: '/quality' },
  ];

  const resourcesLinks = [
    { name: tm('solutions'), href: '/news?cat=solutions' },
    { name: tm('blog'), href: '/news?cat=blog' },
    { name: tm('faq'), href: '/news?cat=faq' },
  ];

  const getSubLinks = (key: NonNullable<MenuKey>) => {
    switch (key) {
      case 'products': return [{ name: tm('allProducts'), href: '/products' }, { name: tm('toothpaste'), href: '/products?cat=toothpaste' }, { name: tm('mouthwash'), href: '/products?cat=mouthwash' }, { name: tm('toothPowder'), href: '/products?cat=tooth-powder' }, { name: tm('toothbrush'), href: '/products?cat=toothbrush' }];
      case 'privateLabel': return privateLabelLinks;
      case 'oemOdm': return oemOdmLinks;
      case 'factory': return factoryLinks;
      case 'quality': return qualityLinks;
      case 'resources': return resourcesLinks;
    }
  };

  // ---- Panel mouse handlers ----
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
      }, 1000);
    },
  };

  // ---- Mega Menu Panels ----
  const renderProductsPanel = () => (
    <div
      className="absolute top-full pt-3 z-50 pointer-events-auto"
      style={{ left: panelLeft, width: 'min(680px, calc(100vw - 2rem))' }}
      {...panelMouseHandlers}
    >
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-100/80 p-6 transition-all duration-200 ${isPanelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
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
              <img src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
    <div
      className="absolute top-full pt-3 z-50 pointer-events-auto"
      style={{ left: panelLeft, width: imageCard ? 'min(680px, calc(100vw - 2rem))' : 'min(400px, calc(100vw - 2rem))' }}
      {...panelMouseHandlers}
    >
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-100/80 p-6 transition-all duration-200 ${isPanelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
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

  // ---- Derived state ----
  const visibleItems = ALL_MENU_ITEMS.slice(0, visibleCount);
  const overflowItems = ALL_MENU_ITEMS.slice(visibleCount);
  const hasOverflow = overflowItems.length > 0;
  const isMobileMode = visibleCount === 0; // All items collapsed

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 md:fixed md:left-0 md:right-0 md:z-50 md:pointer-events-none md:transition-transform md:duration-300 md:ease-out ${
        isHidden ? 'md:-translate-y-full' : 'md:translate-y-0'
      }`}
    >
      <div className="mx-auto w-[97%] max-w-[1700px] px-2 md:px-6 pt-4 md:pt-6 pointer-events-auto">
        <div
          ref={capsuleRef}
          className={`flex items-center h-14 md:h-[72px] px-5 md:px-7 relative w-full rounded-full border backdrop-blur-2xl transition-all duration-300
            ${isScrolled
              ? 'bg-white/90 border-slate-200/70 shadow-[0_10px_35px_rgba(15,23,42,0.12)]'
              : isHome
                ? 'bg-white/55 border-white/50 shadow-[0_12px_40px_rgba(15,23,42,0.15)]'
                : 'bg-white/80 border-slate-200/60 shadow-[0_10px_32px_rgba(15,23,42,0.10)]'
            }`}
        >
          {/* Left zone: visible menu items */}
          {isMobileMode ? (
            <Link
              ref={logoRef}
              href={`/${locale}`}
              className="flex-shrink-0 z-10"
            >
              <span className="text-[19px] font-extrabold tracking-tight text-[#173A63] whitespace-nowrap">{t('nav.brand')}</span>
            </Link>
          ) : (
            <div className="flex items-center gap-0.5 flex-1 min-w-0 justify-start overflow-visible">
              {isMeasuring ? (
                <div className="invisible absolute pointer-events-none">
                  {ALL_MENU_ITEMS.map(({ key, href }, i) => {
                    const active = isActive(href);
                    return (
                      <div
                        key={key}
                        ref={el => { itemRefs.current[i] = el; }}
                        className="inline-block"
                      >
                        <span className={`flex items-center gap-1 px-3 py-2.5 text-[13.5px] font-medium rounded-full whitespace-nowrap ${active ? 'text-[#008FD5]' : 'text-[#173A63]'}`}>
                          {t(`nav.${key}`)}
                          <ChevronDown className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                visibleItems.map(({ key, href }, i) => {
                  const active = isActive(href);
                  return (
                    <div
                      key={key}
                      ref={el => { itemRefs.current[i] = el; }}
                      className="relative"
                      onMouseEnter={() => handleMenuEnter(key)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <Link
                        href={`/${locale}${href}`}
                        className={`flex items-center gap-1 px-3 py-2.5 text-[13.5px] font-medium rounded-full transition-all whitespace-nowrap ${active ? 'text-[#008FD5]' : 'text-[#173A63] hover:text-[#008FD5] hover:bg-gray-100/60'}`}
                      >
                        {t(`nav.${key}`)}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === key ? 'rotate-180' : ''}`} />
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Center: Logo absolutely centered (desktop only) */}
          {!isMobileMode && (
            <Link
              ref={logoRef}
              href={`/${locale}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex-shrink-0"
            >
              <span className="text-[19px] font-extrabold tracking-tight text-[#173A63] whitespace-nowrap">{t('nav.brand')}</span>
            </Link>
          )}

          {/* Right zone: Language + WhatsApp + Burger */}
          <div className="flex items-center gap-0.5 flex-1 justify-end flex-shrink-0">
            <div ref={rightFixedRef} className="flex items-center gap-0.5">
              <div
                className="relative"
                onMouseEnter={handleLangEnter}
                onMouseLeave={handleLangLeave}
              >
                <button className="p-2.5 text-[#173A63]/70 hover:text-[#008FD5] rounded-full hover:bg-gray-100/60 transition-colors">
                  <Globe className="w-[19px] h-[19px]" />
                </button>
                {isLangMenuOpen && (
                  <div className="absolute right-0 top-full pt-2 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100/80 p-2 min-w-[160px]">
                      {locales.map(l => (
                        <button
                          key={l}
                          onClick={() => { switchLocale(l); setIsLangMenuOpen(false); }}
                          className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${l === locale ? 'bg-[#008FD5]/10 text-[#008FD5]' : 'text-[#173A63] hover:bg-gray-50'}`}
                        >
                          <span>{localeNames[l]?.name}</span>
                          {l === locale && <span className="text-[#008FD5]">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* WhatsApp Button - hidden in mobile mode (goes into burger menu) */}
              {!isMobileMode && (
                <a
                  href="https://wa.me/8613800138000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-[#21C96B] text-white text-[13px] font-semibold rounded-full hover:bg-[#1DB95E] transition-colors"
                >
                  <MessageCircle className="w-[18px] h-[18px]" />
                  <span className="hidden xl:inline">WhatsApp</span>
                </a>
              )}
            </div>

            {/* Hamburger Button - always shown in mobile mode, or when there are overflow items */}
            {(isMobileMode || hasOverflow) && (
              <button
                className="p-2.5 text-[#173A63] rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => {
                  const next = !isBurgerOpen;
                  setIsBurgerOpen(next);
                  setBurgerExpanded(null);
                  // Always reset timer on every click
                  if (burgerAutoCloseRef.current) {
                    clearTimeout(burgerAutoCloseRef.current);
                    burgerAutoCloseRef.current = null;
                  }
                  // Start auto-close timer when opening
                  if (next) {
                    burgerAutoCloseRef.current = setTimeout(() => {
                      setIsBurgerOpen(false);
                      setBurgerExpanded(null);
                    }, 4500);
                  }
                }}
                aria-label="Toggle menu"
              >
                {isBurgerOpen ? <X className="w-[22px] h-[22px]" /> : <Menu className="w-[22px] h-[22px]" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mega Menu Panels - rendered outside container for full-viewport positioning */}
      {renderMegaMenuPanel()}

      {/* Burger Dropdown - overflow items (or all items in mobile mode) */}
      {isBurgerOpen && (isMobileMode || hasOverflow) && (
        <div
          className={`absolute top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100/80 z-50 pointer-events-auto ${isMobileMode ? 'left-4 right-4 max-h-[80vh] overflow-y-auto' : 'right-4 w-[280px] max-h-[70vh] overflow-y-auto'}`}
          onMouseEnter={() => {
            if (burgerAutoCloseRef.current) {
              clearTimeout(burgerAutoCloseRef.current);
              burgerAutoCloseRef.current = null;
            }
          }}
          onMouseLeave={() => {
            burgerAutoCloseRef.current = setTimeout(() => {
              setIsBurgerOpen(false);
              setBurgerExpanded(null);
            }, 4500);
          }}
        >
          <div className={`${isMobileMode ? 'p-4' : 'p-4'}`}>
            <div className="space-y-1">
              {(isMobileMode ? ALL_MENU_ITEMS : overflowItems).map(({ key, href }) => {
                const active = isActive(href);
                const isExpanded = burgerExpanded === key;
                const subLinks = getSubLinks(key);

                return (
                  <div key={key}>
                    {subLinks.length > 0 ? (
                      <>
                        {/* Parent item: text links to page, chevron toggles submenu */}
                        <div
                          className={`flex items-center justify-between gap-2 rounded-xl text-sm font-medium transition-colors min-h-[48px] relative z-10 ${active ? 'bg-[#008FD5]/10 text-[#008FD5]' : 'text-[#173A63] hover:bg-gray-50'}`}
                        >
                          <Link
                            href={`/${locale}${href}`}
                            className="flex-1 px-4 py-3 rounded-xl cursor-pointer"
                            onClick={() => { setIsBurgerOpen(false); setBurgerExpanded(null); }}
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                          >
                            <span className="pointer-events-none">{t(`nav.${key}`)}</span>
                          </Link>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setBurgerExpanded(isExpanded ? null : key);
                              if (burgerAutoCloseRef.current) {
                                clearTimeout(burgerAutoCloseRef.current);
                              }
                              burgerAutoCloseRef.current = setTimeout(() => {
                                setIsBurgerOpen(false);
                                setBurgerExpanded(null);
                              }, 4500);
                            }}
                            className="px-4 py-3 flex items-center justify-center rounded-r-xl cursor-pointer hover:bg-black/5"
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                            aria-label={isExpanded ? 'Collapse submenu' : 'Expand submenu'}
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 pointer-events-none ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                        {isExpanded && (
                          <div className="pl-4 pb-2 space-y-0.5">
                            {subLinks.map((l, i) => (
                              <Link
                                key={i}
                                href={`/${locale}${l.href}`}
                                className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#008FD5] rounded-lg hover:bg-gray-50 min-h-[44px] flex items-center"
                                onClick={() => { setIsBurgerOpen(false); setBurgerExpanded(null); }}
                              >
                                {l.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      /* Item without sub-links: simple link */
                      <Link
                        href={`/${locale}${href}`}
                        className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[48px] ${active ? 'bg-[#008FD5]/10 text-[#008FD5]' : 'text-[#173A63] hover:bg-gray-50'}`}
                        onClick={() => { setIsBurgerOpen(false); setBurgerExpanded(null); }}
                      >
                        {t(`nav.${key}`)}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* WhatsApp button at bottom in mobile mode */}
            {isMobileMode && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                <a
                  href="https://wa.me/8613800138000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#21C96B] text-white text-sm font-semibold rounded-xl hover:bg-[#1DB95E] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
