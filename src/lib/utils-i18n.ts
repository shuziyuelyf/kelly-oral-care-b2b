/**
 * i18n helper utilities
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyI18nEntry = Record<string, any>;

/**
 * Get the i18n value for a specific locale from an array of i18n entries.
 * Falls back to the first available entry if the requested locale is not found.
 */
export function getI18nValue<T extends AnyI18nEntry>(
  i18nArray: T[] | undefined | null,
  langCode: string,
  field: keyof T
): string {
  if (!i18nArray || i18nArray.length === 0) return '';
  const entry = i18nArray.find((item) => item.langCode === langCode) || i18nArray[0];
  const value = entry[field];
  return typeof value === 'string' ? value : '';
}

/**
 * Get i18n value from a Record<string, string> object (e.g., { en: '...', zh: '...' })
 */
export function getI18nRecordValue(
  i18nRecord: Record<string, string> | undefined | null,
  langCode: string
): string {
  if (!i18nRecord) return '';
  return i18nRecord[langCode] || i18nRecord['en'] || Object.values(i18nRecord)[0] || '';
}

/**
 * Get i18n object for a specific locale
 */
export function getI18nEntry<T extends AnyI18nEntry>(
  i18nArray: T[] | undefined | null,
  langCode: string
): T | undefined {
  if (!i18nArray || i18nArray.length === 0) return undefined;
  return i18nArray.find((item) => item.langCode === langCode) || i18nArray[0];
}

/**
 * Safe image src: returns empty string for null/undefined
 */
export function safeImageSrc(src: string | null | undefined): string {
  return src || '';
}
