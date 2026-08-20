import { NextRequest, NextResponse } from 'next/server';
import { mockCustomDemands } from '@/lib/mock/other';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  let filtered = [...mockCustomDemands];
  if (status !== null) filtered = filtered.filter((d) => d.status === Number(status));
  return NextResponse.json(filtered);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newDemand = {
    id: mockCustomDemands.length + 1,
    demandNo: `DEM${Date.now()}`,
    customerId: null,
    companyName: body.companyName || '',
    contactPerson: body.contactName || body.contactPerson || '',
    contactPhone: body.contactPhone || '',
    contactEmail: body.contactEmail || '',
    productType: body.productType || '',
    material: body.material || '',
    craft: body.craft || '',
    sizeSpec: body.sizeSpec || '',
    quantity: body.quantity || 0,
    budget: body.budget || null,
    expectedDate: body.expectedDate || null,
    attachmentUrls: null,
    description: body.description || '',
    status: 0,
    quoteAmount: null, quoteRemark: null, quoteFile: null,
    handlerId: null, handledAt: null, quotedAt: null, followUpRemark: null,
    ip: '127.0.0.1', langCode: 'en',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return NextResponse.json({ success: true, data: newDemand });
}
