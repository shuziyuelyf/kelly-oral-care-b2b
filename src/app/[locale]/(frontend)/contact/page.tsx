'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { contact } from '@/lib/brand';

export default function ContactPage() {
  const locale = useLocale();
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-2">{t('title')}</h1>
        <p className="text-gray-500 mb-10">{t('subtitle', { fallback: 'Get in touch with our team' })}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="bg-[#F7F4EF] rounded-2xl p-6">
              <h3 className="font-semibold text-[#173A63] mb-4">{t('contactInfo')}</h3>
              <div className="space-y-4">
                {contact.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#008FD5] mt-0.5" />
                    <div><p className="text-sm font-medium text-gray-700">{t('phone')}</p><p className="text-sm text-gray-500">{contact.phone}</p></div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-[#21C96B] mt-0.5" />
                  <div><p className="text-sm font-medium text-gray-700">WhatsApp</p><p className="text-sm text-gray-500">+{contact.whatsapp}</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#008FD5] mt-0.5" />
                  <div><p className="text-sm font-medium text-gray-700">{t('email')}</p><p className="text-sm text-gray-500">{contact.email}</p></div>
                </div>
                {contact.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#008FD5] mt-0.5" />
                    <div><p className="text-sm font-medium text-gray-700">{t('address')}</p><p className="text-sm text-gray-500">{contact.address}</p></div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#008FD5] mt-0.5" />
                  <div><p className="text-sm font-medium text-gray-700">{t('businessHours')}</p><p className="text-sm text-gray-500">{contact.businessHours}</p></div>
                </div>
              </div>
            </div>

            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#21C96B] text-white font-semibold rounded-full hover:bg-[#1db954] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#F7F4EF] rounded-2xl p-6 md:p-8">
              <h3 className="font-semibold text-[#173A63] mb-6">{t('messageForm')}</h3>
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-[#38A169] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#173A63]">{t('submitSuccess')}</h3>
                  <p className="text-gray-500 mt-2">{t('submitSuccessDesc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.name')} *</label>
                      <input type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.email')} *</label>
                      <input type="email" required className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.phone')}</label>
                      <input type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.company')}</label>
                      <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.subject')} *</label>
                    <input type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.message')} *</label>
                    <textarea required rows={5} className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                  </div>
                  <button type="submit" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#008FD5] text-white font-semibold rounded-full hover:bg-[#0070a8] transition-colors">
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
