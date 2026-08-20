import { NextResponse } from 'next/server';
import { mockNews } from '@/lib/mock/data';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const news = mockNews.find((n) => n.id === id);
  if (!news) return NextResponse.json({ error: 'News not found' }, { status: 404 });
  return NextResponse.json(news);
}
