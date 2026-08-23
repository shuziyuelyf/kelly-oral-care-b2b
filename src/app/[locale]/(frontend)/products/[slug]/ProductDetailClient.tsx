'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ChevronRight, MessageCircle, Shield, Sparkles, Droplets, Heart, Leaf, Smile, Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { mockProducts as products } from '@/lib/mock/products';
import { productDetailData } from '@/lib/mock/productDetail';
import { getI18nValue, getI18nRecordValue, safeImageSrc } from '@/lib/utils-i18n';
import type { Product } from '@/lib/types';
import { trackEvent } from '@/lib/analytics';

const iconMap: Record<string, React.ElementType> = {
  Shield, Sparkles, Droplets, Heart, Leaf, Smile,
};

export default function ProductDetailClient({ locale, slug }: { locale: string; slug: string }) {
  const t = useTranslations('productDetail');
  const tProd = useTranslations('product');

  const product = products.find((p: Product) => p.slug === slug);
  const detail = productDetailData[slug];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EF]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#173A63] mb-4">{t('notFound')}</h1>
          <Link href={`/${locale}/products`} className="text-[#008FD5] hover:underline">
            ← {t('backToProducts')}
          </Link>
        </div>
      </div>
    );
  }

  const name = getI18nValue(product.i18n, locale, 'name') || '';
  const subtitle = getI18nValue(product.i18n, locale, 'subtitle') || '';

  const relatedProducts = detail?.relatedSlugs
    .map(s => products.find((p: Product) => p.slug === s))
    .filter(Boolean)
    .slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-100 pt-24 md:pt-28 pb-4">
        <div className="mx-auto w-[94%] max-w-[1680px] px-4 md:px-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href={`/${locale}`} className="hover:text-[#008FD5] transition">{t('home')}</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/${locale}/products`} className="hover:text-[#008FD5] transition">{tProd('title')}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#173A63] font-medium truncate">{name}</span>
          </div>
        </div>
      </nav>

      {/* Product Hero */}
      <section className="bg-white py-8 md:py-12">
        <div className="mx-auto w-[94%] max-w-[1680px] px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Image Gallery */}
            <div className="relative aspect-square bg-[#F3F5F7] rounded-2xl overflow-hidden">
              <img
                src={safeImageSrc(product.mainImage)}
                alt={name}
                className="w-full h-full object-cover"
                loading="eager"
              />
              {product.isHot && (
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#173A63] text-white text-xs font-bold">
                  {tProd('tagHot')}
                </span>
              )}
              {product.totalStock > 0 && (
                <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#EAF7FD] text-[#008FD5] text-xs font-semibold">
                  {tProd('tagInStock')}
                </span>
              )}
            </div>
            {/* Product Info */}
            <div className="flex flex-col">
              <span className="text-sm text-[#008FD5] font-semibold mb-2">{product.category?.i18n?.[0]?.categoryName || ''}</span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#173A63] mb-3">
                {name}
              </h1>
              <p className="text-gray-600 text-base md:text-lg mb-6">{subtitle}</p>

              {/* Key Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="px-4 py-2 rounded-xl bg-[#F3F5F7]">
                  <span className="text-xs text-gray-500">{tProd('moq')}</span>
                  <p className="font-bold text-[#173A63]">{product.minOrderQuantity} {tProd('moqUnit')}</p>
                </div>
                {product.totalStock > 0 && (
                  <div className="px-4 py-2 rounded-xl bg-[#EAF7FD]">
                    <span className="text-xs text-[#008FD5]">{tProd('sampleAvailable')}</span>
                  </div>
                )}
                <div className="px-4 py-2 rounded-xl bg-[#F3F5F7]">
                  <span className="text-xs text-gray-500">{t('leadTime')}</span>
                  <p className="font-bold text-[#173A63]">{t('leadTimeValue')}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { page: 'product_detail', position: 'hero' })}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#21C96B] text-white font-semibold hover:bg-[#1db954] transition"
                >
                  <MessageCircle className="w-5 h-5" /> {t('whatsappUs')}
                </a>
                <Link
                  href={`/${locale}/custom`}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border-2 border-[#173A63] text-[#173A63] font-semibold hover:bg-[#173A63] hover:text-white transition"
                >
                  {t('requestQuote')}
                </Link>
              </div>

              {/* Quick Features */}
              {detail?.features.slice(0, 4).map((f, i) => {
                const Icon = iconMap[f.icon] || Shield;
                return (
                  <div key={i} className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EAF7FD] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#008FD5]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#173A63] text-sm">{getI18nRecordValue(f.title, locale)}</p>
                      <p className="text-gray-500 text-xs">{getI18nRecordValue(f.desc, locale)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      {detail?.features && (
        <section className="py-12 md:py-16 bg-white">
          <div className="mx-auto w-[94%] max-w-[1680px] px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#173A63] mb-2">{t('keyFeatures')}</h2>
            <p className="text-gray-500 mb-8">{t('keyFeaturesDesc')}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {detail.features.map((f, i) => {
                const Icon = iconMap[f.icon] || Shield;
                return (
                  <div key={i} className="p-6 rounded-2xl bg-[#F7F4EF] hover:shadow-md transition">
                    <div className="w-12 h-12 rounded-xl bg-[#EAF7FD] flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#008FD5]" />
                    </div>
                    <h3 className="font-bold text-[#173A63] mb-2">{getI18nRecordValue(f.title, locale)}</h3>
                    <p className="text-gray-600 text-sm">{getI18nRecordValue(f.desc, locale)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Specifications */}
      {detail?.specifications && (
        <section className="py-12 md:py-16 bg-[#F7F4EF]">
          <div className="mx-auto w-[94%] max-w-[1680px] px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#173A63] mb-8">{t('specifications')}</h2>
            <div className="bg-white rounded-2xl overflow-hidden">
              {detail.specifications.map((s, i) => (
                <div key={i} className={`flex items-center px-6 py-4 ${i !== detail.specifications.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className="w-1/3 text-sm text-gray-500">{getI18nRecordValue(s.label, locale)}</span>
                  <span className="w-2/3 font-medium text-[#173A63]">{getI18nRecordValue(s.value, locale)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Packaging Options */}
      {detail?.packaging && (
        <section className="py-12 md:py-16 bg-white">
          <div className="mx-auto w-[94%] max-w-[1680px] px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#173A63] mb-2">{t('packaging')}</h2>
            <p className="text-gray-500 mb-8">{t('packagingDesc')}</p>
            <div className="grid sm:grid-cols-3 gap-6">
              {detail.packaging.map((p, i) => (
                <div key={i} className="p-6 rounded-2xl border border-gray-200 hover:border-[#008FD5] hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-lg bg-[#EAF7FD] flex items-center justify-center mb-4">
                    <Check className="w-5 h-5 text-[#008FD5]" />
                  </div>
                  <h3 className="font-bold text-[#173A63] mb-2">{getI18nRecordValue(p.label, locale)}</h3>
                  <p className="text-gray-600 text-sm">{getI18nRecordValue(p.desc, locale)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Usage */}
      {detail?.usage && (
        <section className="py-12 md:py-16 bg-[#F7F4EF]">
          <div className="mx-auto w-[94%] max-w-[1680px] px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#173A63] mb-6">{t('usage')}</h2>
            <div className="bg-white rounded-2xl p-6 md:p-8">
              <p className="text-gray-700 leading-relaxed">{getI18nRecordValue(detail.usage, locale)}</p>
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="mx-auto w-[94%] max-w-[1680px] px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#173A63] mb-8">{t('relatedProducts')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map(rp => {
                if (!rp) return null;
                const rpName = getI18nValue(rp.i18n, locale, 'name') || '';
                return (
                  <Link
                    key={rp.id}
                    href={`/${locale}/products/${rp.slug}`}
                    className="group bg-[#F7F4EF] rounded-2xl overflow-hidden hover:shadow-md transition"
                  >
                    <div className="aspect-square bg-[#F3F5F7] overflow-hidden">
                      <img src={safeImageSrc(rp.mainImage)} alt={rpName} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-[#173A63] text-sm group-hover:text-[#008FD5] transition line-clamp-1">{rpName}</h3>
                      <p className="text-gray-500 text-xs mt-1">{rp.category?.i18n?.[0]?.categoryName || ''}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {detail?.faq && (
        <section className="py-12 md:py-16 bg-[#F7F4EF]">
          <div className="mx-auto w-[94%] max-w-[1680px] px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#173A63] mb-8">{t('faq')}</h2>
            <div className="space-y-3">
              {detail.faq.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-semibold text-[#173A63] pr-4">{getI18nRecordValue(item.q, locale)}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                      {getI18nRecordValue(item.a, locale)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-12 md:py-16 bg-[#173A63]">
        <div className="mx-auto w-[94%] max-w-[1680px] px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">{t('finalCtaTitle')}</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">{t('finalCtaDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { page: 'product_detail', position: 'final_cta' })}
              className="flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#21C96B] text-white font-semibold hover:bg-[#1db954] transition"
            >
              <MessageCircle className="w-5 h-5" /> {t('whatsappUs')}
            </a>
            <Link
              href={`/${locale}/custom`}
              className="flex items-center justify-center gap-2 py-3.5 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-[#173A63] transition"
            >
              {t('requestQuote')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
