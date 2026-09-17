/**
 * Kelly Oral Care — Centralized Brand & Company Data
 * Single source of truth for brand name, contact info, MOQ, lead times, etc.
 * No fabricated data — use "Contact Us" where real values are not yet available.
 */

export const brand = {
  name: 'Kelly Oral Care',
  legalName: 'Kelly Biotechnology Co., Ltd.',
  shortName: 'Kelly',
  domain: 'kellyoralcare.com',
  tagline: 'Oral Care Products & Manufacturing Solutions',
} as const;

export const contact = {
  // WhatsApp — leave empty until a real international number is provided.
  // Once filled in here, isPlausibleWhatsApp()/hasWhatsApp become true and all
  // site-wide WhatsApp CTAs render automatically (single source of truth).
  whatsapp: '',
  whatsappUrl: '',
  email: 'contact@kellyoralcare.com',
  phone: null as string | null, // null = not provided, show "Contact Us"
  address: null as string | null,
  businessHours: 'Mon–Fri 9:00–18:00 (GMT+8)',
} as const;

/**
 * Filler/placeholder numbers (never real) that must stay hidden.
 * These hardcoded test numbers should not be shown to customers.
 */
const PLACEHOLDER_WHATSAPP_NUMBERS = ['1234567890', '8613800138000'];

/**
 * Return true only when `num` looks like a real international WhatsApp number:
 * non-empty, digits-only (ignoring '+', spaces) after trimming, length >= 10,
 * and not one of the known placeholder/test numbers (or starting with 123456).
 */
export function isPlausibleWhatsApp(
  num: string | null | undefined
): boolean {
  if (!num) return false;
  const digits = num.replace(/[\s+()-]/g, '');
  if (!/^\d+$/.test(digits)) return false;
  if (digits.length < 10) return false;
  if (PLACEHOLDER_WHATSAPP_NUMBERS.includes(digits)) return false;
  if (digits.startsWith('123456')) return false;
  return true;
}

/** Convenience flag for conditional rendering of WhatsApp CTAs across the site. */
export const hasWhatsApp = isPlausibleWhatsApp(contact.whatsapp);

/**
 * MOQ & Lead Time tiers — single source of truth.
 * Values shown across Homepage, Private Label, Products, OEM/ODM.
 * Real values to be confirmed by the client.
 */
export const privateLabelTiers = [
  {
    tier: 'Starter',
    moq: '500 pcs',
    leadTime: '2–3 weeks',
    description: 'Logo sticker on standard packaging — fastest way to launch',
    popular: false,
  },
  {
    tier: 'Brand',
    moq: '3,000 pcs',
    leadTime: '3–4 weeks',
    description: 'Custom tube printing with your brand design',
    popular: true,
  },
  {
    tier: 'Premium',
    moq: '5,000 pcs',
    leadTime: '4–6 weeks',
    description: 'Full custom tube + box with premium finishes',
    popular: false,
  },
] as const;

export const containerClass = 'mx-auto w-[94%] max-w-[1360px] px-2 md:px-6';
