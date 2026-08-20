import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }

  // Mock login
  if (email === 'admin@company.com' && password === 'admin123') {
    return NextResponse.json({ success: true, data: { token: 'mock-jwt-token', user: { id: '1', name: 'Admin', email, role: 'admin' } } });
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
