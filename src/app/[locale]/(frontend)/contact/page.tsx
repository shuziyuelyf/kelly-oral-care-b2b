'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { mockCompanyInfo } from '@/lib/mock/other';
import { getI18nValue } from '@/lib/utils-i18n';

export default function ContactPage() {
  const locale = useLocale();
  const t = useTranslations('contact');
  const lang = locale;
  const company = mockCompanyInfo;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="min-h-screen bg-gray-50 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-[#173A63] mb-8">{t('title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-[#173A63] mb-4">{t('contactInfo')}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#008FD5] mt-0.5" />
                  <div><p className="text-sm font-medium text-gray-700">{t('phone')}</p><p className="text-sm text-gray-500">{company.phone}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-[#008FD5] mt-0.5" />
                  <div><p className="text-sm font-medium text-gray-700">WhatsApp</p><p className="text-sm text-gray-500">+{company.whatsapp}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#008FD5] mt-0.5" />
                  <div><p className="text-sm font-medium text-gray-700">{t('email')}</p><p className="text-sm text-gray-500">{company.email}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#008FD5] mt-0.5" />
                  <div><p className="text-sm font-medium text-gray-700">{t('address')}</p><p className="text-sm text-gray-500">{getI18nValue(company.i18n, lang, 'address')}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#008FD5] mt-0.5" />
                  <div><p className="text-sm font-medium text-gray-700">{t('businessHours')}</p><p className="text-sm text-gray-500">{company.businessHours}</p></div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">{getI18nValue(company.i18n, lang, 'address')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-[#173A63] mb-4">{t('messageForm')}</h3>
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800">{t('submitSuccess')}</h3>
                  <p className="text-gray-500 mt-2">{t('submitSuccessDesc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.name')} *</label>
                      <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.email')} *</label>
                      <input type="email" required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.phone')}</label>
                      <input type="tel" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.company')}</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.subject')} *</label>
                    <input type="text" required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.message')} *</label>
                    <textarea required rows={6} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                  </div>
                  <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-[#008FD5] text-white font-medium rounded-lg hover:bg-[#d4680b] transition-colors">
                    <Send className="w-4 h-4" /> {t('form.submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
