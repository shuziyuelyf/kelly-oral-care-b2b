'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { LogIn, UserPlus, Building2, User, Mail, Lock, Phone, FileText, CheckCircle } from 'lucide-react';

export default function AuthPage() {
  const locale = useLocale();
  const t = useTranslations('auth');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };
  const handleRegister = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {mode === 'login' ? t('loginSuccess') : t('registerSuccess')}
          </h2>
          <p className="text-gray-500">
            {mode === 'login' ? t('loginSuccessDesc') : t('registerSuccessDesc')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
            <button onClick={() => setMode('login')} className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${mode === 'login' ? 'bg-white text-[#173A63] shadow-sm' : 'text-gray-500'}`}>
              <LogIn className="w-4 h-4 inline mr-1" /> {t('login')}
            </button>
            <button onClick={() => setMode('register')} className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${mode === 'register' ? 'bg-white text-[#173A63] shadow-sm' : 'text-gray-500'}`}>
              <UserPlus className="w-4 h-4 inline mr-1" /> {t('register')}
            </button>
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" required className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('password')}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="password" required className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-[#173A63] text-white font-medium rounded-lg hover:bg-[#15304d] transition-colors">
                {t('loginBtn')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('companyName')} *</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" required className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('creditCode')}</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('contactPerson')} *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" required className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('contactEmail')} *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" required className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('contactPhone')}</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="tel" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('setPassword')} *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="password" required className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                </div>
              </div>
              <p className="text-xs text-gray-400">{t('registerHint')}</p>
              <button type="submit" className="w-full py-3 bg-[#008FD5] text-white font-medium rounded-lg hover:bg-[#0077B6] transition-colors">
                {t('registerBtn')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
