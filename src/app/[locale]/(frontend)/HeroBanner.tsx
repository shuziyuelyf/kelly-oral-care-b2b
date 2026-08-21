'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
      // Muted gray/taupe background with product image on right
      bgColor: 'bg-[#8B8680]',
      image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=80',
    },
    {
      title: t('heroTitle2'),
      subtitle: t('heroSubtitle2'),
      cta: t('heroCta2'),
      ctaHref: `/${locale}/custom`,
      bgColor: 'bg-[#7A7570]',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
    },
    {
      title: t('heroTitle3'),
      subtitle: t('heroSubtitle3'),
      cta: t('heroCta3'),
      ctaHref: `/${locale}/about`,
      bgColor: 'bg-[#6B6660]',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '85vh', minHeight: '600px' }}>
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          {/* Muted gray/taupe background */}
          <div className={`absolute inset-0 ${slide.bgColor}`} />
          
          {/* Product image on right side - bleeds to edge */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-[55%]">
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover object-center"
            />
            {/* Fade from left to blend with background */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#8B8680] to-transparent" style={{ background: `linear-gradient(to right, ${i === 0 ? '#8B8680' : i === 1 ? '#7A7570' : '#6B6660'}, transparent)` }} />
          </div>

          {/* Subtle dark overlay on left for text readability */}
          <div className="absolute inset-y-0 left-0 w-1/2 lg:w-[45%] bg-black/10" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center">
        <div className="max-w-xl lg:max-w-2xl">
          <h1
            className="text-white font-extrabold leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            {slides[current].title}
          </h1>
          <p className="text-base lg:text-lg text-white/80 max-w-lg leading-relaxed mb-8">
            {slides[current].subtitle}
          </p>
          <Link
            href={slides[current].ctaHref}
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#1B2A4A] text-white font-semibold rounded-full hover:bg-[#2D4A7A] transition-all shadow-lg text-base"
          >
            {slides[current].cta} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Dots - bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current
                ? 'bg-white w-6'
                : 'bg-white/40 w-2 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
