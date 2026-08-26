# 修复移动端产品图片太小

## 问题
移动端列表视图（左图右文）中，左侧产品图片容器为 w-32 h-32 (128px)，加上 p-3 padding 后实际图片显示区域更小。而右侧内容区（标题+描述+MOQ+两个按钮）很高，导致图片比例严重失调，显得太小。

## 修复要求

### 移动端图片放大
- 图片容器从 `w-32 h-32` 改为 `w-36 h-36`（144px）或 `w-40 h-40`（160px）
- 图片容器padding从 `p-3` 减小为 `p-2`，让图片占更多空间
- 图片本身 `max-h-full max-w-full object-contain`，充分利用容器空间
- HOT/In Stock标签仍absolute定位在左上角

### 建议值
- 容器：`w-36 h-36 md:w-full md:h-auto md:aspect-square`
- 容器padding：`p-2 md:p-4`
- 图片：`object-contain max-h-32 md:max-h-48`

### 注意
- PC端网格视图保持不变（md:w-full md:aspect-square md:p-4）
- 只调移动端图片尺寸，不改右侧文字和按钮布局
- 修改前读取ProductsListClient.tsx
- 静态检查和类型检查通过
