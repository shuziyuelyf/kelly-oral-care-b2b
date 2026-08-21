export const locales = ['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, { name: string; flag: string }> = {
  'zh-CN': { name: '简体中文', flag: '🇨🇳' },
  'zh-TW': { name: '繁體中文', flag: '🇹🇼' },
  en: { name: 'English', flag: '🇺🇸' },
  ja: { name: '日本語', flag: '🇯🇵' },
  ko: { name: '한국어', flag: '🇰🇷' },
  es: { name: 'Español', flag: '🇪🇸' },
  ar: { name: 'العربية', flag: '🇸🇦' },
};

export const rtlLocales: Locale[] = ['ar'];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
