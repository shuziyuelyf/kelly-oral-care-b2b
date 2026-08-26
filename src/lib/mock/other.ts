import type { Banner, News, NewsCategory, CaseShow, Inquiry, CustomDemand, CustomOption, Customer, Message, Partner, CompanyInfo, DashboardStats } from '../types';

export const mockBanners: Banner[] = [
  { id: 1, imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1920', mobileImageUrl: null, linkType: 3, linkUrl: '/products', sort: 1, startTime: null, endTime: null, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01', i18n: [{ id: 1, bannerId: 1, langCode: 'zh-CN', title: '口腔护理产品', altText: '口腔护理产品Banner' }, { id: 2, bannerId: 1, langCode: 'en', title: 'Oral Care Products', altText: null }] },
  { id: 2, imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1920', mobileImageUrl: null, linkType: 5, linkUrl: '/custom', sort: 2, startTime: null, endTime: null, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01', i18n: [{ id: 3, bannerId: 2, langCode: 'zh-CN', title: 'OEM/ODM定制服务', altText: null }, { id: 4, bannerId: 2, langCode: 'en', title: 'OEM/ODM Custom Manufacturing', altText: null }] },
  { id: 3, imageUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1920', mobileImageUrl: null, linkType: 2, linkUrl: '/products/hydroxyapatite-toothpaste', sort: 3, startTime: null, endTime: null, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01', i18n: [{ id: 5, bannerId: 3, langCode: 'zh-CN', title: '新品上市', altText: null }, { id: 6, bannerId: 3, langCode: 'en', title: 'New Arrivals', altText: null }] },
];

