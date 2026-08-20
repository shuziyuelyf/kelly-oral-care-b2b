# DESIGN.md - B2B Enterprise Website

## 品牌与视觉方向
- 气质：专业、可信赖、国际化、高端制造感
- 意象：参考 snapsupplements.com 的现代C端风格转化为B2B企业站
- 风格：干净大气，大留白，大字体，胶囊形元素，全屏视觉冲击

## Design Tokens

### 色彩
- 主色：藏青 #1B2A4A（信任、专业、高端）
- 强调色：琥珀金 #D4A853 / 橙色 #E8720C（CTA按钮、标签、高亮）
- 中性色：石墨 #1a1a1a / 深灰 #4a4a4a / 中灰 #718096
- 背景色：纯白 #FFFFFF / 暖灰 #F5F5F0（辅助区块）
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
- 卡片：16px-24px
- 输入框：12px
- 图片：12px-16px

### 阴影
- 导航栏：0 4px 30px rgba(0,0,0,0.1)
- 卡片：0 2px 12px rgba(0,0,0,0.06)
- 悬浮：0 8px 30px rgba(0,0,0,0.12)

### 按钮规范
- 主按钮：rounded-full，深色背景(#1B2A4A)白字，padding 16px 40px
- 次按钮：rounded-full，白底深色边框，padding 16px 40px
- hover：微缩放 scale(0.98) + shadow增强

## 布局与响应式
- 最大内容宽度：1280px (xl)
- 断点：sm(640px) / md(768px) / lg(1024px) / xl(1280px)
- 导航：胶囊形浮动导航栏，毛玻璃背景，居中Logo
- Hero：全屏(100vh)大图背景，左文右图布局
- 前台：胶囊导航 + 全屏Banner + 内容区块
- 后台：左侧固定侧边栏 + 顶部工具栏 + 内容区

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
- 不使用低于 #718096 对比度的文字
- 不使用直角导航栏
