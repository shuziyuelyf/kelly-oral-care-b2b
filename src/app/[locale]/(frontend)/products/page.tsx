'use client';

import { useState, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Search, Grid3X3, List } from 'lucide-react';
import { mockProducts, mockCategories } from '@/lib/mock/data';
import { getI18nValue } from '@/lib/utils-i18n';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

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
          <h1 className="text-2xl font-bold text-[#173A63]">{t('title')}</h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full sm:w-48 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none">
              <option value="default">{t('sort.default')}</option>
              <option value="priceAsc">{t('sort.priceAsc')}</option>
              <option value="priceDesc">{t('sort.priceDesc')}</option>
              <option value="sales">{t('sort.sales')}</option>
            </select>
            <div className="hidden sm:flex gap-1">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#173A63] text-white' : 'bg-gray-100 text-gray-500'}`}><Grid3X3 className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#173A63] text-white' : 'bg-gray-100 text-gray-500'}`}><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Category Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-lg p-4 sticky top-24">
              <h3 className="font-semibold text-[#173A63] mb-3">{t('categories')}</h3>
              <button onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-3 py-2 rounded text-sm ${!selectedCategory ? 'bg-[#EAF7FD] text-[#008FD5] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                {t('allCategories')}
              </button>
              {mockCategories.map((cat) => (
                <div key={cat.id}>
                  <button onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded text-sm mt-1 ${selectedCategory === cat.id ? 'bg-[#EAF7FD] text-[#008FD5] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {getI18nValue(cat.i18n, lang, 'categoryName')}
                  </button>
                  {cat.children?.map((sub) => (
                    <button key={sub.id} onClick={() => setSelectedCategory(sub.id)}
                      className={`w-full text-left pl-6 pr-3 py-1.5 rounded text-sm ${selectedCategory === sub.id ? 'text-[#008FD5] font-medium' : 'text-gray-500 hover:text-gray-700'}`}>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 xl:gap-6">
                {filteredProducts.map((product, index) => {
                  const name = getI18nValue(product.i18n, lang, 'name');
                  const category = getI18nValue(mockCategories.find(c => c.id === product.categoryId)?.i18n || [], lang, 'categoryName');
                  return (
                    <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                      <Link href={`/${locale}/products/${product.id}`}
                        onClick={() => trackEvent('product_view', { product_id: String(product.id), category })}>
                        <div className="aspect-square bg-[#F3F5F7] overflow-hidden relative">
                          <img src={product.mainImage || undefined} alt={name}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            loading={index < 4 ? 'eager' : 'lazy'}
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw" />
                          <div className="absolute top-2 left-2 flex gap-1">
                            {product.isHot && <span className="px-2 py-0.5 bg-[#008FD5] text-white text-xs rounded-full font-medium">{t('hot')}</span>}
                            {product.isNew && <span className="px-2 py-0.5 bg-[#21C96B] text-white text-xs rounded-full font-medium">{t('new')}</span>}
                          </div>
                          {product.totalStock > 0 && <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#EAF7FD] text-[#008FD5] text-xs rounded-full font-medium">In Stock</span>}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-[#173A63] group-hover:text-[#008FD5] transition-colors line-clamp-1">{name}</h3>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-1">{getI18nValue(product.i18n, lang, 'subtitle')}</p>
                          <div className="flex items-center gap-2 mt-3">
                            <span className="text-xs text-gray-400">MOQ: {product.minOrderQuantity} pcs</span>
                            <span className="text-xs text-[#21C96B] font-medium">Sample Available</span>
                          </div>
                        </div>
                      </Link>
                      <div className="px-4 pb-4 flex gap-2">
                        <Link href={`/${locale}/products/${product.id}`} className="flex-1 text-center py-2 text-xs font-medium text-[#173A63] border border-[#173A63] rounded-full hover:bg-[#173A63] hover:text-white transition-colors">
                          {t('viewDetails')}
                        </Link>
                        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"
                          onClick={() => trackEvent('whatsapp_click', { page: 'products', position: 'product_card' })}
                          className="flex-1 text-center py-2 text-xs font-medium text-white bg-[#21C96B] rounded-full hover:bg-[#1db85e] transition-colors">
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => {
                  const name = getI18nValue(product.i18n, lang, 'name');
                  return (
                    <Link key={product.id} href={`/${locale}/products/${product.id}`} className="flex bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-48 h-36 bg-[#F3F5F7] flex-shrink-0 overflow-hidden">
                        <img src={product.mainImage || undefined} alt={name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-4 flex-1">
                        <h3 className="font-semibold text-[#173A63]">{name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{getI18nValue(product.i18n, lang, 'subtitle')}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-sm text-gray-400">MOQ: {product.minOrderQuantity} pcs</span>
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

        {/* Cross-guidance to Private Label & OEM/ODM */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#EAF7FD] rounded-3xl p-8">
            <h3 className="text-xl font-bold text-[#173A63] mb-2">Want to add your brand?</h3>
            <p className="text-gray-500 text-sm mb-4">Choose from 50+ proven formulas and launch your own oral care brand.</p>
            <Link href="/private-label" className="inline-flex items-center gap-2 text-[#008FD5] font-semibold hover:gap-3 transition-all">
              Explore Private Label →
            </Link>
          </div>
          <div className="bg-[#F7F4EF] rounded-3xl p-8">
            <h3 className="text-xl font-bold text-[#173A63] mb-2">Need a fully custom product?</h3>
            <p className="text-gray-500 text-sm mb-4">From formula development to finished packaging — we handle everything.</p>
            <Link href="/custom" className="inline-flex items-center gap-2 text-[#173A63] font-semibold hover:gap-3 transition-all">
              Explore OEM/ODM →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
