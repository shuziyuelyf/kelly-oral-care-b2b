import type {
  Product, ProductCategory, Banner, News, CaseShow, Inquiry,
  CustomDemand, Customer, ContactMessage, Admin, Role, Permission,
  OperationLog, DashboardStats, ProductChannel
} from '../types';

// ==================== Categories ====================
export const mockCategories: ProductCategory[] = [
  {
    id: 'cat-1', parentId: null, sortOrder: 1,
    i18n: [
      { locale: 'en', name: 'Industrial Equipment', description: 'Professional industrial equipment and machinery' },
      { locale: 'zh-CN', name: '工业设备', description: '专业工业设备和机械' },
      { locale: 'zh-TW', name: '工業設備', description: '專業工業設備和機械' },
      { locale: 'ja', name: '産業機器', description: 'プロフェッショナル産業機器' },
      { locale: 'ko', name: '산업 장비', description: '전문 산업 장비 및 기계' },
      { locale: 'es', name: 'Equipos Industriales', description: 'Equipos y maquinaria industrial profesional' },
      { locale: 'ar', name: 'المعدات الصناعية', description: 'معدات وآلات صناعية احترافية' },
    ],
    children: [
      { id: 'cat-1-1', parentId: 'cat-1', sortOrder: 1, i18n: [
        { locale: 'en', name: 'CNC Machines', description: 'CNC machining centers and lathes' },
        { locale: 'zh-CN', name: '数控机床', description: '数控加工中心和车床' },
        { locale: 'zh-TW', name: '數控機床', description: '數控加工中心和車床' },
        { locale: 'ja', name: 'CNC工作機', description: 'CNC加工センター' },
        { locale: 'ko', name: 'CNC 공작기계', description: 'CNC 가공센터' },
        { locale: 'es', name: 'Máquinas CNC', description: 'Centros de mecanizado CNC' },
        { locale: 'ar', name: 'آلات CNC', description: 'مراكز التصنيع باستخدام الحاسب الآلي' },
      ]},
      { id: 'cat-1-2', parentId: 'cat-1', sortOrder: 2, i18n: [
        { locale: 'en', name: 'Hydraulic Systems', description: 'Hydraulic pumps and cylinders' },
        { locale: 'zh-CN', name: '液压系统', description: '液压泵和液压缸' },
        { locale: 'zh-TW', name: '液壓系統', description: '液壓泵和液壓缸' },
        { locale: 'ja', name: '油圧システム', description: '油圧ポンプとシリンダー' },
        { locale: 'ko', name: '유압 시스템', description: '유압 펌프 및 실린더' },
        { locale: 'es', name: 'Sistemas Hidráulicos', description: 'Bombas y cilindros hidráulicos' },
        { locale: 'ar', name: 'الأنظمة الهيدروليكية', description: 'مضخات واسطوانات هيدروليكية' },
      ]},
    ],
  },
  {
    id: 'cat-2', parentId: null, sortOrder: 2,
    i18n: [
      { locale: 'en', name: 'Electronic Components', description: 'High-quality electronic components' },
      { locale: 'zh-CN', name: '电子元器件', description: '高品质电子元器件' },
      { locale: 'zh-TW', name: '電子元器件', description: '高品質電子元器件' },
      { locale: 'ja', name: '電子部品', description: '高品質電子部品' },
      { locale: 'ko', name: '전자 부품', description: '고품질 전자 부품' },
      { locale: 'es', name: 'Componentes Electrónicos', description: 'Componentes electrónicos de alta calidad' },
      { locale: 'ar', name: 'المكونات الإلكترونية', description: 'مكونات إلكترونية عالية الجودة' },
    ],
    children: [
      { id: 'cat-2-1', parentId: 'cat-2', sortOrder: 1, i18n: [
        { locale: 'en', name: 'Semiconductors', description: 'ICs, transistors, diodes' },
        { locale: 'zh-CN', name: '半导体', description: '集成电路、晶体管、二极管' },
        { locale: 'zh-TW', name: '半導體', description: '集成電路、晶體管、二極管' },
        { locale: 'ja', name: '半導体', description: 'IC、トランジスタ、ダイオード' },
        { locale: 'ko', name: '반도체', description: 'IC, 트랜지스터, 다이오드' },
        { locale: 'es', name: 'Semiconductores', description: 'IC, transistores, diodos' },
        { locale: 'ar', name: 'أشباه الموصلات', description: 'دارات متكاملة، ترانزستورات' },
      ]},
      { id: 'cat-2-2', parentId: 'cat-2', sortOrder: 2, i18n: [
        { locale: 'en', name: 'Connectors', description: 'Industrial connectors and terminals' },
        { locale: 'zh-CN', name: '连接器', description: '工业连接器和端子' },
        { locale: 'zh-TW', name: '連接器', description: '工業連接器和端子' },
        { locale: 'ja', name: 'コネクタ', description: '産業用コネクタ' },
        { locale: 'ko', name: '커넥터', description: '산업용 커넥터' },
        { locale: 'es', name: 'Conectores', description: 'Conectores industriales' },
        { locale: 'ar', name: 'الموصلات', description: 'موصلات صناعية' },
      ]},
    ],
  },
  {
    id: 'cat-3', parentId: null, sortOrder: 3,
    i18n: [
      { locale: 'en', name: 'Raw Materials', description: 'Steel, aluminum, and specialty alloys' },
      { locale: 'zh-CN', name: '原材料', description: '钢材、铝材和特种合金' },
      { locale: 'zh-TW', name: '原材料', description: '鋼材、鋁材和特種合金' },
      { locale: 'ja', name: '原材料', description: '鋼材、アルミ、特殊合金' },
      { locale: 'ko', name: '원자재', description: '철강, 알루미늄, 특수 합금' },
      { locale: 'es', name: 'Materias Primas', description: 'Acero, aluminio y aleaciones' },
      { locale: 'ar', name: 'المواد الخام', description: 'فولاذ وألمنيوم وسبائك' },
    ],
    children: [],
  },
];

