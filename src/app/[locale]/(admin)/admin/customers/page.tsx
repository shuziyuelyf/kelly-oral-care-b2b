'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { mockCustomers } from '@/lib/mock/other';
import { Check, X, Eye } from 'lucide-react';

export default function AdminCustomersPage() {
  const locale = useLocale();
  const t = useTranslations('admin.customers');
  const [filter, setFilter] = useState<number | null>(null);

  const filtered = filter !== null ? mockCustomers.filter((c) => c.auditStatus === filter) : mockCustomers;
  const auditMap: Record<number, { label: string; cls: string }> = {
    0: { label: t('auditPending'), cls: 'bg-yellow-50 text-yellow-700' },
    1: { label: t('auditApproved'), cls: 'bg-green-50 text-green-700' },
    2: { label: t('auditRejected'), cls: 'bg-red-50 text-red-700' },
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B3A5C] mb-6">{t('title')}</h1>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter(null)} className={`px-3 py-1.5 rounded text-sm ${filter === null ? 'bg-[#1B3A5C] text-white' : 'bg-gray-100 text-gray-600'}`}>{t('all')}</button>
        {[0, 1, 2].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded text-sm ${filter === s ? 'bg-[#1B3A5C] text-white' : 'bg-gray-100 text-gray-600'}`}>{auditMap[s].label}</button>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50"><tr>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('companyName')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('creditCode')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('contact')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('industry')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('auditStatus')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('actions')}</th>
          </tr></thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-[#1B3A5C]">{c.companyName}</td>
                <td className="px-4 py-3 text-gray-500">{c.creditCode}</td>
                <td className="px-4 py-3">{c.contactPerson}<br /><span className="text-xs text-gray-400">{c.contactEmail}</span></td>
                <td className="px-4 py-3">{c.industry}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${auditMap[c.auditStatus].cls}`}>{auditMap[c.auditStatus].label}</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded" title={t('view')}><Eye className="w-4 h-4 text-gray-400" /></button>
                    {c.auditStatus === 0 && (
                      <>
                        <button className="p-1 hover:bg-green-50 rounded" title={t('approve')}><Check className="w-4 h-4 text-green-500" /></button>
                        <button className="p-1 hover:bg-red-50 rounded" title={t('reject')}><X className="w-4 h-4 text-red-500" /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
