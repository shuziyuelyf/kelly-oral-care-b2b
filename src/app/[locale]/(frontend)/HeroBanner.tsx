'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface HeroBannerProps {
  locale: string;
}

export default function HeroBanner({ locale }: HeroBannerProps) {
  const t = useTranslations('home');
  const [current, setCurrent] = useState(0);

  const slides = [
    { title: t('heroTitle1'), subtitle: t('heroSubtitle1'), cta: t('heroCta1'), ctaHref: `/${locale}/products`, image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800' },
    { title: t('heroTitle2'), subtitle: t('heroSubtitle2'), cta: t('heroCta2'), ctaHref: `/${locale}/custom`, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800' },
    { title: t('heroTitle3'), subtitle: t('heroSubtitle3'), cta: t('heroCta3'), ctaHref: `/${locale}/about`, image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent((p) => (p + 1) % slides.length);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F5F5F0]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F0] via-[#F5F5F0]/95 to-transparent z-10" />
        <img src={slides[current].image} alt="" className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-30" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1B2A4A] leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            {slides[current].title}
          </h1>
          <p className="text-lg text-[#718096] mb-10 max-w-lg leading-relaxed">{slides[current].subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Link href={slides[current].ctaHref} className="inline-flex items-center gap-2 px-10 py-4 bg-[#1B2A4A] text-white font-semibold rounded-full hover:bg-[#2D4A7A] transition-all shadow-lg hover:shadow-xl">
              {slides[current].cta} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-lg hover:bg-white transition-colors"><ChevronLeft className="w-6 h-6 text-[#1B2A4A]" /></button>
      <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-lg hover:bg-white transition-colors"><ChevronRight className="w-6 h-6 text-[#1B2A4A]" /></button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-[#1B2A4A] w-8' : 'bg-[#1B2A4A]/30'}`} />
        ))}
      </div>
    </section>
  );
}
