import Header from '@/components/frontend/Header';
import Footer from '@/components/frontend/Footer';

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
      <main className="flex-1 pt-0 md:pt-[88px]">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
