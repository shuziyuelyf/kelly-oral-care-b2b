'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Factory, Globe, Package, Users, MessageSquare, CheckCircle, Clock, Truck, Shield, Zap, Award } from 'lucide-react';
import { mockBanners, mockProducts, mockNews, mockCaseShows, mockPartners } from '@/lib/mock/data';
import { getI18nValue, formatPrice } from '@/lib/utils-i18n';
import type { Locale } from '@/i18n/config';

function BannerCarousel() {
  const t = useTranslations('home');
  const locale = useLocale();
  const [current, setCurrent] = useState(0);
  const banners = mockBanners.filter((b) => b.isActive);

  const next = useCallback(() => setCurrent((c) => (c + 1) % banners.length), [banners.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + banners.length) % banners.length), [banners.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const banner = banners[current];
  if (!banner) return null;

  return (
    <section className="relative h-[400px] overflow-hidden bg-[#1B3A5C] sm:h-[480px] lg:h-[560px]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B3A5C] via-[#1e4268] to-[#162f4a]" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {getI18nValue(banner.i18n, locale, 'title')}
          </h1>
          <p className="mt-4 text-lg text-gray-300 sm:text-xl">
            {getI18nValue(banner.i18n, locale, 'subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-2 rounded-md bg-[#E8720C] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#d4660a] hover:shadow-lg"
            >
              {t('hero_cta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/custom`}
              className="inline-flex items-center gap-2 rounded-md border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10"
            >
              {t('hero_custom')}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20">
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-[#E8720C]' : 'w-2 bg-white/40 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </section>
  );
}

function CompanySection() {
  const t = useTranslations('home');
  const stats = [
    { value: '20+', label: t('company_stats.years'), icon: Clock },
    { value: '50+', label: t('company_stats.countries'), icon: Globe },
    { value: '100+', label: t('company_stats.products'), icon: Package },
    { value: '500+', label: t('company_stats.clients'), icon: Users },
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold text-[#1B3A5C]">{t('company_title')}</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">{t('company_desc')}</p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-center">
                  <stat.icon className="mx-auto mb-2 h-6 w-6 text-[#E8720C]" />
                  <div className="text-2xl font-bold text-[#1B3A5C]">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-72 w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#1B3A5C]/5 to-[#E8720C]/5 lg:h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <Factory className="h-24 w-24 text-[#1B3A5C]/20" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1B3A5C]/80 to-transparent p-6">
                <p className="text-sm text-white/80">50,000 m² Manufacturing Base</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const t = useTranslations('home');
  const tProd = useTranslations('products');
  const locale = useLocale();
  const featured = mockProducts.slice(0, 4);

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold text-[#1B3A5C]">{t('featured_products')}</h2>
          <Link href={`/${locale}/products`} className="flex items-center gap-1 text-sm font-medium text-[#E8720C] hover:underline">
            {t('view_all')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => {
            const name = getI18nValue(product.i18n, locale, 'name');
            const shortDesc = getI18nValue(product.i18n, locale, 'shortDescription');
            const price = product.skus[0]?.price || 0;
            const originalPrice = product.skus[0]?.originalPrice || 0;
            const stock = product.skus.reduce((sum, s) => sum + s.stock, 0);

            return (
              <Link
                key={product.id}
                href={`/${locale}/products/${product.id}`}
                className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <div className="flex h-full items-center justify-center">
                    <Package className="h-12 w-12 text-gray-300" />
                  </div>
                  {stock === 0 && (
                    <div className="absolute right-2 top-2 rounded bg-red-500 px-2 py-0.5 text-xs text-white">{tProd('out_of_stock')}</div>
                  )}
                  {stock > 0 && stock <= 5 && (
                    <div className="absolute right-2 top-2 rounded bg-amber-500 px-2 py-0.5 text-xs text-white">{tProd('low_stock')}</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#1B3A5C] group-hover:text-[#E8720C]">{name}</h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{shortDesc}</p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-[#E8720C]">{formatPrice(price, locale)}</span>
                    {originalPrice > price && (
                      <span className="text-sm text-gray-400 line-through">{formatPrice(originalPrice, locale)}</span>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-gray-400">{tProd('moq')}: {product.skus[0]?.moq || 1}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CustomSection() {
  const t = useTranslations('home');
  const tCustom = useTranslations('custom_page');
  const locale = useLocale();

  const steps = [
    { icon: MessageSquare, title: tCustom('process_steps.step1_title'), desc: tCustom('process_steps.step1_desc') },
    { icon: CheckCircle, title: tCustom('process_steps.step2_title'), desc: tCustom('process_steps.step2_desc') },
    { icon: Factory, title: tCustom('process_steps.step4_title'), desc: tCustom('process_steps.step4_desc') },
    { icon: Truck, title: tCustom('process_steps.step6_title'), desc: tCustom('process_steps.step6_desc') },
  ];

  return (
    <section className="bg-[#1B3A5C] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">{t('custom_title')}</h2>
          <p className="mt-4 text-lg text-gray-300">{t('custom_desc')}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="rounded-lg bg-white/5 p-6 text-center backdrop-blur-sm transition-colors hover:bg-white/10">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8720C]/20">
                <step.icon className="h-6 w-6 text-[#E8720C]" />
              </div>
              <h3 className="font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/custom`}
            className="inline-flex items-center gap-2 rounded-md bg-[#E8720C] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-[#d4660a] hover:shadow-lg"
          >
            {t('custom_cta')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  const t = useTranslations('home');
  const tNews = useTranslations('news');
  const locale = useLocale();
  const news = mockNews.filter((n) => n.isPublished).slice(0, 3);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold text-[#1B3A5C]">{t('news_title')}</h2>
          <Link href={`/${locale}/news`} className="flex items-center gap-1 text-sm font-medium text-[#E8720C] hover:underline">
            {t('view_all')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {news.map((item) => {
            const title = getI18nValue(item.i18n, locale, 'title');
            const summary = getI18nValue(item.i18n, locale, 'summary');
            return (
              <Link
                key={item.id}
                href={`/${locale}/news/${item.id}`}
                className="group overflow-hidden rounded-lg border border-gray-200 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                  <div className="flex h-full items-center justify-center">
                    <Award className="h-10 w-10 text-gray-300" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-2 inline-block rounded bg-[#1B3A5C]/10 px-2 py-0.5 text-xs font-medium text-[#1B3A5C]">
                    {tNews(item.category)}
                  </div>
                  <h3 className="font-semibold text-[#1B3A5C] group-hover:text-[#E8720C]">{title}</h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{summary}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  const t = useTranslations('home');

  return (
    <section className="border-t border-gray-200 bg-gray-50 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-xl font-bold text-[#1B3A5C]">{t('partners_title')}</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {mockPartners.map((partner) => (
            <div key={partner.id} className="flex h-12 items-center rounded-lg bg-white px-6 shadow-sm">
              <span className="text-lg font-bold text-gray-400">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <BannerCarousel />
      <CompanySection />
      <FeaturedProducts />
      <CustomSection />
      <NewsSection />
      <PartnersSection />
    </>
  );
}
