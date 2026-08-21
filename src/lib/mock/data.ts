import type { Language, Product, ProductCategory, ProductChannel, Banner, News, NewsCategory, CaseShow, Inquiry, CustomDemand, CustomOption, Customer, Message, Partner, CompanyInfo, DashboardStats } from '../types';

// Re-export from split files
export { mockProducts } from './products';
export {
  mockBanners, mockNewsCategories, mockNews, mockCaseShows,
  mockInquiries, mockCustomDemands, mockCustomers, mockMessages,
  mockPartners, mockCompanyInfo, mockDashboardStats, mockCustomOptions,
} from './other';

export const mockLanguages: Language[] = [
  { id: 1, code: 'zh-CN', name: 'Chinese Simplified', nativeName: '简体中文', flagIcon: '🇨🇳', isRtl: false, sort: 1, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 2, code: 'zh-TW', name: 'Chinese Traditional', nativeName: '繁體中文', flagIcon: '🇹🇼', isRtl: false, sort: 2, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 3, code: 'en', name: 'English', nativeName: 'English', flagIcon: '🇺🇸', isRtl: false, sort: 3, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 4, code: 'ja', name: 'Japanese', nativeName: '日本語', flagIcon: '🇯🇵', isRtl: false, sort: 4, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 5, code: 'ko', name: 'Korean', nativeName: '한국어', flagIcon: '🇰🇷', isRtl: false, sort: 5, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 6, code: 'es', name: 'Spanish', nativeName: 'Español', flagIcon: '🇪🇸', isRtl: false, sort: 6, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 7, code: 'ar', name: 'Arabic', nativeName: 'العربية', flagIcon: '🇸🇦', isRtl: true, sort: 7, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
];

export const mockCategories: ProductCategory[] = [
  { id: 1, parentId: 0, categoryImage: null, level: 1, sort: 1, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01',
    i18n: [
      { id: 1, categoryId: 1, langCode: 'zh-CN', categoryName: '牙膏', description: '各类功效牙膏', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 2, categoryId: 1, langCode: 'en', categoryName: 'Toothpaste', description: 'Various functional toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 3, categoryId: 1, langCode: 'ja', categoryName: '歯磨き粉', description: null, seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 4, categoryId: 1, langCode: 'ar', categoryName: 'معجون أسنان', description: null, seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    children: [],
  },
  { id: 2, parentId: 0, categoryImage: null, level: 1, sort: 2, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01',
    i18n: [
      { id: 5, categoryId: 2, langCode: 'zh-CN', categoryName: '牙粉', description: '天然牙粉', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 6, categoryId: 2, langCode: 'en', categoryName: 'Tooth Powder', description: 'Natural tooth powder', seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    children: [],
  },
  { id: 3, parentId: 0, categoryImage: null, level: 1, sort: 3, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01',
    i18n: [
      { id: 7, categoryId: 3, langCode: 'zh-CN', categoryName: '漱口水', description: '口腔护理漱口水', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 8, categoryId: 3, langCode: 'en', categoryName: 'Mouthwash', description: 'Oral care mouthwash', seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    children: [],
  },
  { id: 4, parentId: 0, categoryImage: null, level: 1, sort: 4, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01',
    i18n: [
      { id: 9, categoryId: 4, langCode: 'zh-CN', categoryName: '牙刷', description: '各类牙刷', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 10, categoryId: 4, langCode: 'en', categoryName: 'Toothbrush', description: 'Various toothbrushes', seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    children: [],
  },
];
