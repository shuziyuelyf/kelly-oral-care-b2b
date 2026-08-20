'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ShoppingCart, MessageCircle, FileText, ChevronLeft, ChevronRight, ExternalLink, Check } from 'lucide-react';
import { mockProducts } from '@/lib/mock/data';
import { getI18nValue } from '@/lib/utils-i18n';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations('product');
  const lang = locale;
  const productId = Number(params.id);
  const product = mockProducts.find((p) => p.id === productId);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSku, setSelectedSku] = useState<number | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t('notFound')}</h1>
          <Link href={`/${locale}/products`} className="text-[#E8720C] hover:underline">{t('backToList')}</Link>
        </div>
      </div>
    );
  }

  const name = getI18nValue(product.i18n, lang, 'name');
  const subtitle = getI18nValue(product.i18n, lang, 'subtitle');
  const description = getI18nValue(product.i18n, lang, 'description');
  const specsData = getI18nValue(product.i18n, lang, 'specsData');
  let specs: { label: string; value: string }[] = [];
  try { specs = JSON.parse(specsData || '[]'); } catch { /* empty */ }

  const images = product.images || [];
  const skus = product.skus || [];
  const channels = product.channels || [];
  const onlineStores = channels.filter((c) => c.channelType === 1 && c.status === 1);
  const whatsappChannels = channels.filter((c) => c.channelType === 2 && c.status === 1);

  const selectedSkuData = skus.find((s) => s.id === selectedSku);
  const displayPrice = selectedSkuData?.price || product.priceMin;
  const displayStock = selectedSkuData?.stock || product.totalStock;

  const getStockStatus = (stock: number) => {
    if (stock <= 0) return { text: t('outOfStock'), color: 'text-red-600 bg-red-50' };
    if (stock <= 10) return { text: t('lowStock'), color: 'text-yellow-600 bg-yellow-50' };
    return { text: t('inStock'), color: 'text-green-600 bg-green-50' };
  };
  const stockStatus = getStockStatus(displayStock);

  // Build WhatsApp URL with pre-filled product info
  const buildWhatsAppUrl = (channelUrl: string) => {
    const productName = encodeURIComponent(name);
    const productCode = product.productCode;
    const msg = encodeURIComponent(`Hi, I'm interested in: ${name} (${productCode})`);
    const baseUrl = channelUrl.replace(/\/$/, '');
    return baseUrl.includes('?text=') ? baseUrl : `${baseUrl}?text=${msg}`;
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href={`/${locale}`} className="hover:text-[#E8720C]">{t('breadcrumb.home')}</Link>
          <span>/</span>
          <Link href={`/${locale}/products`} className="hover:text-[#E8720C]">{t('breadcrumb.products')}</Link>
          <span>/</span>
          <span className="text-gray-800">{name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              {images.length > 0 ? (
                <img src={images[currentImage]?.imageUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <img src={product.mainImage || undefined} alt={name} className="w-full h-full object-cover" />
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button key={img.id} onClick={() => setCurrentImage(i)} className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${i === currentImage ? 'border-[#E8720C]' : 'border-transparent'}`}>
                    <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold text-[#1B3A5C]">{name}</h1>
            {subtitle && <p className="text-gray-500 mt-2">{subtitle}</p>}
            <div className="mt-2 text-sm text-gray-400">{t('model')}: {product.productCode}</div>

            {/* Price */}
            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-red-600">${displayPrice?.toLocaleString()}</span>
                {!selectedSku && (product.priceMax || 0) > (product.priceMin || 0) && (
                  <span className="text-sm text-gray-500">- ${product.priceMax?.toLocaleString()}</span>
                )}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {t('moq')}: {product.minOrderQuantity} {product.unit}
              </div>
            </div>

            {/* Stock Status */}
            <div className="mt-4 flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${stockStatus.color}`}>
                <Check className="w-3 h-3 inline mr-1" />{stockStatus.text}: {displayStock}
              </span>
              <span className="text-sm text-gray-400">{t('sales')}: {product.salesCount}</span>
            </div>

            {/* SKU Selection */}
            {skus.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">{t('selectSku')}</h3>
                <div className="flex flex-wrap gap-2">
                  {skus.map((sku) => (
                    <button
                      key={sku.id}
                      onClick={() => setSelectedSku(sku.id === selectedSku ? null : sku.id)}
                      className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                        selectedSku === sku.id ? 'border-[#E8720C] bg-orange-50 text-[#E8720C]' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {sku.skuCode} - ${sku.price?.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Channel Links - Online Stores */}
            {onlineStores.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">{t('onlineStores')}</h3>
                <div className="flex flex-wrap gap-2">
                  {onlineStores.map((ch) => (
                    <a key={ch.id} href={ch.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      {ch.shopName || t('visitStore')}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Channel Links - WhatsApp */}
            {whatsappChannels.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">{t('whatsappContact')}</h3>
                <div className="flex flex-wrap gap-2">
                  {whatsappChannels.map((ch) => (
                    <a key={ch.id} href={buildWhatsAppUrl(ch.url)} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp {t('inquiry')}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Inquiry Button */}
            <div className="mt-6 flex gap-3">
              <Link href={`/${locale}/contact?type=inquiry&productId=${product.id}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E8720C] text-white font-medium rounded-lg hover:bg-[#d4680b] transition-colors">
                <FileText className="w-4 h-4" /> {t('requestQuote')}
              </Link>
            </div>
          </div>
        </div>

        {/* Specs Table */}
        {specs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-[#1B3A5C] mb-4">{t('specifications')}</h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {specs.map((spec, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">{spec.label}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Description */}
        {description && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-[#1B3A5C] mb-4">{t('description')}</h2>
            <div className="prose max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        )}
      </div>
    </div>
  );
}
