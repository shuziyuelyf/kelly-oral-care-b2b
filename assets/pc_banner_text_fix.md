# 修复PC端Banner文字消失问题

## 问题描述
移动端 Banner 文字（标题、副标题、按钮）正常显示，但 PC 端（宽屏 ≥768px）Banner 只有背景图和轮播指示器，标题、副标题、CTA按钮全部消失。

从截图看：
- 移动端：标题"自有品牌"、副标题、两个按钮完整显示在 Banner 底部/下方
- PC端：Banner 只有背景图（可见"Believe, Achieve, Succeed, Repeat"水印）、底部轮播点和滚动提示，没有标题文字和按钮

## 可能原因（需逐一排查）

### 1. 响应式类名错误
在移动端 16:9 改造过程中，文字/按钮容器可能被加上了 `block md:hidden`、`md:hidden` 或仅在小屏显示的类。检查 HeroBanner 组件中：
- 标题 `<h1>` / `<h2>` 容器
- 副标题 `<p>` 容器
- CTA 按钮组容器
- 任何包裹文字内容的父 div

确保这些容器在 PC 端是可见的（没有 `md:hidden`，应该有 `md:block` 或默认 `block`）。

### 2. 按钮被移到Banner外部时PC端丢失
之前的改动将移动端按钮移到 Banner 图片下方。检查是否：
- 按钮容器整体被包在了移动端条件渲染中
- PC端按钮容器被删除或注释掉
- 应该：移动端按钮在 Banner 外（图片下方），PC端按钮在 Banner 图片内叠加显示

### 3. z-index 层级问题
检查 PC 端文字内容的 z-index 是否低于渐变遮罩或图片：
- 背景图：z-0
- 渐变遮罩：z-10
- 文字内容（标题、副标题、按钮）：z-20 或更高
- 确保文字容器有 `relative z-20`（或等效）

### 4. 条件渲染逻辑
检查是否有 JavaScript 条件渲染导致 PC 端不渲染文字：
- 搜索 `isMobile`、`window.innerWidth`、`useMediaQuery` 等
- 确保没有 `{isMobile && <TextContent />}` 这种只在移动端渲染文字的逻辑
- 文字内容应该在所有断点都渲染，只是通过 CSS 控制位置和样式

## 修复要求

### PC端（≥768px）Banner 应显示：
1. **标题**：大号粗体白色文字（如 text-4xl/text-5xl font-bold），位于 Banner 左侧偏下（约40%位置），最多2行
2. **副标题**：中号白色文字（text-lg），在标题下方，最多2行
3. **CTA按钮**：两个按钮并排显示在副标题下方
   - 主按钮：白色实心"探索我们的方案"
   - 副按钮：WhatsApp绿色描边/实心"WhatsApp咨询"
4. **z-index**：文字内容在渐变遮罩之上（z-20）
5. 文字颜色为白色，在深色渐变上清晰可读

### 移动端（<768px）保持当前效果：
1. 标题和副标题叠加在 Banner 16:9 图片底部（渐变最深区域）
2. 按钮在 Banner 图片下方，全宽堆叠
3. 不改变当前移动端布局

### 具体检查步骤
1. 读取 HeroBanner 组件源码（可能在 components/home/HeroBanner.tsx 或类似路径）
2. 找到标题、副标题、按钮的 JSX 结构
3. 检查每个元素的 className 是否有 `md:hidden`、`hidden md:` 等问题
4. 检查是否有条件渲染 `isMobile &&` 包裹
5. 检查 z-index 层级
6. 修复后确保 PC 端和移动端都正常显示

## 验证
- pnpm ts-check 通过
- pnpm lint 通过
- PC端 1920px：Banner 上标题、副标题、两个按钮清晰可见，白色文字在渐变遮罩上可读
- PC端 768px：同样显示文字和按钮
- 移动端 375px：Banner 底部有标题和副标题，按钮在图片下方，与改动前一致
