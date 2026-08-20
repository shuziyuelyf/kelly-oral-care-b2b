'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { LogIn, UserPlus, AlertCircle } from 'lucide-react';

export default function AuthPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const t = useTranslations('auth');
  const locale = useLocale();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Tab Switch */}
          <div className="mb-6 flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => { setMode('login'); setSubmitted(false); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${mode === 'login' ? 'bg-white text-[#1B3A5C] shadow-sm' : 'text-gray-500'}`}
            >
              {t('login_title')}
            </button>
            <button
              onClick={() => { setMode('register'); setSubmitted(false); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${mode === 'register' ? 'bg-white text-[#1B3A5C] shadow-sm' : 'text-gray-500'}`}
            >
              {t('register_title')}
            </button>
          </div>

          {submitted ? (
            <div className="py-8 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-amber-500" />
              <p className="mt-4 text-lg font-medium text-gray-700">{t('pending_approval')}</p>
            </div>
          ) : mode === 'login' ? (
            <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{t('username')}</label>
                <input type="text" required className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{t('password')}</label>
                <input type="password" required className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
              </div>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1B3A5C] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#153050]">
                <LogIn className="h-4 w-4" /> {t('login_btn')}
              </button>
              <p className="text-center text-sm text-gray-500">
                {t('no_account')}{' '}
                <button type="button" onClick={() => setMode('register')} className="font-medium text-[#E8720C] hover:underline">
                  {t('register_title')}
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{t('company_name')}</label>
                <input type="text" required className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{t('credit_code')}</label>
                <input type="text" required className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">{t('contact_person')}</label>
                <input type="text" required className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{t('contact_phone')}</label>
                  <input type="tel" required className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{t('contact_email')}</label>
                  <input type="email" required className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{t('username')}</label>
                  <input type="text" required className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">{t('password')}</label>
                  <input type="password" required className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
                </div>
              </div>
              <p className="text-xs text-gray-400">{t('register_note')}</p>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-md bg-[#E8720C] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d4660a]">
                <UserPlus className="h-4 w-4" /> {t('register_btn')}
              </button>
              <p className="text-center text-sm text-gray-500">
                {t('has_account')}{' '}
                <button type="button" onClick={() => setMode('login')} className="font-medium text-[#E8720C] hover:underline">
                  {t('login_title')}
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
