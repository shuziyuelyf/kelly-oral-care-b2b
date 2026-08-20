'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { Eye, Edit, Check, X, Users } from 'lucide-react';
import { mockCustomers } from '@/lib/mock/data';
import { formatDate } from '@/lib/utils-i18n';

export default function AdminCustomersPage() {
  const t = useTranslations('admin');
  const locale = useLocale();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = filterStatus === 'all' ? mockCustomers : mockCustomers.filter((c) => c.status === filterStatus);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{t('customers')}</h1>

      <div className="mt-6 flex gap-2">
        {['all', 'pending', 'approved', 'rejected'].map((s) => (
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
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Group</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">{t('status')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">{t('created_at')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-[#1B3A5C]/10"><Users className="h-4 w-4 text-[#1B3A5C]" /></div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">{cust.companyName}</span>
                        <span className="block text-xs text-gray-400">{cust.creditCode}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{cust.contactPerson}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{cust.contactEmail}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{cust.group || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      cust.status === 'approved' ? 'bg-green-100 text-green-700' :
                      cust.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>{cust.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(cust.createdAt, locale)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-[#1B3A5C]"><Eye className="h-4 w-4" /></button>
                      <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-[#1B3A5C]"><Edit className="h-4 w-4" /></button>
                      {cust.status === 'pending' && (
                        <>
                          <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-green-600"><Check className="h-4 w-4" /></button>
                          <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"><X className="h-4 w-4" /></button>
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
    </div>
  );
}
