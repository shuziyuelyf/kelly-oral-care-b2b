'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Settings, Users, Shield, FileText } from 'lucide-react';

export default function AdminSettingsPage() {
  const locale = useLocale();
  const t = useTranslations('admin.settings');

  const sections = [
    { icon: Settings, title: t('siteSettings'), desc: t('siteSettingsDesc'), items: ['Site Name', 'Logo', 'Contact Info', 'SEO Settings'] },
    { icon: Users, title: t('adminManagement'), desc: t('adminManagementDesc'), items: ['Admin List', 'Add Admin', 'Reset Password'] },
    { icon: Shield, title: t('rolePermissions'), desc: t('rolePermissionsDesc'), items: ['Role List', 'Permission Matrix', 'Access Control'] },
    { icon: FileText, title: t('operationLogs'), desc: t('operationLogsDesc'), items: ['Recent Logs', 'Export Logs', 'Log Settings'] },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B3A5C] mb-6">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#1B3A5C]/10 rounded-lg flex items-center justify-center">
                <section.icon className="w-5 h-5 text-[#1B3A5C]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1B3A5C]">{section.title}</h3>
                <p className="text-sm text-gray-500">{section.desc}</p>
              </div>
            </div>
            <ul className="space-y-2">
              {section.items.map((item, j) => (
                <li key={j} className="text-sm text-gray-600 hover:text-[#E8720C] cursor-pointer py-1 border-b border-gray-50 last:border-0">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
