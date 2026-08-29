'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Check, FlaskConical, Package, Star } from 'lucide-react';

/**
 * Private-label process visual: Existing Product → Blank Packaging → Your Brand.
 * CSS-built tube+box mockups; can be replaced with a real product design image later.
 */
function Mockup({ variant }: { variant: 'existing' | 'blank' | 'brand' }) {
  const gold = 'bg-gradient-to-b from-[#f4d27a] to-[#d4af37]';
  return (
    <div className="flex items-end justify-center h-28 sm:h-36 md:h-44">
      {/* box (behind) */}
      <div
        className={`relative z-0 w-11 sm:w-14 md:w-[4.2rem] h-24 sm:h-32 md:h-40 rounded-md shadow-[0_14px_30px_rgba(23,58,99,0.22)] ${
          variant === 'existing'
            ? 'bg-gradient-to-b from-[#2f8fd4] to-[#1768b3]'
            : variant === 'blank'
              ? 'bg-[#e7eaee]'
              : 'bg-gradient-to-b from-[#0f5f57] to-[#0a453f] border-t-2 border-[#d4af37]'
        }`}
      />
      {/* tube (front, slightly overlapping box) */}
      <div
        className={`relative z-10 -ml-3 sm:-ml-4 md:-ml-5 w-7 sm:w-9 md:w-[2.6rem] h-20 sm:h-28 md:h-36 rounded-t-[0.4rem] rounded-b-[0.7rem] shadow-[0_14px_30px_rgba(23,58,99,0.22)] overflow-hidden flex flex-col ${
          variant === 'existing'
            ? 'bg-white'
            : variant === 'blank'
              ? 'bg-white'
              : 'bg-gradient-to-b from-[#12766c] to-[#0b5049]'
        }`}
      >
        {/* crimp / gold top */}
        <div className={`h-1.5 sm:h-2 shrink-0 ${variant === 'brand' ? gold : 'bg-black/10'}`} />
        {/* body label */}
        <div className="flex-1 flex items-center justify-center px-1">
          {variant === 'existing' && (
            <span className="text-[0.45rem] sm:text-[0.55rem] md:text-[0.65rem] font-black leading-[1.1] text-center text-[#173A63]">
              FRESH<br />CARE
            </span>
          )}
          {variant === 'brand' && (
            <span className="text-[0.45rem] sm:text-[0.55rem] md:text-[0.65rem] font-black leading-[1.1] text-center text-white/95">
              YOUR<br />BRAND
            </span>
          )}
        </div>
        {/* cap */}
        <div className="h-2.5 sm:h-3.5 shrink-0 bg-white border-t border-black/5" />
      </div>
    </div>
  );
}

