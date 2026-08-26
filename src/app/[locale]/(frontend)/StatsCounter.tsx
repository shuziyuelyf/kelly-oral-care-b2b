'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-[#173A63]">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function StatsCounter() {
  const t = useTranslations('home');

  const stats = [
    { value: 20, suffix: '+', label: t('stat1') },
    { value: 10000, suffix: '+', label: t('stat2') },
    { value: 50, suffix: '+', label: t('stat3') },
    { value: 500, suffix: '+', label: t('stat4') },
  ];

  return (
    <section className="py-20 bg-[#F7F4EF]">
      <div className="max-w-[1360px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-[#718096] mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
