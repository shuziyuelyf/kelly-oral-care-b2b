import Header from '@/components/frontend/Header';
import Footer from '@/components/frontend/Footer';
import { headers } from 'next/headers';

export default async function FrontendLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const headersList = await headers();
  const pathname = headersList.get('x-invoke-path') || headersList.get('x-middleware-pathname') || '';
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === '';

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} />
      <main className="flex-1 md:pt-[68px]">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
