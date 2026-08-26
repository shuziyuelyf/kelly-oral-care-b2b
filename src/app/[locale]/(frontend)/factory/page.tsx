import { getTranslations } from 'next-intl/server';

export default async function FactoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'factory' });

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#173A63] text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee15e?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t('heroTitle')}</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">{t('heroSubtitle')}</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#008FD5] mb-2">15,000</div>
              <div className="text-gray-600">{t('statFactory')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#008FD5] mb-2">12</div>
              <div className="text-gray-600">{t('statLines')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#008FD5] mb-2">500K</div>
              <div className="text-gray-600">{t('statCapacity')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#008FD5] mb-2">200+</div>
              <div className="text-gray-600">{t('statWorkers')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Lines */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4 text-center">{t('linesTitle')}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">{t('linesDesc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: t('lineToothpaste'), desc: t('lineToothpasteDesc'), img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop' },
              { title: t('lineToothbrush'), desc: t('lineToothbrushDesc'), img: 'https://images.unsplash.com/photo-1559650656-5d1d361ad10e?w=400&h=300&fit=crop' },
              { title: t('lineMouthwash'), desc: t('lineMouthwashDesc'), img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop' },
            ].map((line, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
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

      {/* R&D Section */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-6">{t('rdTitle')}</h2>
              <p className="text-gray-600 mb-6">{t('rdDesc')}</p>
              <ul className="space-y-3">
                {['rdItem1', 'rdItem2', 'rdItem3', 'rdItem4'].map((key) => (
                  <li key={key} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#008FD5] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{t(key)}</span>
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