// ==================== Products ====================
export const mockProducts: Product[] = [
  {
    id: 'prod-1', categoryId: 'cat-1-1', modelNumber: 'CNC-5000X', status: 'active', sortOrder: 1,
    createdAt: '2024-01-15T08:00:00Z', updatedAt: '2024-06-20T10:30:00Z',
    i18n: [
      { locale: 'en', name: 'CNC Machining Center CNC-5000X', description: 'High-precision 5-axis CNC machining center with automatic tool changer. Suitable for complex part processing in aerospace, automotive, and mold industries.', shortDescription: '5-axis high-precision CNC machining center', keywords: 'CNC, machining center, 5-axis' },
      { locale: 'zh-CN', name: '数控加工中心 CNC-5000X', description: '高精度五轴数控加工中心，配备自动换刀系统。适用于航空航天、汽车和模具行业的复杂零件加工。', shortDescription: '五轴高精度数控加工中心', keywords: '数控, 加工中心, 五轴' },
      { locale: 'zh-TW', name: '數控加工中心 CNC-5000X', description: '高精度五軸數控加工中心，配備自動換刀系統。', shortDescription: '五軸高精度數控加工中心', keywords: '數控, 加工中心' },
      { locale: 'ja', name: 'CNC加工センター CNC-5000X', description: '高精度5軸CNC加工センター。自動工具交換装置付き。', shortDescription: '5軸高精度CNC加工センター', keywords: 'CNC, 加工センター' },
      { locale: 'ko', name: 'CNC 가공센터 CNC-5000X', description: '고정밀 5축 CNC 가공센터. 자동공구교환장치 탑재.', shortDescription: '5축 고정밀 CNC 가공센터', keywords: 'CNC, 가공센터' },
      { locale: 'es', name: 'Centro de Mecanizado CNC-5000X', description: 'Centro de mecanizado CNC de 5 ejes de alta precisión.', shortDescription: 'Centro de mecanizado CNC de 5 ejes', keywords: 'CNC, mecanizado' },
      { locale: 'ar', name: 'مركز التصنيع CNC-5000X', description: 'مركز تصنيع CNC بخمسة محاور عالي الدقة.', shortDescription: 'مركز تصنيع CNC خماسي المحاور', keywords: 'CNC, تصنيع' },
    ],
    skus: [
      { id: 'sku-1-1', productId: 'prod-1', skuCode: 'CNC-5000X-A', price: 125000, originalPrice: 150000, stock: 15, moq: 1, attributes: { 'Power': '15kW', 'Table Size': '500x400mm' } },
      { id: 'sku-1-2', productId: 'prod-1', skuCode: 'CNC-5000X-B', price: 168000, originalPrice: 198000, stock: 8, moq: 1, attributes: { 'Power': '22kW', 'Table Size': '630x500mm' } },
    ],
    images: [
      { id: 'img-1-1', productId: 'prod-1', url: '/products/cnc-5000x-1.jpg', sortOrder: 1, isPrimary: true },
      { id: 'img-1-2', productId: 'prod-1', url: '/products/cnc-5000x-2.jpg', sortOrder: 2, isPrimary: false },
      { id: 'img-1-3', productId: 'prod-1', url: '/products/cnc-5000x-3.jpg', sortOrder: 3, isPrimary: false },
    ],
    attributes: [
      { id: 'attr-1-1', productId: 'prod-1', name: 'Axes', value: '5', unit: 'axes' },
      { id: 'attr-1-2', productId: 'prod-1', name: 'Spindle Speed', value: '12000', unit: 'RPM' },
      { id: 'attr-1-3', productId: 'prod-1', name: 'Positioning Accuracy', value: '±0.005', unit: 'mm' },
      { id: 'attr-1-4', productId: 'prod-1', name: 'Weight', value: '8500', unit: 'kg' },
      { id: 'attr-1-5', productId: 'prod-1', name: 'Control System', value: 'Siemens 840D', unit: '' },
    ],
    channels: [
      { id: 'ch-1-1', productId: 'prod-1', type: 'online_store', shopName: 'Alibaba Store', url: 'https://example.alibaba.com', sortOrder: 1 },
      { id: 'ch-1-2', productId: 'prod-1', type: 'whatsapp', shopName: 'Sales WhatsApp', url: 'https://wa.me/8613800138000', sortOrder: 2 },
    ],
  },
  {
    id: 'prod-2', categoryId: 'cat-1-2', modelNumber: 'HYD-300T', status: 'active', sortOrder: 2,
    createdAt: '2024-02-10T08:00:00Z', updatedAt: '2024-06-18T14:00:00Z',
    i18n: [
      { locale: 'en', name: 'Hydraulic Press HYD-300T', description: '300-ton hydraulic press machine for metal forming, stamping, and deep drawing operations.', shortDescription: '300-ton hydraulic press machine', keywords: 'hydraulic press, metal forming' },
      { locale: 'zh-CN', name: '液压机 HYD-300T', description: '300吨液压机，用于金属成型、冲压和深拉伸加工。', shortDescription: '300吨液压机', keywords: '液压机, 金属成型' },
      { locale: 'zh-TW', name: '液壓機 HYD-300T', description: '300噸液壓機。', shortDescription: '300噸液壓機', keywords: '液壓機' },
      { locale: 'ja', name: '油圧プレス HYD-300T', description: '300トン油圧プレス機。', shortDescription: '300トン油圧プレス', keywords: '油圧プレス' },
      { locale: 'ko', name: '유압프레스 HYD-300T', description: '300톤 유압프레스.', shortDescription: '300톤 유압프레스', keywords: '유압프레스' },
      { locale: 'es', name: 'Prensa Hidráulica HYD-300T', description: 'Prensa hidráulica de 300 toneladas.', shortDescription: 'Prensa de 300 toneladas', keywords: 'prensa hidráulica' },
      { locale: 'ar', name: 'مكبس هيدروليكي HYD-300T', description: 'مكبس هيدروليكي 300 طن.', shortDescription: 'مكبس 300 طن', keywords: 'مكبس هيدروليكي' },
    ],
    skus: [
      { id: 'sku-2-1', productId: 'prod-2', skuCode: 'HYD-300T-S', price: 45000, originalPrice: 52000, stock: 20, moq: 1, attributes: { 'Force': '300T', 'Bed Size': '800x600mm' } },
      { id: 'sku-2-2', productId: 'prod-2', skuCode: 'HYD-300T-L', price: 62000, originalPrice: 72000, stock: 3, moq: 1, attributes: { 'Force': '300T', 'Bed Size': '1000x800mm' } },
    ],
    images: [
      { id: 'img-2-1', productId: 'prod-2', url: '/products/hyd-300t-1.jpg', sortOrder: 1, isPrimary: true },
      { id: 'img-2-2', productId: 'prod-2', url: '/products/hyd-300t-2.jpg', sortOrder: 2, isPrimary: false },
    ],
    attributes: [
      { id: 'attr-2-1', productId: 'prod-2', name: 'Max Force', value: '300', unit: 'T' },
      { id: 'attr-2-2', productId: 'prod-2', name: 'Stroke', value: '500', unit: 'mm' },
      { id: 'attr-2-3', productId: 'prod-2', name: 'Working Speed', value: '10-25', unit: 'mm/s' },
    ],
    channels: [
      { id: 'ch-2-1', productId: 'prod-2', type: 'online_store', shopName: 'Made-in-China', url: 'https://example.made-in-china.com', sortOrder: 1 },
      { id: 'ch-2-2', productId: 'prod-2', type: 'whatsapp', shopName: 'Sales', url: 'https://wa.me/8613800138001', sortOrder: 2 },
    ],
  },
  {
    id: 'prod-3', categoryId: 'cat-2-1', modelNumber: 'IC-STM32F4', status: 'active', sortOrder: 3,
    createdAt: '2024-03-05T08:00:00Z', updatedAt: '2024-06-15T09:00:00Z',
    i18n: [
      { locale: 'en', name: 'STM32F4 Series MCU', description: 'ARM Cortex-M4 based microcontroller with FPU, up to 1MB Flash, 192KB SRAM. Ideal for IoT, industrial control, and consumer electronics.', shortDescription: 'ARM Cortex-M4 MCU with FPU', keywords: 'STM32, MCU, ARM' },
      { locale: 'zh-CN', name: 'STM32F4系列微控制器', description: '基于ARM Cortex-M4内核的微控制器，带FPU，最高1MB Flash，192KB SRAM。', shortDescription: 'ARM Cortex-M4微控制器', keywords: 'STM32, 微控制器' },
      { locale: 'zh-TW', name: 'STM32F4系列微控制器', description: 'ARM Cortex-M4微控制器。', shortDescription: 'ARM Cortex-M4微控制器', keywords: 'STM32' },
      { locale: 'ja', name: 'STM32F4シリーズMCU', description: 'ARM Cortex-M4ベースのマイクロコントローラ。', shortDescription: 'ARM Cortex-M4 MCU', keywords: 'STM32, MCU' },
      { locale: 'ko', name: 'STM32F4 시리즈 MCU', description: 'ARM Cortex-M4 기반 마이크로컨트롤러.', shortDescription: 'ARM Cortex-M4 MCU', keywords: 'STM32' },
      { locale: 'es', name: 'MCU Serie STM32F4', description: 'Microcontrolador ARM Cortex-M4.', shortDescription: 'MCU ARM Cortex-M4', keywords: 'STM32' },
      { locale: 'ar', name: 'متحكم STM32F4', description: 'متحكم ARM Cortex-M4.', shortDescription: 'متحكم ARM Cortex-M4', keywords: 'STM32' },
    ],
    skus: [
      { id: 'sku-3-1', productId: 'prod-3', skuCode: 'STM32F407VG', price: 8.5, originalPrice: 12.0, stock: 50000, moq: 100, attributes: { 'Flash': '1MB', 'SRAM': '192KB', 'Package': 'LQFP-100' } },
      { id: 'sku-3-2', productId: 'prod-3', skuCode: 'STM32F407ZE', price: 9.2, originalPrice: 13.0, stock: 30000, moq: 100, attributes: { 'Flash': '512KB', 'SRAM': '192KB', 'Package': 'LQFP-144' } },
    ],
    images: [
      { id: 'img-3-1', productId: 'prod-3', url: '/products/stm32f4-1.jpg', sortOrder: 1, isPrimary: true },
    ],
    attributes: [
      { id: 'attr-3-1', productId: 'prod-3', name: 'Core', value: 'ARM Cortex-M4', unit: '' },
      { id: 'attr-3-2', productId: 'prod-3', name: 'Max Frequency', value: '168', unit: 'MHz' },
      { id: 'attr-3-3', productId: 'prod-3', name: 'Operating Voltage', value: '1.8-3.6', unit: 'V' },
    ],
    channels: [
      { id: 'ch-3-1', productId: 'prod-3', type: 'online_store', shopName: 'LCSC', url: 'https://www.lcsc.com', sortOrder: 1 },
      { id: 'ch-3-2', productId: 'prod-3', type: 'whatsapp', shopName: 'Sales', url: 'https://wa.me/8613800138002', sortOrder: 2 },
    ],
  },
  {
    id: 'prod-4', categoryId: 'cat-2-2', modelNumber: 'CONN-IP67', status: 'active', sortOrder: 4,
    createdAt: '2024-03-20T08:00:00Z', updatedAt: '2024-06-10T11:00:00Z',
    i18n: [
      { locale: 'en', name: 'IP67 Waterproof Industrial Connector', description: 'High-reliability IP67 rated industrial connector series. Available in 3-pin to 37-pin configurations.', shortDescription: 'IP67 waterproof industrial connector', keywords: 'connector, waterproof, IP67' },
      { locale: 'zh-CN', name: 'IP67防水工业连接器', description: '高可靠性IP67防护等级工业连接器系列，3芯至37芯可选。', shortDescription: 'IP67防水工业连接器', keywords: '连接器, 防水' },
      { locale: 'zh-TW', name: 'IP67防水工業連接器', description: 'IP67工業連接器。', shortDescription: 'IP67防水連接器', keywords: '連接器' },
      { locale: 'ja', name: 'IP67防水産業コネクタ', description: 'IP67防水産業コネクタシリーズ。', shortDescription: 'IP67防水コネクタ', keywords: 'コネクタ' },
      { locale: 'ko', name: 'IP67 방수 산업 커넥터', description: 'IP67 방수 산업 커넥터.', shortDescription: 'IP67 방수 커넥터', keywords: '커넥터' },
      { locale: 'es', name: 'Conector Industrial IP67', description: 'Conector industrial IP67.', shortDescription: 'Conector IP67', keywords: 'conector' },
      { locale: 'ar', name: 'موصل صناعي IP67', description: 'موصل صناعي مقاوم للماء.', shortDescription: 'موصل IP67', keywords: 'موصل' },
    ],
    skus: [
      { id: 'sku-4-1', productId: 'prod-4', skuCode: 'CONN-IP67-3P', price: 3.2, originalPrice: 4.5, stock: 100000, moq: 500, attributes: { 'Pins': '3', 'Rating': '16A' } },
      { id: 'sku-4-2', productId: 'prod-4', skuCode: 'CONN-IP67-8P', price: 5.8, originalPrice: 7.5, stock: 80000, moq: 500, attributes: { 'Pins': '8', 'Rating': '10A' } },
    ],
    images: [
      { id: 'img-4-1', productId: 'prod-4', url: '/products/conn-ip67-1.jpg', sortOrder: 1, isPrimary: true },
    ],
    attributes: [
      { id: 'attr-4-1', productId: 'prod-4', name: 'Protection', value: 'IP67', unit: '' },
      { id: 'attr-4-2', productId: 'prod-4', name: 'Temperature Range', value: '-40~+85', unit: '°C' },
    ],
    channels: [
      { id: 'ch-4-1', productId: 'prod-4', type: 'online_store', shopName: 'AliExpress', url: 'https://example.aliexpress.com', sortOrder: 1 },
    ],
  },
  {
    id: 'prod-5', categoryId: 'cat-3', modelNumber: 'STL-304S', status: 'active', sortOrder: 5,
    createdAt: '2024-04-01T08:00:00Z', updatedAt: '2024-06-05T15:00:00Z',
    i18n: [
      { locale: 'en', name: '304 Stainless Steel Sheet', description: 'Premium 304 stainless steel sheets, various thicknesses and finishes available. Suitable for food processing, chemical, and construction industries.', shortDescription: '304 stainless steel sheet', keywords: 'stainless steel, 304, sheet' },
      { locale: 'zh-CN', name: '304不锈钢板', description: '优质304不锈钢板，多种厚度和表面处理可选。', shortDescription: '304不锈钢板', keywords: '不锈钢, 304' },
      { locale: 'zh-TW', name: '304不鏽鋼板', description: '304不鏽鋼板。', shortDescription: '304不鏽鋼板', keywords: '不鏽鋼' },
      { locale: 'ja', name: '304ステンレス鋼板', description: '304ステンレス鋼板。', shortDescription: '304ステンレス鋼板', keywords: 'ステンレス' },
      { locale: 'ko', name: '304 스테인리스 강판', description: '304 스테인리스 강판.', shortDescription: '304 스테인리스 강판', keywords: '스테인리스' },
      { locale: 'es', name: 'Lámina de Acero Inoxidable 304', description: 'Lámina de acero inoxidable 304.', shortDescription: 'Acero inoxidable 304', keywords: 'acero inoxidable' },
      { locale: 'ar', name: 'صفحة فولاذ مقاوم 304', description: 'صفحة فولاذ مقاوم للصدأ 304.', shortDescription: 'فولاذ 304', keywords: 'فولاذ' },
    ],
    skus: [
      { id: 'sku-5-1', productId: 'prod-5', skuCode: 'STL-304-1MM', price: 2800, originalPrice: 3200, stock: 500, moq: 10, attributes: { 'Thickness': '1mm', 'Size': '1220x2440mm' } },
      { id: 'sku-5-2', productId: 'prod-5', skuCode: 'STL-304-2MM', price: 3500, originalPrice: 4000, stock: 0, moq: 10, attributes: { 'Thickness': '2mm', 'Size': '1220x2440mm' } },
    ],
    images: [
      { id: 'img-5-1', productId: 'prod-5', url: '/products/stl-304-1.jpg', sortOrder: 1, isPrimary: true },
    ],
    attributes: [
      { id: 'attr-5-1', productId: 'prod-5', name: 'Grade', value: '304', unit: '' },
      { id: 'attr-5-2', productId: 'prod-5', name: 'Surface', value: '2B/BA/No.4', unit: '' },
    ],
    channels: [],
  },
  {
    id: 'prod-6', categoryId: 'cat-1-1', modelNumber: 'LAT-200', status: 'active', sortOrder: 6,
    createdAt: '2024-04-15T08:00:00Z', updatedAt: '2024-05-28T09:00:00Z',
    i18n: [
      { locale: 'en', name: 'Precision Lathe LAT-200', description: 'High-precision CNC lathe for shaft and disc part processing.', shortDescription: 'Precision CNC lathe', keywords: 'lathe, CNC' },
      { locale: 'zh-CN', name: '精密车床 LAT-200', description: '高精度数控车床，用于轴类和盘类零件加工。', shortDescription: '高精度数控车床', keywords: '车床, 数控' },
      { locale: 'zh-TW', name: '精密車床 LAT-200', description: '精密車床。', shortDescription: '精密車床', keywords: '車床' },
      { locale: 'ja', name: '精密旋盤 LAT-200', description: '高精度CNC旋盤。', shortDescription: '高精度CNC旋盤', keywords: '旋盤' },
      { locale: 'ko', name: '정밀 선반 LAT-200', description: '고정밀 CNC 선반.', shortDescription: '고정밀 CNC 선반', keywords: '선반' },
      { locale: 'es', name: 'Torno de Precisión LAT-200', description: 'Torno CNC de alta precisión.', shortDescription: 'Torno CNC', keywords: 'torno' },
      { locale: 'ar', name: 'مخرطة دقيقة LAT-200', description: 'مخرطة CNC عالية الدقة.', shortDescription: 'مخرطة CNC', keywords: 'مخرطة' },
    ],
    skus: [
      { id: 'sku-6-1', productId: 'prod-6', skuCode: 'LAT-200-S', price: 38000, originalPrice: 45000, stock: 12, moq: 1, attributes: { 'Max Turning Dia': '200mm', 'Spindle': '6000RPM' } },
    ],
    images: [{ id: 'img-6-1', productId: 'prod-6', url: '/products/lat-200-1.jpg', sortOrder: 1, isPrimary: true }],
    attributes: [{ id: 'attr-6-1', productId: 'prod-6', name: 'Max Diameter', value: '200', unit: 'mm' }],
    channels: [{ id: 'ch-6-1', productId: 'prod-6', type: 'whatsapp', shopName: 'Sales', url: 'https://wa.me/8613800138003', sortOrder: 1 }],
  },
];

