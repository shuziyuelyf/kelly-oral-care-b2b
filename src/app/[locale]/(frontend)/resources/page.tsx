import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resources' });

  const categories = [
    { key: 'catGuides', icon: '📖', count: 12 },
    { key: 'catVideos', icon: '🎬', count: 8 },
    { key: 'catWhitepapers', icon: '📄', count: 6 },
    { key: 'catFaq', icon: '❓', count: 24 },
  ];

  const featured = [
    { title: t('feat1Title'), desc: t('feat1Desc'), type: t('typeGuide'), img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=250&fit=crop' },
    { title: t('feat2Title'), desc: t('feat2Desc'), type: t('typeVideo'), img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop' },
    { title: t('feat3Title'), desc: t('feat3Desc'), type: t('typeWhitepaper'), img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop' },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#173A63] text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#173A63] to-[#0a2540] opacity-90" />
        <div className="relative mx-auto w-[94%] max-w-[1360px] px-2 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t('heroTitle')}</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">{t('heroSubtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/news`} className="inline-flex items-center justify-center gap-2 bg-[#008FD5] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0077b3] transition-colors">
              {t('browseNews')}
            </Link>
            <Link href={`/${locale}/contact`} className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors">
              {t('contactUs')}
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-[#F7F4EF]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4 text-center">{t('categoriesTitle')}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">{t('categoriesDesc')}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link key={i} href={`/${locale}/news`} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow group">
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="text-lg font-bold text-[#173A63] mb-1 group-hover:text-[#008FD5] transition-colors">{t(cat.key)}</h3>
                <p className="text-sm text-gray-500">{cat.count} {t('items')}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4 text-center">{t('featuredTitle')}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">{t('featuredDesc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-[#EAF7FD] text-[#008FD5] text-xs font-semibold rounded-full mb-3">{item.type}</span>
                  <h3 className="text-xl font-bold text-[#173A63] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                  <Link href={`/${locale}/news`} className="text-[#008FD5] font-medium hover:underline inline-flex items-center gap-1">
                    {t('readMore')}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4 text-center">{t('faqTitle')}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">{t('faqDesc')}</p>
          <div className="space-y-4">
            {['faq1', 'faq2', 'faq3', 'faq4'].map((key) => (
              <details key={key} className="bg-white rounded-xl p-6 group">
                <summary className="font-bold text-[#173A63] cursor-pointer list-none flex items-center justify-between">
                  {t(`${key}Q`)}
                  <svg className="w-5 h-5 text-[#008FD5] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">{t(`${key}A`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#173A63] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('ctaTitle')}</h2>
          <p className="text-white/80 text-lg mb-8">{t('ctaDesc')}</p>
          <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 bg-[#008FD5] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0077b3] transition-colors">
            {t('ctaButton')}
          </Link>
        </div>
      </section>
    </main>
  );
}
