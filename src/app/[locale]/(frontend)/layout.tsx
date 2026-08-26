import Header from '@/components/frontend/Header';
import Footer from '@/components/frontend/Footer';
import MobileBottomCTA from '@/components/shared/MobileBottomCTA';

export default async function FrontendLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} />
      <main className="flex-1 pb-16 md:pb-0 md:pt-[68px]">{children}</main>
      <Footer locale={locale} />
      <MobileBottomCTA locale={locale} />
    </div>
  );
}
