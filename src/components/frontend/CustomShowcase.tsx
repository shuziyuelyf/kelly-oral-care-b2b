'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Droplet, Beaker, Candy, Palette, Sparkles,
  Plane, BadgeCheck, Users, RotateCw, SprayCan, Shapes,
  Star, Sun, Hand, Stamp, Layers, Check, ShieldCheck,
} from 'lucide-react';

type TabKey = 'paste' | 'tube' | 'cap' | 'packaging';

const TABS: { key: TabKey; image: string; bgClass: string; note?: string }[] = [
  { key: 'paste', image: '/images/custom/paste-types.jpg', bgClass: 'bg-[#EAF7F0]', note: 'pasteNote' },
  { key: 'tube', image: '/images/custom/tube-sizes.jpg', bgClass: 'bg-[#EAF7FD]', note: 'tubeNote' },
  { key: 'cap', image: '/images/custom/cap-types.jpg', bgClass: 'bg-[#F5F1EB]' },
  { key: 'packaging', image: '/images/custom/packaging-crafts.jpg', bgClass: 'bg-[#FBF3E4]' },
];

const OPTIONS: Record<TabKey, { icon: typeof Droplet; key: string }[]> = {
  paste: [
    { icon: Droplet, key: 'pasteOpt1' },
    { icon: Beaker, key: 'pasteOpt2' },
    { icon: Candy, key: 'pasteOpt3' },
    { icon: Palette, key: 'pasteOpt4' },
    { icon: Sparkles, key: 'pasteOpt5' },
  ],
  tube: [
    { icon: Plane, key: 'tubeOpt1' },
    { icon: Beaker, key: 'tubeOpt2' },
    { icon: BadgeCheck, key: 'tubeOpt3' },
    { icon: Users, key: 'tubeOpt4' },
  ],
  cap: [
    { icon: RotateCw, key: 'capOpt1' },
    { icon: Layers, key: 'capOpt2' },
    { icon: SprayCan, key: 'capOpt3' },
    { icon: Star, key: 'capOpt4' },
    { icon: Shapes, key: 'capOpt5' },
  ],
  packaging: [
    { icon: Sun, key: 'packOpt1' },
    { icon: Sparkles, key: 'packOpt2' },
    { icon: Layers, key: 'packOpt3' },
    { icon: Hand, key: 'packOpt4' },
    { icon: Stamp, key: 'packOpt5' },
  ],
};

type Support = 'yes' | 'partial' | 'no';

const MATRIX: { rowKey: string; values: Support[] }[] = [
  { rowKey: 'matrixRowToothpaste', values: ['yes', 'yes', 'yes', 'yes', 'yes', 'partial'] },
  { rowKey: 'matrixRowToothbrush', values: ['partial', 'partial', 'yes', 'yes', 'yes', 'partial'] },
  { rowKey: 'matrixRowMouthwash', values: ['yes', 'yes', 'yes', 'yes', 'yes', 'partial'] },
  { rowKey: 'matrixRowWhitening', values: ['partial', 'partial', 'yes', 'yes', 'yes', 'partial'] },
  { rowKey: 'matrixRowFloss', values: ['partial', 'partial', 'yes', 'yes', 'yes', 'no'] },
];

const MATRIX_COLUMNS = [
  'matrixColFormula',
  'matrixColColor',
  'matrixColSize',
  'matrixColLabel',
  'matrixColBox',
  'matrixColMoq',
];

function MatrixCell({ value }: { value: Support }) {
  if (value === 'yes') {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EAF7F0] text-[#2E9E6B]">
        <Check className="h-4 w-4" strokeWidth={3} />
      </span>
    );
  }
  if (value === 'partial') {
    return <span className="text-lg font-bold text-[#D69E2E] align-middle">◐</span>;
  }
  return <span className="text-base text-gray-300 align-middle">—</span>;
}

export default function CustomShowcase() {
  const locale = useLocale();
  const t = useTranslations('custom');
  const [activeTab, setActiveTab] = useState<TabKey>('paste');

  const active = TABS.find((tab) => tab.key === activeTab) ?? TABS[0];

  return (
    <div>
      {/* A. Tab customization showcase */}
      <div className="mb-16">
        {/* Tab bar — horizontally scrollable on mobile */}
        <div className="mb-8 flex justify-center overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex gap-1 sm:gap-2 rounded-full bg-white p-1.5 shadow-[0_2px_12px_rgba(23,58,99,0.08)]">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`shrink-0 rounded-full px-4 sm:px-7 py-2.5 text-sm sm:text-base font-semibold transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-[#173A63] text-white shadow-[0_6px_18px_rgba(23,58,99,0.3)]'
                    : 'text-[#173A63]/70 hover:bg-[#EAF7FD] hover:text-[#173A63]'
                }`}
              >
                {t(`${tab.key}Tab`)}
              </button>
            ))}
          </div>
        </div>

        {/* Panel: mobile stacked (image first), desktop split (image left, options right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Left / top — large image card with tinted background */}
          <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl ring-1 ring-[#173A63]/8 ${active.bgClass}`}>
            <Image
              src={active.image}
              alt={t(`${active.key}Tab`)}
              fill
              sizes="(max-width: 768px) 92vw, 45vw"
              className="object-cover"
            />
          </div>

          {/* Right / bottom — options grid */}
          <div className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1 content-center">
              {OPTIONS[activeTab].map((opt) => (
                <div
                  key={opt.key}
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-[#173A63]/8 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF7FD]">
                    <opt.icon className="h-5 w-5 text-[#008FD5]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#173A63] leading-snug">{t(`${opt.key}Name`)}</p>
                    <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">{t(`${opt.key}Desc`)}</p>
                  </div>
                </div>
              ))}
            </div>

            {active.note && (
              <p className="mt-4 text-xs text-gray-500 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#2E9E6B]" />
                {t(active.note)}
              </p>
            )}

            <Link
              href="#sample"
              className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#008FD5] transition-colors hover:text-[#173A63]"
            >
              {t('showcaseRfq')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* B. Capability matrix */}
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-[#173A63] text-center mb-8">
          {t('matrixTitle')}
        </h3>
        <div className="overflow-x-auto rounded-3xl bg-white ring-1 ring-[#173A63]/8 shadow-[0_2px_12px_rgba(23,58,99,0.06)]">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="bg-[#EAF7FD]">
                <th className="px-5 py-4 text-left font-bold text-[#173A63]">{t('matrixCorner')}</th>
                {MATRIX_COLUMNS.map((col) => (
                  <th key={col} className="px-4 py-4 text-center font-semibold text-[#173A63] whitespace-nowrap">
                    {t(col)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((row, i) => (
                <tr key={row.rowKey} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F4EF]/50'}>
                  <td className="px-5 py-4 font-bold text-[#173A63] whitespace-nowrap">{t(row.rowKey)}</td>
                  {row.values.map((value, j) => (
                    <td key={j} className="px-4 py-4 text-center">
                      <MatrixCell value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">
          {t('matrixNotePre')}{' '}
          <Link href="#sample" className="font-semibold text-[#008FD5] hover:text-[#173A63] inline-flex items-center gap-1">
            {t('matrixNoteLink')}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </p>
      </div>
    </div>
  );
}
