import { redirect } from 'next/navigation';
import { locales } from '@/i18n/config';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  
  if (!locales.includes(locale as typeof locales[number])) {
    redirect(`/en/products/${slug}`);
  }

  return <ProductDetailClient locale={locale} slug={slug} />;
}
