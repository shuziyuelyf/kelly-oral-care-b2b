'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

interface ProductCardProps {
  slug: string;
  name: string;
  subtitle?: string;
  image: string;
  moq?: number | string;
  moqUnit?: string;
  isHot?: boolean;
  isNew?: boolean;
  inStock?: boolean;
  locale: string;
  viewDetailsLabel?: string;
}

/**
 * Global ProductCard — used on Homepage, Products listing, Related Products.
 * PC: vertical card (image top, content bottom).
 * Mobile: horizontal card (image left, content right).
 * Do NOT create page-specific product cards.
 */
export default function ProductCard({
  slug,
  name,
  subtitle,
  image,
  moq,
  moqUnit = 'pcs',
  isHot,
  isNew,
  inStock,
  locale,
  viewDetailsLabel = 'View Details',
}: ProductCardProps) {
  return (
    <Link
      href={`/${locale}/products/${slug}`}
      onClick={() => trackEvent('product_view', { product_id: slug })}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex md:flex-col items-center md:items-stretch"
    >
      {/* Image */}
      <div className="relative bg-[#F3F5F7] overflow-hidden flex items-center justify-center p-2 w-40 h-40 md:w-full md:h-auto md:aspect-square flex-shrink-0 md:flex-shrink">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isHot && (
            <span className="px-2.5 py-1 rounded-full bg-[#173A63] text-white text-[10px] font-bold uppercase">
              Hot
            </span>
          )}
          {isNew && (
            <span className="px-2.5 py-1 rounded-full bg-[#38A169] text-white text-[10px] font-bold uppercase">
              New
            </span>
          )}
        </div>
        {inStock && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#EAF7FD] text-[#008FD5] text-[10px] font-semibold">
            In Stock
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col min-w-0 flex-1 md:flex-initial justify-center">
        <h3 className="font-bold text-[#173A63] text-base mb-1 group-hover:text-[#008FD5] transition line-clamp-1">
          {name}
        </h3>
        {subtitle && (
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{subtitle}</p>
        )}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          {moq && <span>MOQ: {moq} {moqUnit}</span>}
          {inStock && <span className="text-[#38A169] font-medium">Sample Available</span>}
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="text-center py-2 rounded-full border border-[#173A63] text-[#173A63] text-sm font-medium group-hover:bg-[#173A63] group-hover:text-white transition whitespace-nowrap w-full sm:w-auto sm:flex-1">
            {viewDetailsLabel}
          </span>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => { e.stopPropagation(); trackEvent('whatsapp_click', { page: 'product_card', product: slug }); }}
            className="text-center py-2 rounded-full bg-[#21C96B] text-white text-sm font-medium hover:bg-[#1db954] transition whitespace-nowrap w-full sm:w-auto sm:flex-1"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </Link>
  );
}
