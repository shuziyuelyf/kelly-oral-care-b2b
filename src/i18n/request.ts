import { locales, defaultLocale } from './config';

const config = async ({ requestLocale }: { requestLocale: Promise<string | undefined> }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale as typeof locales[number])) {
    locale = defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
};

export default config;
