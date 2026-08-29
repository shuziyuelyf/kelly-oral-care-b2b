'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

/**
 * SNAP-style split hero banner.
 * PC: text left + product PNG right on a soft-light background (no dark overlay).
 * Mobile: product image on top, text below, CTA full width — nothing is clamped.
 *
 * Replace <ProductPlaceholder> with <img src="slide.productImg" className="h-full w-auto object-contain" />
 * once real transparent-background product PNGs are available.
 */
const slides = [
  {
    titleKey: 'heroTitle',
    descKey: 'heroSubtitle',
    ctaKey: 'heroCta',
    href: '/products',
    accent: 'from-[#008FD5] to-[#173A63]',
    glow: 'bg-[#008FD5]/15',
  },
  {
    titleKey: 'plPathTitle',
    descKey: 'plPathDesc',
    ctaKey: 'plPathCta',
    href: '/private-label',
    accent: 'from-[#0EA5E9] to-[#0369A1]',
    glow: 'bg-[#0EA5E9]/15',
  },
  {
    titleKey: 'oemPathTitle',
    descKey: 'oemPathDesc',
    ctaKey: 'oemPathCta',
    href: '/custom',
    accent: 'from-[#173A63] to-[#0F2A4A]',
    glow: 'bg-[#173A63]/12',
  },
] as const;

function ToothIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5.5C10.8 4.2 8.8 3.5 7 3.8 4.8 4.2 3.5 6 3.6 8.4c.1 1.8.5 3.2.9 4.9.3 1.4.4 2.9.6 4.4.2 1.4.7 2.5 1.6 2.5.9 0 1.2-1 1.4-2.3.2-1.2.4-2.5 1.2-3.3.5-.5 1.4-.5 1.9 0 .8.8 1 2.1 1.2 3.3.2 1.3.5 2.3 1.4 2.3.9 0 1.4-1.1 1.6-2.5.2-1.5.3-3 .6-4.4.4-1.7.8-3.1.9-4.9.1-2.4-1.2-4.2-3.4-4.6-1.8-.3-3.8.4-5 1.7z" />
    </svg>
  );
}

function ProductPlaceholder({ accent, glow, animKey }: { accent: string; glow: string; animKey: number }) {
  return (
    <div key={animKey} className="animate-hero-pop relative flex flex-col items-center">
      {/* soft glow behind product */}
      <div className={`absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${glow}`} />
      {/* product card (replace with transparent product PNG later) */}
      <div className="relative w-36 h-48 sm:w-44 sm:h-56 md:w-52 md:h-64 rounded-3xl bg-white shadow-[0_24px_60px_rgba(23,58,99,0.18)] flex items-center justify-center">
        <div className={`flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${accent}`}>
          <ToothIcon className="h-9 w-9 sm:h-11 sm:w-11" />
        </div>
      </div>
      {/* floor shadow */}
      <div className="mt-4 h-3 w-28 sm:w-36 rounded-[100%] bg-[#173A63]/15 blur-md" />
    </div>
  );
}

export default function HeroBanner() {
  const t = useTranslations('home');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#EAF7FD] via-[#F2FBFF] to-[#F7F4EF]">
      {/* decorative blurred blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#008FD5]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#173A63]/8 blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1360px] px-5 sm:px-8 pt-20 md:pt-28 md:min-h-[clamp(480px,62vh,640px)] flex flex-col md:flex-row md:items-center">
        {/* Mobile: product on top | PC: text on left */}
        {/* Product visual — mobile order-first, desktop right column */}
        <div className="order-1 flex justify-center py-8 md:order-2 md:flex-1 md:py-0 md:pl-10">
          <ProductPlaceholder accent={slide.accent} glow={slide.glow} animKey={current} />
        </div>

        {/* Text block — mobile centered below image, desktop left column */}
        <div className="order-2 pb-14 md:order-1 md:flex-1 md:pb-0 text-center md:text-left">
          <h1
            key={`title-${current}`}
            className="animate-fade-in text-[#173A63] font-extrabold tracking-tight leading-[1.1] text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem]"
          >
            {t(slide.titleKey)}
          </h1>
          <p
            key={`desc-${current}`}
            className="animate-fade-in mx-auto md:mx-0 mt-4 md:mt-6 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600"
          >
            {t(slide.descKey)}
          </p>
          <div className="mt-7 md:mt-9 flex flex-col sm:flex-row items-center gap-3 md:gap-4 justify-center md:justify-start">
            <Link
              href={slide.href}
              className="animate-fade-in w-full sm:w-auto rounded-full bg-[#173A63] px-9 py-3.5 text-base font-semibold text-white text-center transition-all hover:bg-[#0F2A4A] hover:scale-[0.98] shadow-[0_12px_30px_rgba(23,58,99,0.25)]"
            >
              {t(slide.ctaKey)}
            </Link>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { page: 'home', position: 'hero' })}
              className="animate-fade-in inline-flex items-center justify-center gap-2 rounded-full border border-[#21C96B]/40 bg-white/70 px-7 py-3.5 text-base font-semibold text-[#159d55] transition-all hover:bg-[#21C96B]/10"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t('heroWhatsapp')}
            </a>
          </div>
        </div>
      </div>

      {/* carousel indicators */}
      <div className="relative z-10 flex justify-center gap-2 pb-6 md:pb-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === current
                ? 'bg-[#173A63] w-8'
                : 'bg-[#173A63]/25 w-2 hover:bg-[#173A63]/45'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
