import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Phone, Mail, MapPin } from 'lucide-react';
import { mockCompanyInfo } from '@/lib/mock/other';
import { getI18nValue } from '@/lib/utils-i18n';

export default function Footer() {
  const t = useTranslations('common');
  const locale = useLocale();
  const lang = locale;
  const company = mockCompanyInfo;
  const companyName = getI18nValue(company.i18n, lang, 'companyName');
  const address = getI18nValue(company.i18n, lang, 'address');

  const footerLinks = [
    {
      title: t('nav.products'),
      links: [
        { label: t('footer.allProducts'), href: '/products' },
        { label: t('nav.custom'), href: '/custom' },
      ],
    },
    {
      title: t('nav.about'),
      links: [
        { label: t('footer.company'), href: '/about' },
        { label: t('nav.news'), href: '/news' },
        { label: t('nav.contact'), href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-[#173A63] text-white">
      {/* CTA Band */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">{t('footer.ctaTitle')}</h3>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">{t('footer.ctaDesc')}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#173A63] font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              {t('footer.getQuote')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
            >
              {t('footer.contactSales')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">PM</span>
              </div>
              <span className="font-bold text-lg tracking-tight">{companyName}</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              {getI18nValue(company.i18n, lang, 'introduction').replace(/<[^>]*>/g, '').slice(0, 120)}...
            </p>
            <div className="space-y-2.5 text-sm text-white/50">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {company.phone}</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {company.email}</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {address}</div>
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-5">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-white/50 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Hours */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/80 mb-5">{t('footer.contactUs')}</h3>
            <div className="space-y-3 text-sm text-white/50">
              <p>{t('footer.businessHours')}: {company.businessHours}</p>
              <p>WhatsApp: +{company.whatsapp}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">{company.icp}</p>
        </div>
      </div>
    </footer>
  );
}
