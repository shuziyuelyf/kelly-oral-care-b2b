'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Check, Upload, Send, CheckCircle,
  FlaskConical, Beaker, Sparkles, Package, ShieldCheck, Factory,
  Microscope, Palette, Layers, Printer, Droplet, Wind, SprayCan,
  Smile, Brush, BadgeCheck, Store, ShoppingBag, Stethoscope, Handshake,
  Building2, Truck, Award, ClipboardList, Lightbulb,
} from 'lucide-react';

export default function CustomPage() {
  const locale = useLocale();
  const t = useTranslations('custom');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="flex min-h-screen flex-col bg-white">

      {/* 01 — HERO / BANNER: light split, overlaps fixed nav capsule, left text / right lab visual */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EAF7FD] via-[#F2FBFF] to-[#F7F4EF] -mt-[88px] md:-mt-[112px]">
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#008FD5]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#173A63]/8 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[1360px] px-5 sm:px-8 pt-20 md:pt-28 pb-14 md:pb-16 flex flex-col md:grid md:grid-cols-[1.05fr_1fr] md:gap-x-10 lg:gap-x-14 md:items-center">
          {/* Left — plain text group, no card */}
          <div className="order-1 md:col-start-1 flex flex-col items-center md:items-start text-center md:text-left">
            <span className="inline-flex items-center rounded-full bg-[#173A63] px-4 py-1.5 text-xs font-bold tracking-wide text-white">
              OEM / ODM
            </span>
            <h1 className="mt-5 text-[#173A63] font-extrabold tracking-tight leading-[1.08] text-3xl sm:text-4xl lg:text-5xl xl:text-[3.3rem]">
              {t('heroTitle')}
            </h1>
            <p className="mt-4 md:mt-6 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600">
              {t('heroSubtitle')}
            </p>
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
            <div className="mt-8 md:mt-10 flex w-full flex-col sm:flex-row items-center justify-center md:justify-start gap-3 md:gap-4">
              <Link
                href={`/${locale}/contact`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#173A63] px-9 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#0F2A4A] hover:scale-[0.98] shadow-[0_12px_30px_rgba(23,58,99,0.25)]"
              >
                {t('heroCta')}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#sample"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#173A63]/25 bg-white/70 px-9 py-3.5 text-base font-semibold text-[#173A63] transition-all hover:border-[#173A63]/50"
              >
                {t('heroCta2')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Right — lab / production visual (rounded photo card; replaceable by brand render later) */}
          <div className="order-2 md:col-start-2 w-full animate-hero-pop my-8 md:my-0 md:pl-6">
            <div className="relative w-[88vw] max-w-[30rem] sm:max-w-[34rem] mx-auto md:mx-0 md:w-full md:max-w-none">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] ring-1 ring-[#173A63]/10 shadow-[0_24px_60px_rgba(23,58,99,0.22)]">
                <Image
                  src="/images/custom/hero-lab.jpg"
                  alt="Oral care product research and development laboratory"
                  fill
                  sizes="(max-width: 768px) 88vw, 45vw"
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#173A63]/25 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl bg-white/92 backdrop-blur px-4 py-3 shadow-lg">
                  <Microscope className="h-8 w-8 shrink-0 text-[#008FD5]" />
                  <p className="text-sm font-semibold text-[#173A63] leading-snug">{t('heroBadge')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — SERVICE MODES: OEM / ODM / Private Label */}
      <section id="modes" className="scroll-mt-24 md:scroll-mt-32 py-20 bg-white">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('modesTitle')}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('modesDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 'oem',
                icon: Factory,
                tag: 'OEM',
                title: t('modeOemTitle'),
                desc: t('modeOemDesc'),
                points: [t('modeOemP1'), t('modeOemP2'), t('modeOemP3')],
                href: '#sample',
                cta: t('modeCta'),
                featured: false,
              },
              {
                id: 'odm',
                icon: Lightbulb,
                tag: 'ODM',
                title: t('modeOdmTitle'),
                desc: t('modeOdmDesc'),
                points: [t('modeOdmP1'), t('modeOdmP2'), t('modeOdmP3')],
                href: '#sample',
                cta: t('modeCta'),
                featured: true,
              },
              {
                id: 'pl',
                icon: Sparkles,
                tag: t('modePlTag'),
                title: t('modePlTitle'),
                desc: t('modePlDesc'),
                points: [t('modePlP1'), t('modePlP2'), t('modePlP3')],
                href: `/${locale}/private-label`,
                cta: t('modePlCta'),
                featured: false,
              },
            ].map((m) => (
              <div
                key={m.id}
                id={m.id}
                className={`scroll-mt-24 md:scroll-mt-32 rounded-3xl p-8 flex flex-col ${
                  m.featured
                    ? 'bg-[#173A63] text-white shadow-[0_20px_50px_rgba(23,58,99,0.3)] ring-2 ring-[#008FD5]/40'
                    : 'bg-[#F7F4EF] ring-1 ring-[#173A63]/8'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  m.featured ? 'bg-[#008FD5] text-white' : 'bg-[#EAF7FD] text-[#008FD5]'
                }`}>
                  <m.icon className="w-6 h-6" />
                </div>
                <span className={`inline-block self-start text-xs font-bold px-3 py-1 rounded-full mb-3 ${
                  m.featured ? 'bg-white/15 text-white' : 'bg-[#173A63]/8 text-[#173A63]'
                }`}>{m.tag}</span>
                <h3 className={`text-xl font-bold mb-3 ${m.featured ? 'text-white' : 'text-[#173A63]'}`}>{m.title}</h3>
                <p className={`text-sm leading-relaxed mb-5 ${m.featured ? 'text-white/75' : 'text-gray-500'}`}>{m.desc}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {m.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check className={`h-4 w-4 mt-0.5 shrink-0 ${m.featured ? 'text-[#7FD8FF]' : 'text-[#0FAE96]'}`} strokeWidth={3} />
                      <span className={m.featured ? 'text-white/85' : 'text-slate-600'}>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={m.href}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all hover:scale-[0.98] ${
                    m.featured
                      ? 'bg-[#008FD5] text-white hover:bg-[#0070a8]'
                      : 'bg-[#173A63] text-white hover:bg-[#0F2A4A]'
                  }`}
                >
                  {m.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — WHY WORK WITH US / core manufacturing capabilities */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('whyTitle')}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('whyDesc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FlaskConical, title: t('capFormula'), desc: t('capFormulaDesc') },
              { icon: Beaker, title: t('capIngredient'), desc: t('capIngredientDesc') },
              { icon: Sparkles, title: t('capFlavor'), desc: t('capFlavorDesc') },
              { icon: Package, title: t('capPackaging'), desc: t('capPackagingDesc') },
            ].map((cap, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#EAF7FD] rounded-xl flex items-center justify-center mb-4">
                  <cap.icon className="w-6 h-6 text-[#008FD5]" />
                </div>
                <h3 className="font-bold text-[#173A63] mb-2">{cap.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — FROM CONCEPT TO FINISHED PRODUCT: 5-step timeline */}
      <section id="process" className="scroll-mt-24 md:scroll-mt-32 py-20 bg-white">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('processTitle')}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('processDesc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: ClipboardList, title: t('step1Title'), desc: t('step1Desc') },
              { icon: Beaker, title: t('step2Title'), desc: t('step2Desc') },
              { icon: Palette, title: t('step3Title'), desc: t('step3Desc') },
              { icon: Factory, title: t('step4Title'), desc: t('step4Desc') },
              { icon: Truck, title: t('step5Title'), desc: t('step5Desc') },
            ].map((s, i) => (
              <div key={i} className="relative bg-[#F7F4EF] rounded-2xl p-6">
                <span className="absolute top-4 right-5 text-4xl font-bold text-[#008FD5]/15">{String(i + 1).padStart(2, '0')}</span>
                <div className="w-11 h-11 bg-[#173A63] rounded-xl flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-[#173A63] mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — WHAT WE CAN CUSTOMIZE: dimensions + product categories */}
      <section id="customize" className="scroll-mt-24 md:scroll-mt-32 py-20 bg-[#F7F4EF]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('customizeTitle')}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('customizeDesc')}</p>
          </div>

          {/* Customization dimensions */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
            {[
              { icon: FlaskConical, label: t('dimFormula') },
              { icon: Beaker, label: t('dimIngredient') },
              { icon: Sparkles, label: t('dimFlavor') },
              { icon: Palette, label: t('dimColor') },
              { icon: Layers, label: t('dimPackaging') },
              { icon: Printer, label: t('dimPrint') },
            ].map((d, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 bg-[#EAF7FD] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <d.icon className="w-5 h-5 text-[#008FD5]" />
                </div>
                <p className="text-sm font-semibold text-[#173A63]">{d.label}</p>
              </div>
            ))}
          </div>

          {/* Product categories */}
          <h3 className="text-xl md:text-2xl font-bold text-[#173A63] text-center mb-8">{t('productsTitle')}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Sparkles, name: t('catToothpaste') },
              { icon: Droplet, name: t('catMouthwash') },
              { icon: Wind, name: t('catPowder') },
              { icon: Smile, name: t('catWhitening') },
              { icon: SprayCan, name: t('catSpray') },
              { icon: Brush, name: t('catBrush') },
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#EAF7FD] rounded-full flex items-center justify-center mx-auto mb-3">
                  <p.icon className="w-6 h-6 text-[#008FD5]" />
                </div>
                <h4 className="font-semibold text-[#173A63] text-sm">{p.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — ADVANCED CUSTOMIZATION PREVIEW */}
      <section id="advanced" className="scroll-mt-24 md:scroll-mt-32 py-20 bg-white">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('advTitle')}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('advDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: '/images/custom/preview-rnd.jpg', title: t('adv1Title'), desc: t('adv1Desc') },
              { img: '/images/custom/preview-packaging.jpg', title: t('adv2Title'), desc: t('adv2Desc') },
              { img: '/images/custom/preview-labware.jpg', title: t('adv3Title'), desc: t('adv3Desc') },
            ].map((c, i) => (
              <div key={i} className="group rounded-3xl overflow-hidden bg-[#F7F4EF] ring-1 ring-[#173A63]/8 hover:shadow-[0_20px_45px_rgba(23,58,99,0.16)] transition-shadow">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 92vw, 30vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#173A63] mb-2">{c.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — R&D + PRODUCTION + QUALITY */}
      <section className="py-20 bg-[#173A63] text-white">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('rpqTitle')}</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">{t('rpqDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Microscope, title: t('rpqRdTitle'), desc: t('rpqRdDesc') },
              { icon: Factory, title: t('rpqProdTitle'), desc: t('rpqProdDesc') },
              { icon: ShieldCheck, title: t('rpqQaTitle'), desc: t('rpqQaDesc') },
            ].map((b, i) => (
              <div key={i} className="rounded-3xl bg-white/6 backdrop-blur ring-1 ring-white/12 p-8">
                <div className="w-12 h-12 bg-[#008FD5] rounded-xl flex items-center justify-center mb-5">
                  <b.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/factory`} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#173A63] hover:bg-gray-100 transition-colors">
              <Factory className="h-4 w-4" /> {t('rpqFactoryLink')}
            </Link>
            <Link href={`/${locale}/quality`} className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              <BadgeCheck className="h-4 w-4" /> {t('rpqQualityLink')}
            </Link>
          </div>
        </div>
      </section>

      {/* 08 — SAMPLE / MOQ / PROJECT INFORMATION */}
      <section id="sample" className="scroll-mt-24 md:scroll-mt-32 py-20 bg-white">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('sampleTitle')}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('sampleDesc')}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            {/* Left — sample & MOQ notes */}
            <div className="space-y-5">
              {[
                { icon: Package, title: t('infoSampleTitle'), desc: t('infoSampleDesc') },
                { icon: Layers, title: t('infoMoqTitle'), desc: t('infoMoqDesc') },
                { icon: Award, title: t('infoTimeTitle'), desc: t('infoTimeDesc') },
                { icon: ShieldCheck, title: t('infoSecretTitle'), desc: t('infoSecretDesc') },
              ].map((n, i) => (
                <div key={i} className="flex gap-4 rounded-2xl bg-[#F7F4EF] p-6">
                  <div className="w-11 h-11 shrink-0 bg-[#EAF7FD] rounded-xl flex items-center justify-center">
                    <n.icon className="w-5 h-5 text-[#008FD5]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#173A63] mb-1.5">{n.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — RFQ form */}
            <div>
              {submitted ? (
                <div className="text-center py-14 max-w-lg mx-auto rounded-3xl bg-[#F7F4EF]">
                  <CheckCircle className="w-16 h-16 text-[#0FAE96] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#173A63]">{t('submitSuccess')}</h3>
                  <p className="text-gray-500 mt-2">{t('submitSuccessDesc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 bg-[#F7F4EF] p-6 md:p-8 rounded-3xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('formProductType')} *</label>
                      <select required className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]">
                        <option value="">{t('formSelect')}</option>
                        <option>{t('catToothpaste')}</option>
                        <option>{t('catMouthwash')}</option>
                        <option>{t('catPowder')}</option>
                        <option>{t('catWhitening')}</option>
                        <option>{t('catSpray')}</option>
                        <option>{t('catBrush')}</option>
                        <option>{t('formOther')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('formQuantity')} *</label>
                      <input type="text" required placeholder="e.g. 5,000 pcs" className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('formPackaging')}</label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]">
                        <option value="">{t('formSelect')}</option>
                        <option>{t('formPackStd')}</option>
                        <option>{t('formPackTube')}</option>
                        <option>{t('formPackBox')}</option>
                        <option>{t('formPackFull')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('formTimeline')}</label>
                      <input type="text" placeholder="e.g. 3 months" className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('formDescription')} *</label>
                    <textarea required rows={4} placeholder={t('formDescriptionPh')} className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('formAttachment')}</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-[#008FD5] transition-colors cursor-pointer bg-white">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">{t('formUploadHint')}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('formName')} *</label>
                      <input type="text" required className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('formEmail')} *</label>
                      <input type="email" required className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#008FD5]/20 focus:border-[#008FD5]" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-[#008FD5] text-white font-semibold rounded-full hover:bg-[#0070a8] transition-colors flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> {t('formSubmit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 09 — WHO WE WORK WITH */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-4">{t('whoTitle')}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('whoDesc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Building2, title: t('who1Title'), desc: t('who1Desc') },
              { icon: ShoppingBag, title: t('who2Title'), desc: t('who2Desc') },
              { icon: Stethoscope, title: t('who3Title'), desc: t('who3Desc') },
              { icon: Store, title: t('who4Title'), desc: t('who4Desc') },
              { icon: Handshake, title: t('who5Title'), desc: t('who5Desc') },
            ].map((w, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#EAF7FD] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <w.icon className="w-6 h-6 text-[#008FD5]" />
                </div>
                <h3 className="font-bold text-[#173A63] mb-2 text-sm">{w.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — FAQ */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-12 text-center">{t('faqTitle')}</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <details key={n} className="group border border-gray-200 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-[#173A63] hover:bg-gray-50 transition-colors">
                  {t(`faq${n}Q`)}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-500 leading-relaxed">{t(`faq${n}A`)}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — FINAL CTA */}
      <section className="py-20 bg-[#173A63]">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('ctaTitle')}</h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">{t('ctaDesc')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#sample" className="rounded-full bg-[#008FD5] px-10 py-4 text-base font-semibold text-white hover:bg-[#0070a8] transition-colors inline-flex items-center gap-2">
              {t('ctaPrimary')} <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href={`/${locale}/private-label`} className="rounded-full border-2 border-white/40 px-10 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors">
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
