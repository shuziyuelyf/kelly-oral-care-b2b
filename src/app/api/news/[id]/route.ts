import { NextRequest, NextResponse } from 'next/server';
import { mockNews } from '@/lib/mock/other';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const news = mockNews.find((n) => n.id === Number(id));
  if (!news) return NextResponse.json({ error: 'News not found' }, { status: 404 });
  return NextResponse.json(news);
}
