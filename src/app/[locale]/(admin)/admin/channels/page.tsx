'use client';

import { useLocale, useTranslations } from 'next-intl';
import { mockProducts } from '@/lib/mock/data';
import { getI18nValue } from '@/lib/utils-i18n';
import { ExternalLink, MessageCircle, Globe } from 'lucide-react';

export default function AdminChannelsPage() {
  const locale = useLocale();
  const t = useTranslations('admin.channels');
  const lang = locale;

  const productsWithChannels = mockProducts.filter((p) => p.channels && p.channels.length > 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B3A5C] mb-6">{t('title')}</h1>
      <div className="space-y-4">
        {productsWithChannels.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <img src={product.mainImage || undefined} alt="" className="w-12 h-12 rounded object-cover" />
              <div>
                <h3 className="font-semibold text-[#1B3A5C]">{getI18nValue(product.i18n, lang, 'name')}</h3>
                <p className="text-sm text-gray-500">{product.productCode}</p>
              </div>
            </div>
            <div className="space-y-2">
              {(product.channels || []).map((ch) => (
                <div key={ch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {ch.channelType === 1 ? (
                      <Globe className="w-4 h-4 text-blue-500" />
                    ) : (
                      <MessageCircle className="w-4 h-4 text-green-500" />
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      {ch.channelType === 1 ? (ch.shopName || t('onlineStore')) : 'WhatsApp'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 truncate max-w-[200px]">{ch.url}</span>
                    <a href={ch.url} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-gray-200 rounded">
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </a>
                    <span className={`px-2 py-0.5 rounded text-xs ${ch.status === 1 ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {ch.status === 1 ? t('active') : t('inactive')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
