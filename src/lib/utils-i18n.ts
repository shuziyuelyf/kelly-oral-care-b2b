/**
 * Get the i18n value for a specific locale from an array of translations.
 * Falls back to English, then to the first available translation.
 */
export function getI18nValue<T extends { locale: string }>(
  i18nArray: T[],
  locale: string,
  field: keyof T
): string {
  const exact = i18nArray.find((item) => item.locale === locale);
  if (exact && exact[field]) return exact[field] as string;

  const fallback = i18nArray.find((item) => item.locale === 'en');
  if (fallback && fallback[field]) return fallback[field] as string;

  return (i18nArray[0]?.[field] as string) || '';
}

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number, locale: string = 'en'): string {
  const currency = locale === 'zh-CN' || locale === 'zh-TW' ? 'CNY' : 'USD';
  return new Intl.NumberFormat(locale === 'zh-CN' ? 'zh-CN' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: price < 100 ? 2 : 0,
    maximumFractionDigits: price < 100 ? 2 : 0,
  }).format(price);
}

/**
 * Format date for display
 */
export function formatDate(dateStr: string, locale: string = 'en'): string {
  return new Intl.DateTimeFormat(locale === 'zh-CN' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr));
}
