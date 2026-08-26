import { getTranslations } from 'next-intl/server';
import { brand } from '@/lib/brand';
import { Award, Target, Leaf, Globe } from 'lucide-react';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const values = [
    { icon: Award, title: t('valueQuality', { fallback: 'Quality First' }), desc: t('valueQualityDesc', { fallback: 'Every product undergoes rigorous quality control before reaching our partners.' }) },
    { icon: Target, title: t('valueInnovation', { fallback: 'Continuous Innovation' }), desc: t('valueInnovationDesc', { fallback: 'We invest in R&D to bring the latest oral care formulations to market.' }) },
    { icon: Leaf, title: t('valueSustainability', { fallback: 'Sustainability' }), desc: t('valueSustainabilityDesc', { fallback: 'Eco-friendly packaging and responsible manufacturing practices.' }) },
    { icon: Globe, title: t('valueGlobal', { fallback: 'Global Reach' }), desc: t('valueGlobalDesc', { fallback: 'Serving brands across continents with localized support.' }) },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#173A63] to-[#2d5a8a] py-16 md:py-24">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{brand.name}</h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg">{brand.tagline}</p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-24">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] mb-6">{t('whoWeAre', { fallback: 'Who We Are' })}</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              {t('intro1', { fallback: 'Kelly Oral Care is a specialized oral care manufacturer dedicated to helping brands bring high-quality dental care products to market. From ready-made products to full custom formulation, we provide end-to-end manufacturing solutions.' })}
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t('intro2', { fallback: 'Our expertise spans toothpaste, mouthwash, tooth powder, toothbrushes, and teeth whitening products. We serve distributors, brand owners, and retailers worldwide with flexible MOQ and dedicated support.' })}
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 md:py-20 bg-[#F7F4EF]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] text-center mb-12">{t('whatWeDo', { fallback: 'What We Do' })}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-14 h-14 bg-[#EAF7FD] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🦷</span>
              </div>
              <h3 className="text-lg font-bold text-[#173A63] mb-2">{t('readyProducts', { fallback: 'Ready Products' })}</h3>
              <p className="text-sm text-gray-500">{t('readyProductsDesc', { fallback: 'Stock oral care products ready for immediate shipment.' })}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-14 h-14 bg-[#EAF7FD] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏷️</span>
              </div>
              <h3 className="text-lg font-bold text-[#173A63] mb-2">{t('privateLabel', { fallback: 'Private Label' })}</h3>
              <p className="text-sm text-gray-500">{t('privateLabelDesc', { fallback: 'Launch your own brand with our proven formulas and custom packaging.' })}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-14 h-14 bg-[#EAF7FD] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-lg font-bold text-[#173A63] mb-2">{t('oemOdm', { fallback: 'OEM / ODM' })}</h3>
              <p className="text-sm text-gray-500">{t('oemOdmDesc', { fallback: 'Full custom formula development and manufacturing from scratch.' })}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] text-center mb-12">{t('ourValues', { fallback: 'Our Values' })}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-12 h-12 bg-[#008FD5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-[#008FD5]" />
                </div>
                <h3 className="font-semibold text-[#173A63] mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#173A63] text-white">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('ctaTitle', { fallback: 'Partner With Us' })}</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">{t('ctaDesc', { fallback: 'Ready to start your oral care product line? Contact us for a free consultation.' })}</p>
          <a href={`/${locale}/contact`} className="inline-flex items-center gap-2 bg-[#008FD5] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0070a8] transition-colors">
            {t('ctaButton', { fallback: 'Contact Us' })}
          </a>
        </div>
      </section>
    </div>
  );
}
