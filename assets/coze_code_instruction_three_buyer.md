# Kelly Oral Care 三类买家分流改版指令

基于《Three Buyer Homepage & Conversion Design v1.0》和《Complete Project Specification v1.0》，对当前项目进行以下结构性改版。请逐项实施，每项完成后自检。

---

## 一、导航栏重构（P0）

### 1.1 主导航调整为
- Products
- Private Label（新增一级导航）
- OEM/ODM（原 Customized Services 改名）
- Factory（原 Factory Strength）
- Quality（原 Quality & Certificates）
- Resources（含 Solutions / Blog / FAQ）

### 1.2 Mega Menu 结构
- **Products**: All Products / Toothpaste / Mouthwash / Tooth Powder / Toothbrush
- **Private Label**: Why Private Label / Startup Packages / Sample & MOQ / FAQ
- **OEM/ODM**: OEM Manufacturing / ODM Development / Advanced Customization / Sample & MOQ
- **Factory**: Production Lines / R&D Center / Quality Control
- **Quality**: Certificates / Testing / Quality System
- **Resources**: Solutions / Blog / FAQ

### 1.3 Header 右侧
- Language 切换器
- WhatsApp 绿色按钮（#21C96B，仅用于WhatsApp）

### 1.4 保持
- 胶囊形悬浮导航栏样式（fixed定位、透明毛玻璃、滚动变白）
- Hover mega menu 行为（光标在面板内保持显示，移出收起）
- 点击导航项直接跳转，不触发下拉闪现
- Logo 居中

---

## 二、首页核心改版（P0）

### 2.1 Hero
- 主标题："Oral Care Products & Manufacturing Solutions"
- 副标题："Ready-to-ship products, private label solutions and full OEM/ODM manufacturing for global markets."
- 主CTA按钮："Explore Our Solutions"（点击滚动到三路径分流模块，Action Blue #008FD5）
- 辅助：WhatsApp 轻量文字链接
- 全屏Banner从top:0开始，导航栏悬浮覆盖
- 不要在Hero放3-5个同权重按钮，只保留1个主CTA

### 2.2 三路径分流模块（How Would You Like to Start?）
这是整站最重要的模块，位于Hero正下方。三列卡片并列：

**卡片1: Ready Products**
- 图片：真实产品组合、统一包装、产品正面展示
- 标题："Ready Products"
- 副标题："Existing products ready for wholesale."
- 标签：In Stock / Fast Delivery / Sample Available
- CTA："Browse Products →"
- 链接：/products

**卡片2: Private Label（视觉略突出，加"Most Popular"标签）**
- 图片：同一产品+不同品牌包装/Logo Mockup效果
- 标题："Private Label"
- 副标题："Start with proven formulas and add your own branding and packaging."
- 标签：Low MOQ / Fast Sampling / Own Brand
- CTA："Start Your Brand →"
- 链接：/private-label

**卡片3: OEM/ODM**
- 图片：实验室/生产线/配方开发场景
- 标题："OEM / ODM"
- 副标题："Build a fully customized oral care product from formula to finished packaging."
- 标签：R&D / Full Manufacturing / Deep Customization
- CTA："Explore OEM/ODM →"
- 链接：/customized-services

卡片规格：
- 三列等宽，Private Label卡片加细微高亮（浅蓝背景#EAF7FD或"Most Popular"角标）
- 圆角10-14px，hover轻微阴影变化
- 图片占卡片上半部分，文字在下半部分
- 图片用WebP格式，统一比例（4:3或16:9）
- 即使用户不读文字，仅看图片也能区分三条路径

### 2.3 Trust Bar
位于三路径模块下方，横向排列：
- 10+ Years Experience
- 100+ Private Label Projects
- GMP Certified
- 50+ Markets Served

用竖线分隔，灰色文字，不要大图标。

### 2.4 首页完整区块顺序
1. Hero
2. How Would You Like to Start?（三路径分流）
3. Trust Bar
4. Featured Oral Care Products（4个产品卡，View All Products →）
5. Start Your Own Brand（Private Label推广区块，1个CTA）
6. Full OEM/ODM Manufacturing（能力展示，Explore OEM/ODM + Advanced Customization链接）
7. Advanced Customization Preview（6个工艺选项图标：Tube/Cap/Box/Printing/Formula/Size，Customize Your Product →）
8. Factory & Quality（真实生产线+实验室+QC，两个入口按钮）
9. Final CTA："Not Sure Which Solution Fits Your Business?"（Talk to Our Team + WhatsApp）
10. Resources/Blog（3篇文章卡片）
11. Footer

### 2.5 三路径交叉引导
每个业务页底部加"Not the right fit?"模块：
- Products页底部："Need custom branding? Start Private Label →" + "Need full customization? Explore OEM/ODM →"
- Private Label页底部："Browse ready products →" + "Need full OEM/ODM? →"
- OEM/ODM页底部："Start with private label (lower MOQ) →" + "Browse ready products →"

---

## 三、Private Label 独立页面（P0）

新建 `/private-label` 页面，内容结构如下：