// ==================== Banners ====================
export const mockBanners: Banner[] = [
  {
    id: 'banner-1', sortOrder: 1, isActive: true, linkUrl: '/products',
    i18n: [
      { locale: 'en', title: 'Industrial Solutions', subtitle: 'Professional B2B supply chain services for global manufacturers', imageUrl: '/banners/banner-1.jpg', buttonText: 'Learn More' },
      { locale: 'zh-CN', title: '工业解决方案', subtitle: '面向全球制造商的专业B2B供应链服务', imageUrl: '/banners/banner-1.jpg', buttonText: '了解更多' },
      { locale: 'zh-TW', title: '工業解決方案', subtitle: '專業B2B供應鏈服務', imageUrl: '/banners/banner-1.jpg', buttonText: '了解更多' },
      { locale: 'ja', title: '産業ソリューション', subtitle: 'グローバルメーカー向けB2Bサービス', imageUrl: '/banners/banner-1.jpg', buttonText: '詳しく' },
      { locale: 'ko', title: '산업 솔루션', subtitle: '글로벌 제조업체를 위한 B2B 서비스', imageUrl: '/banners/banner-1.jpg', buttonText: '자세히' },
      { locale: 'es', title: 'Soluciones Industriales', subtitle: 'Servicios B2B para fabricantes globales', imageUrl: '/banners/banner-1.jpg', buttonText: 'Más Info' },
      { locale: 'ar', title: 'الحلول الصناعية', subtitle: 'خدمات B2B للمصنعين العالميين', imageUrl: '/banners/banner-1.jpg', buttonText: 'اعرف أكثر' },
    ],
  },
  {
    id: 'banner-2', sortOrder: 2, isActive: true, linkUrl: '/custom',
    i18n: [
      { locale: 'en', title: 'Custom Manufacturing', subtitle: 'OEM/ODM services from prototype to mass production', imageUrl: '/banners/banner-2.jpg', buttonText: 'Get Started' },
      { locale: 'zh-CN', title: '定制制造', subtitle: '从原型到量产的OEM/ODM服务', imageUrl: '/banners/banner-2.jpg', buttonText: '立即开始' },
      { locale: 'zh-TW', title: '客製製造', subtitle: 'OEM/ODM服務', imageUrl: '/banners/banner-2.jpg', buttonText: '開始' },
      { locale: 'ja', title: 'カスタム製造', subtitle: 'OEM/ODMサービス', imageUrl: '/banners/banner-2.jpg', buttonText: '開始' },
      { locale: 'ko', title: '맞춤 제조', subtitle: 'OEM/ODM 서비스', imageUrl: '/banners/banner-2.jpg', buttonText: '시작' },
      { locale: 'es', title: 'Fabricación Personalizada', subtitle: 'Servicios OEM/ODM', imageUrl: '/banners/banner-2.jpg', buttonText: 'Empezar' },
      { locale: 'ar', title: 'تصنيع مخصص', subtitle: 'خدمات OEM/ODM', imageUrl: '/banners/banner-2.jpg', buttonText: 'ابدأ' },
    ],
  },
  {
    id: 'banner-3', sortOrder: 3, isActive: true, linkUrl: '/about',
    i18n: [
      { locale: 'en', title: '20+ Years of Excellence', subtitle: 'Trusted by 500+ companies worldwide', imageUrl: '/banners/banner-3.jpg', buttonText: 'About Us' },
      { locale: 'zh-CN', title: '20余年卓越品质', subtitle: '全球500+企业信赖之选', imageUrl: '/banners/banner-3.jpg', buttonText: '了解我们' },
      { locale: 'zh-TW', title: '20餘年卓越品質', subtitle: '全球500+企業信賴之選', imageUrl: '/banners/banner-3.jpg', buttonText: '了解我們' },
      { locale: 'ja', title: '20年以上の卓越性', subtitle: '世界500+企業が信頼', imageUrl: '/banners/banner-3.jpg', buttonText: '私たちについて' },
      { locale: 'ko', title: '20년 이상의 우수성', subtitle: '500+ 기업이 신뢰', imageUrl: '/banners/banner-3.jpg', buttonText: '회사 소개' },
      { locale: 'es', title: '20+ Años de Excelencia', subtitle: '500+ empresas confían', imageUrl: '/banners/banner-3.jpg', buttonText: 'Nosotros' },
      { locale: 'ar', title: '+20 عاماً من التميز', subtitle: '500+ شركة تثق بنا', imageUrl: '/banners/banner-3.jpg', buttonText: 'من نحن' },
    ],
  },
];

