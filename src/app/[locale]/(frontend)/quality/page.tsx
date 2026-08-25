import { getTranslations } from 'next-intl/server';

export default async function QualityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'quality' });

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#173A63] text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t('heroTitle')}</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">{t('heroSubtitle')}</p>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4 text-center">{t('certTitle')}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">{t('certDesc')}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'ISO 22716', desc: t('certIso22716') },
              { name: 'ISO 9001', desc: t('certIso9001') },
              { name: 'GMP', desc: t('certGmp') },
              { name: 'FDA', desc: t('certFda') },
              { name: 'CE', desc: t('certCe') },
              { name: 'SGS', desc: t('certSgs') },
              { name: 'HACCP', desc: t('certHaccp') },
              { name: 'ISO 14001', desc: t('certIso14001') },
            ].map((cert, i) => (
              <div key={i} className="bg-[#F7F4EF] rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-[#008FD5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#008FD5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#173A63] mb-1">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control Process */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4 text-center">{t('processTitle')}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">{t('processDesc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: t('step1Title'), desc: t('step1Desc') },
              { step: '02', title: t('step2Title'), desc: t('step2Desc') },
              { step: '03', title: t('step3Title'), desc: t('step3Desc') },
              { step: '04', title: t('step4Title'), desc: t('step4Desc') },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-4xl font-bold text-[#008FD5]/20 mb-2">{item.step}</div>
                <h3 className="text-lg font-bold text-[#173A63] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Lab */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop" alt="Testing Lab" className="rounded-2xl shadow-lg w-full" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-6">{t('labTitle')}</h2>
              <p className="text-gray-600 mb-6">{t('labDesc')}</p>
              <ul className="space-y-3">
                {['labItem1', 'labItem2', 'labItem3', 'labItem4'].map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#008FD5] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#173A63] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('ctaTitle')}</h2>
          <p className="text-white/80 text-lg mb-8">{t('ctaDesc')}</p>
          <a href={`/${locale}/contact`} className="inline-flex items-center gap-2 bg-[#008FD5] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0077b3] transition-colors">
            {t('ctaButton')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
