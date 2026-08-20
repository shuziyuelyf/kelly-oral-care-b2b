import { NextResponse } from 'next/server';
import { mockBanners } from '@/lib/mock/data';

export async function GET() {
  return NextResponse.json(mockBanners);
}
