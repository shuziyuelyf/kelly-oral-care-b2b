# 紧急修复：产品卡片按钮裁切 + 图片垂直居中

## 当前问题（截图确认）
Products页面列表视图（横排左图右文）的产品卡片存在两个严重问题：

1. **WhatsApp按钮被裁切**：绿色"WhatsApp"按钮只显示到"WhatsA"，右侧被卡片边缘截断，无法看到完整按钮和文字
2. **图片偏上**：产品图片在左侧图片区域顶部对齐，图片下方有大片留白，没有垂直居中

## 根因分析（请先读取代码确认）
- 卡片容器很可能设置了固定高度（如h-64/h-72）+ `overflow-hidden`，导致超出高度的按钮被裁掉
- 图片容器可能是`items-start`而非`items-center`，导致图片偏上

## 修复要求

### 1. 按钮完整显示（最高优先级）
- **移除卡片的固定高度**，改为`min-h`或由内容撑开高度（`h-auto`）
- **移除卡片上的`overflow-hidden`**（如果是为了圆角，改为`overflow-visible`，圆角用在内层图片容器上）
- WhatsApp按钮必须完整显示"WhatsApp"文字，右侧不能被裁切
- 两个按钮（View Details + WhatsApp）必须完整可见
- 如果横排放不下，改为`flex-wrap`让按钮换行，或改为上下堆叠`flex-col`

### 2. 图片垂直居中
- 左侧图片容器使用`flex items-center justify-center`，让图片在区域内垂直水平居中
- 图片使用`object-contain`（不是cover），保持产品图完整展示
- 图片区域不要固定死高度，让卡片高度自适应

### 3. 卡片结构建议
```
<div className="card"> // 无固定高度，无overflow-hidden
  <div className="flex gap-4 p-4">
    <div className="flex items-center justify-center w-40 flex-shrink-0"> // 图片区，居中
      <img className="object-contain max-h-48" />
    </div>
    <div className="flex-1 flex flex-col"> // 文字区
      <h3>产品名</h3>
      <p>描述</p>
      <div className="mt-auto flex flex-wrap gap-2"> // 按钮区，flex-wrap防裁切
        <button>View Details</button>
        <button>WhatsApp</button>
      </div>
    </div>
  </div>
</div>
```

### 4. 网格视图同步检查
- 如果有网格视图（上图下文），同样确保按钮不被裁切、图片居中
- 网格视图卡片高度自适应，不要固定高度+overflow-hidden

## 注意事项
- 修改前**必须先读取** ProductsListClient.tsx 的完整代码
- 找到卡片渲染的具体位置，精确修改
- 不要改产品名截断行为
- 修改后确保静态检查和类型检查通过
- 预览验证：在移动端和PC端宽度下都要检查按钮是否完整显示
