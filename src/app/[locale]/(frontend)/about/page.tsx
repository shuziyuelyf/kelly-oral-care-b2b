'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Factory, Award, Users, Globe } from 'lucide-react';
import { mockTimeline, mockCertifications } from '@/lib/mock/data';

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B3A5C] to-[#162f4a] py-16 text-center text-white lg:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold lg:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-gray-300">{t('subtitle')}</p>
        </div>
      </section>

      {/* Company Intro */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-[#1B3A5C]">{t('intro_title')}</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">{t('intro_desc')}</p>
              <p className="mt-4 text-gray-600">
                Our comprehensive product range includes CNC machining centers, hydraulic systems, electronic components, and raw materials. We serve clients across aerospace, automotive, electronics, and construction industries in over 50 countries.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                  <Factory className="h-8 w-8 text-[#E8720C]" />
                  <div>
                    <div className="text-2xl font-bold text-[#1B3A5C]">50,000</div>
                    <div className="text-sm text-gray-500">m² Factory Area</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                  <Users className="h-8 w-8 text-[#E8720C]" />
                  <div>
                    <div className="text-2xl font-bold text-[#1B3A5C]">500+</div>
                    <div className="text-sm text-gray-500">Employees</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                  <Globe className="h-8 w-8 text-[#E8720C]" />
                  <div>
                    <div className="text-2xl font-bold text-[#1B3A5C]">50+</div>
                    <div className="text-sm text-gray-500">Countries</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                  <Award className="h-8 w-8 text-[#E8720C]" />
                  <div>
                    <div className="text-2xl font-bold text-[#1B3A5C]">20+</div>
                    <div className="text-sm text-gray-500">Years</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-80 w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#1B3A5C]/5 to-[#E8720C]/5 lg:h-[450px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Factory className="h-32 w-32 text-[#1B3A5C]/10" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1B3A5C]/80 to-transparent p-6">
                  <p className="text-white">{t('factory_desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-[#1B3A5C]">{t('timeline_title')}</h2>
          <div className="relative mt-12">
            {/* Line */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gray-200 hidden md:block" />
            <div className="space-y-8">
              {mockTimeline.map((item, i) => (
                <div key={item.year} className={`flex items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                      <div className="text-2xl font-bold text-[#E8720C]">{item.year}</div>
                      <p className="mt-1 text-gray-600">{item.i18n[locale as keyof typeof item.i18n] || item.i18n.en}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1B3A5C] text-sm font-bold text-white">{item.year.slice(-2)}</div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-[#1B3A5C]">{t('cert_title')}</h2>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            {mockCertifications.map((cert) => (
              <div key={cert.id} className="flex h-28 w-40 flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all hover:shadow-md">
                <Award className="h-8 w-8 text-[#E8720C]" />
                <span className="mt-2 text-center text-sm font-medium text-[#1B3A5C]">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
