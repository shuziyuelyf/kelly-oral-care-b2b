import { getTranslations } from 'next-intl/server';
import { mockDashboardStats } from '@/lib/mock/other';
import { Package, MessageSquare, Users, Clock, TrendingUp, FileText } from 'lucide-react';

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'admin.dashboard' });
  const stats = mockDashboardStats;

  const cards = [
    { icon: Package, label: t('totalProducts'), value: stats.totalProducts, color: 'bg-blue-50 text-blue-600' },
    { icon: MessageSquare, label: t('totalInquiries'), value: stats.totalInquiries, color: 'bg-green-50 text-green-600' },
    { icon: Users, label: t('totalCustomers'), value: stats.totalCustomers, color: 'bg-purple-50 text-purple-600' },
    { icon: Clock, label: t('pendingReviews'), value: stats.pendingReviews, color: 'bg-yellow-50 text-yellow-600' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B3A5C] mb-6">{t('title')}</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, i) => (
          <div key={i} className="bg-white rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold text-[#1B3A5C] mt-1">{card.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center"><MessageSquare className="w-5 h-5 text-[#E8720C]" /></div>
            <div><p className="text-sm text-gray-500">{t('todayInquiries')}</p><p className="text-xl font-bold text-[#1B3A5C]">{stats.todayInquiries}</p></div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center"><FileText className="w-5 h-5 text-[#E8720C]" /></div>
            <div><p className="text-sm text-gray-500">{t('todayCustomDemands')}</p><p className="text-xl font-bold text-[#1B3A5C]">{stats.todayCustomDemands}</p></div>
          </div>
        </div>
      </div>

      {/* Trend Chart Placeholder */}
      <div className="bg-white rounded-lg p-5 shadow-sm mb-8">
        <h3 className="font-semibold text-[#1B3A5C] mb-4">{t('inquiryTrend')}</h3>
        <div className="flex items-end gap-2 h-32">
          {stats.inquiryTrend.map((item, i) => {
            const maxCount = Math.max(...stats.inquiryTrend.map((d) => d.count));
            const height = (item.count / maxCount) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-[#E8720C]/20 rounded-t" style={{ height: `${height}%` }}>
                  <div className="w-full bg-[#E8720C] rounded-t" style={{ height: '100%' }} />
                </div>
                <span className="text-xs text-gray-400">{item.date.slice(5)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-5 border-b"><h3 className="font-semibold text-[#1B3A5C]">{t('recentInquiries')}</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50"><tr>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('inquiryNo')}</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('company')}</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('contact')}</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('status')}</th>
              <th className="px-4 py-3 text-left text-gray-500 font-medium">{t('date')}</th>
            </tr></thead>
            <tbody>
              {stats.recentInquiries.map((inq) => (
                <tr key={inq.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-[#1B3A5C]">{inq.inquiryNo}</td>
                  <td className="px-4 py-3">{inq.companyName}</td>
                  <td className="px-4 py-3">{inq.contactPerson}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      inq.status === 0 ? 'bg-yellow-50 text-yellow-700' :
                      inq.status === 1 ? 'bg-blue-50 text-blue-700' :
                      inq.status === 2 ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'
                    }`}>
                      {inq.status === 0 ? t('statusPending') : inq.status === 1 ? t('statusQuoted') : inq.status === 2 ? t('statusDealt') : t('statusClosed')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{inq.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
