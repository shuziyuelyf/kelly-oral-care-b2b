'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Search, Grid3X3, List, ArrowRight } from 'lucide-react';
import { mockProducts } from '@/lib/mock/products';
import { getI18nValue, safeImageSrc } from '@/lib/utils-i18n';
import { trackEvent } from '@/lib/analytics';

export default function ProductsListClient({ locale }: { locale: string }) {
  const t = useTranslations('product');
  const tNav = useTranslations('nav');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = useMemo(() => {
    const cats = new Set(mockProducts.map(p => String(p.categoryId)));
    return ['all', ...Array.from(cats)];
  }, []);

  const filtered = useMemo(() => {
    return mockProducts.filter(p => {
      const name = getI18nValue(p.i18n, locale, 'name') || '';
      const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === 'all' || String(p.categoryId) === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory, locale]);

  const categoryLabels: Record<string, string> = {
    all: t('allCategories'),
    '1': t('catToothpaste'),
    '2': t('catToothPowder'),
    '3': t('catMouthwash'),
    '4': t('catToothbrush'),
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      {/* Compact Hero */}
      <section className="bg-[#173A63] pb-8 md:pt-8 md:pb-10">
        <div className="mx-auto w-[94%] max-w-[1680px] px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            {tNav('products')}
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white border-b border-gray-100 sticky top-14 z-30">
        <div className="mx-auto w-[94%] max-w-[1680px] px-4 md:px-6">
          <div className="flex flex-col sm:flex-row gap-3 py-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#008FD5] focus:ring-1 focus:ring-[#008FD5]/20"
              />
            </div>
            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-[#173A63] text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition ${viewMode === 'list' ? 'bg-[#173A63] text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(String(cat))}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  activeCategory === cat
                    ? 'bg-[#173A63] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {categoryLabels[String(cat)] || cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-8 md:py-12">
        <div className="mx-auto w-[94%] max-w-[1680px] px-4 md:px-6">
          <p className="text-sm text-gray-500 mb-6">
            {filtered.length} {t('itemsFound')}
          </p>
          <div className={`grid gap-4 sm:gap-5 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}>
            {filtered.map((product, i) => {
              const name = getI18nValue(product.i18n, locale, 'name') || '';
              const subtitle = getI18nValue(product.i18n, locale, 'subtitle') || '';
              const slug = product.slug || `product-${product.id}`;
              return (
                <Link
                  key={product.id}
                  href={`/${locale}/products/${slug}`}
                  onClick={() => trackEvent('product_view', { product_id: slug, category: product.categoryId })}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative bg-[#F3F5F7] overflow-hidden ${
                    viewMode === 'list' ? 'w-40 h-40 flex-shrink-0' : 'aspect-square'
                  }`}>
                    <img
                      src={safeImageSrc(product.mainImage)}
                      alt={name}
                      loading={i < 4 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.isHot && (
                        <span className="px-2.5 py-1 rounded-full bg-[#173A63] text-white text-[10px] font-bold uppercase">
                          {t('tagHot')}
                        </span>
                      )}
                      {product.isNew && (
                        <span className="px-2.5 py-1 rounded-full bg-[#38A169] text-white text-[10px] font-bold uppercase">
                          {t('tagNew')}
                        </span>
                      )}
                    </div>
                    {product.totalStock && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#EAF7FD] text-[#008FD5] text-[10px] font-semibold">
                        {t('tagInStock')}
                      </span>
                    )}
                  </div>
                  {/* Content */}
                  <div className={`p-4 flex flex-col ${viewMode === 'list' ? 'flex-1 justify-center' : ''}`}>
                    <h3 className="font-bold text-[#173A63] text-base mb-1 group-hover:text-[#008FD5] transition line-clamp-1">
                      {name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{subtitle}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span>{t('moq')}: {product.minOrderQuantity} {t('moqUnit')}</span>
                      {product.totalStock > 0 && (
                        <span className="text-[#38A169] font-medium">{t('sampleAvailable')}</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <span className="flex-1 text-center py-2 rounded-full border border-[#173A63] text-[#173A63] text-sm font-medium group-hover:bg-[#173A63] group-hover:text-white transition">
                        {t('viewDetails')}
                      </span>
                      <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => { e.stopPropagation(); trackEvent('whatsapp_click', { page: 'products', position: 'card' }); }}
                        className="flex-1 text-center py-2 rounded-full bg-[#21C96B] text-white text-sm font-medium hover:bg-[#1db954] transition"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA - Cross Guidance */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto w-[94%] max-w-[1680px] px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Private Label CTA */}
            <Link href={`/${locale}/private-label`} className="group relative overflow-hidden rounded-2xl bg-[#EAF7FD] p-8 md:p-10 hover:shadow-lg transition">
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-[#008FD5]/10 text-[#008FD5] text-xs font-semibold mb-4">
                  {t('plCtaLabel')}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-[#173A63] mb-2">
                  {t('plCtaTitle')}
                </h3>
                <p className="text-gray-600 text-sm mb-6 max-w-md">
                  {t('plCtaDesc')}
                </p>
                <span className="inline-flex items-center gap-2 text-[#008FD5] font-semibold text-sm group-hover:gap-3 transition-all">
                  {t('plCtaButton')} <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
            {/* OEM/ODM CTA */}
            <Link href={`/${locale}/custom`} className="group relative overflow-hidden rounded-2xl bg-[#173A63] p-8 md:p-10 hover:shadow-lg transition">
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4">
                  {t('oemCtaLabel')}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {t('oemCtaTitle')}
                </h3>
                <p className="text-white/70 text-sm mb-6 max-w-md">
                  {t('oemCtaDesc')}
                </p>
                <span className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                  {t('oemCtaButton')} <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
