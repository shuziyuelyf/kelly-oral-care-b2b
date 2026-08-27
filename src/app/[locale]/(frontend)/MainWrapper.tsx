'use client';

import { usePathname } from 'next/navigation';

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Remove locale prefix to check if on homepage
  const segments = pathname.split('/').filter(Boolean);
  const isHome = segments.length <= 1; // e.g. /en or /

  return (
    <main className={`flex-1 ${isHome ? 'pt-0' : 'pt-0 md:pt-[112px] bg-[#F7F4EF] min-h-screen'}`}>
      {children}
    </main>
  );
}
