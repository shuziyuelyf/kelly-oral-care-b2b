import Header from '@/components/frontend/Header';
import Footer from '@/components/frontend/Footer';
import MobileBottomCTA from '@/components/shared/MobileBottomCTA';

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileBottomCTA />
    </div>
  );
}
