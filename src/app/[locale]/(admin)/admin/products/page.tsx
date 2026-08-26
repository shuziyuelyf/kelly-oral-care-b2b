'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Search, Plus, Edit, Trash2, ArrowUp, ArrowDown, Eye } from 'lucide-react';
import { mockProducts } from '@/lib/mock/data';
import { getI18nValue } from '@/lib/utils-i18n';

export default function AdminProductsPage() {
  const locale = useLocale();
  const t = useTranslations('admin.products');
  const lang = locale;
  const [search, setSearch] = useState('');

  const filtered = mockProducts.filter((p) =>
    (p.productCode || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.i18n || []).some((i) => i.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#173A63]">{t('title')}</h1>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#008FD5] text-white rounded-lg hover:bg-[#0077B6] text-sm font-medium">
          <Plus className="w-4 h-4" /> {t('addProduct')}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50"><tr>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">ID</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('image')}</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('name')}</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('code')}</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('price')}</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('stock')}</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('status')}</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('actions')}</th>
            </tr></thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{p.id}</td>
                  <td className="px-4 py-3"><img src={p.mainImage || undefined} alt="" className="w-10 h-10 rounded object-cover" /></td>
                  <td className="px-4 py-3 font-medium text-[#173A63]">{getI18nValue(p.i18n, lang, 'name')}</td>
                  <td className="px-4 py-3 text-gray-500">{p.productCode}</td>
                  <td className="px-4 py-3">${p.priceMin?.toLocaleString()} - ${p.priceMax?.toLocaleString()}</td>
                  <td className="px-4 py-3">{p.totalStock}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${p.status === 1 ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                      {p.status === 1 ? t('active') : t('inactive')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded" title={t('view')}><Eye className="w-4 h-4 text-gray-400" /></button>
                      <button className="p-1.5 hover:bg-gray-100 rounded" title={t('edit')}><Edit className="w-4 h-4 text-blue-500" /></button>
                      <button className="p-1.5 hover:bg-gray-100 rounded" title={t('toggleStatus')}>{p.status === 1 ? <ArrowDown className="w-4 h-4 text-yellow-500" /> : <ArrowUp className="w-4 h-4 text-green-500" />}</button>
                      <button className="p-1.5 hover:bg-gray-100 rounded" title={t('delete')}><Trash2 className="w-4 h-4 text-red-400" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
