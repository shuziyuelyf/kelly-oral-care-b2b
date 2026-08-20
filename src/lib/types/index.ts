/**
 * B2B Enterprise Website - TypeScript Type Definitions
 * Strictly mapped to 42 database tables in design document v3.0
 */

// ==================== 1. language ====================
export interface Language {
  id: number;
  code: string;           // zh-CN, zh-TW, en, ja, ko, es, ar
  name: string;           // English name: Chinese Simplified
  nativeName: string;     // Native name: 简体中文
  flagIcon: string | null; // Flag emoji
  isRtl: boolean;         // RTL layout for Arabic
  sort: number;
  status: number;         // 0=disabled, 1=enabled
  createdAt: string;
  updatedAt: string;
}

// ==================== 8. customer ====================
export interface Customer {
  id: number;
  username: string;
  companyName: string;
  creditCode: string | null;  // 统一社会信用代码
  contactPerson: string;
  contactPhone: string;
  contactEmail: string | null;
  province: string | null;
  city: string | null;
  address: string | null;
  industry: string | null;
  businessLicense: string | null;
  auditStatus: number;    // 0=pending, 1=approved, 2=rejected
  auditRemark: string | null;
  auditedAt: string | null;
  auditedBy: number | null;
  status: number;         // 0=disabled, 1=enabled
  lastLoginAt: string | null;
  lastLoginIp: string | null;
  remark: string | null;
  createdAt: string;
  updatedAt: string;
}

// ==================== 9-10. product_category ====================
export interface ProductCategory {
  id: number;
  parentId: number;       // 0 = top level
  categoryImage: string | null;
  level: number;          // 1, 2, 3
  sort: number;
  status: number;         // 0=disabled, 1=enabled
  createdAt: string;
  updatedAt: string;
  i18n?: ProductCategoryI18n[];
  children?: ProductCategory[];
}

export interface ProductCategoryI18n {
  id: number;
  categoryId: number;
  langCode: string;
  categoryName: string;
  description: string | null;
  seoTitle: string | null;
  seoKeywords: string | null;
  seoDescription: string | null;
}

// ==================== 11-12. product ====================
export interface Product {
  id: number;
  categoryId: number;
  productCode: string | null;
  slug: string | null;
  mainImage: string | null;
  priceMin: number | null;
  priceMax: number | null;
  unit: string;           // 件/套/个/米
  minOrderQuantity: number;
  totalStock: number;
  salesCount: number;
  isHot: boolean;
  isRecommended: boolean;
  isNew: boolean;
  status: number;         // 0=下架, 1=上架
  sort: number;
  createdAt: string;
  updatedAt: string;
  i18n?: ProductI18n[];
  skus?: ProductSKU[];
  images?: ProductImage[];
  channels?: ProductChannel[];
  category?: ProductCategory;
}

export interface ProductI18n {
  id: number;
  productId: number;
  langCode: string;
  name: string;
  subtitle: string | null;
  description: string | null;  // LONGTEXT rich text HTML
  specsData: string | null;    // JSON: [{label, value}]
  slug: string | null;
  seoTitle: string | null;
  seoKeywords: string | null;
  seoDescription: string | null;
}

// ==================== 13. product_sku ====================
export interface ProductSKU {
  id: number;
  productId: number;
  skuCode: string | null;
  price: number;
  stock: number;
  stockWarning: number;
  weight: number | null;
  volume: string | null;
  status: number;
  createdAt: string;
  updatedAt: string;
  attributes?: ProductSKUAttribute[];
}

// ==================== 14. product_image ====================
export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  altText: string | null;
  sort: number;
  isMain: boolean;
  createdAt: string;
}

// ==================== 15-16. product_attribute ====================
export interface ProductAttribute {
  id: number;
  categoryId: number;
  inputType: number;      // 1=单选, 2=多选, 3=手动输入
  sort: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  i18n?: ProductAttributeI18n[];
  values?: ProductAttributeValue[];
}

export interface ProductAttributeI18n {
  id: number;
  attributeId: number;
  langCode: string;
  attributeName: string;
}

// ==================== 17-18. product_attribute_value ====================
export interface ProductAttributeValue {
  id: number;
  attributeId: number;
  sort: number;
  createdAt: string;
  i18n?: ProductAttributeValueI18n[];
}

export interface ProductAttributeValueI18n {
  id: number;
  valueId: number;
  langCode: string;
  valueName: string;
}

// ==================== 19. product_sku_attribute ====================
export interface ProductSKUAttribute {
  id: number;
  skuId: number;
  attributeId: number;
  attributeValueId: number;
  createdAt: string;
  // Joined fields
  attributeName?: string;
  attributeValueName?: string;
}

// ==================== 20. product_channel ====================
export interface ProductChannel {
  id: number;
  productId: number;
  skuId: number | null;
  channelType: number;    // 1=线上电商, 2=WhatsApp
  shopName: string | null; // 店铺名称 (e.g., "XX淘宝旗舰店")
  url: string;            // 跳转链接
  qrCode: string | null;  // 渠道二维码
  sort: number;
  status: number;         // 0=disabled, 1=enabled
  createdAt: string;
  updatedAt: string;
}

