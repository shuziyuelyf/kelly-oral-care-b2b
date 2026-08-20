'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Plus, Edit, Trash2, ExternalLink, MessageSquare, ShoppingCart } from 'lucide-react';
import { mockProducts } from '@/lib/mock/data';
import { getI18nValue } from '@/lib/utils-i18n';

export default function AdminChannelsPage() {
  const t = useTranslations('admin');
  const locale = useLocale();

  const allChannels = mockProducts.flatMap((p) =>
    p.channels.map((ch) => ({
      ...ch,
      productName: getI18nValue(p.i18n, locale, 'name'),
      modelNumber: p.modelNumber,
    }))
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{t('channels')}</h1>
        <button className="flex items-center gap-2 rounded-lg bg-[#1B3A5C] px-4 py-2 text-sm font-medium text-white hover:bg-[#153050]">
          <Plus className="h-4 w-4" /> Add Channel
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">{t('products') === t('products') ? 'Shop Name' : ''}</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">URL</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allChannels.map((ch) => (
                <tr key={ch.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{ch.productName}</span>
                      <span className="ml-2 text-xs text-gray-400">{ch.modelNumber}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${ch.type === 'whatsapp' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {ch.type === 'whatsapp' ? <MessageSquare className="h-3 w-3" /> : <ShoppingCart className="h-3 w-3" />}
                      {ch.type === 'whatsapp' ? 'WhatsApp' : 'Online Store'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{ch.shopName}</td>
                  <td className="px-4 py-3">
                    <a href={ch.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-[#1B3A5C] hover:underline">
                      <ExternalLink className="h-3 w-3" /> {ch.url.length > 30 ? ch.url.slice(0, 30) + '...' : ch.url}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-[#1B3A5C]"><Edit className="h-4 w-4" /></button>
                      <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
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
