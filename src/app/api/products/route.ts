import { NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mock/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '12');

  let filtered = [...mockProducts];

  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.categoryId === category);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((p) =>
      p.i18n.some((i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)) ||
      p.modelNumber.toLowerCase().includes(q)
    );
  }

  if (sort === 'price_asc') filtered.sort((a, b) => (a.skus[0]?.price || 0) - (b.skus[0]?.price || 0));
  else if (sort === 'price_desc') filtered.sort((a, b) => (b.skus[0]?.price || 0) - (a.skus[0]?.price || 0));
  else if (sort === 'newest') filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return NextResponse.json({ items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) });
}