// ==================== 21-22. inquiry ====================
export interface Inquiry {
  id: number;
  inquiryNo: string;      // INQ202501010001
  source: number;         // 1=产品页直接询价, 2=定制需求转询价
  customerId: number | null;
  companyName: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string | null;
  itemCount: number;
  totalAmount: number | null;
  status: number;         // 0=待跟进, 1=已报价, 2=已成交, 3=已关闭
  remark: string | null;
  quoteRemark: string | null;
  quoteFile: string | null;
  quotedBy: number | null;
  quotedAt: string | null;
  dealAt: string | null;
  closedAt: string | null;
  closeReason: string | null;
  ip: string | null;
  langCode: string;
  createdAt: string;
  updatedAt: string;
  items?: InquiryItem[];
}

export interface InquiryItem {
  id: number;
  inquiryId: number;
  productId: number | null;
  skuId: number | null;
  productName: string | null;  // 快照
  skuName: string | null;      // 快照
  productImage: string | null; // 快照
  quantity: number;
  specInfo: string | null;     // 规格信息文本快照
  unitPrice: number | null;
  subtotal: number | null;
  createdAt: string;
  product?: Product;
}

// ==================== 23-26. custom_option ====================
export interface CustomOption {
  id: number;
  optionCode: string;     // material, craft, surface_treatment
  inputType: number;      // 1=单选, 2=多选, 3=手动输入
  isRequired: boolean;
  sort: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  i18n?: CustomOptionI18n[];
  values?: CustomOptionValue[];
}

export interface CustomOptionI18n {
  id: number;
  optionId: number;
  langCode: string;
  optionName: string;
}

export interface CustomOptionValue {
  id: number;
  optionId: number;
  sort: number;
  createdAt: string;
  i18n?: CustomOptionValueI18n[];
}

export interface CustomOptionValueI18n {
  id: number;
  valueId: number;
  langCode: string;
  valueName: string;
}

// ==================== 27. custom_demand ====================
export interface CustomDemand {
  id: number;
  demandNo: string;       // DEM202501010001
  customerId: number | null;
  companyName: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string | null;
  productType: string | null;
  material: string | null;
  craft: string | null;
  sizeSpec: string | null;
  quantity: number | null;
  budget: number | null;
  expectedDate: string | null;
  attachmentUrls: string | null;  // JSON array
  description: string | null;
  status: number;         // 0=待处理, 1=已查看, 2=已报价, 3=已成交, 4=已关闭
  quoteAmount: number | null;
  quoteRemark: string | null;
  quoteFile: string | null;
  handlerId: number | null;
  handledAt: string | null;
  quotedAt: string | null;
  followUpRemark: string | null;
  ip: string | null;
  langCode: string;
  createdAt: string;
  updatedAt: string;
}

// ==================== 28-29. news_category ====================
export interface NewsCategory {
  id: number;
  sort: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  i18n?: NewsCategoryI18n[];
}

export interface NewsCategoryI18n {
  id: number;
  categoryId: number;
  langCode: string;
  categoryName: string;
}

// ==================== 30-31. news ====================
export interface News {
  id: number;
  categoryId: number;
  slug: string | null;
  coverImage: string | null;
  author: string | null;
  source: string | null;
  viewCount: number;
  isTop: boolean;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  i18n?: NewsI18n[];
  category?: NewsCategory;
}

export interface NewsI18n {
  id: number;
  newsId: number;
  langCode: string;
  title: string;
  summary: string | null;
  content: string;        // LONGTEXT rich text HTML
  slug: string | null;
  seoTitle: string | null;
  seoKeywords: string | null;
  seoDescription: string | null;
}

// ==================== 32-33. banner ====================
export interface Banner {
  id: number;
  imageUrl: string;
  mobileImageUrl: string | null;
  linkType: number;       // 1=无链接, 2=产品详情, 3=分类页, 4=外部链接, 5=定制页
  linkUrl: string | null;
  sort: number;
  startTime: string | null;
  endTime: string | null;
  status: number;
  createdAt: string;
  updatedAt: string;
  i18n?: BannerI18n[];
}

export interface BannerI18n {
  id: number;
  bannerId: number;
  langCode: string;
  title: string | null;
  altText: string | null;
}

// ==================== 34-35. case_show ====================
export interface CaseShow {
  id: number;
  coverImage: string | null;
  images: string | null;  // JSON array of image URLs
  sort: number;
  isPublished: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  i18n?: CaseShowI18n[];
}

export interface CaseShowI18n {
  id: number;
  caseId: number;
  langCode: string;
  title: string;
  customerName: string | null;
  industry: string | null;
  material: string | null;
  craft: string | null;
  summary: string | null;
  content: string | null;
  slug: string | null;
  seoTitle: string | null;
  seoKeywords: string | null;
  seoDescription: string | null;
}

// ==================== 36-37. page_content ====================
export interface PageContent {
  id: number;
  pageKey: string;        // about, contact, faq, terms
  status: number;
  sort: number;
  createdAt: string;
  updatedAt: string;
  i18n?: PageContentI18n[];
}