function BrandProcessVisual({ labels }: { labels: string[] }) {
  const icons = [FlaskConical, Package, Star];
  const variants = ['existing', 'blank', 'brand'] as const;
  return (
    <div className="order-1 md:order-2 md:flex-1 md:pl-8 w-full">
      {/* mockups + arrows — 5-col grid keeps labels aligned under each stage */}
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-x-1.5 sm:gap-x-2 md:gap-x-4">
        {variants.map((v, i) => (
          <div key={v} className="contents">
            <Mockup variant={v} />
            {i < 2 && <ArrowRight className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#173A63] justify-self-center" />}
          </div>
        ))}
      </div>
      <div className="mt-5 md:mt-7 grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-x-1.5 sm:gap-x-2 md:gap-x-4">
        {labels.map((label, i) => {
          const Icon = icons[i];
          return (
            <div key={i} className="contents">
              <div className="flex flex-col items-center gap-2 md:gap-2.5">
                <span className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#EAF7FD] text-[#173A63] ring-1 ring-[#008FD5]/15">
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </span>
                <p className="text-[0.68rem] sm:text-xs md:text-sm font-bold text-[#173A63] text-center leading-tight">{label}</p>
                <span className="h-0.5 w-8 md:w-10 rounded-full bg-[#0FAE96]" />
              </div>
              {i < 2 && <span />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PrivateLabelPage() {
  const t = useTranslations('privateLabel');

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero — split layout: copy left, private-label process visual right */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EAF7FD] via-[#F2FBFF] to-[#F7F4EF]">
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#008FD5]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#173A63]/8 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[1360px] px-5 sm:px-8 pt-24 md:pt-32 pb-14 md:pb-20 flex flex-col md:flex-row md:items-center gap-8 md:gap-6">
          {/* Copy */}
          <div className="order-2 md:order-1 md:flex-1 text-center md:text-left">
            <h1 className="text-[#173A63] font-extrabold tracking-tight leading-[1.08] text-3xl sm:text-4xl lg:text-5xl xl:text-[3.3rem]">
              {t('heroTitle')}
            </h1>
            <p className="mx-auto md:mx-0 mt-4 md:mt-6 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600">
              {t('heroSubtitle')}
            </p>
            {/* green checkmark points */}
            <ul className="mt-6 md:mt-8 space-y-3 w-fit mx-auto md:mx-0">
              {['heroPoint1', 'heroPoint2', 'heroPoint3'].map((k) => (
                <li key={k} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#0FAE96] text-[#0FAE96]">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-slate-700">{t(k)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-3 md:gap-4 justify-center md:justify-start">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#173A63] px-9 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#0F2A4A] hover:scale-[0.98] shadow-[0_12px_30px_rgba(23,58,99,0.25)]"
              >
                {t('heroCta')}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#173A63]/25 bg-white/70 px-9 py-3.5 text-base font-semibold text-[#173A63] transition-all hover:border-[#173A63]/50"
              >
                {t('heroCta2')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Process visual */}
          <BrandProcessVisual labels={[t('stepExisting'), t('stepBlank'), t('stepBrand')]} />
        </div>
      </section>

      {/* Why Choose Private Label */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('whyTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('whyDesc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t('why1Title'), desc: t('why1Desc'), icon: '💰' },
              { title: t('why2Title'), desc: t('why2Desc'), icon: '🚀' },
              { title: t('why3Title'), desc: t('why3Desc'), icon: '🏷️' },
              { title: t('why4Title'), desc: t('why4Desc'), icon: '📈' },
            ].map((item, i) => (
              <div key={i} className="bg-[#EAF7FD] rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-[#173A63] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('processTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('processDesc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t('step1Title'), desc: t('step1Desc'), num: '01' },
              { title: t('step2Title'), desc: t('step2Desc'), num: '02' },
              { title: t('step3Title'), desc: t('step3Desc'), num: '03' },
              { title: t('step4Title'), desc: t('step4Desc'), num: '04' },
            ].map((step, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-8 shadow-sm">
                <span className="text-5xl font-bold text-[#EAF7FD] absolute top-4 right-4">{step.num}</span>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-[#173A63] mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Products */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('productsTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('productsDesc')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Toothpaste', 'Mouthwash', 'Tooth Powder', 'Toothbrush', 'Dental Floss', 'Teeth Whitening', 'Breath Spray', 'Oral Spray'].map((product, i) => (
              <div key={i} className="bg-[#EAF7FD] rounded-2xl p-6 text-center hover:bg-[#008FD5]/10 transition-colors cursor-pointer">
                <h4 className="font-semibold text-[#173A63]">{product}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready Formulas */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">Ready Formulas</h2>
            <p className="text-gray-500 text-lg">Choose from our proven oral care formulas — ready for your brand</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Hydroxyapatite Toothpaste', func: 'Enamel repair & remineralization', flavors: 'Mint, Unflavored', spec: '100g / 120g' },
              { name: 'Whitening Toothpaste', func: 'Stain removal & brightness', flavors: 'Mint, Berry, Coconut', spec: '100g / 150g' },
              { name: 'Sensitive Toothpaste', func: 'Pain relief & nerve protection', flavors: 'Mint, Mild Mint', spec: '100g / 120g' },
              { name: "Kids' Toothpaste", func: 'Gentle cleaning, fluoride-free option', flavors: 'Strawberry, Watermelon, Grape', spec: '50g / 60g' },
              { name: 'Herbal Toothpaste', func: 'Natural ingredients, gum care', flavors: 'Herbal Mint, Cinnamon', spec: '120g / 150g' },
              { name: 'Charcoal Toothpaste', func: 'Deep cleaning & detox', flavors: 'Mint, Unflavored', spec: '100g / 120g' },
            ].map((formula, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#EAF7FD] rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#008FD5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>
                </div>
                <h3 className="text-lg font-bold text-[#173A63] mb-1">{formula.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{formula.func}</p>
                <div className="text-xs text-gray-400 space-y-1 mb-4">
                  <p><span className="font-medium text-gray-600">Flavors:</span> {formula.flavors}</p>
                  <p><span className="font-medium text-gray-600">Spec:</span> {formula.spec}</p>
                </div>
                <button className="w-full py-2 text-sm font-semibold text-[#008FD5] border border-[#008FD5] rounded-full hover:bg-[#008FD5] hover:text-white transition-colors">
                  Select Formula
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branding Options */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">Branding Options</h2>
            <p className="text-gray-500 text-lg">Three levels of customization to match your budget and brand vision</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tier: 'Logo Sticker',
                desc: 'Apply your logo as a sticker label on our standard packaging',
                moq: '500 pcs',
                delivery: '2-3 weeks',
                features: ['Your logo on existing tube/box', 'Standard packaging', 'Quick turnaround'],
                popular: false,
              },
              {
                tier: 'Custom Tube',
                desc: 'Custom printed tube with your brand design and colors',
                moq: '3,000 pcs',
                delivery: '3-4 weeks',
                features: ['Custom tube printing', 'Your colors & design', 'Custom cap color', 'Standard box'],
                popular: true,
              },
              {
                tier: 'Custom Box',
                desc: 'Fully custom tube + outer box with premium packaging',
                moq: '5,000 pcs',
                delivery: '4-5 weeks',
                features: ['Custom tube printing', 'Custom outer box', 'Premium finishes (foil, emboss)', 'Custom inserts'],
                popular: false,
              },
            ].map((option, i) => (
              <div key={i} className={`relative rounded-3xl p-8 ${option.popular ? 'bg-[#173A63] text-white shadow-xl' : 'bg-[#EAF7FD] border border-gray-100'}`}>
                {option.popular && <div className="absolute -top-3 right-6 bg-[#008FD5] text-white text-xs font-bold px-4 py-1 rounded-full">Recommended</div>}
                <h3 className={`text-xl font-bold mb-2 ${option.popular ? 'text-white' : 'text-[#173A63]'}`}>{option.tier}</h3>
                <p className={`text-sm mb-4 ${option.popular ? 'text-white/70' : 'text-gray-500'}`}>{option.desc}</p>
                <div className={`text-lg font-bold mb-1 ${option.popular ? 'text-[#008FD5]' : 'text-[#008FD5]'}`}>MOQ: {option.moq}</div>
                <p className={`text-sm mb-6 ${option.popular ? 'text-white/60' : 'text-gray-400'}`}>Delivery: {option.delivery}</p>
                <ul className="space-y-2 mb-6">
                  {option.features.map((feat, j) => (
                    <li key={j} className={`flex items-center gap-2 text-sm ${option.popular ? 'text-white/80' : 'text-gray-600'}`}>
                      <svg className={`w-4 h-4 flex-shrink-0 ${option.popular ? 'text-[#008FD5]' : 'text-[#008FD5]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`block text-center rounded-full py-3 font-semibold transition-colors ${option.popular ? 'bg-white text-[#173A63] hover:bg-white/90' : 'bg-[#173A63] text-white hover:bg-[#1E4D7B]'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Startup Packages — Pricing available on request */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] mb-4">Startup Packages</h2>
          <p className="text-gray-500 text-lg mb-6 max-w-xl mx-auto">Pre-configured packages to launch your brand quickly. Pricing varies by product type, packaging, and quantity — contact us for a detailed quote.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#008FD5] px-10 py-4 text-base font-semibold text-white hover:bg-[#0070a8] transition-colors">
            Request Pricing
          </Link>
        </div>
      </section>

      {/* What's Included / What's Not */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{"What's Included"}</h2>
            <p className="text-gray-500 text-lg">Clear scope — so you know exactly what you get</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Included */}
            <div className="bg-[#EAF7FD] rounded-3xl p-8">
              <h3 className="text-xl font-bold text-[#173A63] mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#008FD5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Included in Private Label
              </h3>
              <ul className="space-y-3">
                {[
                  'Access to 50+ proven oral care formulas',
                  'Custom branding on tubes and packaging',
                  'Regulatory compliance documentation',
                  'Quality inspection before shipment',
                  'Standard shipping to your warehouse',
                  'Product liability insurance',
                  'Marketing materials (product photos, descriptions)',
                  'Dedicated account manager',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <svg className="w-5 h-5 text-[#008FD5] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Not Included */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-[#173A63] mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                Not Included (Need OEM/ODM)
              </h3>
              <ul className="space-y-3">
                {[
                  'Custom formula development from scratch',
                  'New product type not in our catalog',
                  'Proprietary ingredient sourcing',
                  'Clinical testing & certification',
                  'Patent filing support',
                  'Exclusive formula rights',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/custom" className="mt-6 inline-flex items-center gap-2 text-[#008FD5] font-semibold hover:gap-3 transition-all">
                Need custom development? Explore OEM/ODM
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">Project Timeline</h2>
            <p className="text-gray-500 text-lg">{"From inquiry to delivery — here's what to expect"}</p>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#008FD5]/20 hidden md:block" />
            <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-5 md:gap-4">
              {[
                { step: '01', title: 'Inquiry', desc: 'Submit your requirements', time: 'Day 1' },
                { step: '02', title: 'Sample', desc: 'Receive & approve samples', time: 'Day 3-7' },
                { step: '03', title: 'Approval', desc: 'Confirm design & formula', time: 'Day 7-10' },
                { step: '04', title: 'Production', desc: 'Manufacturing & QC', time: 'Week 2-4' },
                { step: '05', title: 'Delivery', desc: 'Ship to your door', time: 'Week 4-6' },
              ].map((item, i) => (
                <div key={i} className="relative text-center">
                  <div className="w-14 h-14 bg-[#008FD5] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-[#173A63] mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500 mb-2">{item.desc}</p>
                  <span className="inline-block text-xs font-medium text-[#008FD5] bg-[#EAF7FD] px-3 py-1 rounded-full">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MOQ & Pricing */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('moqTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('moqDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tier: t('moq1Tier'), qty: t('moq1Qty'), time: t('moq1Time'), popular: false },
              { tier: t('moq2Tier'), qty: t('moq2Qty'), time: t('moq2Time'), popular: true },
              { tier: t('moq3Tier'), qty: t('moq3Qty'), time: t('moq3Time'), popular: false },
            ].map((tier, i) => (
              <div key={i} className={`relative rounded-3xl p-8 ${tier.popular ? 'bg-[#173A63] text-white shadow-xl' : 'bg-white border border-gray-100'}`}>
                {tier.popular && <div className="absolute -top-3 right-6 bg-[#008FD5] text-white text-xs font-bold px-4 py-1 rounded-full">{t('moq2Popular')}</div>}
                <h3 className={`text-xl font-bold mb-2 ${tier.popular ? 'text-white' : 'text-[#173A63]'}`}>{tier.tier}</h3>
                <p className={`text-2xl font-bold mb-4 ${tier.popular ? 'text-[#008FD5]' : 'text-[#008FD5]'}`}>{tier.qty}</p>
                <p className={`text-sm mb-6 ${tier.popular ? 'text-white/70' : 'text-gray-500'}`}>Lead time: {tier.time}</p>
                <Link href="/contact" className={`block text-center rounded-full py-3 font-semibold transition-colors ${tier.popular ? 'bg-white text-[#173A63] hover:bg-white/90' : 'bg-[#173A63] text-white hover:bg-[#1E4D7B]'}`}>
                  Get Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-12 text-center">{t('faqTitle')}</h2>
          <div className="space-y-4">
            {[
              { q: t('faq1Q'), a: t('faq1A') },
              { q: t('faq2Q'), a: t('faq2A') },
              { q: t('faq3Q'), a: t('faq3A') },
              { q: t('faq4Q'), a: t('faq4A') },
              { q: t('faq5Q'), a: t('faq5A') },
            ].map((item, i) => (
              <details key={i} className="group border border-gray-200 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-[#173A63] hover:bg-gray-50 transition-colors">
                  {item.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-500">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#173A63]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('ctaTitle')}</h2>
          <p className="text-white/70 text-lg mb-8">{t('ctaDesc')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-full bg-white px-10 py-4 text-base font-semibold text-[#173A63] hover:bg-white/90 transition-colors">
              {t('ctaPrimary')}
            </Link>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#21C96B] px-10 py-4 text-base font-semibold text-white hover:bg-[#1db85e] transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {t('ctaWhatsapp')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