// ==================== News ====================
export const mockNews: News[] = [
  {
    id: 'news-1', category: 'company', coverImage: '/news/news-1.jpg', isPublished: true, publishedAt: '2024-06-20T08:00:00Z', createdAt: '2024-06-18T10:00:00Z',
    i18n: [
      { locale: 'en', title: 'Company Wins National Quality Award 2024', summary: 'Our company has been awarded the National Quality Excellence Award for outstanding manufacturing standards.', content: '<p>We are proud to announce that our company has received the National Quality Excellence Award 2024. This recognition reflects our commitment to maintaining the highest manufacturing standards and continuous improvement in quality management.</p>' },
      { locale: 'zh-CN', title: '公司荣获2024年国家质量奖', summary: '我公司凭借卓越的制造标准荣获国家质量卓越奖。', content: '<p>我们很荣幸地宣布，公司荣获2024年国家质量卓越奖。这一荣誉体现了我们对最高制造标准和质量管理持续改进的承诺。</p>' },
      { locale: 'zh-TW', title: '公司榮獲2024年國家質量獎', summary: '我公司榮獲國家質量卓越獎。', content: '<p>公司榮獲2024年國家質量卓越獎。</p>' },
      { locale: 'ja', title: '2024年国家品質賞受賞', summary: '国家品質優秀賞を受賞しました。', content: '<p>2024年国家品質優秀賞を受賞しました。</p>' },
      { locale: 'ko', title: '2024년 국가품질상 수상', summary: '국가품질우수상 수상.', content: '<p>국가품질우수상을 수상했습니다.</p>' },
      { locale: 'es', title: 'Premio Nacional de Calidad 2024', summary: 'Premio a la excelencia en calidad.', content: '<p>Hemos recibido el Premio Nacional de Excelencia en Calidad 2024.</p>' },
      { locale: 'ar', title: 'جائزة الجودة الوطنية 2024', summary: 'حصلنا على جائزة التميز في الجودة.', content: '<p>حصلنا على جائزة التميز في الجودة الوطنية 2024.</p>' },
    ],
  },
  {
    id: 'news-2', category: 'exhibition', coverImage: '/news/news-2.jpg', isPublished: true, publishedAt: '2024-06-10T08:00:00Z', createdAt: '2024-06-08T10:00:00Z',
    i18n: [
      { locale: 'en', title: 'Visiting Us at Hannover Messe 2024', summary: 'Join us at Booth A23, Hall 5 at Hannover Messe from April 22-26.', content: '<p>We invite you to visit our booth at Hannover Messe 2024. Our team will showcase our latest CNC machining centers and hydraulic systems.</p>' },
      { locale: 'zh-CN', title: '诚邀莅临2024汉诺威工业展', summary: '欢迎莅临5号馆A23展位参观指导。', content: '<p>诚邀您莅临2024汉诺威工业博览会参观。我们的团队将展示最新的数控加工中心和液压系统。</p>' },
      { locale: 'zh-TW', title: '誠邀蒞臨2024漢諾威工業展', summary: '歡迎蒞臨參觀。', content: '<p>歡迎蒞臨2024漢諾威工業博覽會。</p>' },
      { locale: 'ja', title: 'ハノーバーメッセ2024出展', summary: 'ホール5、ブースA23にお越しください。', content: '<p>ハノーバーメッセ2024に出展します。</p>' },
      { locale: 'ko', title: '하노버메세 2024 참가', summary: '홀 5, 부스 A23에서 만나보세요.', content: '<p>하노버메세 2024에 참가합니다.</p>' },
      { locale: 'es', title: 'Visítenos en Hannover Messe 2024', summary: 'Stand A23, Pabellón 5.', content: '<p>Le invitamos a visitarnos en Hannover Messe 2024.</p>' },
      { locale: 'ar', title: 'زورونا في هانوفر ميسه 2024', summary: 'جناح A23، قاعة 5.', content: '<p>ندعوكم لزيارتنا في هانوفر ميسه 2024.</p>' },
    ],
  },
  {
    id: 'news-3', category: 'industry', coverImage: '/news/news-3.jpg', isPublished: true, publishedAt: '2024-05-28T08:00:00Z', createdAt: '2024-05-25T10:00:00Z',
    i18n: [
      { locale: 'en', title: 'Industry Trends: Smart Manufacturing in 2024', summary: 'Analysis of key trends shaping the future of smart manufacturing and Industry 4.0.', content: '<p>The manufacturing industry is undergoing a digital transformation. Key trends include AI-driven quality control, digital twins, and connected supply chains.</p>' },
      { locale: 'zh-CN', title: '行业趋势：2024年智能制造', summary: '分析塑造智能制造和工业4.0未来的关键趋势。', content: '<p>制造业正在经历数字化转型。关键趋势包括AI驱动的质量控制、数字孪生和互联供应链。</p>' },
      { locale: 'zh-TW', title: '行業趨勢：2024年智能制造', summary: '智能制造趨勢分析。', content: '<p>智能制造趨勢分析。</p>' },
      { locale: 'ja', title: '業界トレンド：2024年スマート製造', summary: 'スマート製造のトレンド分析。', content: '<p>スマート製造のトレンド分析。</p>' },
      { locale: 'ko', title: '산업 동향: 2024 스마트 제조', summary: '스마트 제조 동향 분석.', content: '<p>스마트 제조 동향 분석.</p>' },
      { locale: 'es', title: 'Tendencias: Fabricación Inteligente 2024', summary: 'Análisis de tendencias.', content: '<p>Análisis de tendencias de fabricación inteligente.</p>' },
      { locale: 'ar', title: 'اتجاهات: التصنيع الذكي 2024', summary: 'تحليل الاتجاهات.', content: '<p>تحليل اتجاهات التصنيع الذكي.</p>' },
    ],
  },
  {
    id: 'news-4', category: 'company', coverImage: '/news/news-4.jpg', isPublished: true, publishedAt: '2024-05-15T08:00:00Z', createdAt: '2024-05-12T10:00:00Z',
    i18n: [
      { locale: 'en', title: 'New Production Line Successfully Commissioned', summary: 'Our new automated production line has been successfully commissioned, increasing capacity by 40%.', content: '<p>We are pleased to announce the successful commissioning of our new automated production line, which increases our production capacity by 40%.</p>' },
      { locale: 'zh-CN', title: '新自动化产线成功投产', summary: '新自动化产线成功投产，产能提升40%。', content: '<p>我们很高兴地宣布，新自动化产线已成功投产，产能提升40%。</p>' },
      { locale: 'zh-TW', title: '新自動化產線成功投產', summary: '產能提升40%。', content: '<p>新產線投產。</p>' },
      { locale: 'ja', title: '新生産ライン稼働', summary: '生産能力40%向上。', content: '<p>新生産ラインが稼働しました。</p>' },
      { locale: 'ko', title: '신생산라인 가동', summary: '생산능력 40% 향상.', content: '<p>신생산라인이 가동되었습니다.</p>' },
      { locale: 'es', title: 'Nueva Línea de Producción', summary: 'Capacidad aumentada 40%.', content: '<p>Nueva línea de producción automatizada.</p>' },
      { locale: 'ar', title: 'خط إنتاج جديد', summary: 'زيادة الطاقة 40%.', content: '<p>تم تشغيل خط الإنتاج الجديد.</p>' },
    ],
  },
];

