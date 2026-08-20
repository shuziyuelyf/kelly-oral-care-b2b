import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.email || !body.password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  // Mock login
  if (body.email === 'admin@company.com' && body.password === 'admin123') {
    return NextResponse.json({
      success: true,
      data: { token: 'mock-jwt-token', user: { id: 1, name: 'Admin', email: 'admin@company.com', role: 'admin' } },
    });
  }
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
