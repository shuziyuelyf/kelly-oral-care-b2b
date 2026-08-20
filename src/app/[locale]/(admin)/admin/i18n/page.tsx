'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { Languages, Edit, Check } from 'lucide-react';
import { mockProducts } from '@/lib/mock/data';
import { getI18nValue } from '@/lib/utils-i18n';
import { localeNames, type Locale } from '@/i18n/config';

export default function AdminI18nPage() {
  const t = useTranslations('admin');
  const locale = useLocale();
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [editLang, setEditLang] = useState<Locale>('en');

  const product = mockProducts[selectedProduct];
  const currentI18n = product.i18n.find((i) => i.locale === editLang) || product.i18n[0];
  const languages: Locale[] = ['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es', 'ar'];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{t('i18n')}</h1>
      <p className="mt-2 text-sm text-gray-500">Manage translations for all content across 7 languages.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-4">
        {/* Left: Content selector */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700">Products</h3>
          <div className="mt-3 space-y-1">
            {mockProducts.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(idx)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${selectedProduct === idx ? 'bg-[#1B3A5C] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {getI18nValue(p.i18n, locale, 'name')}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Translation editor */}
        <div className="lg:col-span-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-900">{getI18nValue(product.i18n, locale, 'name')}</h3>
            <div className="flex gap-1">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setEditLang(lang)}
                  className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${editLang === lang ? 'bg-[#1B3A5C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {localeNames[lang]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input type="text" defaultValue={currentI18n.name} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Short Description</label>
              <textarea defaultValue={currentI18n.shortDescription} rows={2} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea defaultValue={currentI18n.description} rows={4} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Keywords</label>
              <input type="text" defaultValue={currentI18n.keywords || ''} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none" />
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-[#1B3A5C] px-4 py-2 text-sm font-medium text-white hover:bg-[#153050]">
              <Check className="h-4 w-4" /> Save Translation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