// ==================== Case Shows ====================
export const mockCaseShows: CaseShow[] = [
  {
    id: 'case-1', coverImage: '/cases/case-1.jpg', sortOrder: 1,
    i18n: [
      { locale: 'en', title: 'Aerospace Parts Manufacturing', description: 'Precision CNC machining for aerospace components with ±0.005mm tolerance.', clientName: 'Global Aerospace Corp.', solution: '5-axis CNC machining with custom fixturing' },
      { locale: 'zh-CN', title: '航空零部件制造', description: '航空航天零部件精密数控加工，公差±0.005mm。', clientName: '全球航空集团', solution: '五轴数控加工+定制夹具方案' },
      { locale: 'zh-TW', title: '航空零部件製造', description: '航空零部件精密加工。', clientName: '全球航空集團', solution: '五軸加工方案' },
      { locale: 'ja', title: '航空部品製造', description: '航空部品精密加工。', clientName: 'グローバル航空', solution: '5軸加工' },
      { locale: 'ko', title: '항공 부품 제조', description: '항공 부품 정밀 가공.', clientName: '글로벌 항공', solution: '5축 가공' },
      { locale: 'es', title: 'Fabricación de Piezas Aeroespaciales', description: 'Mecanizado de precisión.', clientName: 'Aeroespacial Global', solution: 'CNC 5 ejes' },
      { locale: 'ar', title: 'تصنيع قطع غيار جوية', description: 'تصنيع دقيق.', clientName: 'الطيران العالمي', solution: 'CNC خماسي' },
    ],
  },
  {
    id: 'case-2', coverImage: '/cases/case-2.jpg', sortOrder: 2,
    i18n: [
      { locale: 'en', title: 'Automotive Mold Development', description: 'Complete mold design and manufacturing for automotive interior components.', clientName: 'AutoTech Industries', solution: 'Full mold lifecycle from design to production' },
      { locale: 'zh-CN', title: '汽车模具开发', description: '汽车内饰件全套模具设计与制造。', clientName: '汽车科技集团', solution: '模具全生命周期服务' },
      { locale: 'zh-TW', title: '汽車模具開發', description: '汽車模具設計製造。', clientName: '汽車科技', solution: '模具服務' },
      { locale: 'ja', title: '自動車金型開発', description: '自動車金型設計製造。', clientName: 'オートテック', solution: '金型ライフサイクル' },
      { locale: 'ko', title: '자동차 금형 개발', description: '자동차 금형 설계 제조.', clientName: '오토텍', solution: '금형 서비스' },
      { locale: 'es', title: 'Desarrollo de Moldes Automotrices', description: 'Diseño y fabricación de moldes.', clientName: 'AutoTech', solution: 'Ciclo completo' },
      { locale: 'ar', title: 'تطوير قوالب سيارات', description: 'تصميم وتصنيع قوالب.', clientName: 'أوتو تك', solution: 'دورة كاملة' },
    ],
  },
  {
    id: 'case-3', coverImage: '/cases/case-3.jpg', sortOrder: 3,
    i18n: [
      { locale: 'en', title: 'IoT Device Assembly', description: 'PCB assembly and testing for smart IoT devices with 100K+ units delivered.', clientName: 'SmartHome Solutions', solution: 'SMT + through-hole assembly + functional testing' },
      { locale: 'zh-CN', title: 'IoT设备组装', description: '智能IoT设备PCB组装与测试，已交付10万+台。', clientName: '智能家居方案商', solution: 'SMT+通孔+功能测试' },
      { locale: 'zh-TW', title: 'IoT設備組裝', description: 'IoT設備PCB組裝。', clientName: '智能家居', solution: 'SMT組裝' },
      { locale: 'ja', title: 'IoTデバイス組立', description: 'IoTデバイスPCB組立。', clientName: 'スマートホーム', solution: 'SMT組立' },
      { locale: 'ko', title: 'IoT 기기 조립', description: 'IoT 기기 PCB 조립.', clientName: '스마트홈', solution: 'SMT 조립' },
      { locale: 'es', title: 'Ensamblaje IoT', description: 'Ensamblaje PCB IoT.', clientName: 'SmartHome', solution: 'SMT' },
      { locale: 'ar', title: 'تجميع IoT', description: 'تجميع PCB.', clientName: 'المنزل الذكي', solution: 'SMT' },
    ],
  },
];

