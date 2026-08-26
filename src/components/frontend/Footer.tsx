import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin } from 'lucide-react';
import { contact, brand } from '@/lib/brand';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('common');

  const footerSections = [
    {
      title: t('nav.products'),
      links: [
        { label: t('footer.allProducts'), href: '/products' },
        { label: t('nav.privateLabel'), href: '/private-label' },
        { label: t('nav.custom'), href: '/custom' },
      ],
    },
    {
      title: 'Manufacturing',
      links: [
        { label: t('nav.factory'), href: '/factory' },
        { label: t('nav.quality'), href: '/quality' },
        { label: t('nav.custom'), href: '/custom' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: t('nav.about'), href: '/about' },
        { label: t('nav.resources'), href: '/resources' },
        { label: t('nav.contact'), href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-[#173A63] text-white">
      {/* CTA Band */}
      <div className="border-b border-white/10">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6 py-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">{t('footer.ctaTitle')}</h3>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">{t('footer.ctaDesc')}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#173A63] font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              {t('footer.getQuote')}
            </Link>
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#21C96B] text-white font-semibold rounded-full hover:bg-[#1db954] transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight">{brand.name}</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              {brand.tagline}. Ready products, private label, and OEM/ODM manufacturing for brands worldwide.
            </p>
            <div className="space-y-2.5 text-sm text-white/50">
              {contact.phone && (
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {contact.phone}</div>
              )}
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {contact.email}</div>
              {contact.address && (
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {contact.address}</div>
              )}
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
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
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto w-[94%] max-w-[1360px] px-2 md:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} {brand.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
