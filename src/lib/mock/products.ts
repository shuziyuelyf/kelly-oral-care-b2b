import type { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 1, categoryId: 3, productCode: 'CNC-5000X', slug: 'cnc-machining-center-cnc-5000x',
    mainImage: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600',
    priceMin: 15000, priceMax: 45000, unit: '台', minOrderQuantity: 1,
    totalStock: 50, salesCount: 128, isHot: true, isRecommended: true, isNew: false,
    status: 1, sort: 1, createdAt: '2024-01-15', updatedAt: '2024-06-20',
    i18n: [
      { id: 1, productId: 1, langCode: 'zh-CN', name: '数控加工中心 CNC-5000X', subtitle: '五轴高精度数控加工中心', description: '<p>高精度五轴数控加工中心，配备自动换刀系统。适用于航空航天、汽车和模具行业的复杂零件加工。</p>', specsData: '[{"label":"行程(X/Y/Z)","value":"800/600/500mm"},{"label":"主轴转速","value":"12000rpm"},{"label":"定位精度","value":"±0.005mm"}]', slug: 'cnc-5000x', seoTitle: 'CNC-5000X五轴数控加工中心', seoKeywords: '数控,加工中心,五轴', seoDescription: '高精度五轴数控加工中心CNC-5000X' },
      { id: 2, productId: 1, langCode: 'en', name: 'CNC Machining Center CNC-5000X', subtitle: '5-axis high-precision CNC machining center', description: '<p>High-precision 5-axis CNC machining center with automatic tool changer. Suitable for aerospace, automotive, and mold industries.</p>', specsData: '[{"label":"Travel(X/Y/Z)","value":"800/600/500mm"},{"label":"Spindle Speed","value":"12000rpm"},{"label":"Positioning Accuracy","value":"±0.005mm"}]', slug: 'cnc-5000x', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 3, productId: 1, langCode: 'ja', name: 'CNC加工センター CNC-5000X', subtitle: '5軸高精度CNC加工センター', description: '<p>高精度5軸CNC加工センター。</p>', specsData: '[]', slug: 'cnc-5000x', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 4, productId: 1, langCode: 'ar', name: 'مركز التصنيع CNC-5000X', subtitle: 'مركز تصنيع خماسي المحاور', description: '<p>مركز تصنيع CNC خماسي المحاور عالي الدقة.</p>', specsData: '[]', slug: 'cnc-5000x', seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    skus: [
      { id: 1, productId: 1, skuCode: 'CNC-5000X-A', price: 45000, stock: 20, stockWarning: 5, weight: 2500, volume: '200x150x180cm', status: 1, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
      { id: 2, productId: 1, skuCode: 'CNC-5000X-B', price: 38000, stock: 15, stockWarning: 5, weight: 2200, volume: '180x140x170cm', status: 1, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
      { id: 3, productId: 1, skuCode: 'CNC-5000X-C', price: 15000, stock: 15, stockWarning: 5, weight: 1800, volume: '160x120x150cm', status: 1, createdAt: '2024-02-01', updatedAt: '2024-06-20' },
    ],
    images: [
      { id: 1, productId: 1, imageUrl: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800', altText: 'CNC-5000X Main', sort: 1, isMain: true, createdAt: '2024-01-15' },
      { id: 2, productId: 1, imageUrl: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800', altText: 'CNC-5000X Side', sort: 2, isMain: false, createdAt: '2024-01-15' },
    ],
    channels: [
      { id: 1, productId: 1, skuId: null, channelType: 1, shopName: '官方旗舰店', url: 'https://example-store.com/product/cnc-5000x', qrCode: null, sort: 1, status: 1, createdAt: '2024-01-15', updatedAt: '2024-01-15' },
      { id: 2, productId: 1, skuId: null, channelType: 2, shopName: null, url: 'https://wa.me/8613800138000?text=I%20am%20interested%20in%20CNC-5000X', qrCode: null, sort: 2, status: 1, createdAt: '2024-01-15', updatedAt: '2024-01-15' },
    ],
  },
  {
    id: 2, categoryId: 3, productCode: 'LAT-200', slug: 'precision-lathe-lat-200',
    mainImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600',
    priceMin: 8000, priceMax: 25000, unit: '台', minOrderQuantity: 1,
    totalStock: 80, salesCount: 256, isHot: true, isRecommended: false, isNew: false,
    status: 1, sort: 2, createdAt: '2024-02-10', updatedAt: '2024-06-15',
    i18n: [
      { id: 5, productId: 2, langCode: 'zh-CN', name: '精密车床 LAT-200', subtitle: '高精度数控车床', description: '<p>高精度数控车床，用于轴类和盘类零件加工。</p>', specsData: '[{"label":"最大车削直径","value":"200mm"},{"label":"主轴转速","value":"6000rpm"}]', slug: 'lat-200', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 6, productId: 2, langCode: 'en', name: 'Precision Lathe LAT-200', subtitle: 'High-precision CNC lathe', description: '<p>High-precision CNC lathe for shaft and disc part processing.</p>', specsData: '[{"label":"Max Turning Diameter","value":"200mm"},{"label":"Spindle Speed","value":"6000rpm"}]', slug: 'lat-200', seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    skus: [
      { id: 4, productId: 2, skuCode: 'LAT-200-A', price: 25000, stock: 30, stockWarning: 10, weight: 800, volume: '120x80x100cm', status: 1, createdAt: '2024-02-10', updatedAt: '2024-06-15' },
      { id: 5, productId: 2, skuCode: 'LAT-200-B', price: 8000, stock: 50, stockWarning: 10, weight: 600, volume: '100x70x90cm', status: 1, createdAt: '2024-02-10', updatedAt: '2024-06-15' },
    ],
    images: [
      { id: 3, productId: 2, imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800', altText: 'LAT-200', sort: 1, isMain: true, createdAt: '2024-02-10' },
    ],
    channels: [
      { id: 3, productId: 2, skuId: null, channelType: 1, shopName: '淘宝旗舰店', url: 'https://example-store.com/product/lat-200', qrCode: null, sort: 1, status: 1, createdAt: '2024-02-10', updatedAt: '2024-02-10' },
      { id: 4, productId: 2, skuId: null, channelType: 2, shopName: null, url: 'https://wa.me/8613800138000?text=I%20am%20interested%20in%20LAT-200', qrCode: null, sort: 2, status: 1, createdAt: '2024-02-10', updatedAt: '2024-02-10' },
    ],
  },
  {
    id: 3, categoryId: 4, productCode: 'HYD-300', slug: 'hydraulic-pump-hyd-300',
    mainImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600',
    priceMin: 2000, priceMax: 8000, unit: '台', minOrderQuantity: 5,
    totalStock: 200, salesCount: 512, isHot: false, isRecommended: true, isNew: false,
    status: 1, sort: 3, createdAt: '2024-03-01', updatedAt: '2024-06-10',
    i18n: [
      { id: 7, productId: 3, langCode: 'zh-CN', name: '液压泵 HYD-300', subtitle: '工业级液压泵', description: '<p>工业级液压泵，适用于各种液压系统。</p>', specsData: '[{"label":"最大压力","value":"300bar"},{"label":"流量","value":"50L/min"}]', slug: 'hyd-300', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 8, productId: 3, langCode: 'en', name: 'Hydraulic Pump HYD-300', subtitle: 'Industrial hydraulic pump', description: '<p>Industrial hydraulic pump for various hydraulic systems.</p>', specsData: '[{"label":"Max Pressure","value":"300bar"},{"label":"Flow Rate","value":"50L/min"}]', slug: 'hyd-300', seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    skus: [
      { id: 6, productId: 3, skuCode: 'HYD-300-A', price: 8000, stock: 100, stockWarning: 20, weight: 50, volume: '40x30x35cm', status: 1, createdAt: '2024-03-01', updatedAt: '2024-06-10' },
      { id: 7, productId: 3, skuCode: 'HYD-300-B', price: 2000, stock: 100, stockWarning: 20, weight: 35, volume: '35x25x30cm', status: 1, createdAt: '2024-03-01', updatedAt: '2024-06-10' },
    ],
    images: [
      { id: 4, productId: 3, imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800', altText: 'HYD-300', sort: 1, isMain: true, createdAt: '2024-03-01' },
    ],
    channels: [
      { id: 5, productId: 3, skuId: null, channelType: 1, shopName: '1688批发店', url: 'https://1688.com/product/hyd-300', qrCode: null, sort: 1, status: 1, createdAt: '2024-03-01', updatedAt: '2024-03-01' },
    ],
  },
  {
    id: 4, categoryId: 5, productCode: 'SEN-100', slug: 'temperature-sensor-sen-100',
    mainImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
    priceMin: 50, priceMax: 200, unit: '个', minOrderQuantity: 100,
    totalStock: 10000, salesCount: 25000, isHot: false, isRecommended: true, isNew: true,
    status: 1, sort: 4, createdAt: '2024-04-01', updatedAt: '2024-06-20',
    i18n: [
      { id: 9, productId: 4, langCode: 'zh-CN', name: '温度传感器 SEN-100', subtitle: '高精度工业温度传感器', description: '<p>高精度工业温度传感器，适用于各种工业环境。</p>', specsData: '[{"label":"测量范围","value":"-50~+300°C"},{"label":"精度","value":"±0.1°C"}]', slug: 'sen-100', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 10, productId: 4, langCode: 'en', name: 'Temperature Sensor SEN-100', subtitle: 'High-precision industrial temperature sensor', description: '<p>High-precision industrial temperature sensor for various industrial environments.</p>', specsData: '[{"label":"Range","value":"-50~+300°C"},{"label":"Accuracy","value":"±0.1°C"}]', slug: 'sen-100', seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    skus: [
      { id: 8, productId: 4, skuCode: 'SEN-100-A', price: 200, stock: 5000, stockWarning: 1000, weight: 0.05, volume: '5x5x3cm', status: 1, createdAt: '2024-04-01', updatedAt: '2024-06-20' },
      { id: 9, productId: 4, skuCode: 'SEN-100-B', price: 50, stock: 5000, stockWarning: 1000, weight: 0.03, volume: '4x4x2cm', status: 1, createdAt: '2024-04-01', updatedAt: '2024-06-20' },
    ],
    images: [
      { id: 5, productId: 4, imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', altText: 'SEN-100', sort: 1, isMain: true, createdAt: '2024-04-01' },
    ],
    channels: [
      { id: 6, productId: 4, skuId: null, channelType: 1, shopName: '阿里巴巴国际站', url: 'https://alibaba.com/product/sen-100', qrCode: null, sort: 1, status: 1, createdAt: '2024-04-01', updatedAt: '2024-04-01' },
      { id: 7, productId: 4, skuId: null, channelType: 2, shopName: null, url: 'https://wa.me/8613800138000?text=I%20am%20interested%20in%20SEN-100', qrCode: null, sort: 2, status: 1, createdAt: '2024-04-01', updatedAt: '2024-04-01' },
    ],
  },
];