### 3.1 Hero
- 标题："Start Your Own Oral Care Brand"
- 副标题："Proven formulas. Low MOQ. Fast sampling. Add your branding and launch in weeks."
- CTA："Start Your Brand" + WhatsApp
- 背景：产品+品牌包装Mockup

### 3.2 How It Works（3步）
1. Choose a Proven Formula — 选择成熟配方
2. Add Your Branding — 加Logo和包装
3. Receive Your Products — 4-6周交付

### 3.3 Ready Formulas
4-6个成熟配方卡片，每个包含：
- 产品图
- 配方名称（如 Hydroxyapatite / Whitening / Sensitive / Kids / Herbal / Charcoal）
- 功能简介
- 可选口味
- 标准规格
- "Select Formula"按钮

### 3.4 Branding Options（三档）
- **Logo Sticker**：贴标，最低MOQ，最快交付
- **Custom Tube**：定制管色+Logo印刷
- **Custom Box**：定制盒+烫金/UV等工艺
每档显示适用MOQ和交付时间。

### 3.5 Startup Packages（三档套餐）
| 套餐 | 内容 | MOQ | 交付 |
|------|------|-----|------|
| Starter | 成熟配方+标准白管+贴标 | 500支 | 3-4周 |
| Brand | 选配方+定制管色+Logo印刷+标准盒 | 1,000支 | 4-5周 |
| Premium | 定制配方+定制管型+精品盒+高级工艺 | 3,000支 | 5-7周 |

显示"Starting from"价格区间（如 $X,XXX），标注"Final price confirmed after sample approval"。

### 3.6 What's Included / What's Not
明确边界：
- Included: 成熟配方选择、标准管材、Logo印刷/贴标、标准包装、质检、出货
- Not Included (go OEM/ODM): 定制配方、异形管、特殊印刷工艺、定制盖型

### 3.7 Sample & MOQ
- MOQ starting from 500 units
- Sample ready in 3-5 days
- Sample fee: $X per piece（显示真实政策或写"Contact for sample pricing"）
- Sample refundable on bulk order
- "Request a Sample Kit"按钮

### 3.8 Timeline
可视化时间线：Inquiry(2天) → Sample(5天) → Approval(3天) → Production(20-30天) → Delivery(5-10天)

### 3.9 FAQ
- What is the minimum order quantity?
- How long does it take to get samples?
- Can I use my own logo and packaging design?
- What file format do you need for artwork?
- Do you ship to my country?
- Can I order 500 first and reorder later?
- What certifications do you have?
- Can I customize the formula? (引导到OEM/ODM)

### 3.10 Final CTA
"Ready to Start Your Brand?" + Start Your Brand表单 + WhatsApp

---

## 四、配色系统调整（P0）

全局CSS变量和Tailwind配置调整为：
- Primary Navy: #173A63（大标题、深色CTA区、Footer）
- Action Blue: #008FD5（主按钮、选中状态、链接、主CTA）
- Soft Blue: #EAF7FD（信息块、标签、选项背景、Private Label高亮卡）
- Warm White: #F7F4EF（交替Section背景）
- Neutral Gray: #F3F5F7（边框）/ #666666（次级文字）
- WhatsApp Green: #21C96B（仅WhatsApp按钮，不用于其他CTA）
- White: #FFFFFF

替换当前的橙色#E8720C为Action Blue #008FD5。深蓝#1B2A4A调整为#173A63。

---

## 五、表单系统重构（P1）

### 5.1 四种独立表单
不要用一个万能表单，创建四个独立表单组件：

**Request Sample 表单**
- Name*（必填）
- Business Email*（必填）
- Country*（必填）
- Selected Product（自动带入，只读）
- Expected Order Quantity（区间选择：500-1000 / 1000-3000 / 3000-10000 / 10000+）
- Do you need Private Label?（No / Yes / Not Sure 单选）
- WhatsApp（可选）
- Message（可选）

**Get Wholesale Price 表单**
- Product/SKU（自动带入）
- Quantity*（区间选择）
- Country/Destination*（必填）
- Company/Buyer Type（下拉：Wholesaler / Distributor / E-commerce / Other）
- Email*（必填）
- WhatsApp（可选）
- 不要加Formula/Tube/Cap等定制字段

**Start Private Label 表单**
- Name*
- Company
- Email*
- WhatsApp
- Country/Market*
- Selected Product/Formula（从页面带入）
- Branding Required（多选：Logo / Tube / Box）
- Expected Quantity（区间选择）
- Upload Logo/Design（文件上传，可选）
- Message（可选）

**Custom Quote 表单**
- Name*
- Company
- Business Email*
- WhatsApp
- Product Type/Formula Direction
- Fill Size
- Tube/Cap/Packaging/Printing（从配置器自动带入，只读）
- Quantity*
- Target Market/Country*
- Certification/Special Requirements
- Message

