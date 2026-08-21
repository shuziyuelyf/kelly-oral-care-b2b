'use client';

import { useLocale, useTranslations } from 'next-intl';
import { mockCustomDemands } from '@/lib/mock/other';

export default function AdminCustomDemandsPage() {
  const locale = useLocale();
  const t = useTranslations('admin.customDemands');
  const statusMap: Record<number, { label: string; cls: string }> = {
    0: { label: t('statusPending'), cls: 'bg-yellow-50 text-yellow-700' },
    1: { label: t('statusProcessing'), cls: 'bg-blue-50 text-blue-700' },
    2: { label: t('statusQuoted'), cls: 'bg-green-50 text-green-700' },
    3: { label: t('statusCompleted'), cls: 'bg-purple-50 text-purple-700' },
    4: { label: t('statusClosed'), cls: 'bg-gray-100 text-gray-600' },
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#173A63] mb-6">{t('title')}</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50"><tr>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('demandNo')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('company')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('productType')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('material')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('quantity')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('budget')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('status')}</th>
            <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('date')}</th>
          </tr></thead>
          <tbody>
            {mockCustomDemands.map((d) => (
              <tr key={d.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-[#173A63]">{d.demandNo}</td>
                <td className="px-4 py-3">{d.companyName}</td>
                <td className="px-4 py-3">{d.productType}</td>
                <td className="px-4 py-3">{d.material}</td>
                <td className="px-4 py-3">{d.quantity?.toLocaleString()}</td>
                <td className="px-4 py-3">{d.budget ? `$${d.budget.toLocaleString()}` : '-'}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-medium ${statusMap[d.status].cls}`}>{statusMap[d.status].label}</span></td>
                <td className="px-4 py-3 text-gray-500">{d.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
