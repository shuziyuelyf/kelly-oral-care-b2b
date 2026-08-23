export interface ProductDetailData {
  slug: string;
  features: { icon: string; title: Record<string, string>; desc: Record<string, string> }[];
  specifications: { label: Record<string, string>; value: Record<string, string> }[];
  packaging: { label: Record<string, string>; desc: Record<string, string> }[];
  usage: Record<string, string>;
  faq: { q: Record<string, string>; a: Record<string, string> }[];
  relatedSlugs: string[];
}

export const productDetailData: Record<string, ProductDetailData> = {
  'hydroxyapatite-toothpaste': {
    slug: 'hydroxyapatite-toothpaste',
    features: [
      { icon: 'Shield', title: { en: 'Enamel Repair', zh: '牙釉质修复' }, desc: { en: 'Nano-hydroxyapatite fills micro-damage', zh: '纳米羟基磷灰石填充微小损伤' } },
      { icon: 'Sparkles', title: { en: 'Gentle Whitening', zh: '温和亮白' }, desc: { en: 'Natural whitening without peroxide', zh: '无过氧化物天然亮白' } },
      { icon: 'Droplets', title: { en: 'Deep Hydration', zh: '深层保湿' }, desc: { en: 'Prevents dry mouth sensation', zh: '预防口腔干燥感' } },
      { icon: 'Heart', title: { en: 'Gum Care', zh: '牙龈护理' }, desc: { en: 'Strengthens gum tissue', zh: '强化牙龈组织' } },
    ],
    specifications: [
      { label: { en: 'Net Weight', zh: '净含量' }, value: { en: '100g / 120g', zh: '100g / 120g' } },
      { label: { en: 'Flavor', zh: '口味' }, value: { en: 'Mint / Mild Mint', zh: '薄荷 / 温和薄荷' } },
      { label: { en: 'Key Ingredient', zh: '核心成分' }, value: { en: 'Nano-Hydroxyapatite 10%', zh: '纳米羟基磷灰石 10%' } },
      { label: { en: 'Fluoride', zh: '含氟' }, value: { en: 'Fluoride-free option available', zh: '可选无氟配方' } },
      { label: { en: 'Shelf Life', zh: '保质期' }, value: { en: '24 months', zh: '24个月' } },
      { label: { en: 'Certification', zh: '认证' }, value: { en: 'ISO 9001, GMP, FDA', zh: 'ISO 9001, GMP, FDA' } },
    ],
    packaging: [
      { label: { en: 'Standard Tube', zh: '标准管装' }, desc: { en: 'Aluminum-plastic composite tube', zh: '铝塑复合软管' } },
      { label: { en: 'Custom Tube', zh: '定制管装' }, desc: { en: 'Your brand color & logo', zh: '您的品牌色和Logo' } },
      { label: { en: 'Gift Box', zh: '礼盒装' }, desc: { en: 'Premium packaging for retail', zh: '零售高端包装' } },
    ],
    usage: {
      en: 'Apply a pea-sized amount to a soft-bristled toothbrush. Brush gently in circular motions for 2 minutes, twice daily. For best results, avoid rinsing immediately after brushing to allow hydroxyapatite to absorb.',
      zh: '取豌豆大小用量于软毛牙刷上。以画圈方式轻柔刷牙2分钟，每日两次。最佳效果：刷牙后不要立即漱口，让羟基磷灰石充分吸收。',
    },
    faq: [
      { q: { en: 'Is hydroxyapatite safe?', zh: '羟基磷灰石安全吗？' }, a: { en: 'Yes, it is biocompatible and naturally found in teeth and bones.', zh: '是的，它具有生物相容性，天然存在于牙齿和骨骼中。' } },
      { q: { en: 'Can children use this?', zh: '儿童可以使用吗？' }, a: { en: 'Yes, suitable for ages 6+. For younger children, use a rice-grain amount.', zh: '可以，适合6岁以上。更小的儿童使用米粒大小用量。' } },
      { q: { en: 'How long to see whitening results?', zh: '多久能看到亮白效果？' }, a: { en: 'Most users notice visible improvement within 2-4 weeks.', zh: '大多数用户在2-4周内看到明显改善。' } },
    ],
    relatedSlugs: ['whitening-toothpaste', 'sensitive-relief-toothpaste', 'charcoal-tooth-powder'],
  },
  'whitening-toothpaste': {
    slug: 'whitening-toothpaste',
    features: [
      { icon: 'Sparkles', title: { en: 'Visible Whitening', zh: '显著亮白' }, desc: { en: 'Removes surface stains effectively', zh: '有效去除表面 stains' } },
      { icon: 'Shield', title: { en: 'Enamel Safe', zh: '牙釉质安全' }, desc: { en: 'Low abrasion formula', zh: '低磨损配方' } },
      { icon: 'Leaf', title: { en: 'Fresh Breath', zh: '清新口气' }, desc: { en: 'Long-lasting mint freshness', zh: '持久薄荷清新' } },
      { icon: 'Heart', title: { en: 'Gum Protection', zh: '牙龈保护' }, desc: { en: 'Anti-inflammatory ingredients', zh: '抗炎成分' } },
    ],
    specifications: [
      { label: { en: 'Net Weight', zh: '净含量' }, value: { en: '100g / 120g', zh: '100g / 120g' } },
      { label: { en: 'Flavor', zh: '口味' }, value: { en: 'Cool Mint', zh: '清凉薄荷' } },
      { label: { en: 'Whitening Agent', zh: '亮白成分' }, value: { en: 'Hydrated Silica', zh: '水合硅石' } },
      { label: { en: 'Fluoride', zh: '含氟' }, value: { en: '1450ppm', zh: '1450ppm' } },
      { label: { en: 'Shelf Life', zh: '保质期' }, value: { en: '24 months', zh: '24个月' } },
      { label: { en: 'Certification', zh: '认证' }, value: { en: 'ISO 9001, GMP', zh: 'ISO 9001, GMP' } },
    ],
    packaging: [
      { label: { en: 'Standard Tube', zh: '标准管装' }, desc: { en: 'White tube with blue accents', zh: '白管蓝边设计' } },
      { label: { en: 'Custom Tube', zh: '定制管装' }, desc: { en: 'Full color customization', zh: '全色彩定制' } },
      { label: { en: 'Twin Pack', zh: '双支装' }, desc: { en: 'Value pack for families', zh: '家庭超值装' } },
    ],
    usage: {
      en: 'Brush twice daily for 2 minutes. Use with a soft-bristled brush. Avoid eating or drinking for 30 minutes after brushing for maximum whitening effect.',
      zh: '每日刷牙两次，每次2分钟。使用软毛牙刷。刷牙后30分钟内避免饮食以获得最佳亮白效果。',
    },
    faq: [
      { q: { en: 'Will this damage enamel?', zh: '会损伤牙釉质吗？' }, a: { en: 'No, our formula is low-abrasion and enamel-safe.', zh: '不会，我们的配方低磨损且对牙釉质安全。' } },
      { q: { en: 'How is this different from strips?', zh: '和牙贴有什么区别？' }, a: { en: 'Gentler for daily use, no sensitivity issues.', zh: '更温和适合日常使用，无敏感问题。' } },
    ],
    relatedSlugs: ['hydroxyapatite-toothpaste', 'charcoal-tooth-powder', 'kids-fluoride-toothpaste'],
  },
  'sensitive-relief-toothpaste': {
    slug: 'sensitive-relief-toothpaste',
    features: [
      { icon: 'Shield', title: { en: 'Instant Relief', zh: '即时舒缓' }, desc: { en: 'Blocks pain signals quickly', zh: '快速阻断疼痛信号' } },
      { icon: 'Heart', title: { en: 'Gum Soothing', zh: '牙龈舒缓' }, desc: { en: 'Reduces gum inflammation', zh: '减少牙龈炎症' } },
      { icon: 'Droplets', title: { en: 'Gentle Formula', zh: '温和配方' }, desc: { en: 'No harsh chemicals', zh: '无刺激性化学物质' } },
      { icon: 'Sparkles', title: { en: 'Daily Protection', zh: '日常保护' }, desc: { en: 'Long-term sensitivity reduction', zh: '长期减少敏感' } },
    ],
    specifications: [
      { label: { en: 'Net Weight', zh: '净含量' }, value: { en: '100g', zh: '100g' } },
      { label: { en: 'Flavor', zh: '口味' }, value: { en: 'Mild Mint', zh: '温和薄荷' } },
      { label: { en: 'Active Ingredient', zh: '有效成分' }, value: { en: 'Potassium Nitrate 5%', zh: '硝酸钾 5%' } },
      { label: { en: 'Fluoride', zh: '含氟' }, value: { en: '1450ppm', zh: '1450ppm' } },
      { label: { en: 'Shelf Life', zh: '保质期' }, value: { en: '24 months', zh: '24个月' } },
      { label: { en: 'Certification', zh: '认证' }, value: { en: 'ISO 9001, GMP, FDA', zh: 'ISO 9001, GMP, FDA' } },
    ],
    packaging: [
      { label: { en: 'Standard Tube', zh: '标准管装' }, desc: { en: 'Blue & white medical design', zh: '蓝白医疗风格设计' } },
      { label: { en: 'Custom Tube', zh: '定制管装' }, desc: { en: 'Your brand packaging', zh: '您的品牌包装' } },
      { label: { en: 'Family Pack', zh: '家庭装' }, desc: { en: '200g large size', zh: '200g大容量' } },
    ],
    usage: {
      en: 'Use twice daily. For sensitive areas, apply a small amount directly and leave for 1 minute before brushing. Continue use for 4 weeks for best results.',
      zh: '每日使用两次。对于敏感区域，取少量直接涂抹并停留1分钟后再刷牙。持续使用4周效果最佳。',
    },
    faq: [
      { q: { en: 'How fast does it work?', zh: '多久见效？' }, a: { en: 'Many users feel relief within the first week.', zh: '许多用户第一周就能感受到舒缓。' } },
      { q: { en: 'Can I use it long-term?', zh: '可以长期使用吗？' }, a: { en: 'Yes, safe for daily long-term use.', zh: '可以，适合日常长期使用。' } },
    ],
    relatedSlugs: ['hydroxyapatite-toothpaste', 'whitening-toothpaste', 'mint-mouthwash'],
  },
  'kids-fluoride-toothpaste': {
    slug: 'kids-fluoride-toothpaste',
    features: [
      { icon: 'Heart', title: { en: 'Kid-Safe Formula', zh: '儿童安全配方' }, desc: { en: 'Low fluoride, safe if swallowed', zh: '低氟，吞咽安全' } },
      { icon: 'Sparkles', title: { en: 'Fun Flavors', zh: '趣味口味' }, desc: { en: 'Strawberry, bubblegum, watermelon', zh: '草莓、泡泡糖、西瓜' } },
      { icon: 'Shield', title: { en: 'Cavity Protection', zh: '防蛀保护' }, desc: { en: 'Strengthens developing teeth', zh: '强化发育中牙齿' } },
      { icon: 'Smile', title: { en: 'Gentle Cleaning', zh: '温和清洁' }, desc: { en: 'Low abrasion for young teeth', zh: '低磨损适合幼牙' } },
    ],
    specifications: [
      { label: { en: 'Net Weight', zh: '净含量' }, value: { en: '50g / 80g', zh: '50g / 80g' } },
      { label: { en: 'Flavor', zh: '口味' }, value: { en: 'Strawberry / Bubblegum', zh: '草莓 / 泡泡糖' } },
      { label: { en: 'Fluoride', zh: '含氟' }, value: { en: '500ppm (low fluoride)', zh: '500ppm（低氟）' } },
      { label: { en: 'Age Range', zh: '适用年龄' }, value: { en: '3-12 years', zh: '3-12岁' } },
      { label: { en: 'Shelf Life', zh: '保质期' }, value: { en: '24 months', zh: '24个月' } },
      { label: { en: 'Certification', zh: '认证' }, value: { en: 'ISO 9001, GMP, FDA', zh: 'ISO 9001, GMP, FDA' } },
    ],
    packaging: [
      { label: { en: 'Kids Tube', zh: '儿童管装' }, desc: { en: 'Colorful cartoon design', zh: '彩色卡通设计' } },
      { label: { en: 'Custom Tube', zh: '定制管装' }, desc: { en: 'Your brand characters', zh: '您的品牌角色' } },
      { label: { en: 'Gift Set', zh: '礼盒套装' }, desc: { en: 'Toothbrush + toothpaste set', zh: '牙刷+牙膏套装' } },
    ],
    usage: {
      en: 'For children 3-6: use a pea-sized amount. For children 6-12: use a larger pea-sized amount. Supervise brushing to ensure thorough cleaning. Teach children to spit out toothpaste.',
      zh: '3-6岁儿童：使用豌豆大小用量。6-12岁：使用较大豌豆大小用量。监督刷牙确保彻底清洁。教导儿童吐出牙膏。',
    },
    faq: [
      { q: { en: 'Is it safe if swallowed?', zh: '吞咽安全吗？' }, a: { en: 'Low fluoride formula is safe for small amounts.', zh: '低氟配方少量吞咽安全。' } },
      { q: { en: 'What age can start using?', zh: '多大可以开始使用？' }, a: { en: 'Suitable from age 3 when first teeth appear.', zh: '从3岁第一颗牙出现时即可使用。' } },
    ],
    relatedSlugs: ['soft-bristle-toothbrush', 'hydroxyapatite-toothpaste', 'mint-mouthwash'],
  },
  'herbal-toothpaste': {
    slug: 'herbal-toothpaste',
    features: [
      { icon: 'Leaf', title: { en: 'Natural Herbs', zh: '天然草本' }, desc: { en: 'Traditional herbal ingredients', zh: '传统草本成分' } },
      { icon: 'Heart', title: { en: 'Gum Health', zh: '牙龈健康' }, desc: { en: 'Reduces bleeding and swelling', zh: '减少出血和肿胀' } },
      { icon: 'Droplets', title: { en: 'Fresh Breath', zh: '清新口气' }, desc: { en: 'Natural herbal freshness', zh: '天然草本清新' } },
      { icon: 'Shield', title: { en: 'Anti-bacterial', zh: '抗菌' }, desc: { en: 'Natural antibacterial properties', zh: '天然抗菌特性' } },
    ],
    specifications: [
      { label: { en: 'Net Weight', zh: '净含量' }, value: { en: '100g / 120g', zh: '100g / 120g' } },
      { label: { en: 'Flavor', zh: '口味' }, value: { en: 'Herbal Mint', zh: '草本薄荷' } },
      { label: { en: 'Key Herbs', zh: '核心草本' }, value: { en: 'Tea Tree, Sage, Chamomile', zh: '茶树、鼠尾草、洋甘菊' } },
      { label: { en: 'Fluoride', zh: '含氟' }, value: { en: 'Optional (with/without)', zh: '可选（含氟/无氟）' } },
      { label: { en: 'Shelf Life', zh: '保质期' }, value: { en: '24 months', zh: '24个月' } },
      { label: { en: 'Certification', zh: '认证' }, value: { en: 'ISO 9001, GMP, Organic', zh: 'ISO 9001, GMP, 有机认证' } },
    ],
    packaging: [
      { label: { en: 'Standard Tube', zh: '标准管装' }, desc: { en: 'Green natural design', zh: '绿色自然设计' } },
      { label: { en: 'Custom Tube', zh: '定制管装' }, desc: { en: 'Eco-friendly packaging', zh: '环保包装' } },
      { label: { en: 'Glass Jar', zh: '玻璃罐装' }, desc: { en: 'Premium zero-waste option', zh: '高端零浪费选项' } },
    ],
    usage: {
      en: 'Brush twice daily for 2 minutes. The herbal formula may have a slightly different taste initially - most users adapt within a few days.',
      zh: '每日刷牙两次，每次2分钟。草本配方初期可能有不同口感，大多数用户几天内适应。',
    },
    faq: [
      { q: { en: 'What herbs are used?', zh: '使用了哪些草本？' }, a: { en: 'Tea tree oil, sage extract, chamomile, and peppermint.', zh: '茶树油、鼠尾草提取物、洋甘菊和薄荷。' } },
      { q: { en: 'Is it suitable for vegans?', zh: '适合素食者吗？' }, a: { en: 'Yes, 100% plant-based formula.', zh: '是的，100%植物基配方。' } },
    ],
    relatedSlugs: ['charcoal-tooth-powder', 'hydroxyapatite-toothpaste', 'mint-mouthwash'],
  },
  'charcoal-tooth-powder': {
    slug: 'charcoal-tooth-powder',
    features: [
      { icon: 'Sparkles', title: { en: 'Natural Whitening', zh: '天然亮白' }, desc: { en: 'Activated charcoal absorbs stains', zh: '活性炭吸附 stains' } },
      { icon: 'Leaf', title: { en: 'Detoxifying', zh: '排毒' }, desc: { en: 'Removes toxins and bacteria', zh: '去除毒素和细菌' } },
      { icon: 'Droplets', title: { en: 'pH Balancing', zh: 'pH平衡' }, desc: { en: 'Alkalizes oral environment', zh: '碱化口腔环境' } },
      { icon: 'Shield', title: { en: 'Fresh Breath', zh: '清新口气' }, desc: { en: 'Eliminates odor-causing bacteria', zh: '消除致臭细菌' } },
    ],
    specifications: [
      { label: { en: 'Net Weight', zh: '净含量' }, value: { en: '30g / 50g', zh: '30g / 50g' } },
      { label: { en: 'Flavor', zh: '口味' }, value: { en: 'Mint / Coconut', zh: '薄荷 / 椰子' } },
      { label: { en: 'Key Ingredient', zh: '核心成分' }, value: { en: 'Activated Bamboo Charcoal', zh: '活化竹炭' } },
      { label: { en: 'Fluoride', zh: '含氟' }, value: { en: 'Fluoride-free', zh: '无氟' } },
      { label: { en: 'Shelf Life', zh: '保质期' }, value: { en: '24 months', zh: '24个月' } },
      { label: { en: 'Certification', zh: '认证' }, value: { en: 'ISO 9001, GMP, Organic', zh: 'ISO 9001, GMP, 有机认证' } },
    ],
    packaging: [
      { label: { en: 'Glass Jar', zh: '玻璃罐装' }, desc: { en: 'Eco-friendly glass container', zh: '环保玻璃容器' } },
      { label: { en: 'Custom Jar', zh: '定制罐装' }, desc: { en: 'Your brand label', zh: '您的品牌标签' } },
      { label: { en: 'Refill Pouch', zh: '替换袋装' }, desc: { en: 'Zero-waste refill option', zh: '零浪费替换选项' } },
    ],
    usage: {
      en: 'Dip wet toothbrush into powder. Brush gently for 2 minutes. Use 2-3 times per week. Rinse thoroughly. Not recommended for daily use.',
      zh: '将湿牙刷蘸取粉末。轻柔刷牙2分钟。每周使用2-3次。彻底漱口。不建议每日使用。',
    },
    faq: [
      { q: { en: 'Will it make my teeth black?', zh: '会让牙齿变黑吗？' }, a: { en: 'No, it actually whitens. Rinse well after use.', zh: '不会，实际上会亮白。使用后彻底漱口。' } },
      { q: { en: 'How often to use?', zh: '多久使用一次？' }, a: { en: '2-3 times per week for best results.', zh: '每周2-3次效果最佳。' } },
    ],
    relatedSlugs: ['whitening-toothpaste', 'herbal-toothpaste', 'mint-mouthwash'],
  },
  'mint-mouthwash': {
    slug: 'mint-mouthwash',
    features: [
      { icon: 'Droplets', title: { en: 'Deep Clean', zh: '深层清洁' }, desc: { en: 'Reaches areas brushing misses', zh: '清洁刷牙无法到达的区域' } },
      { icon: 'Sparkles', title: { en: 'Fresh Breath', zh: '清新口气' }, desc: { en: '12-hour fresh breath protection', zh: '12小时清新口气保护' } },
      { icon: 'Shield', title: { en: 'Anti-bacterial', zh: '抗菌' }, desc: { en: 'Kills 99.9% of bacteria', zh: '杀灭99.9%细菌' } },
      { icon: 'Heart', title: { en: 'Gum Care', zh: '牙龈护理' }, desc: { en: 'Strengthens gum tissue', zh: '强化牙龈组织' } },
    ],
    specifications: [
      { label: { en: 'Volume', zh: '容量' }, value: { en: '250ml / 500ml', zh: '250ml / 500ml' } },
      { label: { en: 'Flavor', zh: '口味' }, value: { en: 'Cool Mint / Spearmint', zh: '清凉薄荷 / 绿薄荷' } },
      { label: { en: 'Alcohol', zh: '含酒精' }, value: { en: 'Alcohol-free option', zh: '可选无酒精' } },
      { label: { en: 'Fluoride', zh: '含氟' }, value: { en: '225ppm', zh: '225ppm' } },
      { label: { en: 'Shelf Life', zh: '保质期' }, value: { en: '24 months', zh: '24个月' } },
      { label: { en: 'Certification', zh: '认证' }, value: { en: 'ISO 9001, GMP, FDA', zh: 'ISO 9001, GMP, FDA' } },
    ],
    packaging: [
      { label: { en: 'Standard Bottle', zh: '标准瓶装' }, desc: { en: 'PET bottle with measuring cap', zh: 'PET瓶配量杯盖' } },
      { label: { en: 'Custom Bottle', zh: '定制瓶装' }, desc: { en: 'Your brand bottle design', zh: '您的品牌瓶设计' } },
      { label: { en: 'Travel Size', zh: '旅行装' }, desc: { en: '100ml portable size', zh: '100ml便携装' } },
    ],
    usage: {
      en: 'Rinse with 20ml for 30 seconds after brushing. Do not swallow. Do not use immediately after brushing with fluoride toothpaste - wait 30 minutes.',
      zh: '刷牙后用20ml漱口30秒。不要吞咽。使用含氟牙膏刷牙后不要立即使用，等待30分钟。',
    },
    faq: [
      { q: { en: 'Alcohol-free option?', zh: '有无酒精选项？' }, a: { en: 'Yes, we offer both alcohol and alcohol-free versions.', zh: '是的，我们提供含酒精和无酒精版本。' } },
      { q: { en: 'Can children use?', zh: '儿童可以使用吗？' }, a: { en: 'Recommended for ages 12+. Younger children should use kids formula.', zh: '建议12岁以上。更小的儿童应使用儿童配方。' } },
    ],
    relatedSlugs: ['hydroxyapatite-toothpaste', 'sensitive-relief-toothpaste', 'soft-bristle-toothbrush'],
  },
  'soft-bristle-toothbrush': {
    slug: 'soft-bristle-toothbrush',
    features: [
      { icon: 'Heart', title: { en: 'Ultra Soft', zh: '超软毛' }, desc: { en: 'Gentle on gums and enamel', zh: '对牙龈和牙釉质温和' } },
      { icon: 'Shield', title: { en: 'Effective Clean', zh: '有效清洁' }, desc: { en: 'Removes plaque effectively', zh: '有效去除牙菌斑' } },
      { icon: 'Leaf', title: { en: 'Eco Handle', zh: '环保手柄' }, desc: { en: 'Bamboo or recycled plastic', zh: '竹制或回收塑料' } },
      { icon: 'Sparkles', title: { en: 'Ergonomic Design', zh: '人体工学设计' }, desc: { en: 'Comfortable grip angle', zh: '舒适握持角度' } },
    ],
    specifications: [
      { label: { en: 'Bristle Type', zh: '刷毛类型' }, value: { en: 'Ultra-soft nylon', zh: '超软尼龙' } },
      { label: { en: 'Handle Material', zh: '手柄材质' }, value: { en: 'Bamboo / Recycled PP', zh: '竹制 / 回收PP' } },
      { label: { en: 'Head Size', zh: '刷头大小' }, value: { en: 'Compact / Standard', zh: '小号 / 标准' } },
      { label: { en: 'Colors', zh: '颜色' }, value: { en: 'Natural / Blue / Pink / Green', zh: '自然色 / 蓝 / 粉 / 绿' } },
      { label: { en: 'Shelf Life', zh: '保质期' }, value: { en: '36 months', zh: '36个月' } },
      { label: { en: 'Certification', zh: '认证' }, value: { en: 'ISO 9001, GMP, FSC', zh: 'ISO 9001, GMP, FSC' } },
    ],
    packaging: [
      { label: { en: 'Individual Wrap', zh: '单支包装' }, desc: { en: 'Hygienic sealed wrap', zh: '卫生密封包装' } },
      { label: { en: 'Family Pack', zh: '家庭装' }, desc: { en: '4-pack value set', zh: '4支装超值套装' } },
      { label: { en: 'Custom Pack', zh: '定制包装' }, desc: { en: 'Your brand packaging', zh: '您的品牌包装' } },
    ],
    usage: {
      en: 'Replace every 3 months or when bristles fray. Use gentle circular motions. Angle brush 45 degrees toward gumline. Do not press hard.',
      zh: '每3个月或刷毛磨损时更换。使用轻柔画圈动作。牙刷与牙龈线呈45度角。不要用力按压。',
    },
    faq: [
      { q: { en: 'How often to replace?', zh: '多久更换一次？' }, a: { en: 'Every 3 months, or sooner if bristles fray.', zh: '每3个月，或刷毛磨损时更早更换。' } },
      { q: { en: 'Bamboo or plastic handle?', zh: '竹制还是塑料手柄？' }, a: { en: 'Both available. Bamboo is eco-friendly, plastic is more durable.', zh: '都有。竹制环保，塑料更耐用。' } },
    ],
    relatedSlugs: ['kids-fluoride-toothpaste', 'hydroxyapatite-toothpaste', 'mint-mouthwash'],
  },
};
