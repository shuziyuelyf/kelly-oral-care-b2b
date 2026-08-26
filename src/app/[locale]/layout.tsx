import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Kelly Oral Care — B2B Oral Care Manufacturer | Toothpaste, Mouthwash & Private Label',
    template: '%s | Kelly Oral Care',
  },
  description:
    'Kelly Biotechnology is a professional B2B oral care manufacturer offering toothpaste, mouthwash, tooth powder, toothbrushes, teeth whitening, and private label / OEM / ODM custom formula and packaging solutions for global brands.',
  keywords:
    'oral care manufacturer, toothpaste OEM, private label toothpaste, mouthwash manufacturer, tooth powder OEM, bamboo toothbrush, teeth whitening strips, custom formula oral care, oral care B2B, Kelly Oral Care, Kelly Biotechnology',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className="min-h-screen bg-white font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
