import { NextRequest, NextResponse } from 'next/server';
import { mockCustomers } from '@/lib/mock/other';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newCustomer = {
    id: mockCustomers.length + 1,
    username: body.email?.split('@')[0] || '',
    companyName: body.companyName || '',
    creditCode: body.creditCode || '',
    contactPerson: body.contactName || body.contactPerson || '',
    contactPhone: body.contactPhone || '',
    contactEmail: body.email || '',
    province: null, city: null,
    address: body.address || '',
    industry: body.industry || '',
    businessLicense: null,
    auditStatus: 0,
    auditRemark: null,
    auditedAt: null, auditedBy: null,
    status: 1,
    lastLoginAt: null, lastLoginIp: null, remark: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return NextResponse.json({ success: true, data: newCustomer });
}
