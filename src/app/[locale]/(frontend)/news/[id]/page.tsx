'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft, Award, Calendar } from 'lucide-react';
import { mockNews } from '@/lib/mock/data';
import { getI18nValue, formatDate } from '@/lib/utils-i18n';

export default function NewsDetailPage() {
  const t = useTranslations('news');
  const locale = useLocale();
  const news = mockNews[0]; // Default for demo

  if (!news) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-lg text-gray-500">Article not found</p>
        <Link href={`/${locale}/news`} className="mt-4 inline-flex items-center gap-2 text-[#E8720C] hover:underline">
          <ArrowLeft className="h-4 w-4" /> {t('title')}
        </Link>
      </div>
    );
  }

  const title = getI18nValue(news.i18n, locale, 'title');
  const content = getI18nValue(news.i18n, locale, 'content');
  const related = mockNews.filter((n) => n.id !== news.id && n.category === news.category).slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href={`/${locale}/news`} className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1B3A5C]">
        <ArrowLeft className="h-4 w-4" /> {t('title')}
      </Link>

      <article>
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded bg-[#1B3A5C]/10 px-2 py-0.5 text-xs font-medium text-[#1B3A5C]">
            {t(news.category as 'company' | 'industry' | 'exhibition')}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="h-3 w-3" /> {formatDate(news.publishedAt, locale)}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-[#1B3A5C]">{title}</h1>
        <div className="mt-6 aspect-[2/1] overflow-hidden rounded-lg bg-gray-100">
          <div className="flex h-full items-center justify-center"><Award className="h-16 w-16 text-gray-300" /></div>
        </div>
        <div className="prose mt-8 max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: content }} />
      </article>

      {/* Related News */}
      {related.length > 0 && (
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-[#1B3A5C]">{t('related_news')}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.id} href={`/${locale}/news/${item.id}`} className="group rounded-lg border border-gray-200 p-4 transition-all hover:shadow-md">
                <h3 className="font-medium text-[#1B3A5C] group-hover:text-[#E8720C]">{getI18nValue(item.i18n, locale, 'title')}</h3>
                <p className="mt-1 text-xs text-gray-400">{formatDate(item.publishedAt, locale)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
