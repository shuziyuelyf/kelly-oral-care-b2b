'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { Eye, Edit, MessageSquare } from 'lucide-react';
import { mockInquiries } from '@/lib/mock/data';
import { formatDate } from '@/lib/utils-i18n';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  quoted: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminInquiriesPage() {
  const t = useTranslations('admin');
  const locale = useLocale();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = filterStatus === 'all' ? mockInquiries : mockInquiries.filter((i) => i.status === filterStatus);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{t('inquiries')}</h1>

      <div className="mt-6 flex gap-2">
        {['all', 'pending', 'quoted', 'confirmed', 'completed', 'cancelled'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${filterStatus === s ? 'bg-[#1B3A5C] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {s === 'all' ? 'All' : s}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Items</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">{t('status')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">{t('created_at')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((inq) => (
                <tr key={inq.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{inq.contactName}</span>
                      <span className="block text-xs text-gray-400">{inq.contactEmail}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{inq.companyName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{inq.items.length} items</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">${inq.totalAmount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[inq.status] || 'bg-gray-100 text-gray-600'}`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(inq.createdAt, locale)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-[#1B3A5C]"><Eye className="h-4 w-4" /></button>
                      <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-[#1B3A5C]"><Edit className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