### 5.2 Lead 数据模型扩展
leads表增加字段：
- buyer_intent ENUM('ready_product','private_label','custom_oem')
- lead_type ENUM('sample','wholesale_quote','brand_quote','custom_quote','contact')
- customization_level ENUM('none','light','advanced') DEFAULT 'none'
- expected_quantity VARCHAR(50)（存区间值如"1000-3000"）
- product_id VARCHAR(100)（来源产品SKU）
- page_url VARCHAR(500)（来源页面）
- utm_source VARCHAR(100)
- utm_medium VARCHAR(100)
- utm_campaign VARCHAR(100)
- referrer VARCHAR(500)

所有表单提交时自动写入这些字段，前端隐藏字段自动采集。

### 5.3 表单防垃圾
- Honeypot隐藏字段
- 同IP提交频率限制（每小时最多5次）
- 不需要加载重量级验证码

---

## 六、移动端优化（P1）

### 6.1 底部固定CTA栏
移动端全局底部固定栏，根据页面类型动态切换：
- 首页：WhatsApp | Explore Solutions
- /products：Request Sample | Get Price
- /private-label：Request Sample | Start Brand
- /customized-services：Get Quote | WhatsApp
- /advanced-customization：View Selection | Submit

固定栏高度50-52px，z-index低于导航栏下拉面板。

### 6.2 移动端首页
- Hero标题2-3行，1个主CTA
- 三路径卡片单列排列，顺序：Ready Products → Private Label → OEM/ODM
- 产品区2列
- 所有按钮最小高度44px，正文不小于14-15px
- 产品分类标签允许换行，不允许文字截断
- 所有图片有固定aspect-ratio避免CLS
- Header只保留Logo+汉堡菜单+WhatsApp图标，顶部联系条隐藏

---

## 七、Products页面优化（P0）

### 7.1 产品卡片增加标签
每个产品卡片显示：
- In Stock（绿色标签）或 Available
- MOQ: 500/1000/3000（直接显示数字，不要藏）
- 2-3个Feature Tags
- Net Weight / Flavor（如有）
- CTA：View Details（卡片按钮）
- 不要在列表页放过多按钮

### 7.2 页面结构
- Banner: "Our Oral Care Products"
- Breadcrumb
- Category filter（Toothpaste/Mouthwash/Tooth Powder/Toothbrush/All）
- 产品网格（Desktop 4列 / Tablet 3列 / Mobile 2列）
- 每张卡片：产品图(1:1白底) + 名称 + 标签 + MOQ + View Details
- 底部交叉引导：Need custom branding? Start Private Label →

### 7.3 产品详情页CTA
- Request Sample + Get Wholesale Price（两个按钮，主辅分明）
- 规格表、成分、包装选项、交期
- Related Products
- FAQ

---

## 八、OEM/ODM页面调整（P0）

将原/customized-services页面调整为：
1. Hero: "Private Label Toothpaste Manufacturer" — Get Quote + WhatsApp
2. Our Services: OEM Manufacturing / ODM Development / Private Label（三个卡片，Private Label链接到/private-label）
3. Why Choose Us（数据化背书）
4. Who We Work With（E-commerce / Wholesale / Private Label Brands）
5. 4-Step Process
6. What We Can Customize → Explore Full Customization（链接到advanced-customization）
7. Sample & MOQ
8. FAQ
9. Final CTA

---

## 九、数据追踪事件（P1）

在GA4/数据层中埋入以下事件：
- home_path_click（参数：path = ready_products / private_label / oem_odm）
- product_view（product_id, category, source）
- sample_open / sample_submit
- wholesale_quote_open / wholesale_quote_submit
- private_label_start / private_label_submit
- customizer_start / option_select / configuration_submit
- whatsapp_click（page, position）
- view_solution

---

## 十、i18n翻译键

所有新增文案必须补充7种语言翻译（zh-CN, zh-TW, en, ja, ko, es, ar）。新增的主要key包括但不限于：
- home.hero.title, home.hero.subtitle, home.hero.cta
- home.paths.ready.title, home.paths.ready.desc, home.paths.ready.tags
- home.paths.privateLabel.title, home.paths.privateLabel.desc, home.paths.privateLabel.tags, home.paths.privateLabel.popular
- home.paths.oem.title, home.paths.oem.desc, home.paths.oem.tags
- home.trust.years, home.trust.projects, home.trust.gmp, home.trust.markets
- privateLabel.* （整个页面的所有文案）
- form.sample.*, form.wholesale.*, form.brand.*, form.custom.*
- cta.* (browseProducts, startYourBrand, exploreOem, requestSample, getPrice, getQuote, whatsapp, submit)
- mobile.bottomBar.*

英文文案以本指令中的文本为准。不要在页面上显示原始i18n key。

---

## 实施要求

1. 先做P0项（导航、首页三路径、Private Label页面、配色、Products标签、OEM页面调整），再做P1项（表单、移动端CTA、追踪事件）
2. 每完成一个模块运行 `pnpm lint` 和 `pnpm ts-check`
3. 确保7种语言页面都能正常渲染，不出现i18n key原样显示
4. 确保SSR正常，页面核心内容在服务端HTML中
5. 确保响应式：320/375/768/1024/1440/1920无水平溢出
6. 确保mega menu hover行为在改版后仍然正常
7. 图片用WebP，有width/height，非首屏lazy load
8. 完成后输出修改文件清单和自检结果
