'use client';

import { useLocale, useTranslations } from 'next-intl';
import { mockProducts } from '@/lib/mock/data';
import { getI18nValue } from '@/lib/utils-i18n';
import { Globe } from 'lucide-react';

export default function AdminI18nPage() {
  const locale = useLocale();
  const t = useTranslations('admin.i18n');
  const lang = locale;
  const allLangs = ['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es', 'ar'];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B3A5C] mb-6">{t('title')}</h1>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-[#1B3A5C]">{t('productTranslations')}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-500 font-medium sticky left-0 bg-gray-50">Product</th>
                {allLangs.map((l) => (
                  <th key={l} className="px-4 py-3 text-left text-gray-500 font-medium min-w-[150px]">{l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3 font-medium text-[#1B3A5C] sticky left-0 bg-white">{p.productCode}</td>
                  {allLangs.map((l) => {
                    const hasTranslation = (p.i18n || []).some((i) => i.langCode === l);
                    return (
                      <td key={l} className="px-4 py-3">
                        {hasTranslation ? (
                          <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">{getI18nValue(p.i18n, l, 'name').slice(0, 20)}...</span>
                        ) : (
                          <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded">{t('missing')}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
