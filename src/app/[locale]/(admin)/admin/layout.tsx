'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { LayoutDashboard, Package, Link2, MessageSquare, Wrench, FileText, Users, Settings, Languages, Menu, X, LogOut, ChevronDown, Home } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { localeNames } from '@/i18n/config';

const adminNavItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, labelKey: 'dashboard.title' },
  { href: '/admin/products', icon: Package, labelKey: 'products.title' },
  { href: '/admin/channels', icon: Link2, labelKey: 'channels.title' },
  { href: '/admin/inquiries', icon: MessageSquare, labelKey: 'inquiries.title' },
  { href: '/admin/custom-demands', icon: Wrench, labelKey: 'custom_demands' },
  { href: '/admin/content', icon: FileText, labelKey: 'content.title' },
  { href: '/admin/customers', icon: Users, labelKey: 'customers.title' },
  { href: '/admin/i18n', icon: Languages, labelKey: 'i18n.title' },
  { href: '/admin/settings', icon: Settings, labelKey: 'settings.title' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('admin');
  const tNav = useTranslations('nav');
  const locale = useLocale() as Locale;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 flex-shrink-0 flex-col bg-[#173A63] lg:flex">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-white/10">
            <span className="text-sm font-bold text-white">B</span>
          </div>
          <span className="text-lg font-bold text-white">Admin</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <item.icon className="h-4 w-4" />
                {t(item.labelKey as 'dashboard.title' | 'products.title' | 'channels.title' | 'inquiries.title' | 'custom_demands' | 'content.title' | 'customers.title' | 'i18n.title' | 'settings.title')}
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 p-4">
          <Link href={`/${locale}`} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white">
            <Home className="h-4 w-4" /> Back to Site
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-[#173A63]">
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
              <span className="text-lg font-bold text-white">Admin</span>
              <button onClick={() => setSidebarOpen(false)} className="text-white/70 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <nav className="p-4">
              <div className="space-y-1">
                {adminNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <item.icon className="h-4 w-4" />
                    {t(item.labelKey as 'dashboard.title' | 'products.title' | 'channels.title' | 'inquiries.title' | 'custom_demands' | 'content.title' | 'customers.title' | 'i18n.title' | 'settings.title')}
                  </Link>
                ))}
              </div>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
          <button onClick={() => setSidebarOpen(true)} className="rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-4">
            <div className="relative">
              <select className="appearance-none rounded-md border border-gray-200 bg-gray-50 py-1.5 pl-3 pr-8 text-sm focus:outline-none">
                <option>{localeNames[locale]?.name || locale}</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#173A63] flex items-center justify-center">
                <span className="text-xs font-medium text-white">A</span>
              </div>
              <span className="hidden text-sm font-medium text-gray-700 sm:inline">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
