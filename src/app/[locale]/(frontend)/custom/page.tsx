'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { CheckCircle, Upload, ArrowRight, Factory, ClipboardList, Package, Truck, Shield, FileCheck } from 'lucide-react';
import { mockCaseShows } from '@/lib/mock/data';
import { getI18nValue } from '@/lib/utils-i18n';

export default function CustomPage() {
  const t = useTranslations('custom_page');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { icon: ClipboardList, title: t('process_steps.step1_title'), desc: t('process_steps.step1_desc') },
    { icon: FileCheck, title: t('process_steps.step2_title'), desc: t('process_steps.step2_desc') },
    { icon: Package, title: t('process_steps.step3_title'), desc: t('process_steps.step3_desc') },
    { icon: Factory, title: t('process_steps.step4_title'), desc: t('process_steps.step4_desc') },
    { icon: Shield, title: t('process_steps.step5_title'), desc: t('process_steps.step5_desc') },
    { icon: Truck, title: t('process_steps.step6_title'), desc: t('process_steps.step6_desc') },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B3A5C] to-[#162f4a] py-16 text-center text-white lg:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold lg:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-gray-300">{t('subtitle')}</p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-[#1B3A5C]">{t('process_title')}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="relative rounded-lg border border-gray-200 p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#E8720C] text-sm font-bold text-white">{i + 1}</div>
                <step.icon className="mt-4 h-8 w-8 text-[#1B3A5C]" />
                <h3 className="mt-3 font-semibold text-[#1B3A5C]">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-[#1B3A5C]">{t('cases_title')}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {mockCaseShows.map((cs) => (
              <div key={cs.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg">
                <div className="aspect-[16/9] bg-gray-100">
                  <div className="flex h-full items-center justify-center"><Factory className="h-10 w-10 text-gray-300" /></div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[#1B3A5C]">{getI18nValue(cs.i18n, locale, 'title')}</h3>
                  <p className="mt-2 text-sm text-gray-500">{getI18nValue(cs.i18n, locale, 'description')}</p>
                  <div className="mt-3 text-xs text-gray-400">
                    <span className="font-medium">Client:</span> {getI18nValue(cs.i18n, locale, 'clientName')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Request Form */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-[#1B3A5C]">{t('form_title')}</h2>
          {submitted ? (
            <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-8 text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <p className="mt-4 text-lg font-medium text-green-700">{t('form_success')}</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="mt-8 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{t('form_material')}</label>
                  <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{t('form_dimensions')}</label>
                  <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{t('form_quantity')}</label>
                  <input type="number" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{t('form_craft')}</label>
                  <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{t('form_attachment')}</label>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-8 transition-colors hover:border-[#1B3A5C]">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Click or drag files to upload</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{t('form_description')}</label>
                <textarea rows={4} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
              </div>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-md bg-[#E8720C] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d4660a]">
                {t('form_submit')} <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
