import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Phone, Mail, MapPin } from 'lucide-react';
import { mockCompanyInfo, mockPartners } from '@/lib/mock/other';
import { getI18nValue } from '@/lib/utils-i18n';

export default function Footer() {
  const t = useTranslations('common');
  const locale = useLocale();
  const lang = locale;
  const company = mockCompanyInfo;
  const companyName = getI18nValue(company.i18n, lang, 'companyName');
  const address = getI18nValue(company.i18n, lang, 'address');

  const footerLinks = [
    { title: t('nav.products'), links: [{ label: t('footer.allProducts'), href: '/products' }, { label: t('nav.custom'), href: '/custom' }] },
    { title: t('nav.about'), links: [{ label: t('footer.company'), href: '/about' }, { label: t('nav.news'), href: '/news' }, { label: t('nav.contact'), href: '/contact' }] },
  ];

  return (
    <footer className="bg-[#1a2332] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E8720C] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B2B</span>
              </div>
              <span className="font-bold text-lg">{companyName}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {getI18nValue(company.i18n, lang, 'introduction').replace(/<[^>]*>/g, '').slice(0, 100)}...
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {company.phone}</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {company.email}</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {address}</div>
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={`/${locale}${link.href}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.contactUs')}</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{t('footer.businessHours')}: {company.businessHours}</p>
              <p>WhatsApp: +{company.whatsapp}</p>
            </div>
          </div>
        </div>

        {/* Partners */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <h4 className="text-sm font-medium text-gray-400 mb-4">{t('footer.partners')}</h4>
          <div className="flex flex-wrap gap-6 items-center">
            {mockPartners.map((partner) => (
              <div key={partner.id} className="text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors">
                {partner.name}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; 2024 {companyName}. All rights reserved.</p>
          <div className="flex gap-4">
            <span>{company.icp}</span>
            <span>{company.policeRecord}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
