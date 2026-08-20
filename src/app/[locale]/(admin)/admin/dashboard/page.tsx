'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Package, MessageSquare, Users, Clock, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { mockDashboardStats, mockInquiries } from '@/lib/mock/data';
import { getI18nValue, formatDate } from '@/lib/utils-i18n';

export default function DashboardPage() {
  const t = useTranslations('admin');
  const locale = useLocale();
  const stats = mockDashboardStats;

  const statCards = [
    { label: t('total_products'), value: stats.totalProducts, icon: Package, color: 'bg-blue-500', change: '+12%', up: true },
    { label: t('total_inquiries'), value: stats.totalInquiries, icon: MessageSquare, color: 'bg-emerald-500', change: '+8%', up: true },
    { label: t('total_customers'), value: stats.totalCustomers, icon: Users, color: 'bg-violet-500', change: '+5%', up: true },
    { label: t('pending_reviews'), value: stats.pendingReviews, icon: Clock, color: 'bg-amber-500', change: '-2', up: false },
  ];

  const maxTrend = Math.max(...stats.inquiryTrend.map((d) => d.count));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{t('dashboard')}</h1>

      {/* Stats Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.color}`}>
                <card.icon className="h-5 w-5 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${card.up ? 'text-green-600' : 'text-red-500'}`}>
                {card.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {card.change}
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold text-gray-900">{card.value}</div>
            <div className="text-sm text-gray-500">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Trend Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{t('trends')}</h2>
            <span className="text-sm text-gray-500">Last 7 days</span>
          </div>
          <div className="mt-6 flex h-48 items-end gap-2">
            {stats.inquiryTrend.map((d) => (
              <div key={d.date} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-md bg-[#1B3A5C]/80 transition-all hover:bg-[#E8720C]" style={{ height: `${(d.count / maxTrend) * 100}%` }} />
                <span className="text-[10px] text-gray-400">{d.date.slice(5)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">{t('recent_inquiries')}</h2>
          <div className="mt-4 space-y-3">
            {stats.recentInquiries.slice(0, 5).map((inq) => (
              <div key={inq.id} className="rounded-lg border border-gray-100 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{inq.contactName}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    inq.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    inq.status === 'quoted' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>{inq.status}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{inq.companyName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
