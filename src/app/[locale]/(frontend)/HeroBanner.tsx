'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

export default function HeroBanner() {
  const t = useTranslations('home');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      title: t('heroTitle'),
      subtitle: t('heroSubtitle'),
      bg: 'from-[#173A63] via-[#1E4D7B] to-[#0F2A4A]',
    },
    {
      title: t('plPathTitle'),
      subtitle: t('plPathDesc'),
      bg: 'from-[#1E4D7B] via-[#173A63] to-[#0F2A4A]',
    },
    {
      title: t('oemPathTitle'),
      subtitle: t('oemPathDesc'),
      bg: 'from-[#0F2A4A] via-[#173A63] to-[#1E4D7B]',
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Animated background */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg} transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto max-w-6xl px-6 w-full">
          <div className="max-w-2xl">
            <h1
              key={`title-${current}`}
              className="animate-fade-in mb-6 font-bold leading-[1.05] tracking-tight text-white"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              {slides[current].title}
            </h1>
            <p
              key={`sub-${current}`}
              className="animate-fade-in mb-8 max-w-lg text-lg leading-relaxed text-white/85"
            >
              {slides[current].subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
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
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {[0, 1, 2].map((i) => (
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
    </section>
  );
}
