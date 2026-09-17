import { NextRequest, NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ errorCode: 'INVALID_JSON', error: 'Invalid JSON body' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const content = typeof body.content === 'string' ? body.content.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const company = typeof body.company === 'string' ? body.company.trim() : '';
  const langCode = typeof body.langCode === 'string' ? body.langCode : '';

  if (!name) {
    return NextResponse.json({ errorCode: 'NAME_REQUIRED', error: 'Name is required' }, { status: 400 });
  }
  if (!email) {
    return NextResponse.json({ errorCode: 'EMAIL_REQUIRED', error: 'Email is required' }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ errorCode: 'EMAIL_INVALID', error: 'Email is not valid' }, { status: 400 });
  }
  if (!subject) {
    return NextResponse.json({ errorCode: 'SUBJECT_REQUIRED', error: 'Subject is required' }, { status: 400 });
  }
  if (!content) {
    return NextResponse.json({ errorCode: 'CONTENT_REQUIRED', error: 'Message content is required' }, { status: 400 });
  }

  // Log the received inquiry for future email/CRM integration (mock backend, no DB)
  console.log(
    `[contact] New inquiry from lang=${langCode}: name=${name}, email=${email}, phone=${phone || 'N/A'}, company=${company || 'N/A'}, subject=${subject}, content=${content}`,
  );

  return NextResponse.json({ success: true });
}