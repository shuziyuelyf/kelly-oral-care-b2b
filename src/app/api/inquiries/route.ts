import { NextRequest, NextResponse } from 'next/server';
import { mockInquiries } from '@/lib/mock/other';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  let filtered = [...mockInquiries];
  if (status !== null) filtered = filtered.filter((i) => i.status === Number(status));
  return NextResponse.json(filtered);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newInquiry = {
    id: mockInquiries.length + 1,
    inquiryNo: `INQ${Date.now()}`,
    source: 1,
    customerId: null,
    companyName: body.companyName || '',
    contactPerson: body.contactName || body.contactPerson || '',
    contactPhone: body.contactPhone || '',
    contactEmail: body.contactEmail || '',
    itemCount: body.items?.length || 0,
    totalAmount: null,
    status: 0,
    remark: body.message || body.remark || '',
    quoteRemark: null, quoteFile: null, quotedBy: null, quotedAt: null, dealAt: null, closedAt: null, closeReason: null,
    ip: '127.0.0.1', langCode: 'en',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: body.items || [],
  };
  return NextResponse.json({ success: true, data: newInquiry });
}
