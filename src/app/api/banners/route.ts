import { NextResponse } from 'next/server';
import { mockBanners } from '@/lib/mock/other';

export async function GET() {
  const activeBanners = mockBanners.filter((b) => b.status === 1);
  return NextResponse.json(activeBanners);
}
