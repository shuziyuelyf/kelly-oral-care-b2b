import ProductsListClient from './ProductsListClient';

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ProductsListClient locale={locale} />;
}
