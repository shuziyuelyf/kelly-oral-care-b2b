'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { Plus, Edit, Trash2, FileText, Image, Newspaper, Award } from 'lucide-react';
import { mockNews, mockBanners, mockCaseShows } from '@/lib/mock/data';
import { getI18nValue, formatDate } from '@/lib/utils-i18n';

type TabType = 'news' | 'banners' | 'cases';

export default function AdminContentPage() {
  const t = useTranslations('admin');
  const locale = useLocale();
  const [tab, setTab] = useState<TabType>('news');

  const tabs = [
    { key: 'news' as TabType, label: 'News', icon: Newspaper },
    { key: 'banners' as TabType, label: 'Banners', icon: Image },
    { key: 'cases' as TabType, label: 'Case Studies', icon: Award },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{t('content')}</h1>
        <button className="flex items-center gap-2 rounded-lg bg-[#1B3A5C] px-4 py-2 text-sm font-medium text-white hover:bg-[#153050]">
          <Plus className="h-4 w-4" /> Add Content
        </button>
      </div>

      <div className="mt-6 flex gap-1 border-b border-gray-200">
        {tabs.map((tb) => (
          <button
            key={tb.key}
            onClick={() => setTab(tb.key)}
            className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${tab === tb.key ? 'border-[#1B3A5C] text-[#1B3A5C]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <tb.icon className="h-4 w-4" /> {tb.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'news' && (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">{t('created_at')}</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockNews.map((n) => (
                    <tr key={n.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{getI18nValue(n.i18n, locale, 'title')}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{n.category}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{formatDate(n.publishedAt, locale)}</td>
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
        )}

        {tab === 'banners' && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockBanners.map((b) => (
              <div key={b.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex h-32 items-center justify-center bg-gradient-to-r from-[#1B3A5C] to-[#2A5A8C]">
                  <Image className="h-8 w-8 text-white/50" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900">{getI18nValue(b.i18n, locale, 'title')}</h3>
                  <p className="mt-1 text-xs text-gray-500">{getI18nValue(b.i18n, locale, 'subtitle')}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-400">Sort: {b.sortOrder}</span>
                    <div className="flex gap-1">
                      <button className="rounded p-1 text-gray-400 hover:text-[#1B3A5C]"><Edit className="h-3.5 w-3.5" /></button>
                      <button className="rounded p-1 text-gray-400 hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'cases' && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockCaseShows.map((c) => (
              <div key={c.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex h-32 items-center justify-center bg-gradient-to-r from-[#E8720C]/20 to-[#E8720C]/5">
                  <Award className="h-8 w-8 text-[#E8720C]/30" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900">{getI18nValue(c.i18n, locale, 'title')}</h3>
                  <p className="mt-1 text-xs text-gray-500">{getI18nValue(c.i18n, locale, 'description').slice(0, 80)}...</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-400">{getI18nValue(c.i18n, locale, 'clientName')}</span>
                    <div className="flex gap-1">
                      <button className="rounded p-1 text-gray-400 hover:text-[#1B3A5C]"><Edit className="h-3.5 w-3.5" /></button>
                      <button className="rounded p-1 text-gray-400 hover:text-red-600"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
