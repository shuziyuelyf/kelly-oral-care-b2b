'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Calendar, Eye, ArrowRight } from 'lucide-react';
import { mockNews, mockNewsCategories } from '@/lib/mock/other';
import { getI18nValue } from '@/lib/utils-i18n';
import Link from 'next/link';

export default function NewsPage() {
  const locale = useLocale();
  const t = useTranslations('news');
  const lang = locale;
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const filteredNews = selectedCategory ? mockNews.filter((n) => n.categoryId === selectedCategory) : mockNews;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-[#1B3A5C] mb-6">{t('title')}</h1>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-8">
          <button onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${!selectedCategory ? 'bg-[#1B3A5C] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
            {t('all')}
          </button>
          {mockNewsCategories.map((cat) => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedCategory === cat.id ? 'bg-[#1B3A5C] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
              {getI18nValue(cat.i18n, lang, 'categoryName')}
            </button>
          ))}
        </div>

        {/* News List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <Link key={news.id} href={`/${locale}/news/${news.id}`} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                <img src={news.coverImage || undefined} alt={getI18nValue(news.i18n, lang, 'title')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{news.publishedAt}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{news.viewCount}</span>
                </div>
                <h3 className="font-semibold text-[#1B3A5C] group-hover:text-[#E8720C] transition-colors line-clamp-2">
                  {getI18nValue(news.i18n, lang, 'title')}
                </h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{getI18nValue(news.i18n, lang, 'summary')}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
