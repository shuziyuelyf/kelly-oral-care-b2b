import { NextRequest, NextResponse } from 'next/server';
import { mockCustomers } from '@/lib/mock/other';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const auditStatus = searchParams.get('auditStatus');
  let filtered = [...mockCustomers];
  if (auditStatus !== null) filtered = filtered.filter((c) => c.auditStatus === Number(auditStatus));
  return NextResponse.json(filtered);
}
