import { NextResponse } from 'next/server';
import { mockDashboardStats, mockCustomers } from '@/lib/mock/other';

export async function GET() {
  return NextResponse.json(mockDashboardStats);
}
