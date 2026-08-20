// ==================== Language ====================
export interface Language {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  isRtl: boolean;
  isEnabled: boolean;
}

// ==================== Product ====================
export interface ProductCategory {
  id: string;
  parentId: string | null;
  sortOrder: number;
  i18n: ProductCategoryI18n[];
  children?: ProductCategory[];
}

export interface ProductCategoryI18n {
  locale: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  categoryId: string;
  modelNumber: string;
  status: 'active' | 'inactive' | 'draft';
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  i18n: ProductI18n[];
  skus: ProductSKU[];
  images: ProductImage[];
  attributes: ProductAttribute[];
  channels: ProductChannel[];
  category?: ProductCategory;
}

export interface ProductI18n {
  locale: string;
  name: string;
  description: string;
  shortDescription: string;
  keywords: string;
}

export interface ProductSKU {
  id: string;
  productId: string;
  skuCode: string;
  price: number;
  originalPrice: number;
  stock: number;
  moq: number;
  attributes: Record<string, string>;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface ProductAttribute {
  id: string;
  productId: string;
  name: string;
  value: string;
  unit: string;
}

export interface ProductChannel {
  id: string;
  productId: string;
  type: 'online_store' | 'whatsapp';
  shopName: string;
  url: string;
  sortOrder: number;
}

// ==================== Banner ====================
export interface Banner {
  id: string;
  sortOrder: number;
  isActive: boolean;
  linkUrl: string;
  i18n: BannerI18n[];
}

export interface BannerI18n {
  locale: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
}

// ==================== News ====================
export interface News {
  id: string;
  category: 'company' | 'industry' | 'exhibition';
  coverImage: string;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  i18n: NewsI18n[];
}

export interface NewsI18n {
  locale: string;
  title: string;
  summary: string;
  content: string;
}

// ==================== Case Show ====================
export interface CaseShow {
  id: string;
  coverImage: string;
  sortOrder: number;
  i18n: CaseShowI18n[];
}

export interface CaseShowI18n {
  locale: string;
  title: string;
  description: string;
  clientName: string;
  solution: string;
}

// ==================== Inquiry ====================
export interface Inquiry {
  id: string;
  customerId: string | null;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyName: string;
  status: 'pending' | 'quoted' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  remark: string;
  createdAt: string;
  updatedAt: string;
  items: InquiryItem[];
}

export interface InquiryItem {
  id: string;
  inquiryId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  remark: string;
  product?: Product;
}

// ==================== Custom Demand ====================
export interface CustomDemand {
  id: string;
  customerId: string | null;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyName: string;
  material: string;
  dimensions: string;
  quantity: number;
  craft: string;
  description: string;
  attachments: string[];
  status: 'pending' | 'processing' | 'quoted' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// ==================== Customer ====================
export interface Customer {
  id: string;
  companyName: string;
  creditCode: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  username: string;
  status: 'pending' | 'approved' | 'rejected' | 'disabled';
  group: string;
  createdAt: string;
  updatedAt: string;
}

// ==================== Contact Message ====================
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

// ==================== Admin / RBAC ====================
export interface Admin {
  id: string;
  username: string;
  name: string;
  email: string;
  roleId: string;
  status: 'active' | 'disabled';
  lastLoginAt: string;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
}

export interface Permission {
  id: string;
  name: string;
  code: string;
  module: string;
  description: string;
}

export interface OperationLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  module: string;
  detail: string;
  ip: string;
  createdAt: string;
}

// ==================== Dashboard ====================
export interface DashboardStats {
  totalProducts: number;
  totalInquiries: number;
  totalCustomers: number;
  pendingReviews: number;
  inquiryTrend: { date: string; count: number }[];
  recentInquiries: Inquiry[];
}

// ==================== API Response ====================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
