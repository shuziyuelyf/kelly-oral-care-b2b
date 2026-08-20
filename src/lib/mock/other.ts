import type { Banner, News, NewsCategory, CaseShow, Inquiry, CustomDemand, CustomOption, Customer, Message, Partner, CompanyInfo, DashboardStats } from '../types';

export const mockBanners: Banner[] = [
  { id: 1, imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920', mobileImageUrl: null, linkType: 3, linkUrl: '/products', sort: 1, startTime: null, endTime: null, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01', i18n: [{ id: 1, bannerId: 1, langCode: 'zh-CN', title: '工业解决方案', altText: '工业解决方案Banner' }, { id: 2, bannerId: 1, langCode: 'en', title: 'Industrial Solutions', altText: null }] },
  { id: 2, imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920', mobileImageUrl: null, linkType: 5, linkUrl: '/custom', sort: 2, startTime: null, endTime: null, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01', i18n: [{ id: 3, bannerId: 2, langCode: 'zh-CN', title: '专业定制服务', altText: null }, { id: 4, bannerId: 2, langCode: 'en', title: 'Professional Custom Services', altText: null }] },
  { id: 3, imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1920', mobileImageUrl: null, linkType: 2, linkUrl: '/products/1', sort: 3, startTime: null, endTime: null, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01', i18n: [{ id: 5, bannerId: 3, langCode: 'zh-CN', title: '新品上市', altText: null }, { id: 6, bannerId: 3, langCode: 'en', title: 'New Arrivals', altText: null }] },
];