// ==================== Inquiries ====================
export const mockInquiries: Inquiry[] = [
  {
    id: 'inq-1', customerId: null, contactName: 'John Smith', contactEmail: 'john@example.com', contactPhone: '+1-555-0100', companyName: 'Smith Industries',
    status: 'pending', totalAmount: 0, remark: 'Need bulk pricing for CNC machines', createdAt: '2024-06-20T10:00:00Z', updatedAt: '2024-06-20T10:00:00Z',
    items: [
      { id: 'inq-item-1', inquiryId: 'inq-1', productId: 'prod-1', quantity: 5, unitPrice: 0, remark: 'CNC-5000X-A model' },
    ],
  },
  {
    id: 'inq-2', customerId: null, contactName: 'Maria Garcia', contactEmail: 'maria@example.com', contactPhone: '+34-555-0200', companyName: 'Garcia Manufacturing',
    status: 'quoted', totalAmount: 225000, remark: 'Confirmed order for hydraulic presses', createdAt: '2024-06-18T14:00:00Z', updatedAt: '2024-06-19T09:00:00Z',
    items: [
      { id: 'inq-item-2', inquiryId: 'inq-2', productId: 'prod-2', quantity: 5, unitPrice: 45000, remark: 'HYD-300T-S model' },
    ],
  },
  {
    id: 'inq-3', customerId: null, contactName: 'Yuki Tanaka', contactEmail: 'yuki@example.jp', contactPhone: '+81-555-0300', companyName: 'Tanaka Electronics',
    status: 'confirmed', totalAmount: 85000, remark: 'Order confirmed for STM32 MCUs', createdAt: '2024-06-15T08:00:00Z', updatedAt: '2024-06-17T11:00:00Z',
    items: [
      { id: 'inq-item-3', inquiryId: 'inq-3', productId: 'prod-3', quantity: 10000, unitPrice: 8.5, remark: 'STM32F407VG' },
    ],
  },
];

