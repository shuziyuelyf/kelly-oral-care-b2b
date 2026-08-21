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
    {
      title: t('heroTitle1'),
      subtitle: t('heroSubtitle1'),
      cta: t('heroCta1'),
      ctaHref: `/${locale}/products`,
      image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1920',
    },
    {
      title: t('heroTitle2'),
      subtitle: t('heroSubtitle2'),
      cta: t('heroCta2'),
      ctaHref: `/${locale}/custom`,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920',
    },
    {
      title: t('heroTitle3'),
      subtitle: t('heroSubtitle3'),
      cta: t('heroCta3'),
      ctaHref: `/${locale}/about`,
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent((p) => (p + 1) % slides.length);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Image - full bleed */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={slide.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
      {/* Bottom gradient for dots visibility */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="max-w-2xl">
          <h1
            className="text-white font-extrabold leading-[1.05] mb-5 drop-shadow-lg"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            {slides[current].title}
          </h1>
          <p className="text-lg text-white/85 max-w-lg leading-relaxed mb-8 drop-shadow">
            {slides[current].subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={slides[current].ctaHref}
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#1B2A4A] text-white font-semibold rounded-full hover:bg-[#2D4A7A] transition-all shadow-lg hover:shadow-xl text-base"
            >
              {slides[current].cta} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white/40 transition-colors border border-white/20"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white/40 transition-colors border border-white/20"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 rounded-full transition-all ${
              i === current
                ? 'bg-white w-8'
                : 'bg-white/40 w-3 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
