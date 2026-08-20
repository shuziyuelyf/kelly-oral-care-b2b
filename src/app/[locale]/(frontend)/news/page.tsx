'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { Award } from 'lucide-react';
import { mockNews } from '@/lib/mock/data';
import { getI18nValue, formatDate } from '@/lib/utils-i18n';

export default function NewsPage() {
  const t = useTranslations('news');
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'company', 'industry', 'exhibition'];
  const filtered = activeCategory === 'all' ? mockNews : mockNews.filter((n) => n.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#1B3A5C]">{t('title')}</h1>
        <p className="mt-4 text-lg text-gray-500">{t('subtitle')}</p>
      </div>

      {/* Category Filter */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-[#1B3A5C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {cat === 'all' ? t('all') : t(cat as 'company' | 'industry' | 'exhibition')}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const title = getI18nValue(item.i18n, locale, 'title');
          const summary = getI18nValue(item.i18n, locale, 'summary');
          return (
            <Link
              key={item.id}
              href={`/${locale}/news/${item.id}`}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                <div className="flex h-full items-center justify-center"><Award className="h-10 w-10 text-gray-300" /></div>
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded bg-[#1B3A5C]/10 px-2 py-0.5 text-xs font-medium text-[#1B3A5C]">
                    {t(item.category as 'company' | 'industry' | 'exhibition')}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(item.publishedAt, locale)}</span>
                </div>
                <h3 className="font-semibold text-[#1B3A5C] group-hover:text-[#E8720C]">{title}</h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{summary}</p>
                <span className="mt-3 inline-block text-sm font-medium text-[#E8720C]">{t('read_more')}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
