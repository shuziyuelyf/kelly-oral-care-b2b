# 渐进式响应式导航栏（Progressive Collapse Nav）

## 核心需求
当前导航栏在桌面端同时显示全部菜单 + 汉堡按钮，这是错误的。正确行为：
- 导航栏根据容器实际可用宽度，**逐个**把放不下的菜单项移进汉堡菜单
- 屏幕越窄，汉堡菜单里的项目越多，外面显示的项目越少
- 屏幕窄到极致时，只剩 Logo（居中，点击返回首页）+ 汉堡按钮
- 不是基于固定断点隐藏，而是基于实时宽度测量

## 布局结构
胶囊导航栏内部flex布局：
- 左侧：可见菜单项区域（flex: 0 1 auto，可收缩）
- 中间：Logo（absolute居中或flex: 0 0 auto），点击返回 /
- 右侧：语言切换 + WhatsApp + 汉堡按钮
- 汉堡按钮里包含所有被溢出的菜单项

## 实现方案（必须用JS测量，不能纯CSS断点）

### 1. 测量与算法
用 ResizeObserver 监听导航栏容器宽度变化：

```
- 完整列表 = [Products, Private Label, OEM/ODM, Factory, Quality, Resources]
- 维护 visibleCount 状态（默认全部显示）
- 每次容器宽度变化时：
  1. 先假设所有项目都显示（visibleCount = 6），渲染后测量每项实际宽度 + Logo宽度 + 右侧控件宽度 + padding
  2. 计算需要的总宽度
  3. 如果超出容器：visibleCount -= 1，重新计算
  4. 重复直到适合或 visibleCount = 0
- 前 visibleCount 个项目直接显示在胶囊内
- 剩余项目放进汉堡菜单
- visibleCount = 0 时：只显示 Logo + 汉堡按钮（所有项目在汉堡里）
```

### 2. 防止闪烁
- 初次渲染时用 CSS visibility: hidden 测量，确定visibleCount后再显示
- 或用 useLayoutEffect 在浏览器绘制前完成计算
- 不要出现"全部展开 → 跳动 → 收起"的闪烁

### 3. 汉堡菜单行为
- 汉堡按钮只在 visibleCount < 6 时显示（有项目溢出时才需要）
- 汉堡菜单展开时，显示溢出的项目（不是全部项目，避免重复显示外面已有的）
- 每个项目保持原有的 hover/click 行为
- 有二级菜单的项目（Products/Private Label/OEM/Factory/Quality/Resources）在汉堡菜单中可展开显示子项
- 移动端点击展开子项（非hover），桌面端汉堡菜单也用点击展开

### 4. 菜单项顺序
溢出时**从右往左**收进汉堡菜单（保留最左侧的 Products 最久）：
- 宽度足够：全部6项 + 无汉堡
- 稍微变窄：Products, Private Label, OEM/ODM, Factory, Quality + 汉堡(Resources)
- 更窄：Products, Private Label, OEM/ODM, Factory + 汉堡(Quality, Resources)
- 继续：Products, Private Label, OEM/ODM + 汉堡(Factory, Quality, Resources)
- 继续：Products, Private Label + 汉堡(OEM/ODM, Factory, Quality, Resources)
- 继续：Products + 汉堡(Private Label, OEM/ODM, Factory, Quality, Resources)
- 最窄：只有Logo + 汉堡(全部6项)

### 5. 右侧固定元素
始终保留在胶囊右侧（不参与溢出测量）：
- Language切换器（可在很窄时只显示地球图标，隐藏文字）
- WhatsApp图标按钮
- 汉堡按钮（有溢出项时显示）

### 6. 语言切换器的响应式
- 宽度充足：显示当前语言名（如 "EN"）+ 地球图标
- 宽度紧张：只显示地球图标
- 这个不进汉堡菜单

### 7. 保持现有特性（不要破坏）
- 胶囊形 rounded-full
- fixed悬浮，透明毛玻璃，滚动后变白
- Logo居中，点击回首页
- Hover mega menu（桌面端可见项）
- 深色/浅色滚动状态
- 7语言切换

### 8. 技术要求
- 使用 React hooks: useRef, useState, useLayoutEffect, useCallback
- ResizeObserver 监听容器，组件卸载时 disconnect
- 防抖处理（resize 期间用 requestAnimationFrame 节流）
- 测量每个菜单项时用 getBoundingClientRect() 或 offsetWidth
- 考虑菜单文字长度会随语言变化（中文短、英文/德文长），算法必须基于真实渲染宽度而非固定像素
- SSR安全：useLayoutEffect 里的测量只在客户端执行，初始渲染用合理默认值（如全部显示）

## 验收标准
1. 慢慢缩小浏览器窗口，菜单项逐个平滑地进入汉堡菜单，不闪烁
2. 放大窗口，项目逐个从汉堡菜单回到导航栏
3. 最窄时（如320px）只看到Logo和汉堡按钮，没有水平溢出、没有文字截断
4. 桌面宽屏（1920px）不显示汉堡按钮，6项全部可见
5. 切换语言后，导航栏重新计算（英文变长可能多收一项）
6. 胶囊不出现横向滚动条，不撑破视口
7. pnpm lint 和 pnpm ts-check 通过
