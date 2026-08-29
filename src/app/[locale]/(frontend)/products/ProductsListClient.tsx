'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp, ArrowRight, Check } from 'lucide-react';
import { mockProducts } from '@/lib/mock/products';
import { getI18nValue, safeImageSrc } from '@/lib/utils-i18n';
import { trackEvent } from '@/lib/analytics';

/* ------------------------------------------------------------------ */
/*  Feature tags — derived from product properties (no fake data)      */
/* ------------------------------------------------------------------ */
type FeatureKey =
  | 'whitening' | 'sensitive' | 'herbal' | 'kids'
  | 'freshBreath' | 'fluorideFree' | 'enamelRepair';

const PRODUCT_FEATURES: Record<number, FeatureKey[]> = {
  1: ['enamelRepair', 'fluorideFree'],
  2: ['whitening'],
  3: ['sensitive'],
  4: ['kids'],
  5: ['herbal', 'freshBreath'],
  6: ['fluorideFree', 'whitening'],
  7: ['freshBreath'],
  8: [],
};

/* ------------------------------------------------------------------ */
/*  Sort options                                                       */
/* ------------------------------------------------------------------ */
type SortKey = 'featured' | 'newest' | 'moqAsc' | 'moqDesc' | 'bestSelling';

export default function ProductsListClient({ locale }: { locale: string }) {
  const t = useTranslations('product');
  const tNav = useTranslations('nav');

  /* ---- Filters ---- */
  const [search, setSearch] = useState('');
  const [selectedCats, setSelectedCats] = useState<Set<string>>(new Set(['all']));
  const [selectedFeatures, setSelectedFeatures] = useState<Set<FeatureKey>>(new Set());
  const [sortBy, setSortBy] = useState<SortKey>('featured');
  const [sortOpen, setSortOpen] = useState(false);

  /* ---- Mobile filter drawer ---- */
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  /* ---- Collapsible sections (desktop) ---- */
  const [catOpen, setCatOpen] = useState(true);
  const [featOpen, setFeatOpen] = useState(true);

  /* ---- Categories from data ---- */
  const categories = useMemo(() => {
    const cats = new Set(mockProducts.map(p => String(p.categoryId)));
    return Array.from(cats);
  }, []);

  const categoryLabels: Record<string, string> = {
    '1': t('catToothpaste'),
    '2': t('catToothPowder'),
    '3': t('catMouthwash'),
    '4': t('catToothbrush'),
  };

  const featureLabels: Record<FeatureKey, string> = {
    whitening: t('featWhitening'),
    sensitive: t('featSensitive'),
    herbal: t('featHerbal'),
    kids: t('featKids'),
    freshBreath: t('featFreshBreath'),
    fluorideFree: t('featFluorideFree'),
    enamelRepair: t('featEnamelRepair'),
  };

  const sortLabels: Record<SortKey, string> = {
    featured: t('sortFeatured'),
    newest: t('sortNewest'),
    moqAsc: t('sortMoqAsc'),
    moqDesc: t('sortMoqDesc'),
    bestSelling: t('sortBestSelling'),
  };

  /* ---- Toggle helpers ---- */
  const toggleCat = (cat: string) => {
    setSelectedCats(prev => {
      const next = new Set(prev);
      if (cat === 'all') {
        return new Set(['all']);
      }
      next.delete('all');
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      if (next.size === 0) next.add('all');
      return next;
    });
  };

  const toggleFeature = (feat: FeatureKey) => {
    setSelectedFeatures(prev => {
      const next = new Set(prev);
      if (next.has(feat)) next.delete(feat);
      else next.add(feat);
      return next;
    });
  };

  const clearAll = () => {
    setSelectedCats(new Set(['all']));
    setSelectedFeatures(new Set());
    setSearch('');
    setSortBy('featured');
  };

  const activeFilterCount =
    (selectedCats.has('all') ? 0 : selectedCats.size) + selectedFeatures.size;

  /* ---- Filter + sort ---- */
  const filtered = useMemo(() => {
    let list = mockProducts.filter(p => {
      const name = (getI18nValue(p.i18n, locale, 'name') || '').toLowerCase();
      const matchSearch = !search || name.includes(search.toLowerCase());
      const matchCat = selectedCats.has('all') || selectedCats.has(String(p.categoryId));
      const feats = PRODUCT_FEATURES[p.id] || [];
      const matchFeat = selectedFeatures.size === 0 ||
        Array.from(selectedFeatures).every(f => feats.includes(f));
      return matchSearch && matchCat && matchFeat;
    });

    switch (sortBy) {
      case 'newest':
        list = [...list].sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'moqAsc':
        list = [...list].sort((a, b) => a.minOrderQuantity - b.minOrderQuantity);
        break;
      case 'moqDesc':
        list = [...list].sort((a, b) => b.minOrderQuantity - a.minOrderQuantity);
        break;
      case 'bestSelling':
        list = [...list].sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
        break;
      default:
        list = [...list].sort((a, b) => a.sort - b.sort);
    }
    return list;
  }, [search, selectedCats, selectedFeatures, sortBy, locale]);

  /* ---- Prevent body scroll when mobile drawer open ---- */
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileFilterOpen]);

  /* ---------------------------------------------------------------- */
  /*  Sidebar content (shared between desktop & mobile drawer)        */
  /* ---------------------------------------------------------------- */
  const sidebarContent = (
    <div className="space-y-6">
      {/* Search (mobile only in drawer) */}
      <div className="md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#008FD5] focus:ring-1 focus:ring-[#008FD5]/20"
          />
        </div>
      </div>

      {/* Sort By */}
      <div>
        <button
          onClick={() => setSortOpen(!sortOpen)}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <span className="text-base font-semibold text-[#173A63]">{t('sortBy')}</span>
          {sortOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </button>
        {sortOpen && (
          <div className="mt-2 space-y-1">
            {(Object.keys(sortLabels) as SortKey[]).map(key => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm transition ${
                  sortBy === key
                    ? 'bg-[#EAF7FD] text-[#008FD5] font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  sortBy === key ? 'border-[#008FD5]' : 'border-gray-300'
                }`}>
                  {sortBy === key && <span className="w-2 h-2 rounded-full bg-[#008FD5]" />}
                </span>
                {sortLabels[key]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-px bg-gray-200" />

      {/* Product Type */}
      <div>
        <button
          onClick={() => setCatOpen(!catOpen)}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <span className="text-base font-semibold text-[#173A63]">{t('productType')}</span>
          {catOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </button>
        {catOpen && (
          <div className="mt-3 space-y-2.5">
            <label className="flex items-center gap-3 cursor-pointer group">
              <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${
                selectedCats.has('all') ? 'bg-[#173A63] border-[#173A63]' : 'border-gray-300 group-hover:border-[#173A63]/50'
              }`}>
                {selectedCats.has('all') && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </span>
              <input type="radio" checked={selectedCats.has('all')} onChange={() => toggleCat('all')} className="sr-only" />
              <span className="text-sm text-gray-700">{t('allProducts')}</span>
            </label>
            {categories.map(cat => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${
                  selectedCats.has(cat) ? 'bg-[#173A63] border-[#173A63]' : 'border-gray-300 group-hover:border-[#173A63]/50'
                }`}>
                  {selectedCats.has(cat) && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </span>
                <input
                  type="checkbox"
                  checked={selectedCats.has(cat)}
                  onChange={() => toggleCat(cat)}
                  className="sr-only"
                />
                <span className="text-sm text-gray-700">{categoryLabels[cat] || cat}</span>
                <span className="text-xs text-gray-400 ml-auto">
                  {mockProducts.filter(p => String(p.categoryId) === cat).length}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="h-px bg-gray-200" />

      {/* Features */}
      <div>
        <button
          onClick={() => setFeatOpen(!featOpen)}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <span className="text-base font-semibold text-[#173A63]">{t('shopByBenefit')}</span>
          {featOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </button>
        {featOpen && (
          <div className="mt-3 space-y-2.5">
            {(Object.keys(featureLabels) as FeatureKey[]).map(feat => (
              <label key={feat} className="flex items-center gap-3 cursor-pointer group">
                <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${
                  selectedFeatures.has(feat) ? 'bg-[#173A63] border-[#173A63]' : 'border-gray-300 group-hover:border-[#173A63]/50'
                }`}>
                  {selectedFeatures.has(feat) && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </span>
                <input
                  type="checkbox"
                  checked={selectedFeatures.has(feat)}
                  onChange={() => toggleFeature(feat)}
                  className="sr-only"
                />
                <span className="text-sm text-gray-700">{featureLabels[feat]}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Clear all */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearAll}
          className="text-sm text-[#008FD5] font-medium hover:underline"
        >
          {t('clearAll')} ({activeFilterCount})
        </button>
      )}
    </div>
  );

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      {/* Page Title + Mobile Filter Bar */}
      <section className="pt-8 md:pt-12 pb-4 md:pb-6">
        <div className="mx-auto w-[94%] max-w-[1360px] px-4 md:px-6">
          <h1 className="text-3xl md:text-[42px] font-extrabold text-[#173A63] tracking-tight mb-4 md:mb-6">
            {tNav('products')}
          </h1>

          {/* Desktop search */}
          <div className="hidden md:block relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#008FD5] focus:ring-2 focus:ring-[#008FD5]/15"
            />
          </div>

          {/* Mobile: result count + filter button */}
          <div className="md:hidden flex items-center justify-between gap-3">
            <span className="text-sm text-gray-500">
              {filtered.length} {t('itemsFound')}
            </span>
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-[#173A63] shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t('filters')}
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#173A63] text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content: Sidebar + Grid */}
      <section className="pb-12 md:pb-20">
        <div className="mx-auto w-[94%] max-w-[1360px] px-4 md:px-6">
          <div className="flex gap-8 lg:gap-10">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-60 lg:w-64 flex-shrink-0">
              <div className="sticky top-[100px]">
                {sidebarContent}
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1 min-w-0">
              {/* Desktop result count */}
              <div className="hidden md:flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                  {filtered.length} {t('itemsFound')}
                  {sortBy !== 'featured' && (
                    <span className="text-gray-400"> · {sortLabels[sortBy]}</span>
                  )}
                </p>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg mb-2">{t('noResults')}</p>
                  <button
                    onClick={clearAll}
                    className="text-[#008FD5] font-medium text-sm hover:underline"
                  >
                    {t('clearAll')}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                  {filtered.map((product, i) => {
                    const name = getI18nValue(product.i18n, locale, 'name') || '';
                    const slug = product.slug || `product-${product.id}`;
                    const feats = PRODUCT_FEATURES[product.id] || [];
                    return (
                      <Link
                        key={product.id}
                        href={`/${locale}/products/${slug}`}
                        onClick={() => trackEvent('product_view', { product_id: slug, category: product.categoryId })}
                        className="group flex flex-col bg-[#F3F5F7] rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(23,58,99,0.12)] hover:-translate-y-0.5"
                      >
                        {/* Image area */}
                        <div className="relative flex items-center justify-center p-4 sm:p-6 aspect-square">
                          {/* Tags */}
                          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                            {product.isHot && (
                              <span className="px-2.5 py-1 rounded-full bg-[#173A63] text-white text-[10px] font-bold uppercase tracking-wide">
                                {t('tagHot')}
                              </span>
                            )}
                            {product.isNew && (
                              <span className="px-2.5 py-1 rounded-full bg-[#D4E8A0] text-[#3D5A1E] text-[10px] font-bold uppercase tracking-wide">
                                {t('tagNew')}
                              </span>
                            )}
                          </div>
                          {product.totalStock > 0 && (
                            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur text-[#38A169] text-[10px] font-semibold">
                              {t('tagInStock')}
                            </span>
                          )}
                          <img
                            src={safeImageSrc(product.mainImage)}
                            alt={name}
                            loading={i < 6 ? 'eager' : 'lazy'}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Info */}
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex flex-col flex-1">
                          <h3 className="font-semibold text-[#173A63] text-sm sm:text-[15px] mb-1 line-clamp-1 group-hover:text-[#008FD5] transition">
                            {name}
                          </h3>
                          <p className="text-xs text-gray-400 mb-3">
                            {t('moq')}: {product.minOrderQuantity.toLocaleString()} {t('moqUnit')}
                          </p>
                          <button
                            className="mt-auto w-full py-2.5 rounded-full bg-[#173A63] text-white text-xs sm:text-sm font-semibold hover:bg-[#008FD5] transition-colors"
                          >
                            {t('viewDetails')}
                          </button>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA — Cross Guidance */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto w-[94%] max-w-[1360px] px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Link href={`/${locale}/private-label`} className="group relative overflow-hidden rounded-3xl bg-[#EAF7FD] p-8 md:p-10 hover:shadow-lg transition">
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
            <Link href={`/${locale}/custom`} className="group relative overflow-hidden rounded-3xl bg-[#173A63] p-8 md:p-10 hover:shadow-lg transition">
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

      {/* Mobile Filter Drawer */}
      <div
        className={`fixed inset-0 z-[100] md:hidden transition-opacity duration-300 ${
          mobileFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileFilterOpen(false)}
        />
        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            mobileFilterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="text-lg font-bold text-[#173A63]">{t('filters')}</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {sidebarContent}
            </div>
            <div className="px-5 py-4 border-t border-gray-100 flex gap-3">
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAll}
                  className="px-4 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-600"
                >
                  {t('clearAll')}
                </button>
              )}
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-full bg-[#173A63] text-white text-sm font-semibold"
              >
                {t('showResults', { count: filtered.length })}
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
