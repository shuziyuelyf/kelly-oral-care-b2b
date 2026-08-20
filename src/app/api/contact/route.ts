import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, company, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: 'Message sent successfully' });
}
