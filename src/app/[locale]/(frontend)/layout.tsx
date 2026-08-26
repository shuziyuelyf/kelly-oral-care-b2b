import Header from '@/components/frontend/Header';
import Footer from '@/components/frontend/Footer';
import MainWrapper from './MainWrapper';

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
      <MainWrapper>{children}</MainWrapper>
      <Footer locale={locale} />
    </div>
  );
}
