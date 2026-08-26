'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Upload, Send, CheckCircle, FlaskConical, Package, Beaker, Truck, ShieldCheck, Sparkles } from 'lucide-react';

export default function CustomPage() {
  const locale = useLocale();
  const t = useTranslations('custom');
  const [submitted, setSubmitted] = useState(false);

  const capabilities = [
    { icon: FlaskConical, title: t('capFormula', { fallback: 'Custom Formula Development' }), desc: t('capFormulaDesc', { fallback: 'Develop unique oral care formulations tailored to your brand requirements.' }) },
    { icon: Beaker, title: t('capIngredient', { fallback: 'Ingredient Selection' }), desc: t('capIngredientDesc', { fallback: 'Choose from hydroxyapatite, charcoal, probiotics, herbal extracts, and more.' }) },
    { icon: Sparkles, title: t('capFlavor', { fallback: 'Flavor Development' }), desc: t('capFlavorDesc', { fallback: 'Custom flavors including mint, berry, coconut, herbal, and more.' }) },
    { icon: Package, title: t('capPackaging', { fallback: 'Packaging Customization' }), desc: t('capPackagingDesc', { fallback: 'Custom tubes, bottles, caps, boxes, labels, and printing finishes.' }) },
  ];

  const productTypes = [
    { name: 'Toothpaste', icon: '🪥' },
    { name: 'Mouthwash', icon: '💧' },
    { name: 'Tooth Powder', icon: '✨' },
    { name: 'Teeth Whitening', icon: '😁' },
    { name: 'Breath Spray', icon: '🌬️' },
    { name: 'Toothbrush', icon: '🪥' },
  ];

  const process = [
    { num: '01', title: t('step1Title', { fallback: 'Inquiry' }), desc: t('step1Desc', { fallback: 'Tell us your product requirements and customization needs.' }) },
    { num: '02', title: t('step2Title', { fallback: 'Formula & Sample' }), desc: t('step2Desc', { fallback: 'We develop formulas and provide samples for your approval.' }) },
    { num: '03', title: t('step3Title', { fallback: 'Design & Approval' }), desc: t('step3Desc', { fallback: 'Finalize packaging design, branding, and production specifications.' }) },
    { num: '04', title: t('step4Title', { fallback: 'Production & Delivery' }), desc: t('step4Desc', { fallback: 'Manufacturing, QC, and shipping to your destination.' }) },
  ];

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#173A63] to-[#2d5a8a] py-16 md:py-24">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6 text-center">
          <span className="inline-block bg-[#008FD5] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">OEM / ODM</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('title', { fallback: 'Custom Oral Care Manufacturing' })}</h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg">{t('subtitle', { fallback: 'From formula development to custom packaging — bring your unique oral care product vision to life.' })}</p>
        </div>
      </section>

      {/* Product Types */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] text-center mb-10">{t('productTypes', { fallback: 'Products We Manufacture' })}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {productTypes.map((p, i) => (
              <div key={i} className="bg-[#F7F4EF] rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{p.icon}</div>
                <h3 className="font-semibold text-[#173A63] text-sm">{p.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 md:py-20 bg-[#F7F4EF]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] text-center mb-4">{t('capabilitiesTitle', { fallback: 'Custom Manufacturing Capabilities' })}</h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">{t('capabilitiesDesc', { fallback: 'End-to-end customization for your oral care brand' })}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-[#EAF7FD] rounded-xl flex items-center justify-center mb-4">
                  <cap.icon className="w-6 h-6 text-[#008FD5]" />
                </div>
                <h3 className="font-bold text-[#173A63] mb-2">{cap.title}</h3>
                <p className="text-sm text-gray-500">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] text-center mb-4">{t('processTitle', { fallback: 'How It Works' })}</h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">{t('processDesc', { fallback: 'From concept to delivery in four simple steps' })}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <div key={i} className="relative bg-[#F7F4EF] rounded-2xl p-6">
                <span className="text-4xl font-bold text-[#008FD5]/20 absolute top-4 right-4">{step.num}</span>
                <div className="relative z-10">
                  <h3 className="font-bold text-[#173A63] mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & Certifications */}
      <section className="py-16 md:py-20 bg-[#173A63] text-white">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6 text-center">
          <ShieldCheck className="w-12 h-12 text-[#008FD5] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('qualityTitle', { fallback: 'Quality & Compliance' })}</h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">{t('qualityDesc', { fallback: 'Our manufacturing follows strict quality control processes. Contact us for detailed certification information.' })}</p>
          <Link href={`/${locale}/quality`} className="inline-flex items-center gap-2 bg-white text-[#173A63] px-8 py-3.5 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            {t('viewQuality', { fallback: 'View Quality Standards' })}
          </Link>
        </div>
      </section>

      {/* RFQ Form */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] text-center mb-10">{t('formTitle', { fallback: 'Request a Quote' })}</h2>
          {submitted ? (
            <div className="text-center py-12 max-w-lg mx-auto">
              <CheckCircle className="w-16 h-16 text-[#38A169] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#173A63]">{t('submitSuccess', { fallback: 'Request Submitted' })}</h3>
              <p className="text-gray-500 mt-2">{t('submitSuccessDesc', { fallback: 'Our team will get back to you within 24 hours.' })}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 bg-[#F7F4EF] p-6 md:p-8 rounded-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.productType', { fallback: 'Product Type' })} *</label>
                  <select required className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]">
                    <option value="">{t('form.selectOption', { fallback: 'Select...' })}</option>
                    <option>Toothpaste</option>
                    <option>Mouthwash</option>
                    <option>Tooth Powder</option>
                    <option>Teeth Whitening</option>
                    <option>Breath Spray</option>
                    <option>Toothbrush</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.quantity', { fallback: 'Estimated Quantity' })} *</label>
                  <input type="text" required placeholder="e.g. 5,000 pcs" className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.packaging', { fallback: 'Packaging Needs' })}</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]">
                    <option value="">{t('form.selectOption', { fallback: 'Select...' })}</option>
                    <option>Standard Packaging</option>
                    <option>Custom Tube</option>
                    <option>Custom Box</option>
                    <option>Full Custom (Tube + Box)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.timeline', { fallback: 'Expected Timeline' })}</label>
                  <input type="text" placeholder="e.g. 3 months" className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.description', { fallback: 'Project Details' })} *</label>
                <textarea required rows={4} placeholder={t('form.descriptionPlaceholder', { fallback: 'Describe your product requirements, target market, certifications needed, etc.' })} className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.attachment', { fallback: 'Reference Files' })}</label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-[#008FD5] transition-colors cursor-pointer bg-white">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">{t('form.uploadHint', { fallback: 'Upload logos, designs, or reference images' })}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.contactName', { fallback: 'Your Name' })} *</label>
                  <input type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('form.contactEmail', { fallback: 'Email' })} *</label>
                  <input type="email" required className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                </div>
              </div>
              <button type="submit" className="w-full py-3.5 bg-[#008FD5] text-white font-semibold rounded-full hover:bg-[#0070a8] transition-colors flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> {t('form.submit', { fallback: 'Submit Request' })}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Cross-guidance to Private Label */}
      <section className="py-16 bg-[#EAF7FD]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6 text-center">
          <h3 className="text-2xl font-bold text-[#173A63] mb-4">{t('plCtaTitle', { fallback: 'Looking for a faster way to start?' })}</h3>
          <p className="text-gray-500 mb-6 max-w-lg mx-auto">{t('plCtaDesc', { fallback: 'Choose from proven formulas and launch your oral care product line in weeks — not months.' })}</p>
          <Link href={`/${locale}/private-label`} className="inline-flex items-center gap-2 rounded-full bg-[#008FD5] px-10 py-4 text-base font-semibold text-white hover:bg-[#0070a8] transition-colors">
            {t('plCta', { fallback: 'Explore Private Label' })} →
          </Link>
        </div>
      </section>
    </div>
  );
}
