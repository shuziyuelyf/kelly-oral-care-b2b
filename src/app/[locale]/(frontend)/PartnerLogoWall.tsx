'use client';

import { useTranslations } from 'next-intl';
import { mockPartners } from '@/lib/mock/other';

export default function PartnerLogoWall() {
  const t = useTranslations('home');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#173A63] mb-3">{t('partnersTitle')}</h2>
          <p className="text-[#718096]">{t('partnersDesc')}</p>
        </div>
        <div className="overflow-hidden relative">
          <div className="flex gap-16 animate-scroll">
            {[...mockPartners, ...mockPartners].map((partner, i) => (
              <div key={i} className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                <div className="w-32 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-[#718096] font-bold text-sm">{partner.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
