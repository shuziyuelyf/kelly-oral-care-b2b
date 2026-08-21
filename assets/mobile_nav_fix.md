# 移动端导航栏与Banner彻底分离

## 问题
移动端导航胶囊虽然背景已改为白色，但仍然使用 fixed/absolute 悬浮定位，导致胶囊覆盖在 Banner 图片顶部。从截图看，Banner 图片从屏幕 y=0 开始渲染，胶囊压在图片上，Banner 中"Believe, Achieve, Succeed, Repeat"等内容被遮挡。

## 修复要求（仅移动端 <768px，PC端保持不变）

移动端 Header 必须完全脱离悬浮状态，成为正常文档流中的第一个块级元素：

1. **定位**：移动端 header 外层容器使用 `position: relative`（不是 fixed/absolute/sticky），不设置 top/left/right/transform 等悬浮属性
2. **背景**：白色实心 `bg-white`，无 backdrop-blur，无透明度
3. **margin**：保持当前上下左右间距（如 my-3 mx-3 等），胶囊圆角保留
4. **Banner 位置**：Banner 紧接在 Header 下方，由文档流自然排列，不设置 padding-top 或 margin-top 来补偿悬浮导航栏
5. **页面整体**：body/#__next 不需要 padding-top（PC端可能仍需保留 padding-top 用于补偿 fixed header，移动端移除）

### 具体检查点
- 检查 Header 组件最外层是否有 `fixed`、`absolute`、`sticky` 类，移动端必须移除
- 检查是否有全局样式（如 layout.tsx 或 globals.css）给 main/body 设置了 `padding-top` 来避让 fixed header，移动端这个 padding 应为 0
- 检查 isScrolled 逻辑在移动端是否仍触发样式变化——移动端无需滚动变色，始终白底
- 如果 Header 组件使用固定高度加 margin-top 占位方案，移动端占位 div 不应渲染
- 确保汉堡菜单展开时面板从胶囊下方弹出，不覆盖整个屏幕顶部

### PC端（≥768px）完全保持当前行为
- fixed 悬浮透明导航栏
- 滚动后变白毛玻璃
- Banner 从页面顶部开始，导航栏悬浮覆盖在 Banner 上（这是设计意图）
- 不做任何改动

## 验证
- pnpm ts-check 通过
- pnpm lint 通过
- 移动端 375px/390px/430px：导航胶囊和 Banner 图片之间无重叠，Banner 完整显示在胶囊下方，Banner 顶部内容（图片和文字）不被任何元素遮挡
- PC 端 1920px：导航栏仍悬浮透明覆盖在 Banner 顶部，与改动前完全一致