// ==================== Custom Demands ====================
export const mockCustomDemands: CustomDemand[] = [
  {
    id: 'cd-1', customerId: null, contactName: 'Ahmed Hassan', contactEmail: 'ahmed@example.com', contactPhone: '+971-555-0400', companyName: 'Hassan Engineering',
    material: 'Aluminum 6061-T6', dimensions: '500x300x50mm', quantity: 200, craft: 'CNC Machining + Anodizing',
    description: 'Custom aluminum heat sink with specific fin geometry and mounting holes per attached drawing.', attachments: [], status: 'processing', createdAt: '2024-06-19T09:00:00Z', updatedAt: '2024-06-20T08:00:00Z',
  },
  {
    id: 'cd-2', customerId: null, contactName: 'Li Wei', contactEmail: 'liwei@example.cn', contactPhone: '+86-138-0000-0001', companyName: 'Shenzhen Tech Co.',
    material: 'FR-4 PCB', dimensions: '100x80mm, 4-layer', quantity: 5000, craft: 'PCB Fabrication + SMT Assembly',
    description: 'Custom PCB with specific component placement and testing requirements.', attachments: [], status: 'quoted', createdAt: '2024-06-17T14:00:00Z', updatedAt: '2024-06-19T16:00:00Z',
  },
];

// ==================== Customers ====================
export const mockCustomers: Customer[] = [
  { id: 'cust-1', companyName: 'Smith Industries Ltd.', creditCode: '91110000MA001', contactPerson: 'John Smith', contactPhone: '+1-555-0100', contactEmail: 'john@smith.com', username: 'smith', status: 'approved', group: 'VIP', createdAt: '2024-01-10T08:00:00Z', updatedAt: '2024-06-01T10:00:00Z' },
  { id: 'cust-2', companyName: 'Garcia Manufacturing SA', creditCode: 'ES-B12345678', contactPerson: 'Maria Garcia', contactPhone: '+34-555-0200', contactEmail: 'maria@garcia.com', username: 'garcia', status: 'approved', group: 'Standard', createdAt: '2024-02-15T08:00:00Z', updatedAt: '2024-05-20T10:00:00Z' },
  { id: 'cust-3', companyName: 'Tanaka Electronics Co.', creditCode: 'JP-T987654321', contactPerson: 'Yuki Tanaka', contactPhone: '+81-555-0300', contactEmail: 'yuki@tanaka.jp', username: 'tanaka', status: 'pending', group: '', createdAt: '2024-06-18T08:00:00Z', updatedAt: '2024-06-18T08:00:00Z' },
  { id: 'cust-4', companyName: 'Hassan Engineering LLC', creditCode: 'AE-1234567890', contactPerson: 'Ahmed Hassan', contactPhone: '+971-555-0400', contactEmail: 'ahmed@hassan.ae', username: 'hassan', status: 'pending', group: '', createdAt: '2024-06-19T08:00:00Z', updatedAt: '2024-06-19T08:00:00Z' },
];

// ==================== Contact Messages ====================
export const mockContactMessages: ContactMessage[] = [
  { id: 'msg-1', name: 'Peter Johnson', email: 'peter@example.com', company: 'Johnson Corp', subject: 'Product Inquiry', message: 'Interested in your CNC machines.', createdAt: '2024-06-20T10:00:00Z', isRead: false },
  { id: 'msg-2', name: 'Anna Mueller', email: 'anna@example.de', company: 'Mueller GmbH', subject: 'Partnership', message: 'Would like to discuss distribution partnership.', createdAt: '2024-06-19T14:00:00Z', isRead: true },
];

