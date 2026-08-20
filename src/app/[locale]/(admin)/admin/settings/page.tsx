'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Settings, Users, Shield, FileText, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const t = useTranslations('admin');

  const tabs = [
    { key: 'general', label: 'General', icon: Settings },
    { key: 'admins', label: 'Admins', icon: Users },
    { key: 'roles', label: 'Roles & Permissions', icon: Shield },
    { key: 'logs', label: 'Operation Logs', icon: FileText },
  ];
  const [tab, setTab] = useState('general');

  const mockAdmins = [
    { id: '1', name: 'Super Admin', email: 'admin@company.com', role: 'Super Admin', lastLogin: '2026-03-15' },
    { id: '2', name: 'Product Manager', email: 'pm@company.com', role: 'Product Manager', lastLogin: '2026-03-14' },
    { id: '3', name: 'Content Editor', email: 'editor@company.com', role: 'Content Editor', lastLogin: '2026-03-13' },
  ];

  const mockRoles = [
    { id: '1', name: 'Super Admin', permissions: ['all'], users: 1 },
    { id: '2', name: 'Product Manager', permissions: ['products', 'channels', 'inquiries'], users: 2 },
    { id: '3', name: 'Content Editor', permissions: ['content', 'news', 'banners'], users: 3 },
    { id: '4', name: 'Sales', permissions: ['inquiries', 'customers'], users: 5 },
  ];

  const mockLogs = [
    { id: '1', admin: 'Super Admin', action: 'Update product', target: 'LED Panel X1', time: '2026-03-15 14:30', ip: '192.168.1.1' },
    { id: '2', admin: 'Product Manager', action: 'Add channel', target: 'WhatsApp - LED Panel', time: '2026-03-15 13:20', ip: '192.168.1.2' },
    { id: '3', admin: 'Content Editor', action: 'Publish news', target: 'Exhibition 2026', time: '2026-03-15 11:00', ip: '192.168.1.3' },
    { id: '4', admin: 'Super Admin', action: 'Approve customer', target: 'TechCorp Ltd', time: '2026-03-14 16:45', ip: '192.168.1.1' },
    { id: '5', admin: 'Sales', action: 'Quote inquiry', target: 'INQ-20260301', time: '2026-03-14 10:30', ip: '192.168.1.4' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{t('settings')}</h1>

      <div className="mt-6 flex gap-1 border-b border-gray-200">
        {tabs.map((tb) => (
          <button
            key={tb.key}
            onClick={() => setTab(tb.key)}
            className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${tab === tb.key ? 'border-[#1B3A5C] text-[#1B3A5C]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            <tb.icon className="h-4 w-4" /> {tb.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'general' && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Site Settings</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Company Name</label>
                <input type="text" defaultValue="B2B Enterprise" className="mt-1 w-full max-w-md rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Contact Email</label>
                <input type="email" defaultValue="info@b2b-enterprise.com" className="mt-1 w-full max-w-md rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Contact Phone</label>
                <input type="text" defaultValue="+86 755-8888-8888" className="mt-1 w-full max-w-md rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">WhatsApp</label>
                <input type="text" defaultValue="+86 138 8888 8888" className="mt-1 w-full max-w-md rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none" />
              </div>
              <button className="flex items-center gap-2 rounded-lg bg-[#1B3A5C] px-4 py-2 text-sm font-medium text-white hover:bg-[#153050]">
                <Save className="h-4 w-4" /> Save Settings
              </button>
            </div>
          </div>
        )}

        {tab === 'admins' && (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Last Login</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockAdmins.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{a.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{a.email}</td>
                      <td className="px-4 py-3"><span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">{a.role}</span></td>
                      <td className="px-4 py-3 text-sm text-gray-500">{a.lastLogin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'roles' && (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Permissions</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Users</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockRoles.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{r.name}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {r.permissions.map((p) => (
                            <span key={p} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{p}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{r.users}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'logs' && (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Admin</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Action</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Target</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">IP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockLogs.map((l) => (
                    <tr key={l.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{l.admin}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{l.action}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{l.target}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{l.time}</td>
                      <td className="px-4 py-3 text-sm text-gray-400 font-mono">{l.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
