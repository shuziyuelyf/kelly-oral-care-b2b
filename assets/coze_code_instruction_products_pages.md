# 现货产品页面制作（Products 列表页 + Product Detail 详情页）

## 概述
首页"现货产品"卡片 CTA "浏览产品 →" 点击后进入 `/products` 产品列表页。点击单个产品进入 `/products/[slug]` 产品详情页。这是三类买家中"现货采购商"的核心路径。

## 一、Products 列表页（/products）

### 1. 页面顶部 Hero 区（紧凑，不是全屏 Banner）
- 背景：海军蓝渐变 `linear-gradient(135deg, #0F2A4A, #173A63)`
- 左侧白色文字：
  - 面包屑：Home / Products（小字白色70%透明）
  - 标题："Ready Products"（大号粗体）
  - 副标题："Browse our in-stock oral care products. Available for immediate wholesale with sample support."（中号）
- 高度约 240-280px（桌面）/ 180-200px（移动），不是全屏
- 右侧可放一张半透明产品装饰图（可选）

### 2. 筛选栏
- 左侧：分类筛选 tabs（All / Toothpaste / Toothbrush / Mouthwash / Dental Floss / Teeth Whitening / Other），横向排列可滚动
- 右侧：搜索框（已有，保持响应式）
- 分类为前端筛选（基于已有产品数据的 category 字段），不需要后端
- 当前选中分类用 Action Blue #008FD5 下划线或背景高亮

### 3. 产品网格
- 保持当前 1/2/3/4 列响应式网格（移动1列/平板2列/桌面3-4列）
- 每个产品卡片包含：
  - 产品图片（1:1 aspect-ratio, object-fit:cover, lazy load）
  - 产品名称（粗体，1行截断）
  - 简短卖点/benefit（小字灰色，2行截断）
  - 规格标签（如 "100g" / "Pack of 12"，小标签样式）
  - 供货状态标签：In Stock（绿色小标签）
  - 两个按钮：
    - "View Details"（次要按钮，海军蓝描边，点击进入详情页）
    - "Get Price"（主按钮，Action Blue 实心，弹出询价表单或跳转）
  - 卡片 hover 效果：轻微上浮 + shadow-md
- 卡片整体可点击（除按钮区域外）进入详情页
- 使用已有 8 款口腔护理产品数据

### 4. 底部 CTA 区
- 标题："Can't find what you're looking for?"
- 副标题："We offer private label and OEM/ODM services for custom requirements."
- 两个按钮："Explore Private Label"（链接到 /private-label）+ "OEM/ODM Service"（链接到 /oem-odm）
- 背景：Soft Blue #EAF7FD

### 5. 响应式
- 移动端：筛选分类横向可滚动，产品1列，按钮全宽
- 平板：2列
- 桌面：3-4列
- 产品图片统一 1:1

## 二、Product Detail 产品详情页（/products/[slug]）

### 1. 面包屑导航
- Home / Products / [Product Name]
- 点击 Products 返回列表页

### 2. 顶部产品信息区（桌面左右两栏）
**左侧：产品图片画廊（40%）**
- 主图大图（1:1 或 4:3）
- 下方缩略图行（4张：主图/包装/细节/使用场景），点击切换主图
- 缩略图用 1:1 小图，当前选中有蓝色边框
- 使用 Unsplash 口腔护理相关测试图片

**右侧：产品信息（60%）**
- 产品名称（h1，大号粗体海军蓝）
- 简短卖点/benefit（中号灰色）
- 标签行：In Stock（绿色标签）、MOQ 信息、规格
- 核心规格快速预览（用图标+文字横向排列）：
  - Net Content: 100g
  - Flavor: Mint
  - Packaging: Tube + Box
  - Shelf Life: 3 years
- 两个主 CTA 按钮（上下或并排）：
  - "Request Sample"（Action Blue #008FD5 实心，大按钮）
  - "Get Wholesale Price"（海军蓝 #173A63 描边按钮，大按钮）
- WhatsApp 快捷联系按钮（绿色 #21C96B，小按钮或图标按钮）
- 供货说明文字："Ships within 3-7 business days. Sample available."

