'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { mockInquiries } from '@/lib/mock/other';

export default function AdminInquiriesPage() {
  const locale = useLocale();
  const t = useTranslations('admin.inquiries');
  const [statusFilter, setStatusFilter] = useState<number | null>(null);

  const filtered = statusFilter !== null ? mockInquiries.filter((i) => i.status === statusFilter) : mockInquiries;
  const statusMap: Record<number, { label: string; cls: string }> = {
    0: { label: t('statusPending'), cls: 'bg-yellow-50 text-yellow-700' },
    1: { label: t('statusQuoted'), cls: 'bg-blue-50 text-blue-700' },
    2: { label: t('statusDealt'), cls: 'bg-green-50 text-green-700' },
    3: { label: t('statusClosed'), cls: 'bg-gray-100 text-gray-600' },
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B3A5C] mb-6">{t('title')}</h1>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setStatusFilter(null)} className={`px-3 py-1.5 rounded text-sm ${statusFilter === null ? 'bg-[#1B3A5C] text-white' : 'bg-gray-100 text-gray-600'}`}>{t('all')}</button>
        {[0, 1, 2, 3].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded text-sm ${statusFilter === s ? 'bg-[#1B3A5C] text-white' : 'bg-gray-100 text-gray-600'}`}>{statusMap[s].label}</button>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50"><tr>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('inquiryNo')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('company')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('contact')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('items')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('amount')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('status')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('date')}</th>
          </tr></thead>
          <tbody>
            {filtered.map((inq) => (
              <tr key={inq.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-[#1B3A5C]">{inq.inquiryNo}</td>
                <td className="px-4 py-3">{inq.companyName}</td>
                <td className="px-4 py-3">{inq.contactPerson}<br /><span className="text-xs text-gray-400">{inq.contactEmail}</span></td>
                <td className="px-4 py-3">{inq.itemCount}</td>
                <td className="px-4 py-3">{inq.totalAmount ? `$${inq.totalAmount.toLocaleString()}` : '-'}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${statusMap[inq.status].cls}`}>{statusMap[inq.status].label}</span></td>
                <td className="px-4 py-3 text-gray-500">{inq.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
