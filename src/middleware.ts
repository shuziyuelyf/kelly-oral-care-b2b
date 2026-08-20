import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(zh-CN|zh-TW|en|ja|ko|es|ar)/:path*'],
};
