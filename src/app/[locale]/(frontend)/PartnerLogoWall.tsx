'use client';

import { useTranslations } from 'next-intl';
import { mockPartners } from '@/lib/mock/other';

export default function PartnerLogoWall() {
  const t = useTranslations('home');

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#173A63] mb-3">{t('partnersTitle', { fallback: 'Certifications & Compliance' })}</h2>
          <p className="text-gray-500">{t('partnersDesc', { fallback: 'Our manufacturing meets international standards' })}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {mockPartners.map((partner) => (
            <div key={partner.id} className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <div className="px-6 py-3 bg-gray-50 rounded-full border border-gray-100">
                <span className="text-[#173A63] font-bold text-sm tracking-wide">{partner.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
