import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { contactName, contactEmail, companyName, items, message } = body;

  if (!contactName || !contactEmail) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    data: { id: `INQ-${Date.now()}`, contactName, contactEmail, companyName, items, message, status: 'pending', createdAt: new Date().toISOString() },
  });
}