// ==================== Admin / RBAC ====================
export const mockAdmins: Admin[] = [
  { id: 'admin-1', username: 'superadmin', name: 'System Admin', email: 'admin@company.com', roleId: 'role-1', status: 'active', lastLoginAt: '2024-06-20T09:00:00Z', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'admin-2', username: 'product_mgr', name: 'Product Manager', email: 'pm@company.com', roleId: 'role-2', status: 'active', lastLoginAt: '2024-06-20T08:30:00Z', createdAt: '2024-02-01T00:00:00Z' },
];

export const mockRoles: Role[] = [
  { id: 'role-1', name: 'Super Admin', description: 'Full system access', permissions: ['*'], createdAt: '2024-01-01T00:00:00Z' },
  { id: 'role-2', name: 'Product Manager', description: 'Product and content management', permissions: ['products:*', 'content:*', 'inquiries:view'], createdAt: '2024-01-01T00:00:00Z' },
  { id: 'role-3', name: 'Sales', description: 'Inquiry and customer management', permissions: ['inquiries:*', 'customers:view'], createdAt: '2024-01-01T00:00:00Z' },
];

export const mockPermissions: Permission[] = [
  { id: 'perm-1', name: 'View Products', code: 'products:view', module: 'products', description: 'View product list and details' },
  { id: 'perm-2', name: 'Manage Products', code: 'products:manage', module: 'products', description: 'Create, edit, delete products' },
  { id: 'perm-3', name: 'View Inquiries', code: 'inquiries:view', module: 'inquiries', description: 'View inquiry list' },
  { id: 'perm-4', name: 'Manage Inquiries', code: 'inquiries:manage', module: 'inquiries', description: 'Process and respond to inquiries' },
  { id: 'perm-5', name: 'View Customers', code: 'customers:view', module: 'customers', description: 'View customer list' },
  { id: 'perm-6', name: 'Manage Customers', code: 'customers:manage', module: 'customers', description: 'Approve/reject customers' },
  { id: 'perm-7', name: 'Manage Content', code: 'content:manage', module: 'content', description: 'Manage news, banners, cases' },
  { id: 'perm-8', name: 'System Settings', code: 'settings:manage', module: 'settings', description: 'Manage system settings' },
];

export const mockOperationLogs: OperationLog[] = [
  { id: 'log-1', adminId: 'admin-1', adminName: 'System Admin', action: 'Login', module: 'auth', detail: 'Admin logged in', ip: '192.168.1.100', createdAt: '2024-06-20T09:00:00Z' },
  { id: 'log-2', adminId: 'admin-2', adminName: 'Product Manager', action: 'Create Product', module: 'products', detail: 'Created product CNC-5000X', ip: '192.168.1.101', createdAt: '2024-06-20T08:30:00Z' },
  { id: 'log-3', adminId: 'admin-1', adminName: 'System Admin', action: 'Approve Customer', module: 'customers', detail: 'Approved customer: Smith Industries', ip: '192.168.1.100', createdAt: '2024-06-19T16:00:00Z' },
];

// ==================== Dashboard ====================
export const mockDashboardStats: DashboardStats = {
  totalProducts: mockProducts.length,
  totalInquiries: mockInquiries.length,
  totalCustomers: mockCustomers.length,
  pendingReviews: mockCustomers.filter(c => c.status === 'pending').length,
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
};

// ==================== Partners ====================
export const mockPartners = [
  { id: 'p1', name: 'Siemens', logo: '/partners/siemens.svg' },
  { id: 'p2', name: 'ABB', logo: '/partners/abb.svg' },
  { id: 'p3', name: 'Schneider Electric', logo: '/partners/schneider.svg' },
  { id: 'p4', name: 'Bosch', logo: '/partners/bosch.svg' },
  { id: 'p5', name: 'Mitsubishi', logo: '/partners/mitsubishi.svg' },
  { id: 'p6', name: 'Fanuc', logo: '/partners/fanuc.svg' },
];

// ==================== Timeline ====================
export const mockTimeline = [
  { year: '2003', i18n: { en: 'Company founded in Shenzhen', 'zh-CN': '公司在深圳成立', 'zh-TW': '公司在深圳成立', ja: '深圳で会社設立', ko: '선전 회사 설립', es: 'Fundada en Shenzhen', ar: 'تأسست في شنتشن' } },
  { year: '2008', i18n: { en: 'First export order, entering Southeast Asian market', 'zh-CN': '首个出口订单，进入东南亚市场', 'zh-TW': '首個出口訂單', ja: '初の輸出注文', ko: '첫 수출 주문', es: 'Primer pedido de exportación', ar: 'أول طلب تصدير' } },
  { year: '2012', i18n: { en: 'ISO 9001 certified, expanded to European market', 'zh-CN': '通过ISO 9001认证，拓展欧洲市场', 'zh-TW': '通過ISO 9001認證', ja: 'ISO 9001認証取得', ko: 'ISO 9001 인증', es: 'Certificación ISO 9001', ar: 'شهادة ISO 9001' } },
  { year: '2016', i18n: { en: 'New factory opened, 50,000 sqm production base', 'zh-CN': '新工厂开业，50,000平方米生产基地', 'zh-TW': '新工廠開業', ja: '新工場オープン', ko: '신공장 오픈', es: 'Nueva fábrica abierta', ar: 'مصنع جديد' } },
  { year: '2020', i18n: { en: 'Launched smart manufacturing initiative', 'zh-CN': '启动智能制造计划', 'zh-TW': '啟動智能制造計劃', ja: 'スマート製造開始', ko: '스마트 제조 시작', es: 'Inicio de fabricación inteligente', ar: 'بدء التصنيع الذكي' } },
  { year: '2024', i18n: { en: 'Serving 500+ clients in 50+ countries', 'zh-CN': '服务50+国家500+客户', 'zh-TW': '服務50+國家500+客戶', ja: '50カ国500+顧客', ko: '50개국 500+ 고객', es: '500+ clientes en 50+ países', ar: '500+ عميل في 50+ دولة' } },
];

// ==================== Certifications ====================
export const mockCertifications = [
  { id: 'cert-1', name: 'ISO 9001:2015', image: '/certs/iso9001.jpg' },
  { id: 'cert-2', name: 'ISO 14001:2015', image: '/certs/iso14001.jpg' },
  { id: 'cert-3', name: 'CE Certification', image: '/certs/ce.jpg' },
  { id: 'cert-4', name: 'SGS Verified', image: '/certs/sgs.jpg' },
];
