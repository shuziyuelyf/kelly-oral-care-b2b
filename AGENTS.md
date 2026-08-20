# B2B Enterprise Website - AGENTS.md

## Project Overview
B2B enterprise corporate website with 7-language i18n support, built with Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + shadcn/ui.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI**: shadcn/ui (Radix UI) + Tailwind CSS 4
- **i18n**: next-intl (7 languages: zh-CN, zh-TW, en, ja, ko, es, ar)
- **Styling**: CSS variables + Tailwind utility classes

## Directory Structure
```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Root locale layout (next-intl provider)
│   │   ├── (frontend)/         # Public-facing pages
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── products/       # Product listing & detail
│   │   │   ├── custom/         # Custom manufacturing
│   │   │   ├── about/          # About us
│   │   │   ├── news/           # News listing & detail
│   │   │   ├── contact/        # Contact us
│   │   │   └── auth/           # Customer login/register
│   │   └── (admin)/admin/      # Admin panel
│   │       ├── dashboard/      # Dashboard
│   │       ├── products/       # Product management
│   │       ├── channels/       # Channel link management
│   │       ├── inquiries/      # Inquiry management
│   │       ├── custom-demands/ # Custom demand management
│   │       ├── content/        # Content management (news, banners, cases)
│   │       ├── customers/      # Customer management
│   │       ├── i18n/           # i18n translation management
│   │       └── settings/       # System settings (admins, roles, logs)
│   ├── api/                    # API Route Handlers (mock data)
│   │   ├── products/
│   │   ├── categories/
│   │   ├── banners/
│   │   ├── news/
│   │   ├── inquiries/
│   │   ├── custom-demands/
│   │   ├── contact/
│   │   ├── auth/
│   │   ├── customers/
│   │   └── dashboard/
│   └── sitemap.xml/
├── components/
│   ├── frontend/               # Header, Footer
│   ├── admin/                  # Admin components
│   ├── shared/                 # Shared components
│   └── ui/                     # shadcn/ui components
├── i18n/
│   ├── config.ts               # Locale definitions
│   └── request.ts              # next-intl request config
├── messages/                   # Translation JSON files (7 languages)
├── lib/
│   ├── types/index.ts          # TypeScript type definitions
│   ├── mock/data.ts            # Mock data
│   ├── utils.ts                # Utility functions (cn)
│   └── utils-i18n.ts           # i18n helper functions
├── middleware.ts                # next-intl middleware
└── server.ts                   # Custom server entry
```

## Key Commands
- `pnpm run dev` - Start dev server
- `pnpm run build` - Production build
- `pnpm run start` - Start production server

## Design System
- Primary: #1B3A5C (Corporate Navy)
- Accent: #E8720C (Industrial Orange)
- RTL support for Arabic (dir="rtl")
- Responsive: mobile-first design

## i18n Pattern
- URL-based locale routing: `/en/products`, `/zh-CN/products`, `/ar/products`
- Translation files: `src/messages/{locale}.json`
- Use `useTranslations()` hook in client components
- Use `getI18nValue()` utility for mock data i18n fields

## API Pattern
- All APIs are Next.js Route Handlers under `src/app/api/`
- Currently using mock data, designed for future Java Spring Boot integration
- RESTful conventions: GET for listing/detail, POST for creation
