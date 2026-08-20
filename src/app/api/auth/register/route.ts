import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { companyName, creditCode, contactName, email, phone, password } = body;

  if (!companyName || !contactName || !email || !password) {
    return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    data: { id: `CUST-${Date.now()}`, companyName, creditCode, contactName, email, phone, status: 'pending', createdAt: new Date().toISOString() },
  });
}
