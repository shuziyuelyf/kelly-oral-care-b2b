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
      { id: 1, categoryId: 1, langCode: 'zh-CN', categoryName: '工业设备', description: '专业工业设备和机械', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 2, categoryId: 1, langCode: 'en', categoryName: 'Industrial Equipment', description: 'Professional industrial equipment', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 3, categoryId: 1, langCode: 'ja', categoryName: '産業機器', description: null, seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 4, categoryId: 1, langCode: 'ar', categoryName: 'المعدات الصناعية', description: null, seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    children: [
      { id: 3, parentId: 1, categoryImage: null, level: 2, sort: 1, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01',
        i18n: [
          { id: 5, categoryId: 3, langCode: 'zh-CN', categoryName: '数控机床', description: '数控加工中心和车床', seoTitle: null, seoKeywords: null, seoDescription: null },
          { id: 6, categoryId: 3, langCode: 'en', categoryName: 'CNC Machines', description: 'CNC machining centers and lathes', seoTitle: null, seoKeywords: null, seoDescription: null },
        ],
      },
      { id: 4, parentId: 1, categoryImage: null, level: 2, sort: 2, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01',
        i18n: [
          { id: 7, categoryId: 4, langCode: 'zh-CN', categoryName: '液压系统', description: '液压泵和液压缸', seoTitle: null, seoKeywords: null, seoDescription: null },
          { id: 8, categoryId: 4, langCode: 'en', categoryName: 'Hydraulic Systems', description: 'Hydraulic pumps and cylinders', seoTitle: null, seoKeywords: null, seoDescription: null },
        ],
      },
    ],
  },
  { id: 2, parentId: 0, categoryImage: null, level: 1, sort: 2, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01',
    i18n: [
      { id: 9, categoryId: 2, langCode: 'zh-CN', categoryName: '电子元器件', description: '高品质电子元器件', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 10, categoryId: 2, langCode: 'en', categoryName: 'Electronic Components', description: 'High-quality electronic components', seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    children: [
      { id: 5, parentId: 2, categoryImage: null, level: 2, sort: 1, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01',
        i18n: [
          { id: 11, categoryId: 5, langCode: 'zh-CN', categoryName: '传感器', description: '工业传感器和检测器', seoTitle: null, seoKeywords: null, seoDescription: null },
          { id: 12, categoryId: 5, langCode: 'en', categoryName: 'Sensors', description: 'Industrial sensors and detectors', seoTitle: null, seoKeywords: null, seoDescription: null },
        ],
      },
    ],
  },
];
