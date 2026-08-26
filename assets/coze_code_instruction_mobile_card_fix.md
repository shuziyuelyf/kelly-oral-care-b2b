# 修复移动端产品卡片：图片居中 + 按钮等宽

## 问题
移动端产品列表卡片（横排左图右文）存在两个格式问题：

1. **左侧图片未完全居中**：产品图片在左侧区域内垂直方向没有完美居中
2. **右侧两个按钮宽度不一致**：View Details（描边按钮）比 WhatsApp（绿色按钮）宽，两个按钮应该等宽对齐

## 修复要求

### 1. 图片居中
- 左侧图片容器确保 `flex items-center justify-center`
- 图片使用 `object-contain mx-auto` 确保水平垂直居中
- HOT/In Stock 标签保持在图片区域顶部，不影响图片居中

### 2. 按钮等宽（关键）
- View Details 和 WhatsApp 两个按钮必须**宽度一致**
- 按钮容器使用 `flex flex-col gap-2`（上下堆叠）
- 每个按钮添加 `w-full` 使其撑满文字区域宽度
- 两个按钮高度也保持一致（相同的 py/px 和 text-size）
- 按钮文字居中

### 3. 整体卡片结构（移动端）
```
<div className="flex gap-3 p-3">
  <div className="relative w-32 flex-shrink-0 flex items-center justify-center">
    <!-- HOT/In Stock badges absolute top -->
    <img className="object-contain max-h-32 mx-auto" />
  </div>
  <div className="flex-1 flex flex-col min-w-0">
    <h3>产品名</h3>
    <p>描述</p>
    <div className="mt-auto flex flex-col gap-2 pt-2">
      <button className="w-full text-center py-2 px-4">View Details</button>
      <button className="w-full text-center py-2 px-4">WhatsApp</button>
    </div>
  </div>
</div>
```

### 4. PC端保持不变
- PC端列表视图按钮可以横排，但如果横排也要确保不被裁切
- 移动端（md以下）按钮上下堆叠+等宽

## 注意事项
- 修改前先读取 ProductsListClient.tsx 完整代码
- 只改按钮宽度和图片居中，不要改其他布局
- 静态检查和类型检查必须通过
