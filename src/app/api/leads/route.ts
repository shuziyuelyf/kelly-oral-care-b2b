import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const buyerIntent = searchParams.get('buyer_intent');
  const leadType = searchParams.get('lead_type');
  const status = searchParams.get('status');

  // In production, query from database
  // For now, return empty array (mock data pattern)
  const leads: Record<string, unknown>[] = [];

  let filtered = [...leads];
  if (buyerIntent) filtered = filtered.filter((l) => l.buyer_intent === buyerIntent);
  if (leadType) filtered = filtered.filter((l) => l.lead_type === leadType);
  if (status !== null) filtered = filtered.filter((l) => l.status === Number(status));

  return NextResponse.json(filtered);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const leadNo = `LEAD-${Date.now()}`;
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '0.0.0.0';

    const newLead = {
      lead_no: leadNo,
      buyer_intent: body.buyer_intent || null,
      lead_type: body.lead_type || 'contact',
      customization_level: body.customization_level || 'none',
      expected_quantity: body.expected_quantity || null,
      product_id: body.product_id || null,
      page_url: body.page_url || null,
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      referrer: body.referrer || null,
      contact_name: body.contact_name || body.contactName || '',
      contact_email: body.contact_email || body.contactEmail || '',
      contact_phone: body.contact_phone || body.contactPhone || '',
      company_name: body.company_name || body.companyName || '',
      country: body.country || '',
      message: body.message || '',
      form_data: body.form_data || {},
      status: 0,
      ip,
      lang_code: body.lang_code || 'en',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // In production, insert into database
    // For now, return success with the lead data
    return NextResponse.json({
      success: true,
      data: newLead,
      message: 'Lead submitted successfully',
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}
