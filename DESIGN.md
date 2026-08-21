# DESIGN.md - Kelly Oral Care B2B Website

## 品牌与视觉方向
- 气质：专业口腔护理制造商，三类买家分流（现货/自有品牌/全定制）
- 意象：洁净、可信赖、国际化口腔护理工厂
- 风格：干净大气，清晰的信息层级，胶囊形元素，专业B2B转化导向

## Design Tokens

### 色彩
- Primary Navy: #173A63（大标题、深色CTA区、Footer）
- Action Blue: #008FD5（主按钮、选中状态、链接、主CTA）
- Soft Blue: #EAF7FD（信息块、标签、选项背景、Private Label高亮卡）
- Warm White: #F7F4EF（交替Section背景）
- Neutral Gray: #F3F5F7（边框）/ #666666（次级文字）
- WhatsApp Green: #21C96B（仅WhatsApp按钮）
- White: #FFFFFF
- 成功色：#38A169
- 警告色：#D69E2E
- 错误色：#E53E3E

### 字体
- 标题：Inter (Latin) + Noto Sans SC (中文)，粗体，clamp(2.5rem, 5vw, 4.5rem)
- 正文：Inter + Noto Sans SC，16-18px
- 阿拉伯语：Noto Sans Arabic

### 圆角
- 按钮：9999px（胶囊形）
- 导航栏：9999px（胶囊形）
- 卡片：10-14px（产品卡片、分流卡片）
- 输入框：12px
- 图片：12px-16px

### 阴影
- 导航栏：0 4px 30px rgba(0,0,0,0.1)
- 卡片：0 2px 12px rgba(0,0,0,0.06)
- 悬浮：0 8px 30px rgba(0,0,0,0.12)

### 按钮规范
- 主按钮：rounded-full，Action Blue #008FD5 背景白字，padding 16px 40px
- 次按钮：rounded-full，白底深色边框，padding 16px 40px
- WhatsApp按钮：#21C96B 背景白字
- hover：微缩放 scale(0.98) + shadow增强

## 布局与响应式
- 最大内容宽度：1280px (xl)
- 断点：sm(640px) / md(768px) / lg(1024px) / xl(1280px)
- 导航：胶囊形浮动导航栏，毛玻璃背景，居中Logo
- Hero：全屏(85vh)大图背景，左文右图布局
- 前台：胶囊导航 + 全屏Banner + 三路径分流 + 内容区块
- 后台：左侧固定侧边栏 + 顶部工具栏 + 内容区
- 移动端底部固定CTA栏（50-52px）

## 交互与动效
- 页面切换：fade-in 300ms
- 卡片悬浮：translateY(-4px) + shadow增强
- 按钮点击：scale(0.98) 反馈
- 缓动曲线：ease-out
- Logo墙：无限横向滚动
- 数字统计：计数动画

## 设计禁忌
- 不使用小圆角按钮（统一胶囊形）
- 不使用花哨的多色渐变
- 不使用卡通风格图标
- 不使用低于 #666666 对比度的文字
- 不使用直角导航栏
- WhatsApp Green 仅用于 WhatsApp 按钮，不用于其他 CTA
