import { getTranslations } from 'next-intl/server';
import { brand } from '@/lib/brand';
import {
  Award, Target, Leaf, Globe,
  Package, Languages, BadgeCheck, Factory,
  FlaskConical, ShieldCheck, Gauge,
  Rocket, Hammer, FileCheck, Handshake,
} from 'lucide-react';

const WHO_IMG = 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=700&h=520&fit=crop';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const stats = [
    { value: t('stat1Value', { fallback: '5' }), label: t('stat1Label', { fallback: 'Product Categories' }), desc: t('stat1Desc', { fallback: 'Toothpaste, mouthwash, tooth powder, toothbrushes and whitening' }), icon: Package },
    { value: t('stat2Value', { fallback: '7' }), label: t('stat2Label', { fallback: 'Languages Served' }), desc: t('stat2Desc', { fallback: 'Global support in seven languages' }), icon: Languages },
    { value: t('stat3Value', { fallback: 'Flexible' }), label: t('stat3Label', { fallback: 'MOQ' }), desc: t('stat3Desc', { fallback: 'Flexible minimum order quantities for every partner' }), icon: BadgeCheck },
    { value: t('stat4Value', { fallback: 'One-stop' }), label: t('stat4Label', { fallback: 'OEM / ODM' }), desc: t('stat4Desc', { fallback: 'End-to-end custom development and manufacturing' }), icon: Factory },
  ];

  const whys = [
    { icon: FlaskConical, title: t('rdTitle', { fallback: 'In-House R&D & Formulation' }), desc: t('rdDesc', { fallback: 'Our formulation team develops bespoke oral care recipes to match your brand positioning.' }), bg: 'bg-[#EAF7FD]' },
    { icon: ShieldCheck, title: t('qualityTitle', { fallback: 'Strict Quality Control & Certifications' }), desc: t('qualityDesc', { fallback: 'Manufacturing under GMP and ISO standards, with full traceability from raw material to finished goods.' }), bg: 'bg-[#F7F4EF]' },
    { icon: Gauge, title: t('moqTitle', { fallback: 'Flexible MOQ & Fast Sampling' }), desc: t('moqDesc', { fallback: 'Start small with flexible minimums and rapid sampling to validate your market before scaling up.' }), bg: 'bg-[#EAF7FD]' },
    { icon: Globe, title: t('globalTitle', { fallback: 'Global Export & Multilingual Support' }), desc: t('globalDesc', { fallback: 'We export to brands and distributors worldwide with dedicated, multilingual account support.' }), bg: 'bg-[#F7F4EF]' },
  ];

  // placeholder milestone year, replace with real company history
  const year = t('milestoneYear', { fallback: '20XX' });
  const stages = [
    { icon: Rocket, title: t('stage1Title', { fallback: 'Brand Foundation' }), desc: t('stage1Desc', { fallback: 'Building our first formulation and manufacturing capabilities.' }), tail: 'bg-[#008FD5]' },
    { icon: Hammer, title: t('stage2Title', { fallback: 'Production & Capacity Expansion' }), desc: t('stage2Desc', { fallback: 'Scaling production lines to meet growing export demand.' }), tail: 'bg-[#008FD5]' },
    { icon: FileCheck, title: t('stage3Title', { fallback: 'International Quality Certification' }), desc: t('stage3Desc', { fallback: 'Achieving international certifications to serve global partners with confidence.' }), tail: 'bg-[#008FD5]' },
    { icon: Handshake, title: t('stage4Title', { fallback: 'Serving Global Brands & Private Label' }), desc: t('stage4Desc', { fallback: 'Supporting brands worldwide with private label and full OEM/ODM programs.' }), tail: 'bg-[#008FD5]' },
  ];

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] mb-6">{t('whoWeAre', { fallback: 'Who We Are' })}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">{t('intro1', { fallback: 'Kelly Oral Care is a specialized oral care manufacturer dedicated to helping brands bring high-quality dental care products to market.' })}</p>
              <p className="text-gray-600 text-lg leading-relaxed">{t('intro2', { fallback: 'Our expertise spans toothpaste, mouthwash, tooth powder, toothbrushes, and teeth whitening products.' })}</p>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={WHO_IMG}
                alt={t('whoWeAreImgAlt', { fallback: 'Kelly Oral Care factory and laboratory' })}
                className="w-full rounded-2xl shadow-lg object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Capability strip */}
      <section className="bg-[#F3F5F7] py-14 md:py-18">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] text-center mb-10">{t('statsTitle', { fallback: 'Kelly at a Glance' })}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-[#008FD5]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-6 h-6 text-[#008FD5]" />
                </div>
                <div className="text-3xl font-bold text-[#173A63]">{s.value}</div>
                <div className="text-sm font-semibold text-[#008FD5] mt-1">{s.label}</div>
                <p className="text-xs text-gray-500 mt-2">{s.desc}</p>
              </div>
            ))}
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

      {/* Why Choose Us */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] text-center mb-12">{t('whyUsTitle', { fallback: 'Why Choose Us' })}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whys.map((w, i) => (
              <div key={i} className={`${w.bg} rounded-2xl p-8`}>
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  <w.icon className="w-6 h-6 text-[#008FD5]" />
                </div>
                <h3 className="text-lg font-bold text-[#173A63] mb-2">{w.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-[#EAF7FD]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] text-center mb-12">{t('ourValues', { fallback: 'Our Values' })}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white text-center p-6 rounded-2xl shadow-sm">
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

      {/* Journey Timeline */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] text-center mb-4">{t('journeyTitle', { fallback: 'Our Journey' })}</h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">{t('journeySubtitle', { fallback: 'Four phases of growth, from brand foundation to global private-label service.' })}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {stages.map((st, i) => (
              <div key={i} className="relative pl-6 md:pl-0 md:text-center">
                {/* connector (horizontal on lg, vertical on small handled by index) */}
                <div className={`hidden lg:block absolute top-6 h-0.5 w-full ${i < stages.length - 1 ? st.tail : 'bg-transparent'}`} style={{ left: i === 0 ? '50%' : undefined, right: i === stages.length - 1 ? '50%' : undefined }} />
                <span className={`absolute left-0 lg:relative lg:inline-flex lg:mb-4 w-12 h-12 rounded-full bg-[#008FD5] text-white items-center justify-center`}>
                  <st.icon className="w-5 h-5 align-middle" />
                </span>
                <div className="text-sm font-bold text-[#008FD5] mb-1 mt-3 lg:mt-2">{year}</div>
                <h3 className="font-semibold text-[#173A63] mb-2">{st.title}</h3>
                <p className="text-sm text-gray-500">{st.desc}</p>
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