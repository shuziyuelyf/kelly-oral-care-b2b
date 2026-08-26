'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Upload, Send, CheckCircle, Settings, Ruler, Package, Wrench } from 'lucide-react';
import { mockCaseShows, mockCustomOptions } from '@/lib/mock/other';
import { getI18nValue } from '@/lib/utils-i18n';

export default function CustomPage() {
  const locale = useLocale();
  const t = useTranslations('custom');
  const lang = locale;
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { icon: Send, title: t('step1Title'), desc: t('step1Desc') },
    { icon: Settings, title: t('step2Title'), desc: t('step2Desc') },
    { icon: CheckCircle, title: t('step3Title'), desc: t('step3Desc') },
    { icon: Package, title: t('step4Title'), desc: t('step4Desc') },
  ];

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#173A63] to-[#2d5a8a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-gray-200 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#173A63] text-center mb-10">{t('processTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 mx-auto bg-[#008FD5]/10 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-[#008FD5]" />
                </div>
                <div className="text-sm text-[#008FD5] font-medium mb-1">Step {i + 1}</div>
                <h3 className="font-semibold text-[#173A63]">{step.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Shows */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#173A63] text-center mb-10">{t('caseTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCaseShows.map((c) => (
              <div key={c.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img src={c.coverImage || undefined} alt={getI18nValue(c.i18n, lang, 'title')} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-6">
                  <h3 className="font-semibold text-[#173A63] text-lg">{getI18nValue(c.i18n, lang, 'title')}</h3>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">{t('industry')}:</span> <span className="text-gray-700">{getI18nValue(c.i18n, lang, 'industry')}</span></div>
                    <div><span className="text-gray-500">{t('material')}:</span> <span className="text-gray-700">{getI18nValue(c.i18n, lang, 'material')}</span></div>
                    <div><span className="text-gray-500">{t('craft')}:</span> <span className="text-gray-700">{getI18nValue(c.i18n, lang, 'craft')}</span></div>
                    <div><span className="text-gray-500">{t('client')}:</span> <span className="text-gray-700">{getI18nValue(c.i18n, lang, 'customerName')}</span></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{getI18nValue(c.i18n, lang, 'summary')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#173A63] text-center mb-10">{t('formTitle')}</h2>
          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">{t('submitSuccess')}</h3>
              <p className="text-gray-500 mt-2">{t('submitSuccessDesc')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.productType')} *</label>
                  <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.quantity')} *</label>
                  <input type="number" required min={1} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.material')}</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]">
                  <option value="">{t('form.selectOption')}</option>
                  {mockCustomOptions.find(o => o.optionCode === 'material')?.values?.map(v => (
                    <option key={v.id} value={v.id}>{getI18nValue(v.i18n, lang, 'valueName')}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.craft')}</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]">
                  <option value="">{t('form.selectOption')}</option>
                  {mockCustomOptions.find(o => o.optionCode === 'craft')?.values?.map(v => (
                    <option key={v.id} value={v.id}>{getI18nValue(v.i18n, lang, 'valueName')}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.sizeSpec')}</label>
                <input type="text" placeholder={t('form.sizeSpecPlaceholder')} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.description')} *</label>
                <textarea required rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.attachment')}</label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-[#008FD5] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">{t('form.uploadHint')}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.contactName')} *</label>
                  <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.contactEmail')} *</label>
                  <input type="email" required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-[#008FD5] text-white font-medium rounded-lg hover:bg-[#0070a8] transition-colors">
                {t('form.submit')}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Cross-guidance to Private Label */}
      <section className="py-16 bg-[#EAF7FD]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-[#173A63] mb-4">Looking for a faster way to start your brand?</h3>
          <p className="text-gray-500 mb-6">Choose from 50+ proven formulas and launch your oral care product line in weeks — not months.</p>
          <Link href="/private-label" className="inline-flex items-center gap-2 rounded-full bg-[#008FD5] px-10 py-4 text-base font-semibold text-white hover:bg-[#0070a8] transition-colors">
            Explore Private Label →
          </Link>
        </div>
      </section>
    </div>
  );
}
