import { getTranslations } from 'next-intl/server';
import { mockProducts, mockCategories } from '@/lib/mock/data';
import { mockBanners, mockPartners, mockCompanyInfo } from '@/lib/mock/other';
import { getI18nValue } from '@/lib/utils-i18n';
import Link from 'next/link';
import {
  ArrowRight, ChevronLeft, ChevronRight, Star, Shield, Truck, Clock,
  Target, Award, HeadphonesIcon, Wrench, Globe2, Factory,
  CheckCircle2, XCircle, Quote
} from 'lucide-react';
import HeroBanner from './HeroBanner';
import PartnerLogoWall from './PartnerLogoWall';
import FAQSection from './FAQSection';
import StatsCounter from './StatsCounter';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const lang = locale;

  const recommendedProducts = mockProducts.filter((p) => p.isRecommended || p.isHot);
  const topCategories = mockCategories.filter((c) => c.parentId === 0).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1 - Hero Banner */}
      <HeroBanner locale={lang} />

      {/* Section 2 - Trust Bar */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#D4A853] text-[#D4A853]" />
            ))}
          </div>
          <p className="text-2xl md:text-3xl font-bold text-[#1B2A4A]">
            {t('trustTitle')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            {['ISO 9001', 'CE', 'FDA', 'SGS'].map((cert) => (
              <div key={cert} className="flex items-center gap-2 px-4 py-2 bg-[#F5F5F0] rounded-full">
                <Shield className="w-4 h-4 text-[#1B2A4A]" />
                <span className="text-sm font-medium text-[#1B2A4A]">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - Partner Logo Wall */}
      <PartnerLogoWall />

      {/* Section 4 - Product Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A]">{t('categoriesTitle')}</h2>
            <p className="text-[#718096] mt-3 max-w-lg mx-auto">{t('categoriesDesc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {topCategories.map((cat) => {
              const name = getI18nValue(cat.i18n, lang, 'categoryName');
              const desc = getI18nValue(cat.i18n, lang, 'description') || '';
              const images = [
                'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600',
                'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600',
                'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
              ];
              const idx = (cat.id - 1) % images.length;
              return (
                <Link
                  key={cat.id}
                  href={`/${lang}/products?category=${cat.id}`}
                  className="group relative h-72 rounded-3xl overflow-hidden"
                >
                  <img
                    src={images[idx]}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
                    <p className="text-white/70 text-sm line-clamp-2">{desc}</p>
                    <span className="inline-flex items-center gap-1 mt-3 text-sm text-white/80 font-medium">
                      {t('viewProducts')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
            {/* View All Card */}
            <Link
              href={`/${lang}/products`}
              className="group relative h-72 rounded-3xl overflow-hidden bg-[#1B2A4A] flex items-center justify-center"
            >
              <div className="text-center p-6">
                <h3 className="text-xl font-bold text-white mb-2">{t('viewAllProducts')}</h3>
                <p className="text-white/60 text-sm">{t('viewAllDesc')}</p>
                <span className="inline-flex items-center gap-1 mt-4 px-6 py-2.5 bg-white text-[#1B2A4A] rounded-full text-sm font-semibold group-hover:bg-gray-100 transition-colors">
                  {t('exploreNow')} <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5 - Featured Products */}
      <section className="py-20 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A]">{t('featuredProducts')}</h2>
            <p className="text-[#718096] mt-3 max-w-lg mx-auto">{t('featuredProductsDesc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.slice(0, 4).map((product) => {
              const name = getI18nValue(product.i18n, lang, 'name');
              const subtitle = getI18nValue(product.i18n, lang, 'subtitle');
              const whatsappChannel = product.channels?.find((c) => c.channelType === 2);
              return (
                <div key={product.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-square bg-gray-50 overflow-hidden p-6 flex items-center justify-center">
                    <img
                      src={product.mainImage || undefined}
                      alt={name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                      {product.isHot && (
                        <span className="px-3 py-1 bg-[#E8720C] text-white text-xs font-bold rounded-full">Hot</span>
                      )}
                      {product.isNew && (
                        <span className="px-3 py-1 bg-[#1B2A4A] text-white text-xs font-bold rounded-full">New</span>
                      )}
                      {(product.totalStock ?? 0) > 0 && (
                        <span className="px-3 py-1 bg-[#38A169] text-white text-xs font-bold rounded-full">In Stock</span>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D4A853] text-[#D4A853]" />
                      ))}
                    </div>
                    <h3 className="font-bold text-[#1B2A4A] text-base mb-1 line-clamp-1">{name}</h3>
                    <p className="text-[#718096] text-sm line-clamp-2 mb-4">{subtitle}</p>
                    <div className="flex gap-2">
                      <Link
                        href={`/${lang}/products/${product.id}`}
                        className="flex-1 text-center px-4 py-2.5 border border-[#1B2A4A] text-[#1B2A4A] text-sm font-semibold rounded-full hover:bg-[#1B2A4A] hover:text-white transition-colors"
                      >
                        {t('viewDetails')}
                      </Link>
                      {whatsappChannel && (
                        <a
                          href={whatsappChannel.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center px-4 py-2.5 bg-[#1B2A4A] text-white text-sm font-semibold rounded-full hover:bg-[#152238] transition-colors"
                        >
                          {t('inquireNow')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              href={`/${lang}/products`}
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#1B2A4A] text-white font-semibold rounded-full hover:bg-[#152238] transition-colors"
            >
              {t('shopAllProducts')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6 - Custom Manufacturing */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A]">{t('customTitle')}</h2>
            <p className="text-[#718096] mt-3 max-w-lg mx-auto">{t('customSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: Factory Image */}
            <div className="relative rounded-3xl overflow-hidden h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800"
                alt="Factory"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1B2A4A]/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                  {t('factoryTour')}
                </span>
              </div>
            </div>
            {/* Right: Service Cards */}
            <div className="space-y-4">
              {[
                { icon: Wrench, title: t('oemTitle'), desc: t('oemDesc') },
                { icon: Target, title: t('odmTitle'), desc: t('odmDesc') },
                { icon: Award, title: t('privateLabelTitle'), desc: t('privateLabelDesc') },
              ].map((service, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-[#1B2A4A]/20 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-[#F5F5F0] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#1B2A4A] transition-colors">
                    <service.icon className="w-6 h-6 text-[#1B2A4A] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1B2A4A] mb-1">{service.title}</h3>
                    <p className="text-[#718096] text-sm">{service.desc}</p>
                  </div>
                </div>
              ))}
              <Link
                href={`/${lang}/custom`}
                className="inline-flex items-center gap-2 px-10 py-4 bg-[#1B2A4A] text-white font-semibold rounded-full hover:bg-[#152238] transition-colors mt-4"
              >
                {t('requestQuote')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 - Problem vs Solution */}
      <section className="py-20 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Problem */}
            <div className="bg-[#2D3748] rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-8 h-8 text-red-400" />
                <h3 className="text-xl font-bold text-white">{t('problemTitle')}</h3>
              </div>
              <ul className="space-y-4">
                {[t('problem1'), t('problem2'), t('problem3'), t('problem4')].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Solution */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#38A169]" />
                <h3 className="text-xl font-bold text-[#1B2A4A]">{t('solutionTitle')}</h3>
              </div>
              <ul className="space-y-4">
                {[t('solution1'), t('solution2'), t('solution3'), t('solution4')].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#4a4a4a]">
                    <CheckCircle2 className="w-5 h-5 text-[#38A169] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 - Advantages */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A]">{t('advantagesTitle')}</h2>
            <p className="text-[#718096] mt-3 max-w-lg mx-auto">{t('advantagesDesc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Target, title: t('adv1Title'), desc: t('adv1Desc') },
              { icon: Shield, title: t('adv2Title'), desc: t('adv2Desc') },
              { icon: Truck, title: t('adv3Title'), desc: t('adv3Desc') },
              { icon: Wrench, title: t('adv4Title'), desc: t('adv4Desc') },
              { icon: Factory, title: t('adv5Title'), desc: t('adv5Desc') },
              { icon: HeadphonesIcon, title: t('adv6Title'), desc: t('adv6Desc') },
            ].map((adv, i) => (
              <div key={i} className="text-center p-6 rounded-2xl hover:bg-[#F5F5F0] transition-colors duration-300">
                <div className="w-16 h-16 bg-[#F5F5F0] rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <adv.icon className="w-8 h-8 text-[#1B2A4A]" />
                </div>
                <h3 className="font-bold text-[#1B2A4A] text-lg mb-2">{adv.title}</h3>
                <p className="text-[#718096] text-sm">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9 - Testimonials */}
      <section className="py-20 bg-[#F5F5F0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A]">{t('testimonialsTitle')}</h2>
            <p className="text-[#718096] mt-3">{t('testimonialsDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'John Smith', company: 'Smith Industries', role: 'Procurement Director', country: 'USA', text: t('testimonial1') },
              { name: 'Maria Garcia', company: 'Garcia Manufacturing', role: 'CEO', country: 'Spain', text: t('testimonial2') },
              { name: 'Yuki Tanaka', company: 'Tanaka Electronics', role: 'Engineering Manager', country: 'Japan', text: t('testimonial3') },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm">
                <Quote className="w-8 h-8 text-[#D4A853] mb-4" />
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#D4A853] text-[#D4A853]" />
                  ))}
                </div>
                <p className="text-[#4a4a4a] text-sm leading-relaxed mb-6">&ldquo;{item.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1B2A4A] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{item.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1B2A4A] text-sm">{item.name}</p>
                    <p className="text-[#718096] text-xs">{item.role}, {item.company} - {item.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10 - Stats */}
      <StatsCounter />

      {/* Section 11 - FAQ */}
      <FAQSection />

      {/* Section 12 - Bottom CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1920"
            alt="CTA Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1B2A4A]/85" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {t('ctaTitle')}
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">{t('ctaDesc')}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#1B2A4A] font-bold rounded-full hover:bg-gray-100 transition-colors"
            >
              {t('ctaPrimary')}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
            >
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
