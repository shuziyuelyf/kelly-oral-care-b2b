import { getTranslations } from 'next-intl/server';
import { mockCompanyInfo } from '@/lib/mock/other';
import { getI18nValue } from '@/lib/utils-i18n';
import { Award, Users, Factory, Target } from 'lucide-react';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const lang = locale;
  const company = mockCompanyInfo;
  const companyName = getI18nValue(company.i18n, lang, 'companyName');
  const introduction = getI18nValue(company.i18n, lang, 'introduction');
  let history: { year: string; event: string }[] = [];
  let honors: { title: string; image: string }[] = [];
  try { history = JSON.parse(company.history || '[]'); } catch { /* empty */ }
  try { honors = JSON.parse(company.honors || '[]'); } catch { /* empty */ }

  const stats = [
    { icon: Factory, value: '50,000m²', label: t('factoryArea') },
    { icon: Users, value: '200+', label: t('employees') },
    { icon: Award, value: '14+', label: t('yearsExperience') },
    { icon: Target, value: '50+', label: t('countries') },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#173A63] to-[#2d5a8a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{companyName}</h1>
          <p className="text-gray-200 max-w-2xl mx-auto">{getI18nValue(company.i18n, lang, 'slogan')}</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: introduction }} />
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-lg">
                <stat.icon className="w-8 h-8 text-[#008FD5] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[#173A63]">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#173A63] text-center mb-10">{t('history')}</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />
            {history.map((item, i) => (
              <div key={i} className={`flex items-center gap-8 mb-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="inline-block bg-white p-4 rounded-lg shadow-sm border">
                    <div className="text-[#008FD5] font-bold text-lg">{item.year}</div>
                    <div className="text-gray-600 text-sm mt-1">{item.event}</div>
                  </div>
                </div>
                <div className="w-4 h-4 bg-[#008FD5] rounded-full border-4 border-white shadow z-10" />
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Honors */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#173A63] text-center mb-10">{t('honors')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {honors.map((honor, i) => (
              <div key={i} className="bg-white p-6 rounded-lg text-center shadow-sm">
                <Award className="w-8 h-8 text-[#008FD5] mx-auto mb-3" />
                <p className="font-medium text-[#173A63] text-sm">{honor.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