### 3. Key Features / Benefits
- 标题 "Key Features"
- 4-6 个卖点，每个用图标 + 标题 + 简短说明
- 卡片网格排列（桌面2-3列，移动1列）

### 4. Specification Table
- 标题 "Specifications"
- 表格两列：Attribute | Value
- 包含：Product Type, Net Content, Flavor, Ingredients Key, Tube Material, Cap Type, Box Material, Carton Qty, MOQ, Shelf Life, Storage, Certification
- 表格用斑马纹，海军蓝表头白色文字

### 5. Packaging & Available Options
- 标题 "Packaging & Options"
- 展示不同包装选项（如单支装/12支盒装/48支箱装）
- 每个选项用小卡片：图片 + 名称 + 规格
- 横向滚动或网格

### 6. Usage & Storage
- 标题 "Usage & Storage"
- 左右两栏：Usage 说明 + Storage 说明
- 简洁文字

### 7. Related Products
- 标题 "Related Products"
- 同分类下其他 3-4 个产品卡片
- 横向滚动或网格
- 每个卡片：图片 + 名称 + "View Details"链接

### 8. FAQ
- 标题 "FAQ"
- 3-5 个常见问题，折叠面板（accordion）
- 如：What is the MOQ? Can I get a sample? How long is shipping? Do you offer private label for this product?

### 9. Final CTA
- 海军蓝背景横幅
- 白色大标题 "Ready to Order?"
- 副标题 "Contact us for wholesale pricing and sample requests."
- 按钮："Request Sample" + "WhatsApp"

### 10. 移动端布局
- 图片画廊在顶部，缩略图横向滚动
- 产品信息在图片下方
- CTA 按钮全宽堆叠
- 规格表格横向滚动
- 所有区块单列排列

## 三、技术要求

1. 路由：`/products` 列表页 + `/products/[slug]` 动态详情页
2. 数据：使用静态产品数据（已有 8 款产品），每个产品补充完整字段（slug, features[], specifications{}, packaging[], faq[]）
3. 图片：使用 Unsplash 高质量口腔护理图片作为测试图，object-fit:cover
4. i18n：所有文字必须支持 7 种语言（zh-CN, zh-TW, en, ja, ko, es, ar），至少英文和中文必须有完整翻译，其他语言可使用英文占位但 key 必须存在
5. RTL：阿拉伯语页面布局自动翻转
6. SEO：详情页有独立 title、meta description、canonical、Product schema、Breadcrumb schema
7. 导航：首页"现货产品"卡片 CTA 链接到 `/products`；Products 页面导航栏 Products 项高亮
8. 样式：复用现有配色系统（Navy #173A63, Action Blue #008FD5, Soft Blue #EAF7FD, Warm White #F7F4EF, WhatsApp Green #21C96B）
9. 组件：使用 shadcn/ui 组件（Button, Badge, Tabs, Accordion, Table）
10. 响应式：移动端导航栏静态白色不悬浮（与当前修复一致），PC端悬浮透明

## 四、产品数据要求

每款产品需要以下完整数据结构：
```
{
  slug: string,
  name: string,
  benefit: string,
  category: string,
  images: { main: string, thumbnails: string[] },
  inStock: boolean,
  moq: string,
  specs: { netContent, flavor, packaging, shelfLife, ... },
  features: [{ icon, title, description }],
  specifications: [{ attribute, value }],
  packagingOptions: [{ image, name, spec }],
  usage: string,
  storage: string,
  faqs: [{ question, answer }],
  relatedProducts: slug[]
}
```

8款产品包括（与当前Products页面一致）：
1. Hydroxyapatite Toothpaste (sliding/repair)
2. Activated Charcoal Toothpaste (whitening)
3. Probiotic Toothpaste (oral health)
4. Kids Fluoride-Free Toothpaste (children)
5. Sensitive Relief Toothpaste
6. Bamboo Toothbrush (eco-friendly)
7. Teeth Whitening Strips
8. Mouthwash Tablets

## 验证要求
- `pnpm ts-check` 通过
- `pnpm lint` 通过
- 首页"浏览产品 →"链接可跳转到 /products
- Products 页面分类筛选可用
- 点击产品卡片可进入 /products/[slug] 详情页
- 详情页所有区块正常显示
- 移动端和PC端响应式正常
- 7语言不裸露i18n key
