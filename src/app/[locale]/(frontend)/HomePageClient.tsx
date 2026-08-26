'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import HeroBanner from './HeroBanner';
import PartnerLogoWall from './PartnerLogoWall';
import FAQSection from './FAQSection';
import StatsCounter from './StatsCounter';

export default function HomePageClient({ locale }: { locale: string }) {
  const t = useTranslations('home');

  return (
    <div className="flex min-h-screen flex-col -mt-[68px]">
      {/* Section 1: Hero */}
      <HeroBanner />

      {/* Section 2: Three-Path Routing Module */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('pathsTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('pathsSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Path 1: Ready Products */}
            <div className="group relative bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-[#008FD5] hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#EAF7FD] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#008FD5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#173A63] mb-3">{t('readyTitle')}</h3>
              <p className="text-gray-500 mb-4">{t('readyDesc')}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {(t.raw('readyTags') as string[]).map((tag: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-[#EAF7FD] text-[#008FD5] text-xs font-medium rounded-full">{tag}</span>
                ))}
              </div>
              <Link href={`/${locale}/products`} onClick={() => trackEvent('home_path_click', { path: 'ready_products' })} className="inline-flex items-center gap-2 text-[#008FD5] font-semibold group-hover:gap-3 transition-all">
                {t('readyCta')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>

            {/* Path 2: Private Label (Most Popular) */}
            <div className="group relative bg-[#173A63] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute -top-3 right-6 bg-[#008FD5] text-white text-xs font-bold px-4 py-1 rounded-full">{t('plPathPopular')}</div>
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t('plPathTitle')}</h3>
              <p className="text-white/70 mb-4">{t('plPathDesc')}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {(t.raw('plPathTags') as string[]).map((tag: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full">{tag}</span>
                ))}
              </div>
              <Link href={`/${locale}/private-label`} onClick={() => trackEvent('home_path_click', { path: 'private_label' })} className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                {t('plPathCta')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>

            {/* Path 3: OEM/ODM */}
            <div className="group relative bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-[#173A63] hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-[#F7F4EF] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#173A63]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.658-3.283a1.5 1.5 0 01-.536-2.055l4.48-7.757a1.5 1.5 0 012.055-.536l5.658 3.283a1.5 1.5 0 01.536 2.055l-4.48 7.757a1.5 1.5 0 01-2.055.536z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.09 12.8l-1.94 3.36a1.5 1.5 0 00.536 2.055l5.658 3.283a1.5 1.5 0 002.055-.536l1.94-3.36" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#173A63] mb-3">{t('oemPathTitle')}</h3>
              <p className="text-gray-500 mb-4">{t('oemPathDesc')}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {(t.raw('oemPathTags') as string[]).map((tag: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-[#F7F4EF] text-[#173A63] text-xs font-medium rounded-full">{tag}</span>
                ))}
              </div>
              <Link href={`/${locale}/custom`} onClick={() => trackEvent('home_path_click', { path: 'oem_odm' })} className="inline-flex items-center gap-2 text-[#173A63] font-semibold group-hover:gap-3 transition-all">
                {t('oemPathCta')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Trust Bar */}
      <section className="py-10 bg-[#F7F4EF]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8 text-[#008FD5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="font-bold text-[#173A63]">{t('trustYears')}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8 text-[#008FD5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.54 0" /></svg>
              <span className="font-bold text-[#173A63]">{t('trustProjects')}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8 text-[#008FD5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              <span className="font-bold text-[#173A63]">{t('trustGmp')}</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8 text-[#008FD5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
              <span className="font-bold text-[#173A63]">{t('trustMarkets')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Featured Products */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('featuredTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('featuredDesc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { name: 'Whitening Toothpaste', img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=400&fit=crop', moq: '5,000', tag: 'Best Seller' },
              { name: 'Charcoal Toothpaste', img: 'https://images.unsplash.com/photo-1612538498456-e861df91d4d0?w=400&h=400&fit=crop', moq: '3,000', tag: 'Hot' },
              { name: 'Fresh Mouthwash', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop', moq: '10,000', tag: 'New' },
              { name: 'Bamboo Toothbrush', img: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop', moq: '10,000', tag: 'Eco' },
            ].map((product, i) => (
              <div key={i} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-square bg-gray-50 p-6 flex items-center justify-center overflow-hidden">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 bg-[#008FD5] text-white text-xs font-bold px-3 py-1 rounded-full">{product.tag}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[#173A63] mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{t('moq')}: {product.moq} pcs</p>
                  <div className="flex gap-2">
                    <Link href={`/${locale}/products`} onClick={() => trackEvent('product_view', { product_id: `prod-${i}`, category: 'oral-care' })} className="flex-1 text-center py-2 text-sm font-medium text-[#173A63] border border-[#173A63] rounded-full hover:bg-[#173A63] hover:text-white transition-colors">
                      {t('viewDetails')}
                    </Link>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { page: 'home', position: 'product_card' })} className="flex-1 text-center py-2 text-sm font-medium text-white bg-[#21C96B] rounded-full hover:bg-[#1db85e] transition-colors">
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href={`/${locale}/products`} className="inline-flex items-center gap-2 rounded-full bg-[#173A63] px-10 py-4 text-base font-semibold text-white hover:bg-[#1E4D7B] transition-colors">
              {t('viewAllProducts')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Start Your Own Brand (Private Label Promo) */}
      <section className="py-20 bg-[#EAF7FD]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[#008FD5] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">MOST POPULAR</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('plPromoTitle')}</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">{t('plPromoDesc')}</p>
              <Link href={`/${locale}/private-label`} className="inline-flex items-center gap-2 rounded-full bg-[#008FD5] px-10 py-4 text-base font-semibold text-white hover:bg-[#0070a8] transition-colors">
                {t('plPromoCta')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-[#EAF7FD] rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#008FD5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg>
                </div>
                <h4 className="font-semibold text-[#173A63] text-sm">Your Logo</h4>
                <p className="text-xs text-gray-400 mt-1">Print on products & packaging</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-[#EAF7FD] rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#008FD5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 01-3.182-.001L11 14.5" /></svg>
                </div>
                <h4 className="font-semibold text-[#173A63] text-sm">50+ Formulas</h4>
                <p className="text-xs text-gray-400 mt-1">Ready-to-use oral care formulas</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-[#EAF7FD] rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#008FD5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" /></svg>
                </div>
                <h4 className="font-semibold text-[#173A63] text-sm">Custom Packaging</h4>
                <p className="text-xs text-gray-400 mt-1">Tube, box, cap design</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-[#EAF7FD] rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#008FD5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h4 className="font-semibold text-[#173A63] text-sm">Fast Launch</h4>
                <p className="text-xs text-gray-400 mt-1">Ready in weeks, not months</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Full OEM/ODM Manufacturing */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-3 gap-3">
                {['R&D Lab', 'Production', 'QC Testing', 'Packaging', 'Shipping', 'Support'].map((item, i) => (
                  <div key={i} className="bg-[#F7F4EF] rounded-2xl p-4 text-center aspect-square flex flex-col items-center justify-center">
                    <div className="w-8 h-8 bg-[#173A63]/10 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-[#173A63] font-bold text-sm">{i + 1}</span>
                    </div>
                    <span className="text-xs font-medium text-[#173A63]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('oemSectionTitle')}</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">{t('oemSectionDesc')}</p>
              <div className="flex flex-wrap gap-4">
                <Link href={`/${locale}/custom`} className="inline-flex items-center gap-2 rounded-full bg-[#173A63] px-10 py-4 text-base font-semibold text-white hover:bg-[#1E4D7B] transition-colors">
                  {t('oemSectionCta')}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
                <Link href={`/${locale}/custom#advanced`} className="inline-flex items-center gap-2 rounded-full border-2 border-[#173A63] px-10 py-4 text-base font-semibold text-[#173A63] hover:bg-[#173A63] hover:text-white transition-colors">
                  {t('oemAdvancedCta')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Advanced Customization Preview */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('advCustomTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('advCustomDesc')}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {[
              { key: 'advTube', icon: '🧴' },
              { key: 'advCap', icon: '🔩' },
              { key: 'advBox', icon: '📦' },
              { key: 'advPrinting', icon: '🖨️' },
              { key: 'advFormula', icon: '🧪' },
              { key: 'advSize', icon: '📏' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{item.icon}</div>
                <span className="font-medium text-[#173A63] text-sm">{t(item.key as 'advTube' | 'advCap' | 'advBox' | 'advPrinting' | 'advFormula' | 'advSize')}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href={`/${locale}/custom`} className="inline-flex items-center gap-2 rounded-full bg-[#173A63] px-10 py-4 text-base font-semibold text-white hover:bg-[#1E4D7B] transition-colors">
              {t('advCustomCta')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 8: Factory & Quality */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('fqTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('fqDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="group relative overflow-hidden rounded-3xl aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee15e?w=600&h=450&fit=crop" alt="Factory" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173A63]/90 via-[#173A63]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{t('fqFactory')}</h3>
                <Link href={`/${locale}/factory`} className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  {t('fqFactoryCta')}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-3xl aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=450&fit=crop" alt="Quality" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173A63]/90 via-[#173A63]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{t('fqQc')}</h3>
                <Link href={`/${locale}/quality`} className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  {t('fqQualityCta')}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Final CTA */}
      <section className="py-20 bg-[#173A63]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('finalCtaTitle')}</h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">{t('finalCtaDesc')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact`} className="rounded-full bg-white px-10 py-4 text-base font-semibold text-[#173A63] hover:bg-white/90 transition-colors">
              {t('finalCtaPrimary')}
            </Link>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { page: 'home', position: 'final_cta' })} className="rounded-full bg-[#21C96B] px-10 py-4 text-base font-semibold text-white hover:bg-[#1db85e] transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {t('finalCtaWhatsapp')}
            </a>
          </div>
        </div>
      </section>

      {/* Section 10: Resources / Blog */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('resourcesTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('resourcesDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'How to Start Your Own Toothpaste Brand', excerpt: 'A complete guide to launching your oral care product line with private label manufacturing.', img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=250&fit=crop', tag: 'Private Label' },
              { title: 'OEM vs ODM: Which Is Right for You?', excerpt: 'Understanding the differences between OEM and ODM manufacturing for oral care products.', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee15e?w=400&h=250&fit=crop', tag: 'Manufacturing' },
              { title: 'Oral Care Market Trends 2026', excerpt: 'Key trends shaping the global oral care industry and opportunities for new entrants.', img: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=250&fit=crop', tag: 'Industry' },
            ].map((article, i) => (
              <div key={i} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-[#EAF7FD] text-[#008FD5] text-xs font-medium px-3 py-1 rounded-full mb-3">{article.tag}</span>
                  <h3 className="font-semibold text-[#173A63] mb-2 group-hover:text-[#008FD5] transition-colors">{article.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{article.excerpt}</p>
                  <Link href={`/${locale}/news`} className="text-sm font-medium text-[#008FD5] hover:underline">{t('readMore')} →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logo Wall */}
      <PartnerLogoWall />

      {/* FAQ */}
      <FAQSection />

      {/* Stats */}
      <StatsCounter />
    </div>
  );
}
