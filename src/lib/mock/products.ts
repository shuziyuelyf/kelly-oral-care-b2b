import type { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 1, categoryId: 1, productCode: 'HAP-001', slug: 'hydroxyapatite-toothpaste',
    mainImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600',
    priceMin: 2.5, priceMax: 5.0, unit: 'pcs', minOrderQuantity: 500,
    totalStock: 10000, salesCount: 3200, isHot: true, isRecommended: true, isNew: false,
    status: 1, sort: 1, createdAt: '2024-01-15', updatedAt: '2024-06-20',
    i18n: [
      { id: 1, productId: 1, langCode: 'zh-CN', name: '羟基磷灰石牙膏', subtitle: '修复牙釉质，强健牙齿', description: '<p>含纳米羟基磷灰石，有效修复牙釉质微损伤，增强牙齿抗酸能力。</p>', specsData: '[{"label":"规格","value":"120g"},{"label":"成分","value":"羟基磷灰石、氟化钠"},{"label":"保质期","value":"3年"}]', slug: 'hydroxyapatite-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 2, productId: 1, langCode: 'en', name: 'Hydroxyapatite Toothpaste', subtitle: 'Repair enamel, strengthen teeth', description: '<p>Contains nano-hydroxyapatite to effectively repair enamel micro-damage and enhance acid resistance.</p>', specsData: '[{"label":"Size","value":"120g"},{"label":"Ingredients","value":"Hydroxyapatite, Sodium Fluoride"},{"label":"Shelf Life","value":"3 years"}]', slug: 'hydroxyapatite-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 3, productId: 1, langCode: 'ja', name: 'ハイドロキシアパタイト歯磨き粉', subtitle: 'エナメル質修復', description: '<p>ナノハイドロキシアパタイト配合。</p>', specsData: '[]', slug: 'hydroxyapatite-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 4, productId: 1, langCode: 'ar', name: 'معجون أسنان بالهيدروكسي أباتيت', subtitle: 'إصلاح المينا', description: '<p>يحتوي على هيدروكسي أباتيت النانو.</p>', specsData: '[]', slug: 'hydroxyapatite-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    skus: [
      { id: 1, productId: 1, skuCode: 'HAP-001-A', price: 5.0, stock: 5000, stockWarning: 500, weight: 150, volume: '15x5x5cm', status: 1, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
      { id: 2, productId: 1, skuCode: 'HAP-001-B', price: 2.5, stock: 5000, stockWarning: 500, weight: 120, volume: '12x4x4cm', status: 1, createdAt: '2024-01-15', updatedAt: '2024-06-20' },
    ],
    images: [
      { id: 1, productId: 1, imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800', altText: 'Hydroxyapatite Toothpaste', sort: 1, isMain: true, createdAt: '2024-01-15' },
    ],
    channels: [
      { id: 1, productId: 1, skuId: null, channelType: 2, shopName: null, url: 'https://wa.me/8613800138000?text=I%20am%20interested%20in%20Hydroxyapatite%20Toothpaste', qrCode: null, sort: 1, status: 1, createdAt: '2024-01-15', updatedAt: '2024-01-15' },
    ],
  },
  {
    id: 2, categoryId: 1, productCode: 'WT-002', slug: 'whitening-toothpaste',
    mainImage: 'https://images.unsplash.com/photo-1628359355624-855c28f0613a?w=600',
    priceMin: 2.0, priceMax: 4.5, unit: 'pcs', minOrderQuantity: 500,
    totalStock: 8000, salesCount: 2800, isHot: true, isRecommended: true, isNew: false,
    status: 1, sort: 2, createdAt: '2024-02-10', updatedAt: '2024-06-15',
    i18n: [
      { id: 5, productId: 2, langCode: 'zh-CN', name: '亮白牙膏', subtitle: '温和美白，去除牙渍', description: '<p>采用温和美白配方，有效去除咖啡、茶渍，令牙齿自然亮白。</p>', specsData: '[{"label":"规格","value":"120g"},{"label":"成分","value":"水合硅石、氟化钠"},{"label":"保质期","value":"3年"}]', slug: 'whitening-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 6, productId: 2, langCode: 'en', name: 'Whitening Toothpaste', subtitle: 'Gentle whitening, remove stains', description: '<p>Gentle whitening formula that effectively removes coffee and tea stains for naturally whiter teeth.</p>', specsData: '[{"label":"Size","value":"120g"},{"label":"Ingredients","value":"Hydrated Silica, Sodium Fluoride"},{"label":"Shelf Life","value":"3 years"}]', slug: 'whitening-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 7, productId: 2, langCode: 'ja', name: 'ホワイトニング歯磨き粉', subtitle: '優しくホワイトニング', description: '<p>優しいホワイトニング処方。</p>', specsData: '[]', slug: 'whitening-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 8, productId: 2, langCode: 'ar', name: 'معجون تبييض الأسنان', subtitle: 'تبييض لطيف', description: '<p>صيغة تبييض لطيفة.</p>', specsData: '[]', slug: 'whitening-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    skus: [
      { id: 3, productId: 2, skuCode: 'WT-002-A', price: 4.5, stock: 4000, stockWarning: 400, weight: 150, volume: '15x5x5cm', status: 1, createdAt: '2024-02-10', updatedAt: '2024-06-15' },
      { id: 4, productId: 2, skuCode: 'WT-002-B', price: 2.0, stock: 4000, stockWarning: 400, weight: 120, volume: '12x4x4cm', status: 1, createdAt: '2024-02-10', updatedAt: '2024-06-15' },
    ],
    images: [
      { id: 2, productId: 2, imageUrl: 'https://images.unsplash.com/photo-1628359355624-855c28f0613a?w=800', altText: 'Whitening Toothpaste', sort: 1, isMain: true, createdAt: '2024-02-10' },
    ],
    channels: [
      { id: 2, productId: 2, skuId: null, channelType: 2, shopName: null, url: 'https://wa.me/8613800138000?text=I%20am%20interested%20in%20Whitening%20Toothpaste', qrCode: null, sort: 1, status: 1, createdAt: '2024-02-10', updatedAt: '2024-02-10' },
    ],
  },
  {
    id: 3, categoryId: 1, productCode: 'SR-003', slug: 'sensitive-relief-toothpaste',
    mainImage: 'https://images.unsplash.com/photo-1612538498456-e861df91d4d1?w=600',
    priceMin: 3.0, priceMax: 6.0, unit: 'pcs', minOrderQuantity: 1000,
    totalStock: 6000, salesCount: 1500, isHot: false, isRecommended: true, isNew: false,
    status: 1, sort: 3, createdAt: '2024-03-01', updatedAt: '2024-06-10',
    i18n: [
      { id: 9, productId: 3, langCode: 'zh-CN', name: '抗敏感牙膏', subtitle: '缓解牙齿敏感，温和护理', description: '<p>含硝酸钾和氟化亚锡，有效缓解冷热酸甜引起的牙齿敏感。</p>', specsData: '[{"label":"规格","value":"120g"},{"label":"成分","value":"硝酸钾、氟化亚锡"},{"label":"保质期","value":"3年"}]', slug: 'sensitive-relief-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 10, productId: 3, langCode: 'en', name: 'Sensitive Relief Toothpaste', subtitle: 'Relieve sensitivity, gentle care', description: '<p>Contains potassium nitrate and stannous fluoride to effectively relieve tooth sensitivity from hot, cold, sweet and sour.</p>', specsData: '[{"label":"Size","value":"120g"},{"label":"Ingredients","value":"Potassium Nitrate, Stannous Fluoride"},{"label":"Shelf Life","value":"3 years"}]', slug: 'sensitive-relief-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 11, productId: 3, langCode: 'ja', name: '知覚過敏ケア歯磨き粉', subtitle: '敏感ケア', description: '<p>硝酸カリウム配合。</p>', specsData: '[]', slug: 'sensitive-relief-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 12, productId: 3, langCode: 'ar', name: 'معجون أسنان للأسنان الحساسة', subtitle: 'تخفيف الحساسية', description: '<p>يحتوي على نترات البوتاسيوم.</p>', specsData: '[]', slug: 'sensitive-relief-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    skus: [
      { id: 5, productId: 3, skuCode: 'SR-003-A', price: 6.0, stock: 3000, stockWarning: 300, weight: 150, volume: '15x5x5cm', status: 1, createdAt: '2024-03-01', updatedAt: '2024-06-10' },
      { id: 6, productId: 3, skuCode: 'SR-003-B', price: 3.0, stock: 3000, stockWarning: 300, weight: 120, volume: '12x4x4cm', status: 1, createdAt: '2024-03-01', updatedAt: '2024-06-10' },
    ],
    images: [
      { id: 3, productId: 3, imageUrl: 'https://images.unsplash.com/photo-1612538498456-e861df91d4d1?w=800', altText: 'Sensitive Relief Toothpaste', sort: 1, isMain: true, createdAt: '2024-03-01' },
    ],
    channels: [
      { id: 3, productId: 3, skuId: null, channelType: 2, shopName: null, url: 'https://wa.me/8613800138000?text=I%20am%20interested%20in%20Sensitive%20Relief%20Toothpaste', qrCode: null, sort: 1, status: 1, createdAt: '2024-03-01', updatedAt: '2024-03-01' },
    ],
  },
  {
    id: 4, categoryId: 1, productCode: 'KF-004', slug: 'kids-fluoride-toothpaste',
    mainImage: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600',
    priceMin: 1.5, priceMax: 3.5, unit: 'pcs', minOrderQuantity: 1000,
    totalStock: 15000, salesCount: 4500, isHot: false, isRecommended: true, isNew: false,
    status: 1, sort: 4, createdAt: '2024-04-01', updatedAt: '2024-06-20',
    i18n: [
      { id: 13, productId: 4, langCode: 'zh-CN', name: '儿童含氟牙膏', subtitle: '防蛀护齿，水果口味', description: '<p>专为3-12岁儿童设计，含适量氟化物防蛀，草莓/橙子水果口味。</p>', specsData: '[{"label":"规格","value":"60g"},{"label":"成分","value":"氟化钠、木糖醇"},{"label":"适用年龄","value":"3-12岁"}]', slug: 'kids-fluoride-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 14, productId: 4, langCode: 'en', name: 'Kids Fluoride Toothpaste', subtitle: 'Cavity protection, fruit flavor', description: '<p>Designed for children aged 3-12, with appropriate fluoride for cavity prevention. Strawberry/orange fruit flavor.</p>', specsData: '[{"label":"Size","value":"60g"},{"label":"Ingredients","value":"Sodium Fluoride, Xylitol"},{"label":"Age","value":"3-12 years"}]', slug: 'kids-fluoride-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 15, productId: 4, langCode: 'ja', name: '子供用フッ素歯磨き粉', subtitle: '虫歯予防、フルーツ味', description: '<p>3〜12歳向け。</p>', specsData: '[]', slug: 'kids-fluoride-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 16, productId: 4, langCode: 'ar', name: 'معجون أسنان للأطفال بالفلورايد', subtitle: 'حماية من التسوس', description: '<p>مصمم للأطفال من 3 إلى 12 سنة.</p>', specsData: '[]', slug: 'kids-fluoride-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    skus: [
      { id: 7, productId: 4, skuCode: 'KF-004-A', price: 3.5, stock: 7500, stockWarning: 750, weight: 80, volume: '10x4x4cm', status: 1, createdAt: '2024-04-01', updatedAt: '2024-06-20' },
      { id: 8, productId: 4, skuCode: 'KF-004-B', price: 1.5, stock: 7500, stockWarning: 750, weight: 60, volume: '8x3x3cm', status: 1, createdAt: '2024-04-01', updatedAt: '2024-06-20' },
    ],
    images: [
      { id: 4, productId: 4, imageUrl: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800', altText: 'Kids Fluoride Toothpaste', sort: 1, isMain: true, createdAt: '2024-04-01' },
    ],
    channels: [
      { id: 4, productId: 4, skuId: null, channelType: 2, shopName: null, url: 'https://wa.me/8613800138000?text=I%20am%20interested%20in%20Kids%20Fluoride%20Toothpaste', qrCode: null, sort: 1, status: 1, createdAt: '2024-04-01', updatedAt: '2024-04-01' },
    ],
  },
  {
    id: 5, categoryId: 1, productCode: 'HB-005', slug: 'herbal-toothpaste',
    mainImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600',
    priceMin: 2.0, priceMax: 4.0, unit: 'pcs', minOrderQuantity: 1000,
    totalStock: 7000, salesCount: 1800, isHot: false, isRecommended: false, isNew: true,
    status: 1, sort: 5, createdAt: '2024-05-01', updatedAt: '2024-06-20',
    i18n: [
      { id: 17, productId: 5, langCode: 'zh-CN', name: '草本牙膏', subtitle: '天然草本配方，清新口气', description: '<p>含薄荷、金银花、甘草等天然草本精华，温和护理牙龈，持久清新口气。</p>', specsData: '[{"label":"规格","value":"120g"},{"label":"成分","value":"薄荷、金银花、甘草提取物"},{"label":"保质期","value":"3年"}]', slug: 'herbal-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 18, productId: 5, langCode: 'en', name: 'Herbal Toothpaste', subtitle: 'Natural herbal formula, fresh breath', description: '<p>Contains natural herbal extracts including mint, honeysuckle, and licorice for gentle gum care and long-lasting fresh breath.</p>', specsData: '[{"label":"Size","value":"120g"},{"label":"Ingredients","value":"Mint, Honeysuckle, Licorice Extract"},{"label":"Shelf Life","value":"3 years"}]', slug: 'herbal-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 19, productId: 5, langCode: 'ja', name: 'ハーブ歯磨き粉', subtitle: '天然ハーブ処方', description: '<p>ミント、スイカズラ、甘草エキス配合。</p>', specsData: '[]', slug: 'herbal-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 20, productId: 5, langCode: 'ar', name: 'معجون أسنان بالأعشاب', subtitle: 'صيغة أعشاب طبيعية', description: '<p>يحتوي على مستخلصات النعناع والزهر.</p>', specsData: '[]', slug: 'herbal-toothpaste', seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    skus: [
      { id: 9, productId: 5, skuCode: 'HB-005-A', price: 4.0, stock: 3500, stockWarning: 350, weight: 150, volume: '15x5x5cm', status: 1, createdAt: '2024-05-01', updatedAt: '2024-06-20' },
      { id: 10, productId: 5, skuCode: 'HB-005-B', price: 2.0, stock: 3500, stockWarning: 350, weight: 120, volume: '12x4x4cm', status: 1, createdAt: '2024-05-01', updatedAt: '2024-06-20' },
    ],
    images: [
      { id: 5, productId: 5, imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800', altText: 'Herbal Toothpaste', sort: 1, isMain: true, createdAt: '2024-05-01' },
    ],
    channels: [
      { id: 5, productId: 5, skuId: null, channelType: 2, shopName: null, url: 'https://wa.me/8613800138000?text=I%20am%20interested%20in%20Herbal%20Toothpaste', qrCode: null, sort: 1, status: 1, createdAt: '2024-05-01', updatedAt: '2024-05-01' },
    ],
  },
  {
    id: 6, categoryId: 2, productCode: 'CP-006', slug: 'charcoal-tooth-powder',
    mainImage: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600',
    priceMin: 2.5, priceMax: 5.0, unit: 'pcs', minOrderQuantity: 1000,
    totalStock: 5000, salesCount: 900, isHot: false, isRecommended: true, isNew: false,
    status: 1, sort: 6, createdAt: '2024-05-15', updatedAt: '2024-06-20',
    i18n: [
      { id: 21, productId: 6, langCode: 'zh-CN', name: '竹炭牙粉', subtitle: '天然竹炭，深层清洁', description: '<p>采用天然竹炭粉，深层清洁牙齿表面污渍，吸附口腔异味。</p>', specsData: '[{"label":"规格","value":"50g"},{"label":"成分","value":"竹炭粉、碳酸钙"},{"label":"保质期","value":"2年"}]', slug: 'charcoal-tooth-powder', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 22, productId: 6, langCode: 'en', name: 'Charcoal Tooth Powder', subtitle: 'Natural bamboo charcoal, deep clean', description: '<p>Made with natural bamboo charcoal powder for deep cleaning of tooth surface stains and absorbing oral odors.</p>', specsData: '[{"label":"Size","value":"50g"},{"label":"Ingredients","value":"Bamboo Charcoal, Calcium Carbonate"},{"label":"Shelf Life","value":"2 years"}]', slug: 'charcoal-tooth-powder', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 23, productId: 6, langCode: 'ja', name: '竹炭歯磨き粉', subtitle: '天然竹炭、深層クリーニング', description: '<p>天然竹炭パウダー使用。</p>', specsData: '[]', slug: 'charcoal-tooth-powder', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 24, productId: 6, langCode: 'ar', name: 'مسحوق أسنان بالفحم', subtitle: 'فحم خيزران طبيعي', description: '<p>مصنوع من مسحوق فحم الخيزران الطبيعي.</p>', specsData: '[]', slug: 'charcoal-tooth-powder', seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    skus: [
      { id: 11, productId: 6, skuCode: 'CP-006-A', price: 5.0, stock: 2500, stockWarning: 250, weight: 60, volume: '8x6x6cm', status: 1, createdAt: '2024-05-15', updatedAt: '2024-06-20' },
      { id: 12, productId: 6, skuCode: 'CP-006-B', price: 2.5, stock: 2500, stockWarning: 250, weight: 50, volume: '7x5x5cm', status: 1, createdAt: '2024-05-15', updatedAt: '2024-06-20' },
    ],
    images: [
      { id: 6, productId: 6, imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800', altText: 'Charcoal Tooth Powder', sort: 1, isMain: true, createdAt: '2024-05-15' },
    ],
    channels: [
      { id: 6, productId: 6, skuId: null, channelType: 2, shopName: null, url: 'https://wa.me/8613800138000?text=I%20am%20interested%20in%20Charcoal%20Tooth%20Powder', qrCode: null, sort: 1, status: 1, createdAt: '2024-05-15', updatedAt: '2024-05-15' },
    ],
  },
  {
    id: 7, categoryId: 3, productCode: 'MW-007', slug: 'mint-mouthwash',
    mainImage: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600',
    priceMin: 1.5, priceMax: 3.5, unit: 'pcs', minOrderQuantity: 500,
    totalStock: 12000, salesCount: 3600, isHot: false, isRecommended: true, isNew: false,
    status: 1, sort: 7, createdAt: '2024-06-01', updatedAt: '2024-06-20',
    i18n: [
      { id: 25, productId: 7, langCode: 'zh-CN', name: '薄荷漱口水', subtitle: '清新口气，杀菌护龈', description: '<p>含薄荷精油和氯己定，有效杀灭口腔细菌，持久清新口气，温和不刺激。</p>', specsData: '[{"label":"规格","value":"500ml"},{"label":"成分","value":"薄荷精油、氯己定"},{"label":"保质期","value":"2年"}]', slug: 'mint-mouthwash', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 26, productId: 7, langCode: 'en', name: 'Mint Mouthwash', subtitle: 'Fresh breath, antibacterial', description: '<p>Contains mint essential oil and chlorhexidine to effectively kill oral bacteria, provide long-lasting fresh breath, gentle and non-irritating.</p>', specsData: '[{"label":"Size","value":"500ml"},{"label":"Ingredients","value":"Mint Essential Oil, Chlorhexidine"},{"label":"Shelf Life","value":"2 years"}]', slug: 'mint-mouthwash', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 27, productId: 7, langCode: 'ja', name: 'ミントマウスウォッシュ', subtitle: '息を爽やかに', description: '<p>ミント精油配合。</p>', specsData: '[]', slug: 'mint-mouthwash', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 28, productId: 7, langCode: 'ar', name: 'غسول فم بالنعناع', subtitle: 'انتعاش طويل', description: '<p>يحتوي على زيت النعناع الأساسي.</p>', specsData: '[]', slug: 'mint-mouthwash', seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    skus: [
      { id: 13, productId: 7, skuCode: 'MW-007-A', price: 3.5, stock: 6000, stockWarning: 600, weight: 550, volume: '20x8x8cm', status: 1, createdAt: '2024-06-01', updatedAt: '2024-06-20' },
      { id: 14, productId: 7, skuCode: 'MW-007-B', price: 1.5, stock: 6000, stockWarning: 600, weight: 300, volume: '15x6x6cm', status: 1, createdAt: '2024-06-01', updatedAt: '2024-06-20' },
    ],
    images: [
      { id: 7, productId: 7, imageUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800', altText: 'Mint Mouthwash', sort: 1, isMain: true, createdAt: '2024-06-01' },
    ],
    channels: [
      { id: 7, productId: 7, skuId: null, channelType: 2, shopName: null, url: 'https://wa.me/8613800138000?text=I%20am%20interested%20in%20Mint%20Mouthwash', qrCode: null, sort: 1, status: 1, createdAt: '2024-06-01', updatedAt: '2024-06-01' },
    ],
  },
  {
    id: 8, categoryId: 4, productCode: 'SB-008', slug: 'soft-bristle-toothbrush',
    mainImage: 'https://images.unsplash.com/photo-1559650656-5d1d361ad10e?w=600',
    priceMin: 0.5, priceMax: 1.5, unit: 'pcs', minOrderQuantity: 2000,
    totalStock: 50000, salesCount: 15000, isHot: false, isRecommended: true, isNew: false,
    status: 1, sort: 8, createdAt: '2024-06-15', updatedAt: '2024-06-20',
    i18n: [
      { id: 29, productId: 8, langCode: 'zh-CN', name: '软毛牙刷', subtitle: '超细软毛，温和护龈', description: '<p>采用0.01mm超细软毛，温和清洁不伤牙龈，符合人体工学手柄设计。</p>', specsData: '[{"label":"刷毛","value":"0.01mm超细软毛"},{"label":"手柄","value":"防滑TPE"},{"label":"包装","value":"独立包装"}]', slug: 'soft-bristle-toothbrush', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 30, productId: 8, langCode: 'en', name: 'Soft Bristle Toothbrush', subtitle: 'Ultra-soft bristles, gentle on gums', description: '<p>Features 0.01mm ultra-soft bristles for gentle cleaning without hurting gums, ergonomic handle design.</p>', specsData: '[{"label":"Bristles","value":"0.01mm ultra-soft"},{"label":"Handle","value":"Anti-slip TPE"},{"label":"Packaging","value":"Individually wrapped"}]', slug: 'soft-bristle-toothbrush', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 31, productId: 8, langCode: 'ja', name: 'ソフトブラシ歯ブラシ', subtitle: '超極細ソフトブラシ', description: '<p>0.01mm超極細ブラシ。</p>', specsData: '[]', slug: 'soft-bristle-toothbrush', seoTitle: null, seoKeywords: null, seoDescription: null },
      { id: 32, productId: 8, langCode: 'ar', name: 'فرشاة أسنان ناعمة', subtitle: 'شعيرات ناعمة جداً', description: '<p>شعيرات فائقة النعومة 0.01 مم.</p>', specsData: '[]', slug: 'soft-bristle-toothbrush', seoTitle: null, seoKeywords: null, seoDescription: null },
    ],
    skus: [
      { id: 15, productId: 8, skuCode: 'SB-008-A', price: 1.5, stock: 25000, stockWarning: 2500, weight: 15, volume: '20x3x3cm', status: 1, createdAt: '2024-06-15', updatedAt: '2024-06-20' },
      { id: 16, productId: 8, skuCode: 'SB-008-B', price: 0.5, stock: 25000, stockWarning: 2500, weight: 10, volume: '18x2x2cm', status: 1, createdAt: '2024-06-15', updatedAt: '2024-06-20' },
    ],
    images: [
      { id: 8, productId: 8, imageUrl: 'https://images.unsplash.com/photo-1559650656-5d1d361ad10e?w=800', altText: 'Soft Bristle Toothbrush', sort: 1, isMain: true, createdAt: '2024-06-15' },
    ],
    channels: [
      { id: 8, productId: 8, skuId: null, channelType: 2, shopName: null, url: 'https://wa.me/8613800138000?text=I%20am%20interested%20in%20Soft%20Bristle%20Toothbrush', qrCode: null, sort: 1, status: 1, createdAt: '2024-06-15', updatedAt: '2024-06-15' },
    ],
  },
];
