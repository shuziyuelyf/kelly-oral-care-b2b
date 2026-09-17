'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle, AlertCircle } from 'lucide-react';
import { contact } from '@/lib/brand';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d][\d\s()\-\s]{6,}$/;

/** True only for a plausible real international number — hides placeholder fake numbers. */
function isPlausibleWhatsApp(num: string | null): boolean {
  if (!num) return false;
  const digits = num.replace(/\D/g, '');
  if (digits.length < 10) return false;
  if (digits.startsWith('123456')) return false;
  return true;
}

export default function ContactPage() {
  const locale = useLocale();
  const t = useTranslations('contact');

  const [values, setValues] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; phone?: string; subject?: string; message?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const showWhatsApp = isPlausibleWhatsApp(contact.whatsapp);

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setFieldErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const errors: typeof fieldErrors = {};
    if (!values.name.trim()) errors.name = t('form.nameRequired', { fallback: 'Please enter your name.' });
    if (!values.email.trim()) errors.email = t('form.emailRequired', { fallback: 'Please enter your email address.' });
    else if (!EMAIL_REGEX.test(values.email.trim())) errors.email = t('form.emailInvalid', { fallback: 'Please enter a valid email address.' });
    if (values.phone.trim() && !PHONE_REGEX.test(values.phone.trim())) errors.phone = t('form.phoneInvalid', { fallback: 'Please enter a valid phone number.' });
    if (!values.subject.trim()) errors.subject = t('form.subjectRequired', { fallback: 'Please enter a subject.' });
    if (!values.message.trim()) errors.message = t('form.messageRequired', { fallback: 'Please enter your message.' });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          company: values.company.trim(),
          subject: values.subject.trim(),
          content: values.message.trim(),
          langCode: locale,
        }),
      });
      if (!res.ok) {
        setSubmitError(t('submitError', { fallback: 'Something went wrong. Please try again later.' }));
        return;
      }
      setSubmitted(true);
      setValues({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    } catch {
      setSubmitError(t('submitError', { fallback: 'Something went wrong. Please try again later.' }));
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = (hasError?: string) =>
    `w-full px-4 py-3 border text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5] ${hasError ? 'border-red-400 bg-red-50' : 'border-gray-200'}`;
  const textareaCls = (hasError?: string) =>
    `w-full px-4 py-3 border text-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5] ${hasError ? 'border-red-400 bg-red-50' : 'border-gray-200'}`;

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
                {showWhatsApp && (
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-[#21C96B] mt-0.5" />
                    <div><p className="text-sm font-medium text-gray-700">{t('whatsapp', { fallback: 'WhatsApp' })}</p><p className="text-sm text-gray-500">+{contact.whatsapp}</p></div>
                  </div>
                )}
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

            {showWhatsApp && (
              <a
                href={contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#21C96B] text-white font-semibold rounded-full hover:bg-[#1db954] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                {t('whatsappCta', { fallback: 'Chat on WhatsApp' })}
              </a>
            )}
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
                  {submitError && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm" role="alert">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.name')} *</label>
                      <input type="text" value={values.name} onChange={(e) => handleChange('name', e.target.value)} placeholder={t('form.name')} className={inputCls(fieldErrors.name)} />
                      {fieldErrors.name && <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.email')} *</label>
                      <input type="email" value={values.email} onChange={(e) => handleChange('email', e.target.value)} placeholder={t('form.email')} className={inputCls(fieldErrors.email)} />
                      {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.phone')}</label>
                      <input type="tel" value={values.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder={t('form.phone')} className={inputCls(fieldErrors.phone)} />
                      {fieldErrors.phone && <p className="text-xs text-red-500 mt-1">{fieldErrors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.company')}</label>
                      <input type="text" value={values.company} onChange={(e) => handleChange('company', e.target.value)} placeholder={t('form.company')} className={inputCls()} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.subject')} *</label>
                    <input type="text" value={values.subject} onChange={(e) => handleChange('subject', e.target.value)} placeholder={t('form.subject')} className={inputCls(fieldErrors.subject)} />
                    {fieldErrors.subject && <p className="text-xs text-red-500 mt-1">{fieldErrors.subject}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.message')} *</label>
                    <textarea rows={5} value={values.message} onChange={(e) => handleChange('message', e.target.value)} placeholder={t('form.message')} className={textareaCls(fieldErrors.message)} />
                    {fieldErrors.message && <p className="text-xs text-red-500 mt-1">{fieldErrors.message}</p>}
                  </div>
                  <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#008FD5] text-white font-semibold rounded-full hover:bg-[#0070a8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                    <Send className="w-4 h-4" /> {submitting ? t('form.submitting', { fallback: 'Sending...' }) : t('form.submit')}
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