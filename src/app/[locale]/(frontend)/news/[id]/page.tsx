import { notFound } from 'next/navigation';
import { mockNews } from '@/lib/mock/other';
import { getI18nValue } from '@/lib/utils-i18n';
import { Calendar, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function NewsDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const lang = locale;
  const news = mockNews.find((n) => n.id === Number(id));
  if (!news) return notFound();

  const title = getI18nValue(news.i18n, lang, 'title');
  const content = getI18nValue(news.i18n, lang, 'content');
  const relatedNews = mockNews.filter((n) => n.id !== news.id && n.categoryId === news.categoryId).slice(0, 3);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href={`/${locale}/news`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#E8720C] mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to News
        </Link>

        <article>
          <h1 className="text-3xl font-bold text-[#1B3A5C] mb-4">{title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{news.publishedAt}</span>
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{news.viewCount}</span>
            <span>{news.author}</span>
          </div>
          {news.coverImage && (
            <img src={news.coverImage || undefined} alt={title} className="w-full h-64 object-cover rounded-lg mb-8" />
          )}
          <div className="prose max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
        </article>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-xl font-bold text-[#1B3A5C] mb-6">Related News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedNews.map((rn) => (
                <Link key={rn.id} href={`/${locale}/news/${rn.id}`} className="group bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <img src={rn.coverImage || undefined} alt={getI18nValue(rn.i18n, lang, 'title')} className="w-full h-32 object-cover" loading="lazy" />
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-[#1B3A5C] group-hover:text-[#E8720C] line-clamp-2">{getI18nValue(rn.i18n, lang, 'title')}</h3>
                    <p className="text-xs text-gray-400 mt-1">{rn.publishedAt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
