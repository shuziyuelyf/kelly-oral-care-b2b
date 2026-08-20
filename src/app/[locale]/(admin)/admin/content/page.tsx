'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { mockNews, mockNewsCategories, mockBanners, mockCaseShows } from '@/lib/mock/other';
import { getI18nValue } from '@/lib/utils-i18n';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminContentPage() {
  const locale = useLocale();
  const t = useTranslations('admin.content');
  const lang = locale;
  const [tab, setTab] = useState<'news' | 'banners' | 'cases'>('news');

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B3A5C] mb-6">{t('title')}</h1>
      <div className="flex gap-2 mb-6">
        {(['news', 'banners', 'cases'] as const).map((t2) => (
          <button key={t2} onClick={() => setTab(t2)} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === t2 ? 'bg-[#1B3A5C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {t(t2)}
          </button>
        ))}
      </div>

      {tab === 'news' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b flex justify-end"><button className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#E8720C] text-white rounded text-sm"><Plus className="w-3 h-3" />{t('addNews')}</button></div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50"><tr>
              <th className="px-4 py-3 text-left text-gray-500">ID</th>
              <th className="px-4 py-3 text-left text-gray-500">{t('newsTitle')}</th>
              <th className="px-4 py-3 text-left text-gray-500">{t('category')}</th>
              <th className="px-4 py-3 text-left text-gray-500">{t('date')}</th>
              <th className="px-4 py-3 text-left text-gray-500">{t('actions')}</th>
            </tr></thead>
            <tbody>
              {mockNews.map((n) => (
                <tr key={n.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{n.id}</td>
                  <td className="px-4 py-3 font-medium">{getI18nValue(n.i18n, lang, 'title')}</td>
                  <td className="px-4 py-3">{mockNewsCategories.find((c) => c.id === n.categoryId) ? getI18nValue(mockNewsCategories.find((c) => c.id === n.categoryId)!.i18n, lang, 'categoryName') : '-'}</td>
                  <td className="px-4 py-3 text-gray-500">{n.publishedAt}</td>
                  <td className="px-4 py-3"><button className="p-1 hover:bg-gray-100 rounded"><Edit className="w-4 h-4 text-blue-500" /></button><button className="p-1 hover:bg-gray-100 rounded ml-1"><Trash2 className="w-4 h-4 text-red-400" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'banners' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b flex justify-end"><button className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#E8720C] text-white rounded text-sm"><Plus className="w-3 h-3" />{t('addBanner')}</button></div>
          <div className="divide-y">
            {mockBanners.map((b) => (
              <div key={b.id} className="flex items-center gap-4 p-4">
                <img src={b.imageUrl} alt="" className="w-24 h-14 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-[#1B3A5C]">{getI18nValue(b.i18n, lang, 'title')}</p>
                  <p className="text-xs text-gray-400">{b.linkUrl}</p>
                </div>
                <div className="flex gap-1"><button className="p-1 hover:bg-gray-100 rounded"><Edit className="w-4 h-4 text-blue-500" /></button><button className="p-1 hover:bg-gray-100 rounded"><Trash2 className="w-4 h-4 text-red-400" /></button></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'cases' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b flex justify-end"><button className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#E8720C] text-white rounded text-sm"><Plus className="w-3 h-3" />{t('addCase')}</button></div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50"><tr>
              <th className="px-4 py-3 text-left text-gray-500">ID</th>
              <th className="px-4 py-3 text-left text-gray-500">{t('caseTitle')}</th>
              <th className="px-4 py-3 text-left text-gray-500">{t('industry')}</th>
              <th className="px-4 py-3 text-left text-gray-500">{t('views')}</th>
              <th className="px-4 py-3 text-left text-gray-500">{t('actions')}</th>
            </tr></thead>
            <tbody>
              {mockCaseShows.map((c) => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{c.id}</td>
                  <td className="px-4 py-3 font-medium">{getI18nValue(c.i18n, lang, 'title')}</td>
                  <td className="px-4 py-3">{getI18nValue(c.i18n, lang, 'industry')}</td>
                  <td className="px-4 py-3">{c.viewCount}</td>
                  <td className="px-4 py-3"><button className="p-1 hover:bg-gray-100 rounded"><Edit className="w-4 h-4 text-blue-500" /></button><button className="p-1 hover:bg-gray-100 rounded ml-1"><Trash2 className="w-4 h-4 text-red-400" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
