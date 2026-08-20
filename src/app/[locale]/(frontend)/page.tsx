import { getTranslations } from 'next-intl/server';
import { mockProducts, mockCategories } from '@/lib/mock/data';
import { mockBanners, mockNews, mockCaseShows, mockPartners, mockCompanyInfo } from '@/lib/mock/other';
import { getI18nValue } from '@/lib/utils-i18n';
import Link from 'next/link';
import { ArrowRight, Settings, Shield, Truck, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const lang = locale;

  const recommendedProducts = mockProducts.filter((p) => p.isRecommended);
  const hotProducts = mockProducts.filter((p) => p.isHot);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[500px] lg:h-[600px] bg-gradient-to-r from-[#1B3A5C] to-[#2d5a8a] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {getI18nValue(mockBanners[0]?.i18n, lang, 'title') || t('heroTitle')}
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              {getI18nValue(mockCompanyInfo.i18n, lang, 'slogan')}
            </p>
            <div className="flex gap-4">
              <Link href={`/${lang}/products`} className="px-6 py-3 bg-[#E8720C] text-white font-medium rounded-lg hover:bg-[#d4680b] transition-colors">
                {t('viewProducts')}
              </Link>
              <Link href={`/${lang}/custom`} className="px-6 py-3 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                {t('customService')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Settings, title: t('feature1Title'), desc: t('feature1Desc') },
              { icon: Shield, title: t('feature2Title'), desc: t('feature2Desc') },
              { icon: Truck, title: t('feature3Title'), desc: t('feature3Desc') },
              { icon: Clock, title: t('feature4Title'), desc: t('feature4Desc') },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <f.icon className="w-8 h-8 text-[#E8720C] flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#1B3A5C]">{f.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1B3A5C]">{t('recommendedProducts')}</h2>
            <p className="text-gray-500 mt-2">{t('recommendedProductsDesc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => {
              const name = getI18nValue(product.i18n, lang, 'name');
              const subtitle = getI18nValue(product.i18n, lang, 'subtitle');
              return (
                <Link key={product.id} href={`/${lang}/products/${product.id}`} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img src={product.mainImage || undefined} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#1B3A5C] group-hover:text-[#E8720C] transition-colors">{name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[#E8720C] font-medium">
                        ${product.priceMin?.toLocaleString()} - ${product.priceMax?.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400">MOQ: {product.minOrderQuantity}{product.unit}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href={`/${lang}/products`} className="inline-flex items-center gap-2 px-6 py-3 border border-[#1B3A5C] text-[#1B3A5C] font-medium rounded-lg hover:bg-[#1B3A5C] hover:text-white transition-colors">
              {t('viewAllProducts')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Service CTA */}
      <section className="py-16 bg-[#1B3A5C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t('customTitle')}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">{t('customDesc')}</p>
          <Link href={`/${lang}/custom`} className="inline-flex items-center gap-2 px-8 py-3 bg-[#E8720C] text-white font-medium rounded-lg hover:bg-[#d4680b] transition-colors">
            {t('customCTA')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Case Shows */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1B3A5C] text-center mb-10">{t('caseShows')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCaseShows.map((c) => (
              <div key={c.id} className="group relative rounded-lg overflow-hidden">
                <img src={c.coverImage || undefined} alt={getI18nValue(c.i18n, lang, 'title')} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{getI18nValue(c.i18n, lang, 'title')}</h3>
                    <p className="text-gray-300 text-sm mt-1">{getI18nValue(c.i18n, lang, 'summary')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#1B3A5C]">{t('latestNews')}</h2>
            <Link href={`/${lang}/news`} className="text-[#E8720C] hover:underline text-sm font-medium">{t('viewAll')} →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockNews.map((news) => (
              <Link key={news.id} href={`/${lang}/news/${news.id}`} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                  <img src={news.coverImage || undefined} alt={getI18nValue(news.i18n, lang, 'title')} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400">{news.publishedAt}</p>
                  <h3 className="font-semibold text-[#1B3A5C] mt-1 group-hover:text-[#E8720C] transition-colors line-clamp-2">
                    {getI18nValue(news.i18n, lang, 'title')}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{getI18nValue(news.i18n, lang, 'summary')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-[#1B3A5C] mb-8">{t('partners')}</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {mockPartners.map((partner) => (
              <div key={partner.id} className="px-6 py-3 bg-gray-50 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors">
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
