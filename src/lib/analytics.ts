/**
 * Analytics utility - pushes events to window.dataLayer
 * Works independently of Google Tag Manager
 */

interface AnalyticsEvent {
  event: string;
  [key: string]: string | number | boolean | null | undefined;
}

declare global {
  interface Window {
    dataLayer?: AnalyticsEvent[];
  }
}

/**
 * Track an analytics event by pushing to window.dataLayer
 */
export function trackEvent(eventName: string, params?: Record<string, string | number | boolean | null | undefined>): void {
  if (typeof window === 'undefined') return;

  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

/**
 * Auto-collect UTM parameters from URL
 */
export function getUTMParams(): { utm_source: string; utm_medium: string; utm_campaign: string; referrer: string } {
  if (typeof window === 'undefined') {
    return { utm_source: '', utm_medium: '', utm_campaign: '', referrer: '' };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    referrer: document.referrer || '',
  };
}

/**
 * Get current page URL
 */
export function getPageUrl(): string {
  if (typeof window === 'undefined') return '';
  return window.location.href;
}

/**
 * Submit lead data to API
 */
export async function submitLead(data: {
  buyer_intent?: string;
  lead_type?: string;
  customization_level?: string;
  expected_quantity?: string;
  product_id?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  company_name?: string;
  country?: string;
  message?: string;
  form_data?: Record<string, unknown>;
}): Promise<{ success: boolean; data?: Record<string, unknown>; message?: string }> {
  const utmParams = getUTMParams();
  const pageUrl = getPageUrl();

  const payload = {
    ...data,
    page_url: pageUrl,
    ...utmParams,
  };

  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch {
    return { success: false, message: 'Network error' };
  }
}
