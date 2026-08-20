'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Package, Search } from 'lucide-react';
import { mockProducts } from '@/lib/mock/data';
import { getI18nValue, formatPrice } from '@/lib/utils-i18n';

export default function AdminProductsPage() {
  const t = useTranslations('admin');
  const tProd = useTranslations('products');
  const locale = useLocale();
  const [search, setSearch] = useState('');

  const filtered = search
    ? mockProducts.filter((p) => p.i18n.some((i) => i.name.toLowerCase().includes(search.toLowerCase())) || p.modelNumber.toLowerCase().includes(search.toLowerCase()))
    : mockProducts;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{t('products')}</h1>
        <button className="flex items-center gap-2 rounded-lg bg-[#1B3A5C] px-4 py-2 text-sm font-medium text-white hover:bg-[#153050]">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-[#1B3A5C] focus:outline-none" />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Model</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">{t('status')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((product) => {
                const name = getI18nValue(product.i18n, locale, 'name');
                const price = product.skus[0]?.price || 0;
                const stock = product.skus.reduce((s, sku) => s + sku.stock, 0);
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100"><Package className="h-5 w-5 text-gray-400" /></div>
                        <span className="text-sm font-medium text-gray-900">{name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.modelNumber}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatPrice(price, locale)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{stock}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${product.status === 'active' ? 'bg-green-100 text-green-700' : product.status === 'draft' ? 'bg-gray-100 text-gray-600' : 'bg-red-100 text-red-700'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-[#1B3A5C]"><Edit className="h-4 w-4" /></button>
                        <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-amber-600">{product.status === 'active' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                        <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
