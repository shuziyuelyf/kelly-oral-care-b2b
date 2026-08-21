# 修复导航栏与Banner重叠 + PC端Banner高度回退

## 问题1：移动端导航栏与Banner重叠

移动端 Banner 已改为 16:9 紧凑图片条，但导航胶囊仍使用悬浮透明（absolute/fixed + transparent background），导致胶囊直接压在 Banner 图片上方。

### 修复方案

移动端（<768px）导航栏改为**静态实心布局**：
- 导航栏不使用 `position: fixed` / `position: absolute` / `sticky`，改为正常文档流 `position: static` 或 `relative`
- 导航栏背景色为白色（或 Warm White #F7F4EF），不透明
- 胶囊宽度 100%（或保持当前 margin 间距），圆角可保留但无悬浮感
- 导航栏正常占据页面顶部空间，Banner 紧接在导航栏下方显示
- 移动端不需要滚动变色效果（因为已经是实心背景）
- 页面顶部不预留 padding-top（因为导航栏在文档流中）

桌面端（≥768px）保持当前悬浮透明 + 滚动变白的行为不变。

实现方式建议：
- 在 Header 组件中，`isScrolled` 状态在移动端始终视为 `true`（实心背景）
- 移动端 Header 容器使用 `position: relative` 而非 `fixed`
- 或者用 CSS media query：`@media (max-width: 767px) { header { position: static !important; background: white; } }`
- 确保主内容区没有为移动端设置 `padding-top`（如果有则移除）

## 问题2：PC端Banner高度回退

PC 端 Banner 在移动端 16:9 改动后，高度回到了接近 100vh 的旧版本，没有保持 75vh。

### 修复方案

- 检查 HeroBanner 组件中桌面端（≥768px）的高度设置
- 确保桌面端 `min-height: 75vh`（或 `height: 75vh`），不是 100vh
- 移动端（<768px）保持 `aspect-ratio: 16/9`，width 100%
- 检查是否有 CSS 优先级问题导致 75vh 被覆盖
- 桌面端内容位置保持在 40% 处（padding-top: 40vh 或等效方案）
- 桌面端渐变遮罩、图片 cover、滚动提示等保持上一版效果不变

## 验证要求

- `pnpm ts-check` 通过
- `pnpm lint` 通过
- 移动端 375px/390px：导航栏在 Banner 上方，白色实心，不重叠；Banner 为 16:9 图片条；按钮在 Banner 下方；"您想如何开始"首屏可见
- PC 端 1920px：导航栏悬浮透明覆盖在 Banner 顶部；Banner 高度为视口 75%（不是100%）；滚动后导航栏变白
- 两种模式下导航栏和 Banner 都不能重叠（PC端悬浮是设计意图，不算重叠bug）
