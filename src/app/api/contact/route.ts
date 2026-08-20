import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.name || !body.email || !body.content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  return NextResponse.json({ success: true, message: 'Message sent successfully' });
}
