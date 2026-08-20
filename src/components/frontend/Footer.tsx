import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  return (
    <footer className="bg-[#1B3A5C] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-white/10">
                <span className="text-lg font-bold">B</span>
              </div>
              <span className="text-lg font-bold">B2B<span className="text-[#E8720C]">Pro</span></span>
            </div>
            <p className="text-sm text-gray-300">{t('about_desc')}</p>
            <div className="mt-4 space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+86-755-8888-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@b2bpro.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Shenzhen, Guangdong, China</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">{t('quick_links')}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href={`/${locale}/products`} className="transition-colors hover:text-white">{tNav('products')}</Link></li>
              <li><Link href={`/${locale}/custom`} className="transition-colors hover:text-white">{tNav('custom')}</Link></li>
              <li><Link href={`/${locale}/about`} className="transition-colors hover:text-white">{tNav('about')}</Link></li>
              <li><Link href={`/${locale}/news`} className="transition-colors hover:text-white">{tNav('news')}</Link></li>
              <li><Link href={`/${locale}/contact`} className="transition-colors hover:text-white">{tNav('contact')}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">{t('support')}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="transition-colors hover:text-white">{t('faq')}</a></li>
              <li><a href="#" className="transition-colors hover:text-white">{t('shipping')}</a></li>
              <li><a href="#" className="transition-colors hover:text-white">{t('returns')}</a></li>
              <li><a href="#" className="transition-colors hover:text-white">{t('privacy')}</a></li>
              <li><a href="#" className="transition-colors hover:text-white">{t('terms')}</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">{t('newsletter')}</h3>
            <p className="mb-3 text-sm text-gray-300">{t('newsletter_desc')}</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t('newsletter_placeholder')}
                className="flex-1 rounded-md bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E8720C]"
              />
              <button className="rounded-md bg-[#E8720C] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d4660a]">
                {t('newsletter_subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
