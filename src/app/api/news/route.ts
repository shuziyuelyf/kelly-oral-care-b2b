import { NextResponse } from 'next/server';
import { mockNews } from '@/lib/mock/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  let filtered = [...mockNews];
  if (category && category !== 'all') {
    filtered = filtered.filter((n) => n.category === category);
  }
  return NextResponse.json(filtered);
}
