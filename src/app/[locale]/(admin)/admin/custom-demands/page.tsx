'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Eye, Edit } from 'lucide-react';
import { mockCustomDemands } from '@/lib/mock/data';
import { formatDate } from '@/lib/utils-i18n';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-blue-100 text-blue-700',
  quoted: 'bg-purple-100 text-purple-700',
  confirmed: 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminCustomDemandsPage() {
  const t = useTranslations('admin');
  const locale = useLocale();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{t('custom_demands')}</h1>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Material</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Craft</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">{t('status')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">{t('created_at')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockCustomDemands.map((cd) => (
                <tr key={cd.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{cd.contactName}</span>
                      <span className="block text-xs text-gray-400">{cd.companyName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{cd.material}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{cd.quantity}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{cd.craft}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[cd.status] || 'bg-gray-100 text-gray-600'}`}>{cd.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(cd.createdAt, locale)}</td>
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