export const mockNewsCategories: NewsCategory[] = [
  { id: 1, sort: 1, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01', i18n: [{ id: 1, categoryId: 1, langCode: 'zh-CN', categoryName: '公司动态' }, { id: 2, categoryId: 1, langCode: 'en', categoryName: 'Company News' }] },
  { id: 2, sort: 2, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01', i18n: [{ id: 3, categoryId: 2, langCode: 'zh-CN', categoryName: '行业知识' }, { id: 4, categoryId: 2, langCode: 'en', categoryName: 'Oral Care Insights' }] },
];

export const mockNews: News[] = [
  { id: 1, categoryId: 1, slug: 'new-product-line-2024', coverImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600', author: 'Admin', source: 'Company', viewCount: 1250, isTop: true, isPublished: true, publishedAt: '2024-06-20', createdAt: '2024-06-18', updatedAt: '2024-06-20', i18n: [{ id: 1, newsId: 1, langCode: 'zh-CN', title: 'Kelly推出全新羟基磷灰石牙膏系列', summary: '我们的新系列采用先进的羟基磷灰石配方，帮助修复牙釉质。', content: '<p>Kelly推出全新羟基磷灰石牙膏系列。</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }, { id: 2, newsId: 1, langCode: 'en', title: 'Kelly Launches New Hydroxyapatite Toothpaste Line', summary: 'Our new line features advanced hydroxyapatite formula for enamel repair.', content: '<p>Kelly launches new hydroxyapatite toothpaste line featuring advanced enamel repair technology.</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }] },
  { id: 2, categoryId: 1, slug: 'private-label-expansion', coverImage: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600', author: 'Admin', source: 'Company', viewCount: 890, isTop: false, isPublished: true, publishedAt: '2024-06-15', createdAt: '2024-06-12', updatedAt: '2024-06-15', i18n: [{ id: 3, newsId: 2, langCode: 'zh-CN', title: '扩大自有品牌产能', summary: '为满足日益增长的市场需求，我们扩大了自有品牌产能。', content: '<p>我们扩大了自有品牌产能。</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }, { id: 4, newsId: 2, langCode: 'en', title: 'Expanding Private Label Production Capacity', summary: 'To meet growing market demand, we have expanded our private label capacity.', content: '<p>We have expanded our private label production capacity to serve more brands worldwide.</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }] },
  { id: 3, categoryId: 2, slug: 'choosing-toothpaste-manufacturer', coverImage: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600', author: 'Editor', source: 'Technical', viewCount: 2100, isTop: false, isPublished: true, publishedAt: '2024-06-10', createdAt: '2024-06-08', updatedAt: '2024-06-10', i18n: [{ id: 5, newsId: 3, langCode: 'zh-CN', title: '如何选择牙膏代工厂', summary: '本文介绍选择牙膏代工厂的关键因素。', content: '<p>选择牙膏代工厂需要考虑资质、产能和质量控制。</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }, { id: 6, newsId: 3, langCode: 'en', title: 'How to Choose a Toothpaste Manufacturer', summary: 'Key factors to consider when selecting a toothpaste manufacturing partner.', content: '<p>Choosing the right toothpaste manufacturer requires evaluating certifications, capacity, and quality control systems.</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }] },
];

export const mockCaseShows: CaseShow[] = [
  { id: 1, coverImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600', images: '[]', sort: 1, isPublished: true, viewCount: 560, createdAt: '2024-03-01', updatedAt: '2024-06-01', i18n: [{ id: 1, caseId: 1, langCode: 'zh-CN', title: '欧洲品牌羟基磷灰石牙膏自有品牌', customerName: '某欧洲口腔护理品牌', industry: '口腔护理', material: null, craft: '自有品牌定制', summary: '为欧洲客户提供从配方到包装的一站式自有品牌服务', content: '<p>为欧洲客户提供羟基磷灰石牙膏自有品牌服务。</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }, { id: 2, caseId: 1, langCode: 'en', title: 'European Hydroxyapatite Toothpaste Private Label', customerName: 'European Oral Care Brand', industry: 'Oral Care', material: null, craft: 'Private Label', summary: 'End-to-end private label service from formula to packaging for a European client', content: '<p>Complete private label service for hydroxyapatite toothpaste, including formula selection, tube design, and packaging.</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }] },
  { id: 2, coverImage: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600', images: '[]', sort: 2, isPublished: true, viewCount: 340, createdAt: '2024-04-01', updatedAt: '2024-06-01', i18n: [{ id: 3, caseId: 2, langCode: 'zh-CN', title: '中东市场牙膏OEM批量生产', customerName: '某中东分销商', industry: '口腔护理', material: null, craft: 'OEM批量生产', summary: '为中东市场大批量生产薄荷牙膏', content: '<p>为中东客户大批量生产薄荷牙膏。</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }, { id: 4, caseId: 2, langCode: 'en', title: 'Middle East Toothpaste OEM Batch Production', customerName: 'Middle East Distributor', industry: 'Oral Care', material: null, craft: 'OEM Production', summary: 'Large batch mint toothpaste production for the Middle East market', content: '<p>Large-scale OEM production of mint toothpaste for distribution across the Middle East, including custom labeling and halal-compliant formulation.</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }] },
];

export const mockInquiries: Inquiry[] = [
  { id: 1, inquiryNo: 'INQ20240620001', source: 1, customerId: null, companyName: 'BrightSmile Inc.', contactPerson: 'James Wilson', contactPhone: '+1-555-0100', contactEmail: 'james@brightsmile.com', itemCount: 1, totalAmount: null, status: 0, remark: 'Need private label pricing for hydroxyapatite toothpaste', quoteRemark: null, quoteFile: null, quotedBy: null, quotedAt: null, dealAt: null, closedAt: null, closeReason: null, ip: null, langCode: 'en', createdAt: '2024-06-20', updatedAt: '2024-06-20', items: [] },
  { id: 2, inquiryNo: 'INQ20240619001', source: 1, customerId: 1, companyName: 'FreshBreath Co.', contactPerson: 'Maria Garcia', contactPhone: '+34-555-0200', contactEmail: 'maria@freshbreath.es', itemCount: 1, totalAmount: 76000, status: 1, remark: 'Bamboo toothbrush bulk order', quoteRemark: 'FOB price', quoteFile: null, quotedBy: 1, quotedAt: '2024-06-19', dealAt: null, closedAt: null, closeReason: null, ip: null, langCode: 'en', createdAt: '2024-06-19', updatedAt: '2024-06-19', items: [] },
];

export const mockCustomDemands: CustomDemand[] = [
  { id: 1, demandNo: 'DEM20240620001', customerId: null, companyName: 'WhiteSmile Brands', contactPerson: 'Ahmed Hassan', contactPhone: '+966-500-000-001', contactEmail: 'ahmed@whitesmile.sa', productType: 'Toothpaste', material: null, craft: 'Private Label', sizeSpec: '100g tube', quantity: 5000, budget: 25000, expectedDate: '2024-10-01', attachmentUrls: null, description: 'Need custom mint toothpaste with our branding', status: 0, quoteAmount: null, quoteRemark: null, quoteFile: null, handlerId: null, handledAt: null, quotedAt: null, followUpRemark: null, ip: null, langCode: 'en', createdAt: '2024-06-20', updatedAt: '2024-06-20' },
  { id: 2, demandNo: 'DEM20240619001', customerId: 2, companyName: 'EcoDental Ltd.', contactPerson: 'Maria Garcia', contactPhone: '+34-555-0200', contactEmail: 'maria@ecodental.es', productType: 'Bamboo Toothbrush', material: null, craft: 'OEM', sizeSpec: 'Adult size', quantity: 10000, budget: 80000, expectedDate: '2024-09-15', attachmentUrls: null, description: 'Bamboo toothbrush with custom laser engraving', status: 2, quoteAmount: 75000, quoteRemark: 'Competitive price', quoteFile: null, handlerId: 1, handledAt: '2024-06-19', quotedAt: '2024-06-19', followUpRemark: null, ip: null, langCode: 'en', createdAt: '2024-06-19', updatedAt: '2024-06-19' },
];

export const mockCustomers: Customer[] = [
  { id: 1, username: 'brightsmile', companyName: 'BrightSmile Inc.', creditCode: null, contactPerson: 'James Wilson', contactPhone: '+1-555-0100', contactEmail: 'james@brightsmile.com', province: null, city: null, address: 'New York, USA', industry: 'Oral Care', businessLicense: null, auditStatus: 1, auditRemark: null, auditedAt: '2024-01-15', auditedBy: 1, status: 1, lastLoginAt: '2024-06-20', lastLoginIp: null, remark: null, createdAt: '2024-01-10', updatedAt: '2024-06-20' },
  { id: 2, username: 'ecodental', companyName: 'EcoDental Ltd.', creditCode: null, contactPerson: 'Maria Garcia', contactPhone: '+34-555-0200', contactEmail: 'maria@ecodental.es', province: null, city: null, address: 'Madrid, Spain', industry: 'Oral Care', businessLicense: null, auditStatus: 1, auditRemark: null, auditedAt: '2024-02-20', auditedBy: 1, status: 1, lastLoginAt: '2024-06-19', lastLoginIp: null, remark: null, createdAt: '2024-02-15', updatedAt: '2024-06-19' },
];

export const mockMessages: Message[] = [
  { id: 1, customerId: null, name: 'Li Wei', phone: '+86-138-0000-0001', email: 'liwei@example.com', company: 'ABC Trading', subject: 'Product Inquiry', content: 'I am interested in your charcoal toothpaste for private label.', type: 2, status: 0, reply: null, repliedBy: null, repliedAt: null, ip: null, langCode: 'en', createdAt: '2024-06-20', updatedAt: '2024-06-20' },
  { id: 2, customerId: 1, name: 'James Wilson', phone: '+1-555-0100', email: 'james@brightsmile.com', company: 'BrightSmile Inc.', subject: 'Partnership', content: 'We would like to discuss a long-term private label partnership.', type: 3, status: 1, reply: 'Thank you for your interest.', repliedBy: 1, repliedAt: '2024-06-19', ip: null, langCode: 'en', createdAt: '2024-06-19', updatedAt: '2024-06-19' },
];

export const mockPartners: Partner[] = [
  // Certification / industry partners — generic labels, no fake customer logos
  { id: 1, name: 'ISO 22716', logo: '', website: null, sort: 1, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 2, name: 'GMP Certified', logo: '', website: null, sort: 2, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 3, name: 'FDA Registered', logo: '', website: null, sort: 3, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 4, name: 'Cruelty Free', logo: '', website: null, sort: 4, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 5, name: 'Vegan Formula', logo: '', website: null, sort: 5, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 6, name: 'Halal Ready', logo: '', website: null, sort: 6, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
];

export const mockCompanyInfo: CompanyInfo = {
  id: 1, logo: null,
  phone: null,
  whatsapp: '8612345678901',
  email: 'contact@kellyoralcare.com',
  province: null, city: null, longitude: null, latitude: null,
  website: 'https://kellyoralcare.com', qrCode: null,
  businessHours: 'Mon-Fri 9:00-18:00 (GMT+8)',
  factoryImages: '[]',
  teamImages: '[]',
  history: '[]',
  honors: '[]',
  certifications: '[]',
  seoTitle: 'Kelly Oral Care — Oral Care Products & OEM/ODM Manufacturing',
  seoKeywords: 'oral care, toothpaste manufacturer, private label, OEM, ODM, toothpaste factory',
  seoDescription: 'Kelly Oral Care provides oral care products, private label, and OEM/ODM manufacturing services worldwide.',
  icp: null, policeRecord: null,
  createdAt: '2024-01-01', updatedAt: '2024-06-01',
  i18n: [
    { id: 1, companyInfoId: 1, langCode: 'zh-CN', companyName: 'Kelly口腔护理', slogan: '专业口腔护理产品与制造方案', introduction: '<p>Kelly口腔护理专注于口腔护理产品研发与制造，提供现货产品、自有品牌和OEM/ODM定制服务。</p>', address: null },
    { id: 2, companyInfoId: 1, langCode: 'en', companyName: 'Kelly Oral Care', slogan: 'Oral Care Products & Manufacturing Solutions', introduction: '<p>Kelly Oral Care specializes in oral care product R&D and manufacturing, offering ready-made products, private label, and OEM/ODM custom manufacturing services worldwide.</p>', address: null },
    { id: 3, companyInfoId: 1, langCode: 'ja', companyName: 'Kelly Oral Care', slogan: 'オーラルケア製品と製造ソリューション', introduction: '<p>Kelly Oral Careはオーラルケア製品の研究開発と製造に特化し、既製品、プライベートブランド、OEM/ODMサービスを提供しています。</p>', address: null },
    { id: 4, companyInfoId: 1, langCode: 'ar', companyName: 'Kelly Oral Care', slogan: 'منتجات العناية بالفم وحلول التصنيع', introduction: '<p>كيلي أورال كير متخصصة في البحث والتطوير وتصنيع منتجات العناية بالفم.</p>', address: null },
  ],
};

export const mockDashboardStats: DashboardStats = {
  totalProducts: 8,
  totalInquiries: 2,
  totalCustomers: 2,
  pendingReviews: 1,
  todayInquiries: 1,
  todayCustomDemands: 0,
  inquiryTrend: [
    { date: '2024-06-14', count: 2 },
    { date: '2024-06-15', count: 3 },
    { date: '2024-06-16', count: 1 },
    { date: '2024-06-17', count: 4 },
    { date: '2024-06-18', count: 3 },
    { date: '2024-06-19', count: 5 },
    { date: '2024-06-20', count: 6 },
  ],
  recentInquiries: mockInquiries,
  recentCustomDemands: mockCustomDemands,
};

export const mockCustomOptions: CustomOption[] = [
  {
    id: 1, optionCode: 'product_type', inputType: 1, isRequired: true, sort: 1, status: 1,
    createdAt: '2024-01-01', updatedAt: '2024-01-01',
    i18n: [
      { id: 1, optionId: 1, langCode: 'zh-CN', optionName: '产品类型' },
      { id: 2, optionId: 1, langCode: 'en', optionName: 'Product Type' },
    ],
    values: [
      { id: 1, optionId: 1, sort: 1, createdAt: '2024-01-01', i18n: [{ id: 1, valueId: 1, langCode: 'zh-CN', valueName: '牙膏' }, { id: 2, valueId: 1, langCode: 'en', valueName: 'Toothpaste' }] },
      { id: 2, optionId: 1, sort: 2, createdAt: '2024-01-01', i18n: [{ id: 3, valueId: 2, langCode: 'zh-CN', valueName: '漱口水' }, { id: 4, valueId: 2, langCode: 'en', valueName: 'Mouthwash' }] },
      { id: 3, optionId: 1, sort: 3, createdAt: '2024-01-01', i18n: [{ id: 5, valueId: 3, langCode: 'zh-CN', valueName: '牙粉' }, { id: 6, valueId: 3, langCode: 'en', valueName: 'Tooth Powder' }] },
      { id: 4, optionId: 1, sort: 4, createdAt: '2024-01-01', i18n: [{ id: 7, valueId: 4, langCode: 'zh-CN', valueName: '牙刷' }, { id: 8, valueId: 4, langCode: 'en', valueName: 'Toothbrush' }] },
    ],
  },
  {
    id: 2, optionCode: 'packaging', inputType: 2, isRequired: false, sort: 2, status: 1,
    createdAt: '2024-01-01', updatedAt: '2024-01-01',
    i18n: [
      { id: 9, optionId: 2, langCode: 'zh-CN', optionName: '包装类型' },
      { id: 10, optionId: 2, langCode: 'en', optionName: 'Packaging' },
    ],
    values: [
      { id: 5, optionId: 2, sort: 1, createdAt: '2024-01-01', i18n: [{ id: 11, valueId: 5, langCode: 'zh-CN', valueName: '标准软管' }, { id: 12, valueId: 5, langCode: 'en', valueName: 'Standard Tube' }] },
      { id: 6, optionId: 2, sort: 2, createdAt: '2024-01-01', i18n: [{ id: 13, valueId: 6, langCode: 'zh-CN', valueName: '定制软管' }, { id: 14, valueId: 6, langCode: 'en', valueName: 'Custom Tube' }] },
      { id: 7, optionId: 2, sort: 3, createdAt: '2024-01-01', i18n: [{ id: 15, valueId: 7, langCode: 'zh-CN', valueName: '泵瓶' }, { id: 16, valueId: 7, langCode: 'en', valueName: 'Pump Bottle' }] },
    ],
  },
];
