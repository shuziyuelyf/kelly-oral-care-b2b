import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function FactoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'factory' });

  const productionLines = [
    { title: t('lineToothpaste', { fallback: 'Toothpaste Production' }), desc: t('lineToothpasteDesc', { fallback: 'Automated filling and packaging lines for toothpaste tubes of various sizes.' }), img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop' },
    { title: t('lineToothbrush', { fallback: 'Toothbrush Manufacturing' }), desc: t('lineToothbrushDesc', { fallback: 'Injection molding and bristle tufting for manual and bamboo toothbrushes.' }), img: 'https://images.unsplash.com/photo-1559650656-5d1d361ad10e?w=400&h=300&fit=crop' },
    { title: t('lineMouthwash', { fallback: 'Mouthwash & Liquid Products' }), desc: t('lineMouthwashDesc', { fallback: 'Liquid filling lines for mouthwash, breath sprays, and oral rinses.' }), img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop' },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-[#173A63] text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee15e?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative mx-auto w-[94%] max-w-[1360px] px-2 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">{t('heroTitle', { fallback: 'Our Manufacturing Facility' })}</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">{t('heroSubtitle', { fallback: 'State-of-the-art oral care manufacturing with strict quality control at every stage.' })}</p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] mb-6">{t('overviewTitle', { fallback: 'Built for Oral Care' })}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t('overviewDesc', { fallback: 'Our facility is purpose-built for oral care product manufacturing, with dedicated production lines, R&D labs, and quality control systems. Contact us for detailed facility specifications, production capacity, and audit arrangements.' })}
            </p>
          </div>
        </div>
      </section>

      {/* Production Lines */}
      <section className="py-16 md:py-20 bg-[#F7F4EF]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] mb-4 text-center">{t('linesTitle', { fallback: 'Production Lines' })}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">{t('linesDesc', { fallback: 'Specialized lines for different oral care product categories' })}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productionLines.map((line, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <img src={line.img} alt={line.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#173A63] mb-2">{line.title}</h3>
                  <p className="text-gray-600">{line.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] mb-6">{t('rdTitle', { fallback: 'R&D and Innovation' })}</h2>
              <p className="text-gray-600 mb-6">{t('rdDesc', { fallback: 'Our in-house R&D team develops new formulations, tests ingredients, and creates innovative oral care products tailored to market needs.' })}</p>
              <ul className="space-y-3">
                {['rdItem1', 'rdItem2', 'rdItem3', 'rdItem4'].map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#008FD5] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{t(key, { fallback: 'R&D capability' })}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=400&fit=crop" alt="R&D Lab" className="rounded-2xl shadow-lg w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Quality Control Preview */}
      <section className="py-16 md:py-20 bg-[#F7F4EF]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] mb-4">{t('qcTitle', { fallback: 'Quality Control' })}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">{t('qcDesc', { fallback: 'Every batch undergoes rigorous testing from raw material inspection to finished product release.' })}</p>
          <Link href={`/${locale}/quality`} className="inline-flex items-center gap-2 text-[#008FD5] font-semibold hover:gap-3 transition-all">
            {t('viewQuality', { fallback: 'View Quality Standards' })}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#173A63] text-white">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('ctaTitle', { fallback: 'Visit Our Factory' })}</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">{t('ctaDesc', { fallback: 'We welcome factory audits and site visits. Contact us to schedule an appointment.' })}</p>
          <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 bg-[#008FD5] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0070a8] transition-colors">
            {t('ctaButton', { fallback: 'Schedule a Visit' })}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
