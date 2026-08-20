'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    { icon: MapPin, label: t('address'), value: 'Building A8, Science Park, Nanshan District, Shenzhen, Guangdong, China' },
    { icon: Phone, label: t('phone'), value: '+86-755-8888-9999' },
    { icon: Mail, label: t('email'), value: 'info@b2bpro.com' },
    { icon: Clock, label: t('working_hours'), value: t('working_hours_value') },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B3A5C] to-[#162f4a] py-16 text-center text-white lg:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-3xl font-bold lg:text-4xl">{t('title')}</h1>
          <p className="mt-4 text-lg text-gray-300">{t('subtitle')}</p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info + Map */}
            <div>
              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#1B3A5C]/10">
                      <item.icon className="h-5 w-5 text-[#1B3A5C]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">{item.label}</h3>
                      <p className="mt-1 text-gray-900">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-8 aspect-[4/3] overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-gray-400">
                    <MapPin className="mx-auto h-10 w-10" />
                    <p className="mt-2 text-sm">Map View</p>
                    <p className="text-xs">Shenzhen, Guangdong, China</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-[#1B3A5C]">{t('message_title')}</h2>
              {submitted ? (
                <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-8 text-center">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                  <p className="mt-4 text-lg font-medium text-green-700">{t('form_success')}</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">{t('form_name')}</label>
                      <input type="text" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">{t('form_email')}</label>
                      <input type="email" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">{t('form_company')}</label>
                      <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">{t('form_subject')}</label>
                      <input type="text" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">{t('form_message')}</label>
                    <textarea rows={5} required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C]" />
                  </div>
                  <button type="submit" className="flex items-center gap-2 rounded-md bg-[#E8720C] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d4660a]">
                    <Send className="h-4 w-4" /> {t('form_submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
