import { NextRequest, NextResponse } from 'next/server';
import { mockNews } from '@/lib/mock/other';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');

  let filtered = mockNews.filter((n) => n.isPublished);
  if (categoryId) filtered = filtered.filter((n) => n.categoryId === Number(categoryId));

  const total = filtered.length;
  const items = filtered.slice((page - 1) * pageSize, page * pageSize);
  return NextResponse.json({ items, total, page, pageSize });
}