export const mockNewsCategories: NewsCategory[] = [
  { id: 1, sort: 1, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01', i18n: [{ id: 1, categoryId: 1, langCode: 'zh-CN', categoryName: '公司动态' }, { id: 2, categoryId: 1, langCode: 'en', categoryName: 'Company News' }] },
  { id: 2, sort: 2, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01', i18n: [{ id: 3, categoryId: 2, langCode: 'zh-CN', categoryName: '行业知识' }, { id: 4, categoryId: 2, langCode: 'en', categoryName: 'Industry Knowledge' }] },
];

export const mockNews: News[] = [
  { id: 1, categoryId: 1, slug: 'quality-award-2024', coverImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600', author: 'Admin', source: 'Company', viewCount: 1250, isTop: true, isPublished: true, publishedAt: '2024-06-20', createdAt: '2024-06-18', updatedAt: '2024-06-20', i18n: [{ id: 1, newsId: 1, langCode: 'zh-CN', title: '公司荣获2024年国家质量奖', summary: '我公司凭借卓越的制造标准荣获国家质量卓越奖。', content: '<p>我们很荣幸地宣布，公司荣获2024年国家质量卓越奖。</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }, { id: 2, newsId: 1, langCode: 'en', title: 'Company Wins National Quality Award 2024', summary: 'Our company has been awarded the National Quality Excellence Award.', content: '<p>We are proud to announce that our company has received the National Quality Excellence Award 2024.</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }] },
  { id: 2, categoryId: 1, slug: 'factory-expansion', coverImage: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600', author: 'Admin', source: 'Company', viewCount: 890, isTop: false, isPublished: true, publishedAt: '2024-06-15', createdAt: '2024-06-12', updatedAt: '2024-06-15', i18n: [{ id: 3, newsId: 2, langCode: 'zh-CN', title: '新工厂扩建项目正式启动', summary: '为满足日益增长的市场需求，公司启动新工厂扩建项目。', content: '<p>为满足日益增长的市场需求，公司正式启动新工厂扩建项目。</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }, { id: 4, newsId: 2, langCode: 'en', title: 'New Factory Expansion Launched', summary: 'To meet growing market demand.', content: '<p>To meet growing market demand, we launched the new factory expansion project.</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }] },
  { id: 3, categoryId: 2, slug: 'cnc-guide', coverImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600', author: 'Engineer', source: 'Technical', viewCount: 2100, isTop: false, isPublished: true, publishedAt: '2024-06-10', createdAt: '2024-06-08', updatedAt: '2024-06-10', i18n: [{ id: 5, newsId: 3, langCode: 'zh-CN', title: '数控加工技术指南', summary: '本文介绍如何选择适合的数控加工设备。', content: '<p>数控加工技术是现代制造业的核心。</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }, { id: 6, newsId: 3, langCode: 'en', title: 'CNC Machining Guide', summary: 'How to choose the right CNC equipment.', content: '<p>CNC machining technology is the core of modern manufacturing.</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }] },
];

export const mockCaseShows: CaseShow[] = [
  { id: 1, coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600', images: '[]', sort: 1, isPublished: true, viewCount: 560, createdAt: '2024-03-01', updatedAt: '2024-06-01', i18n: [{ id: 1, caseId: 1, langCode: 'zh-CN', title: '航空航天零件加工案例', customerName: '某航空制造企业', industry: '航空航天', material: '7075铝合金', craft: '五轴数控加工', summary: '为航空客户精密加工复杂零件', content: '<p>精密加工7075铝合金复杂零件。</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }, { id: 2, caseId: 1, langCode: 'en', title: 'Aerospace Parts Machining', customerName: 'Aerospace Manufacturer', industry: 'Aerospace', material: '7075 Aluminum', craft: '5-axis CNC', summary: 'Precision machining of complex parts', content: '<p>Precision machining of 7075 aluminum alloy parts.</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }] },
  { id: 2, coverImage: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600', images: '[]', sort: 2, isPublished: true, viewCount: 340, createdAt: '2024-04-01', updatedAt: '2024-06-01', i18n: [{ id: 3, caseId: 2, langCode: 'zh-CN', title: '汽车零部件批量生产', customerName: '某汽车零部件供应商', industry: '汽车制造', material: '304不锈钢', craft: 'CNC车削+铣削', summary: '大批量汽车零部件精密加工', content: '<p>批量加工304不锈钢零件。</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }, { id: 4, caseId: 2, langCode: 'en', title: 'Automotive Parts Batch Production', customerName: 'Auto Parts Supplier', industry: 'Automotive', material: '304 Stainless Steel', craft: 'CNC Turning + Milling', summary: 'Large batch precision machining', content: '<p>Batch machining of 304 stainless steel parts.</p>', slug: null, seoTitle: null, seoKeywords: null, seoDescription: null }] },
];

export const mockInquiries: Inquiry[] = [
  { id: 1, inquiryNo: 'INQ20240620001', source: 1, customerId: null, companyName: 'Smith Industries', contactPerson: 'John Smith', contactPhone: '+1-555-0100', contactEmail: 'john@smith.com', itemCount: 1, totalAmount: null, status: 0, remark: 'Need bulk pricing', quoteRemark: null, quoteFile: null, quotedBy: null, quotedAt: null, dealAt: null, closedAt: null, closeReason: null, ip: null, langCode: 'en', createdAt: '2024-06-20', updatedAt: '2024-06-20', items: [] },
  { id: 2, inquiryNo: 'INQ20240619001', source: 1, customerId: 1, companyName: 'Garcia Manufacturing', contactPerson: 'Maria Garcia', contactPhone: '+34-555-0200', contactEmail: 'maria@garcia.com', itemCount: 1, totalAmount: 76000, status: 1, remark: 'Need hydraulic pumps', quoteRemark: 'FOB price', quoteFile: null, quotedBy: 1, quotedAt: '2024-06-19', dealAt: null, closedAt: null, closeReason: null, ip: null, langCode: 'en', createdAt: '2024-06-19', updatedAt: '2024-06-19', items: [] },
  { id: 3, inquiryNo: 'INQ20240618001', source: 1, customerId: 2, companyName: 'Tanaka Electronics', contactPerson: 'Yuki Tanaka', contactPhone: '+81-555-0300', contactEmail: 'yuki@tanaka.jp', itemCount: 1, totalAmount: 25000, status: 2, remark: 'Order confirmed', quoteRemark: 'Deal closed', quoteFile: null, quotedBy: 1, quotedAt: '2024-06-18', dealAt: '2024-06-19', closedAt: null, closeReason: null, ip: null, langCode: 'ja', createdAt: '2024-06-18', updatedAt: '2024-06-19', items: [] },
];

export const mockCustomDemands: CustomDemand[] = [
  { id: 1, demandNo: 'DEM20240620001', customerId: null, companyName: 'Hassan Engineering', contactPerson: 'Ahmed Hassan', contactPhone: '+966-500-000-001', contactEmail: 'ahmed@hassan.sa', productType: 'Metal Frames', material: 'Stainless Steel 304', craft: 'Laser cutting', sizeSpec: '200x150x3mm', quantity: 5000, budget: 25000, expectedDate: '2024-10-01', attachmentUrls: null, description: 'Polished finish', status: 0, quoteAmount: null, quoteRemark: null, quoteFile: null, handlerId: null, handledAt: null, quotedAt: null, followUpRemark: null, ip: null, langCode: 'ar', createdAt: '2024-06-20', updatedAt: '2024-06-20' },
  { id: 2, demandNo: 'DEM20240619001', customerId: 2, companyName: 'Garcia Manufacturing', contactPerson: 'Maria Garcia', contactPhone: '+34-555-0200', contactEmail: 'maria@garcia.com', productType: 'Hydraulic Cylinders', material: 'Carbon Steel', craft: 'CNC Machining', sizeSpec: '100mm bore', quantity: 200, budget: 80000, expectedDate: '2024-09-15', attachmentUrls: null, description: 'Chrome plated rod', status: 2, quoteAmount: 75000, quoteRemark: 'Competitive price', quoteFile: null, handlerId: 1, handledAt: '2024-06-19', quotedAt: '2024-06-19', followUpRemark: null, ip: null, langCode: 'en', createdAt: '2024-06-19', updatedAt: '2024-06-19' },
];

export const mockCustomers: Customer[] = [
  { id: 1, username: 'smith', companyName: 'Smith Industries Ltd.', creditCode: '91110000MA001', contactPerson: 'John Smith', contactPhone: '+1-555-0100', contactEmail: 'john@smith.com', province: null, city: null, address: '123 Industrial Ave, NY', industry: 'Manufacturing', businessLicense: null, auditStatus: 1, auditRemark: null, auditedAt: '2024-01-15', auditedBy: 1, status: 1, lastLoginAt: '2024-06-20', lastLoginIp: null, remark: null, createdAt: '2024-01-10', updatedAt: '2024-06-20' },
  { id: 2, username: 'garcia', companyName: 'Garcia Manufacturing SA', creditCode: 'ES-B12345678', contactPerson: 'Maria Garcia', contactPhone: '+34-555-0200', contactEmail: 'maria@garcia.com', province: null, city: null, address: 'Calle Industria 45, Madrid', industry: 'Automotive', businessLicense: null, auditStatus: 1, auditRemark: null, auditedAt: '2024-02-20', auditedBy: 1, status: 1, lastLoginAt: '2024-06-19', lastLoginIp: null, remark: null, createdAt: '2024-02-15', updatedAt: '2024-06-19' },
  { id: 3, username: 'tanaka', companyName: 'Tanaka Electronics Co.', creditCode: 'JP-T987654321', contactPerson: 'Yuki Tanaka', contactPhone: '+81-555-0300', contactEmail: 'yuki@tanaka.jp', province: null, city: null, address: 'Tokyo, Japan', industry: 'Electronics', businessLicense: null, auditStatus: 0, auditRemark: null, auditedAt: null, auditedBy: null, status: 1, lastLoginAt: null, lastLoginIp: null, remark: null, createdAt: '2024-06-18', updatedAt: '2024-06-18' },
  { id: 4, username: 'hassan', companyName: 'Hassan Engineering', creditCode: 'SA-H123456', contactPerson: 'Ahmed Hassan', contactPhone: '+966-500-000-001', contactEmail: 'ahmed@hassan.sa', province: null, city: null, address: 'Riyadh, Saudi Arabia', industry: 'Construction', businessLicense: null, auditStatus: 2, auditRemark: 'Incomplete documents', auditedAt: '2024-06-19', auditedBy: 1, status: 1, lastLoginAt: null, lastLoginIp: null, remark: null, createdAt: '2024-06-17', updatedAt: '2024-06-19' },
];

export const mockMessages: Message[] = [
  { id: 1, customerId: null, name: 'Li Wei', phone: '+86-138-0000-0001', email: 'liwei@example.com', company: 'ABC Trading', subject: 'Product Inquiry', content: 'I am interested in your CNC machines.', type: 2, status: 0, reply: null, repliedBy: null, repliedAt: null, ip: null, langCode: 'zh-CN', createdAt: '2024-06-20', updatedAt: '2024-06-20' },
  { id: 2, customerId: 1, name: 'John Smith', phone: '+1-555-0100', email: 'john@smith.com', company: 'Smith Industries', subject: 'Partnership', content: 'We would like to discuss a long-term partnership.', type: 3, status: 1, reply: 'Thank you for your interest.', repliedBy: 1, repliedAt: '2024-06-19', ip: null, langCode: 'en', createdAt: '2024-06-19', updatedAt: '2024-06-19' },
];

export const mockPartners: Partner[] = [
  { id: 1, name: 'Siemens', logo: 'https://images.unsplash.com/photo-1611068415799-0d6e59315d22?w=200', website: 'https://siemens.com', sort: 1, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 2, name: 'Bosch', logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200', website: 'https://bosch.com', sort: 2, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 3, name: 'ABB', logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200', website: 'https://abb.com', sort: 3, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 4, name: 'Schneider', logo: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=200', website: 'https://schneider-electric.com', sort: 4, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 5, name: 'Mitsubishi', logo: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=200', website: 'https://mitsubishi.com', sort: 5, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 6, name: 'Fanuc', logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200', website: 'https://fanuc.com', sort: 6, status: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
];

export const mockCompanyInfo: CompanyInfo = {
  id: 1, logo: null, phone: '400-000-0000', whatsapp: '8613800138000', email: 'contact@example.com',
  province: 'Shanghai', city: 'Shanghai', longitude: 121.4737, latitude: 31.2304,
  website: 'https://example.com', qrCode: null, businessHours: 'Mon-Fri 9:00-18:00',
  factoryImages: '["https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800"]',
  teamImages: '["https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"]',
  history: '[{"year":"2010","event":"Founded"},{"year":"2015","event":"ISO 9001 Certified"},{"year":"2020","event":"Expanded to 50,000 sqm factory"},{"year":"2024","event":"Won National Quality Award"}]',
  honors: '[{"title":"ISO 9001:2015","image":""},{"title":"National Quality Award 2024","image":""}]',
  certifications: '[{"name":"ISO 9001:2015","image":""},{"name":"CE","image":""}]',
  seoTitle: 'B2B Enterprise - Professional Manufacturing', seoKeywords: 'B2B, manufacturing, CNC', seoDescription: 'Professional B2B manufacturing enterprise',
  icp: '沪ICP备12345678号', policeRecord: '沪公网安备31000000000号',
  createdAt: '2024-01-01', updatedAt: '2024-06-01',
  i18n: [
    { id: 1, companyInfoId: 1, langCode: 'zh-CN', companyName: '精密制造有限公司', slogan: '专业制造，品质保障', introduction: '<p>精密制造有限公司成立于2010年，是一家专注于工业设备和零部件制造的企业。</p>', address: '上海市浦东新区张江高科技园区' },
    { id: 2, companyInfoId: 1, langCode: 'en', companyName: 'Precision Manufacturing Co., Ltd.', slogan: 'Professional Manufacturing, Quality Guaranteed', introduction: '<p>Precision Manufacturing Co., Ltd. was founded in 2010, specializing in industrial equipment and parts manufacturing.</p>', address: 'Zhangjiang Hi-Tech Park, Pudong, Shanghai, China' },
    { id: 3, companyInfoId: 1, langCode: 'ja', companyName: '精密製造有限公司', slogan: '専門製造、品質保証', introduction: '<p>精密製造有限公司は2010年に設立された工業機器製造企業です。</p>', address: '上海市浦東新区' },
    { id: 4, companyInfoId: 1, langCode: 'ar', companyName: 'شركة التصنيع الدقيق', slogan: 'تصنيع احترافي، جودة مضمونة', introduction: '<p>تأسست شركة التصنيع الدقيق في عام 2010.</p>', address: 'شانغهاي، الصين' },
  ],
};

export const mockDashboardStats: DashboardStats = {
  totalProducts: 4,
  totalInquiries: 3,
  totalCustomers: 4,
  pendingReviews: 1,
  todayInquiries: 1,
  todayCustomDemands: 1,
  inquiryTrend: [
    { date: '2024-06-14', count: 3 },
    { date: '2024-06-15', count: 5 },
    { date: '2024-06-16', count: 2 },
    { date: '2024-06-17', count: 7 },
    { date: '2024-06-18', count: 4 },
    { date: '2024-06-19', count: 6 },
    { date: '2024-06-20', count: 8 },
  ],
  recentInquiries: mockInquiries,
  recentCustomDemands: mockCustomDemands,
};

export const mockCustomOptions: CustomOption[] = [
  {
    id: 1, optionCode: 'material', inputType: 1, isRequired: true, sort: 1, status: 1,
    createdAt: '2024-01-01', updatedAt: '2024-01-01',
    i18n: [
      { id: 1, optionId: 1, langCode: 'zh-CN', optionName: '材质' },
      { id: 2, optionId: 1, langCode: 'en', optionName: 'Material' },
      { id: 3, optionId: 1, langCode: 'ja', optionName: '素材' },
      { id: 4, optionId: 1, langCode: 'ar', optionName: 'المادة' },
    ],
    values: [
      { id: 1, optionId: 1, sort: 1, createdAt: '2024-01-01', i18n: [
        { id: 1, valueId: 1, langCode: 'zh-CN', valueName: '不锈钢304' },
        { id: 2, valueId: 1, langCode: 'en', valueName: 'Stainless Steel 304' },
      ]},
      { id: 2, optionId: 1, sort: 2, createdAt: '2024-01-01', i18n: [
        { id: 3, valueId: 2, langCode: 'zh-CN', valueName: '铝合金6061' },
        { id: 4, valueId: 2, langCode: 'en', valueName: 'Aluminum Alloy 6061' },
      ]},
      { id: 3, optionId: 1, sort: 3, createdAt: '2024-01-01', i18n: [
        { id: 5, valueId: 3, langCode: 'zh-CN', valueName: '碳钢' },
        { id: 6, valueId: 3, langCode: 'en', valueName: 'Carbon Steel' },
      ]},
    ],
  },
  {
    id: 2, optionCode: 'craft', inputType: 2, isRequired: false, sort: 2, status: 1,
    createdAt: '2024-01-01', updatedAt: '2024-01-01',
    i18n: [
      { id: 5, optionId: 2, langCode: 'zh-CN', optionName: '工艺' },
      { id: 6, optionId: 2, langCode: 'en', optionName: 'Craft' },
    ],
    values: [
      { id: 4, optionId: 2, sort: 1, createdAt: '2024-01-01', i18n: [
        { id: 7, valueId: 4, langCode: 'zh-CN', valueName: 'CNC加工' },
        { id: 8, valueId: 4, langCode: 'en', valueName: 'CNC Machining' },
      ]},
      { id: 5, optionId: 2, sort: 2, createdAt: '2024-01-01', i18n: [
        { id: 9, valueId: 5, langCode: 'zh-CN', valueName: '激光切割' },
        { id: 10, valueId: 5, langCode: 'en', valueName: 'Laser Cutting' },
      ]},
    ],
  },
];
