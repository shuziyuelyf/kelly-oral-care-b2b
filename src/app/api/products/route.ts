import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mock/data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');
  const keyword = searchParams.get('keyword');
  const status = searchParams.get('status');
  const isHot = searchParams.get('isHot');
  const isRecommended = searchParams.get('isRecommended');
  const isNew = searchParams.get('isNew');
  const sort = searchParams.get('sort') || 'sort';
  const order = searchParams.get('order') || 'asc';
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '20');

  let filtered = [...mockProducts];

  if (categoryId) filtered = filtered.filter((p) => p.categoryId === Number(categoryId));
  if (status !== null) filtered = filtered.filter((p) => p.status === Number(status));
  if (isHot === 'true') filtered = filtered.filter((p) => p.isHot);
  if (isRecommended === 'true') filtered = filtered.filter((p) => p.isRecommended);
  if (isNew === 'true') filtered = filtered.filter((p) => p.isNew);
  if (keyword) {
    const kw = keyword.toLowerCase();
    filtered = filtered.filter((p) =>
      (p.productCode || '').toLowerCase().includes(kw) ||
      (p.i18n || []).some((i) => i.name.toLowerCase().includes(kw))
    );
  }

  if (sort === 'price') filtered.sort((a, b) => order === 'desc' ? ((b.priceMin || 0) - (a.priceMin || 0)) : ((a.priceMin || 0) - (b.priceMin || 0)));
  else if (sort === 'sales') filtered.sort((a, b) => order === 'desc' ? (b.salesCount - a.salesCount) : (a.salesCount - b.salesCount));
  else filtered.sort((a, b) => order === 'desc' ? (b.sort - a.sort) : (a.sort - b.sort));

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return NextResponse.json({ items, total, page, pageSize });
}
