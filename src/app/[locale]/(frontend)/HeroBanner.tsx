'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1920&q=80',
    imgAlt: 'Oral care products',
  },
  {
    img: 'https://images.unsplash.com/photo-1559650656-5d1d361ad10e?w=1920&q=80',
    imgAlt: 'Dental care',
  },
  {
    img: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=1920&q=80',
    imgAlt: 'Healthy smile',
  },
];

export default function HeroBanner() {
  const t = useTranslations('home');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: '65vh',
        background: 'linear-gradient(160deg, #0F2A4A 0%, #173A63 40%, #1E4D7B 100%)',
      }}
    >
      {/* Desktop (≥768px): full-screen cover background images */}
      <div className="hidden md:block">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.img}
              alt={slide.imgAlt}
              className="h-full w-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        {/* Navy gradient overlay for desktop text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2A4A]/85 via-[#173A63]/70 to-[#1E4D7B]/50" />
      </div>

      {/* Mobile (<768px): decorative image floating at bottom-right */}
      <div className="block md:hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute transition-opacity duration-1000 ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              right: '-5%',
              bottom: 0,
              width: '55%',
              height: '60%',
            }}
          >
            <img
              src={slide.img}
              alt={slide.imgAlt}
              className="h-full w-full"
              style={{ objectFit: 'contain', opacity: 0.35 }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex items-start w-full md:items-start"
        style={{ paddingTop: 'clamp(20vh, 25vh, 30vh)' }}
      >
        <div className="mx-auto w-[94%] max-w-[1680px] px-6">
          <div className="max-w-2xl">
            <h1
              key={`title-${current}`}
              className="animate-fade-in mb-4 md:mb-6 font-bold leading-[1.1] md:leading-[1.05] tracking-tight text-white"
              style={{ fontSize: 'clamp(1.75rem, 6vw, 4.5rem)' }}
            >
              {current === 0 ? t('heroTitle') : current === 1 ? t('plPathTitle') : t('oemPathTitle')}
            </h1>
            <p
              key={`sub-${current}`}
              className="animate-fade-in mb-6 md:mb-8 max-w-lg text-base md:text-lg leading-relaxed text-white/85"
            >
              {current === 0 ? t('heroSubtitle') : current === 1 ? t('plPathDesc') : t('oemPathDesc')}
            </p>
            {/* Desktop: inline buttons; Mobile: full-width stacked */}
            <div className="hidden md:flex flex-wrap gap-4">
              <Link
                href="/products"
                className="animate-fade-in rounded-full bg-white px-10 py-4 text-base font-semibold text-[#173A63] transition-all hover:bg-white/90 hover:scale-[0.98] shadow-lg"
              >
                {t('heroCta')}
              </Link>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { page: 'home', position: 'hero' })}
                className="animate-fade-in rounded-full bg-[#21C96B] px-10 py-4 text-base font-semibold text-white transition-all hover:bg-[#1db85e] hover:scale-[0.98] shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('heroWhatsapp')}
              </a>
            </div>
            {/* Mobile: full-width stacked buttons */}
            <div className="flex md:hidden flex-col gap-3 max-w-[280px]">
              <Link
                href="/products"
                className="animate-fade-in rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#173A63] transition-all hover:bg-white/90 active:scale-[0.98] shadow-lg text-center w-full"
              >
                {t('heroCta')}
              </Link>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { page: 'home', position: 'hero' })}
                className="animate-fade-in rounded-full bg-[#21C96B] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#1db85e] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 w-full"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('heroWhatsapp')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel indicators — kept on both mobile and desktop */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current
                ? 'bg-white w-8'
                : 'bg-white/40 w-2 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="hidden md:flex absolute bottom-24 left-1/2 z-10 -translate-x-1/2 flex-col items-center gap-1 text-white/50">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
