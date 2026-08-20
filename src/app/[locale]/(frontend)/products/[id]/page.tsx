'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, MessageSquare, ExternalLink, Package, ArrowLeft } from 'lucide-react';
import { mockProducts } from '@/lib/mock/data';
import { getI18nValue, formatPrice } from '@/lib/utils-i18n';

export default function ProductDetailPage() {
  const t = useTranslations('products');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSku, setSelectedSku] = useState(0);

  const product = mockProducts[0];

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <Package className="mx-auto mb-4 h-16 w-16 text-gray-300" />
        <p className="text-lg text-gray-500">Product not found</p>
        <Link href={`/${locale}/products`} className="mt-4 inline-flex items-center gap-2 text-[#E8720C] hover:underline">
          <ArrowLeft className="h-4 w-4" /> {t('title')}
        </Link>
      </div>
    );
  }

  const name = getI18nValue(product.i18n, locale, 'name');
  const description = getI18nValue(product.i18n, locale, 'description');
  const sku = product.skus[selectedSku] || product.skus[0];
  const price = sku?.price || 0;
  const originalPrice = sku?.originalPrice || 0;
  const stock = product.skus.reduce((s, sk) => s + sk.stock, 0);
  const whatsappChannel = product.channels.find((c) => c.type === 'whatsapp');
  const onlineChannel = product.channels.find((c) => c.type === 'online_store');

  const whatsappUrl = whatsappChannel
    ? `${whatsappChannel.url}?text=${encodeURIComponent(`Hi, I'm interested in: ${name} (${product.modelNumber})`)}`
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href={`/${locale}`} className="hover:text-[#1B3A5C]">{tNav('home')}</Link>
        <span>/</span>
        <Link href={`/${locale}/products`} className="hover:text-[#1B3A5C]">{t('title')}</Link>
        <span>/</span>
        <span className="text-gray-900">{name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <div className="flex h-full items-center justify-center">
              <Package className="h-24 w-24 text-gray-300" />
            </div>
            {product.images.length > 1 && (
              <>
                <button onClick={() => setCurrentImage((c) => (c - 1 + product.images.length) % product.images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-sm hover:bg-white">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => setCurrentImage((c) => (c + 1) % product.images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-sm hover:bg-white">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            {product.images.map((img, i) => (
              <button key={img.id} onClick={() => setCurrentImage(i)} className={`h-16 w-16 overflow-hidden rounded border-2 ${i === currentImage ? 'border-[#E8720C]' : 'border-gray-200'}`}>
                <div className="flex h-full items-center justify-center bg-gray-50">
                  <Package className="h-6 w-6 text-gray-300" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold text-[#1B3A5C] lg:text-3xl">{name}</h1>
          <p className="mt-1 text-sm text-gray-400">Model: {product.modelNumber}</p>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-[#E8720C]">{formatPrice(price, locale)}</span>
            {originalPrice > 0 && <span className="text-lg text-gray-400 line-through">{formatPrice(originalPrice, locale)}</span>}
          </div>

          {/* Stock */}
          <div className="mt-3">
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {stock > 0 ? `In Stock: ${stock}` : 'Out of Stock'}
            </span>
          </div>

          {/* SKU Selection */}
          {product.skus.length > 1 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700">Specifications</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.skus.map((s, i) => (
                  <button key={s.id} onClick={() => setSelectedSku(i)} className={`rounded-lg border px-4 py-2 text-sm transition-colors ${i === selectedSku ? 'border-[#E8720C] bg-[#E8720C]/5 text-[#E8720C]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {Object.entries(s.attributes).map(([k, v]) => `${k}: ${v}`).join(', ')}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mt-6 rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-700">Description</h3>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          </div>

          {/* Attributes */}
          {product.attributes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700">Specifications</h3>
              <div className="mt-2 overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <tbody>
                    {product.attributes.map((attr) => (
                      <tr key={attr.id} className="border-b border-gray-100 last:border-0">
                        <td className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">{attr.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{attr.value} {attr.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-[#E8720C] px-6 py-3 text-sm font-medium text-white hover:bg-[#d4660a]">
              <ShoppingCart className="h-4 w-4" /> Add to Inquiry
            </button>
            {whatsappUrl && (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700">
                <MessageSquare className="h-4 w-4" /> WhatsApp
              </a>
            )}
            {onlineChannel && (
              <a href={onlineChannel.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <ExternalLink className="h-4 w-4" /> Buy Online
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
