'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, Package, Grid3X3, List, ChevronDown, X } from 'lucide-react';
import { mockProducts, mockCategories } from '@/lib/mock/data';
import { getI18nValue, formatPrice } from '@/lib/utils-i18n';

type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'name';

export default function ProductsPage() {
  const t = useTranslations('products');
  const locale = useLocale();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        p.i18n.some((i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.keywords.toLowerCase().includes(q)
        ) || p.modelNumber.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.categoryId === selectedCategory || p.categoryId.startsWith(selectedCategory));
    }

    // Sort
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => (a.skus[0]?.price || 0) - (b.skus[0]?.price || 0));
        break;
      case 'price_desc':
        result.sort((a, b) => (b.skus[0]?.price || 0) - (a.skus[0]?.price || 0));
        break;
      case 'name':
        result.sort((a, b) => getI18nValue(a.i18n, locale, 'name').localeCompare(getI18nValue(b.i18n, locale, 'name')));
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [search, selectedCategory, sortBy, locale]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1B3A5C]">{t('title')}</h1>
      </div>

      <div className="flex gap-8">
        {/* Sidebar - Categories */}
        <aside className={`fixed inset-0 z-40 bg-black/50 lg:static lg:z-auto lg:block lg:w-64 lg:bg-transparent lg:shadow-none ${showFilters ? 'block' : 'hidden'}`}>
          <div className="h-full w-72 overflow-y-auto bg-white p-6 shadow-xl lg:w-full lg:p-0 lg:shadow-none">
            <div className="flex items-center justify-between lg:hidden">
              <h2 className="text-lg font-semibold">{t('categories')}</h2>
              <button onClick={() => setShowFilters(false)} className="p-1"><X className="h-5 w-5" /></button>
            </div>
            <h2 className="mb-4 hidden text-lg font-semibold text-[#1B3A5C] lg:block">{t('categories')}</h2>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${!selectedCategory ? 'bg-[#1B3A5C] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {t('all_categories')}
              </button>
              {mockCategories.map((cat) => (
                <div key={cat.id}>
                  <button
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${selectedCategory === cat.id ? 'bg-[#1B3A5C] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {getI18nValue(cat.i18n, locale, 'name')}
                  </button>
                  {cat.children?.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedCategory(sub.id)}
                      className={`w-full rounded-md py-2 pl-6 pr-3 text-left text-sm transition-colors ${selectedCategory === sub.id ? 'bg-[#E8720C] text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
                    >
                      {getI18nValue(sub.i18n, locale, 'name')}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]"
              />
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowFilters(true)} className="rounded-md border border-gray-300 p-2 text-gray-600 hover:bg-gray-50 lg:hidden">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none"
              >
                <option value="newest">{t('sort_newest')}</option>
                <option value="price_asc">{t('sort_price_asc')}</option>
                <option value="price_desc">{t('sort_price_desc')}</option>
                <option value="name">{t('sort_name')}</option>
              </select>
              <div className="hidden items-center rounded-md border border-gray-300 sm:flex">
                <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 text-[#1B3A5C]' : 'text-gray-400'}`}>
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 text-[#1B3A5C]' : 'text-gray-400'}`}>
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="mb-4 text-sm text-gray-500">{filteredProducts.length} products found</p>

          {/* Products Grid/List */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Package className="mb-4 h-16 w-16" />
              <p className="text-lg">{t('no_results')}</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => {
                const name = getI18nValue(product.i18n, locale, 'name');
                const shortDesc = getI18nValue(product.i18n, locale, 'shortDescription');
                const price = product.skus[0]?.price || 0;
                const originalPrice = product.skus[0]?.originalPrice || 0;
                const stock = product.skus.reduce((s, sku) => s + sku.stock, 0);

                return (
                  <Link key={product.id} href={`/${locale}/products/${product.id}`} className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <div className="flex h-full items-center justify-center"><Package className="h-12 w-12 text-gray-300" /></div>
                      {stock === 0 && <div className="absolute right-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs text-white">{t('out_of_stock')}</div>}
                      {stock > 0 && stock <= 5 && <div className="absolute right-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-xs text-white">{t('low_stock')}</div>}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-[#1B3A5C] group-hover:text-[#E8720C]">{name}</h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{shortDesc}</p>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-lg font-bold text-[#E8720C]">{formatPrice(price, locale)}</span>
                        {originalPrice > price && <span className="text-sm text-gray-400 line-through">{formatPrice(originalPrice, locale)}</span>}
                      </div>
                      <div className="mt-1 text-xs text-gray-400">{t('moq')}: {product.skus[0]?.moq || 1}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => {
                const name = getI18nValue(product.i18n, locale, 'name');
                const desc = getI18nValue(product.i18n, locale, 'shortDescription');
                const price = product.skus[0]?.price || 0;
                const stock = product.skus.reduce((s, sku) => s + sku.stock, 0);

                return (
                  <Link key={product.id} href={`/${locale}/products/${product.id}`} className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md">
                    <div className="h-24 w-32 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                      <div className="flex h-full items-center justify-center"><Package className="h-8 w-8 text-gray-300" /></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1B3A5C]">{name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{desc}</p>
                      <div className="mt-2 flex items-center gap-4">
                        <span className="text-lg font-bold text-[#E8720C]">{formatPrice(price, locale)}</span>
                        <span className={`text-xs ${stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {stock > 0 ? t('in_stock') : t('out_of_stock')}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
