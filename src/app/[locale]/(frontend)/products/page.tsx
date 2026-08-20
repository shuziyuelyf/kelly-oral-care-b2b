'use client';

import { useState, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { mockProducts, mockCategories } from '@/lib/mock/data';
import { getI18nValue } from '@/lib/utils-i18n';
import Link from 'next/link';

export default function ProductsPage() {
  const locale = useLocale();
  const t = useTranslations('product');
  const lang = locale;
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc' | 'sales'>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    let result = mockProducts.filter((p) => p.status === 1);
    if (selectedCategory) result = result.filter((p) => p.categoryId === selectedCategory);
    if (search) {
      const kw = search.toLowerCase();
      result = result.filter((p) =>
        (p.productCode || '').toLowerCase().includes(kw) ||
        (p.i18n || []).some((i) => i.name.toLowerCase().includes(kw))
      );
    }
    if (sortBy === 'priceAsc') result = [...result].sort((a, b) => (a.priceMin || 0) - (b.priceMin || 0));
    else if (sortBy === 'priceDesc') result = [...result].sort((a, b) => (b.priceMin || 0) - (a.priceMin || 0));
    else if (sortBy === 'sales') result = [...result].sort((a, b) => b.salesCount - a.salesCount);
    return result;
  }, [search, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-[#1B3A5C]">{t('title')}</h1>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E8720C]/20 focus:border-[#E8720C]" />
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none">
              <option value="default">{t('sort.default')}</option>
              <option value="priceAsc">{t('sort.priceAsc')}</option>
              <option value="priceDesc">{t('sort.priceDesc')}</option>
              <option value="sales">{t('sort.sales')}</option>
            </select>
            <div className="hidden sm:flex gap-1">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#1B3A5C] text-white' : 'bg-gray-100 text-gray-500'}`}><Grid3X3 className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#1B3A5C] text-white' : 'bg-gray-100 text-gray-500'}`}><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Category Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-lg p-4 sticky top-24">
              <h3 className="font-semibold text-[#1B3A5C] mb-3">{t('categories')}</h3>
              <button onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-3 py-2 rounded text-sm ${!selectedCategory ? 'bg-orange-50 text-[#E8720C] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                {t('allCategories')}
              </button>
              {mockCategories.map((cat) => (
                <div key={cat.id}>
                  <button onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded text-sm mt-1 ${selectedCategory === cat.id ? 'bg-orange-50 text-[#E8720C] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {getI18nValue(cat.i18n, lang, 'categoryName')}
                  </button>
                  {cat.children?.map((sub) => (
                    <button key={sub.id} onClick={() => setSelectedCategory(sub.id)}
                      className={`w-full text-left pl-6 pr-3 py-1.5 rounded text-sm ${selectedCategory === sub.id ? 'text-[#E8720C] font-medium' : 'text-gray-500 hover:text-gray-700'}`}>
                      {getI18nValue(sub.i18n, lang, 'categoryName')}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-4">{filteredProducts.length} {t('itemsFound')}</p>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const name = getI18nValue(product.i18n, lang, 'name');
                  return (
                    <Link key={product.id} href={`/${locale}/products/${product.id}`} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                        <img src={product.mainImage || undefined} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                        {product.isHot && <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded">{t('hot')}</span>}
                        {product.isNew && <span className="absolute top-2 right-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded">{t('new')}</span>}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-[#1B3A5C] group-hover:text-[#E8720C] transition-colors line-clamp-1">{name}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{getI18nValue(product.i18n, lang, 'subtitle')}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-[#E8720C] font-medium">${product.priceMin?.toLocaleString()}</span>
                          <span className="text-xs text-gray-400">MOQ: {product.minOrderQuantity}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => {
                  const name = getI18nValue(product.i18n, lang, 'name');
                  return (
                    <Link key={product.id} href={`/${locale}/products/${product.id}`} className="flex bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-48 h-36 bg-gray-100 flex-shrink-0 overflow-hidden">
                        <img src={product.mainImage || undefined} alt={name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-4 flex-1">
                        <h3 className="font-semibold text-[#1B3A5C]">{name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{getI18nValue(product.i18n, lang, 'subtitle')}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-[#E8720C] font-medium">${product.priceMin?.toLocaleString()} - ${product.priceMax?.toLocaleString()}</span>
                          <span className="text-sm text-gray-400">{t('model')}: {product.productCode}</span>
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
    </div>
  );
}
