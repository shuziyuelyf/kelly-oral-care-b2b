# 修复产品图片左右留白居中

## 问题
移动端和列表视图下，左侧产品图片左右顶满容器边缘，没有留白。图片需要左右有padding并水平居中显示。

## 修复要求

### 列表视图（横排左图右文）
- 图片容器添加水平内边距 `px-3`（或 px-4），让图片不贴边
- 图片本身 `mx-auto` 水平居中 + `object-contain`
- 图片宽度限制为 `w-full` 但受容器padding约束，不要超出
- HOT/NEW/In Stock标签保持absolute定位在图片区域顶部，不受padding影响（标签容器单独定位）

### 网格视图（上图下文）
- 图片容器同样加 `px-4 py-4`，图片水平居中
- 图片不要顶到卡片边缘

### 示例结构
```
<div className="relative w-32 flex-shrink-0 flex items-center justify-center px-3 py-3">
  <!-- badges absolute, 不受padding影响 -->
  <div className="absolute top-2 left-2 flex gap-1">
    <span className="badge">NEW</span>
    <span className="badge">In Stock</span>
  </div>
  <img className="object-contain max-h-28 w-auto mx-auto" />
</div>
```

## 注意
- 只改图片容器的padding和居中，不要改按钮和文字布局
- 修改前读取ProductsListClient.tsx完整代码
- 静态检查和类型检查通过
