import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'B2BPro - Professional B2B Supply Chain Solutions',
    template: '%s | B2BPro',
  },
  description: 'Professional B2B industrial products supplier with global delivery capabilities. CNC machines, electronic components, raw materials, and custom manufacturing services.',
  keywords: 'B2B, industrial products, CNC, manufacturing, wholesale, custom manufacturing, OEM, ODM',
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
