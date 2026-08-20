import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { contactName, contactEmail, companyName, material, dimensions, quantity, craft, description } = body;

  if (!contactName || !contactEmail || !material || !quantity) {
    return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    data: { id: `CD-${Date.now()}`, contactName, contactEmail, companyName, material, dimensions, quantity, craft, description, status: 'pending', createdAt: new Date().toISOString() },
  });
}