export interface PageContentI18n {
  id: number;
  pageId: number;
  langCode: string;
  title: string;
  content: string;        // LONGTEXT rich text HTML
  seoTitle: string | null;
  seoKeywords: string | null;
  seoDescription: string | null;
}

// ==================== 38. message ====================
export interface Message {
  id: number;
  customerId: number | null;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  subject: string | null;
  content: string;
  type: number;           // 1=通用咨询, 2=产品询价, 3=商务合作
  status: number;         // 0=未处理, 1=已处理
  reply: string | null;
  repliedBy: number | null;
  repliedAt: string | null;
  ip: string | null;
  langCode: string;
  createdAt: string;
  updatedAt: string;
}

// ==================== 39. partner ====================
export interface Partner {
  id: number;
  name: string;
  logo: string;
  website: string | null;
  sort: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

// ==================== 40-41. company_info ====================
export interface CompanyInfo {
  id: number;             // Fixed to 1
  logo: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  province: string | null;
  city: string | null;
  longitude: number | null;
  latitude: number | null;
  website: string | null;
  qrCode: string | null;
  businessHours: string | null;
  factoryImages: string | null;  // JSON array
  teamImages: string | null;     // JSON array
  history: string | null;        // JSON: [{year, event}]
  honors: string | null;         // JSON: [{title, image}]
  certifications: string | null; // JSON: [{name, image}]
  seoTitle: string | null;
  seoKeywords: string | null;
  seoDescription: string | null;
  icp: string | null;
  policeRecord: string | null;
  createdAt: string;
  updatedAt: string;
  i18n?: CompanyInfoI18n[];
}

export interface CompanyInfoI18n {
  id: number;
  companyInfoId: number;
  langCode: string;
  companyName: string;
  slogan: string | null;
  introduction: string | null;  // LONGTEXT rich text
  address: string | null;
}

// ==================== 42. site_setting ====================
export interface SiteSetting {
  id: number;
  settingKey: string;
  settingValue: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

// ==================== 2-7. System Admin / RBAC ====================
export interface SysAdmin {
  id: number;
  username: string;
  realName: string;
  email: string | null;
  phone: string | null;
  avatar: string | null;
  status: number;
  lastLoginAt: string | null;
  lastLoginIp: string | null;
  createdAt: string;
  updatedAt: string;
  roles?: SysRole[];
}

export interface SysRole {
  id: number;
  roleName: string;
  roleCode: string;
  description: string | null;
  sort: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  permissions?: SysPermission[];
}

export interface SysPermission {
  id: number;
  parentId: number;
  permissionName: string;
  permissionCode: string;
  type: number;           // 1=菜单, 2=按钮, 3=接口
  path: string | null;
  component: string | null;
  icon: string | null;
  sort: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  children?: SysPermission[];
}

export interface SysOperationLog {
  id: number;
  adminId: number | null;
  adminName: string | null;
  module: string;
  operation: string;
  method: string | null;
  requestUrl: string | null;
  requestParams: string | null;
  responseResult: string | null;
  ip: string | null;
  status: number;         // 0=fail, 1=success
  errorMsg: string | null;
  costTime: number | null;
  createdAt: string;
}

// ==================== API Response Types ====================
export interface ApiResponse<T> {
  code: number;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

// ==================== Frontend Helper Types ====================
export interface DashboardStats {
  totalProducts: number;
  totalInquiries: number;
  totalCustomers: number;
  pendingReviews: number;
  todayInquiries: number;
  todayCustomDemands: number;
  inquiryTrend: { date: string; count: number }[];
  recentInquiries: Inquiry[];
  recentCustomDemands: CustomDemand[];
}

export interface HomeData {
  banners: Banner[];
  recommendedProducts: Product[];
  hotProducts: Product[];
  latestNews: News[];
  partners: Partner[];
  caseShows: CaseShow[];
  companyInfo: CompanyInfo;
}

// Inquiry status labels
export const INQUIRY_STATUS = {
  0: { label: '待跟进', color: 'yellow' },
  1: { label: '已报价', color: 'blue' },
  2: { label: '已成交', color: 'green' },
  3: { label: '已关闭', color: 'gray' },
} as const;

// Custom demand status labels
export const DEMAND_STATUS = {
  0: { label: '待处理', color: 'yellow' },
  1: { label: '已查看', color: 'blue' },
  2: { label: '已报价', color: 'indigo' },
  3: { label: '已成交', color: 'green' },
  4: { label: '已关闭', color: 'gray' },
} as const;

// Customer audit status labels
export const AUDIT_STATUS = {
  0: { label: '待审核', color: 'yellow' },
  1: { label: '审核通过', color: 'green' },
  2: { label: '审核驳回', color: 'red' },
} as const;

// Channel type labels
export const CHANNEL_TYPE = {
  1: { label: '线上电商', icon: 'shopping-bag' },
  2: { label: 'WhatsApp', icon: 'message-circle' },
} as const;
