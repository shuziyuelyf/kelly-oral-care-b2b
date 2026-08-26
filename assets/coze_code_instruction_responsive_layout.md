# 取消视图切换按钮，响应式自动切换布局

## 需求
移除Products页面的网格/列表视图切换按钮，改为根据屏幕宽度自动展示：
- **PC端（md及以上）**：网格视图 — 产品以多列卡片展示，上图下文，一屏看到更多产品
- **移动端（md以下）**：列表视图 — 产品横排单列展示，左图右文，每个产品占更宽空间

## 修复要求

### 1. 移除视图切换按钮
- 删除网格/列表图标切换按钮（grid/list toggle）
- 删除相关的viewMode状态（useState）
- 不再需要用户手动切换

### 2. 响应式卡片布局
同一张卡片，使用Tailwind响应式类自动切换布局：

**移动端（默认，md以下）— 列表视图：**
- 卡片：`flex flex-row`（横排）
- 左侧图片区：固定宽度（如w-32），`flex items-center justify-center p-3`
- 右侧内容区：`flex-1 flex flex-col`
- 按钮：上下堆叠 `flex-col gap-2 w-full`
- 图片：`object-contain max-h-28`

**PC端（md及以上）— 网格视图：**
- 卡片：`md:flex-col`（竖排）
- 图片区：全宽，`md:w-full md:aspect-square md:p-4`
- 内容区：`md:w-full`
- 按钮：并排 `md:flex-row md:gap-2`，每个按钮`md:flex-1`
- 图片：`md:object-contain md:max-h-48`
- 网格容器：`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6`

### 3. 实现方式
- 不使用JS判断屏幕宽度，纯CSS/Tailwind响应式类实现
- 卡片组件同时包含移动端列表样式和PC端网格样式，用`md:`前缀切换
- 例如：
  - 卡片容器：`flex flex-row md:flex-col`
  - 图片容器：`w-32 flex-shrink-0 md:w-full md:aspect-square`
  - 按钮容器：`flex flex-col gap-2 md:flex-row`
  - 按钮：`w-full md:flex-1`

### 4. 注意
- 确保两种视图下图片都居中、有留白
- HOT/NEW/In Stock标签在两种视图下都正常显示（移动端在图片区左上角，PC端在卡片图片区左上角）
- 产品名截断在移动端列表视图保持正常
- PC端网格视图产品名可以显示2-3行
- 移除toggle后，ProductsListClient中不需要viewMode相关状态和逻辑
- 静态检查和类型检查必须通过
