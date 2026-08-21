# Banner 比例调整 + 测试图片填充

## 1. 导航栏胶囊宽度调整

当前胶囊宽度按屏幕比例铺满是正确的，保持这个方向，只做小幅优化：

- 胶囊宽度保持 `width: 94%`（或当前等效的百分比/margin 方案），居中
- 添加 `max-width: 1680px`，仅在 4K 等超宽屏上防止过度拉伸，日常屏幕（≤1680px）完全按比例铺满
- 上下 margin 保持当前 12px 不变
- 不要加 1280px 上限，这会让大屏幕上胶囊两侧留白过多

## 2. Banner 高度降低

当前 Banner 占满 100vh 过高，B2B 访客需要快速看到下方内容：

- **桌面端（≥768px）**：`min-height` 从 `100vh` 改为 `75vh`
- **移动端（<768px）**：`min-height` 从 `100vh` 改为 `80vh`
- Banner 背景图区域使用 `object-fit: cover` 铺满
- 确保 Banner 内容（标题、副标题、CTA 按钮）在 75vh/80vh 内垂直居中或略偏上（约 40% 位置）

## 3. 使用 Unsplash 随机测试图片填充 Banner

目前 Banner 没有真实产品图，使用高质量口腔护理/牙科相关的 Unsplash 图片作为测试背景，便于评估视觉效果：

在 Banner 轮播中使用以下 3 张图片（如项目有多个 slide）：

1. `https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1920&q=80` — 牙科诊所/专业口腔护理场景
2. `https://images.unsplash.com/photo-1583912267550-d6c20346457e?w=1920&q=80` — 牙刷/口腔护理产品
3. `https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1920&q=80` — 牙科工具/专业生产感

实现要求：
- 使用 `<Image>` 组件或 CSS background-image 均可
- 图片必须 `object-fit: cover` 铺满整个 Banner 区域
- 图片加载时使用模糊占位或纯色背景（#173A63）防止白屏
- 这些是临时测试图，用注释标记 `// TODO: Replace with official product/banner images`

## 4. Banner 渐变遮罩

背景图片上叠加海军蓝渐变遮罩，确保白色文字在任何图片上都可读：

```css
background: linear-gradient(
  135deg,
  rgba(23, 58, 99, 0.85) 0%,
  rgba(23, 58, 99, 0.65) 50%,
  rgba(0, 143, 213, 0.45) 100%
);
```

- 遮罩层使用 `::before` 或独立绝对定位 div
- `z-index` 低于文字内容但高于背景图
- 渐变方向从左上到右下（135deg），与品牌配色一致

## 5. Banner 内容位置微调

- 文字内容区域从当前垂直居中改为略偏上：`align-items: flex-start; padding-top: 15vh`（桌面）/ `padding-top: 12vh`（移动）
- 标题、副标题、CTA 按钮左对齐（当前已是左对齐则保持）
- CTA 按钮和文字间距保持不变
- 底部可加一个轻量的滚动提示（向下箭头 + "Scroll" 文字），白色 50% 透明度，仅桌面端显示

## 6. 轮播一致性

- 如果 Banner 有轮播功能，3 个 slide 使用同一套布局模板和渐变遮罩
- 每个 slide 可以有不同标题文字，但字号、间距、按钮位置完全一致
- 切换动画保持当前效果（淡入淡出），不要加滑动变换

## 验证要求

- `pnpm ts-check` 通过
- `pnpm lint` 通过
- 桌面端（1920px）、平板（768px）、手机（375px）三种宽度下 Banner 比例正确
- 图片正常加载，无白屏闪烁
- 文字在图片背景上清晰可读
