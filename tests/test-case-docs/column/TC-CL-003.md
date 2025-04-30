# 测试用例：TC-CL-003

## 测试目的

验证 Column 组件是否能正确应用不同的分布方式属性，以控制子元素在垂直方向上的分布方式。

## 测试环境

- GUIDS2HTML 转换器版本：1.0.0 或更高
- 支持的浏览器：Chrome 90+, Firefox 90+, Safari 14+, Edge 90+

## 前提条件

- 已正确安装和配置 GUIDS2HTML 转换器
- 已准备好测试用例 JSON 文件 `tests/data/components/column/TC-CL-003.json`

## 测试步骤

1. 加载测试用例 JSON 文件
2. 使用 GUIDS2HTML 转换器将 JSON 转换为 HTML
3. 在支持的浏览器中打开生成的 HTML 文件
4. 观察不同分布方式的 Column 组件的渲染结果

## 测试数据

测试用例 JSON 结构包含多个 Column 组件，每个具有不同的分布配置：

- `distribution: "start"` - 子元素在 Column 内顶部对齐
- `distribution: "center"` - 子元素在 Column 内垂直居中
- `distribution: "end"` - 子元素在 Column 内底部对齐
- `distribution: "spaceBetween"` - 子元素在 Column 内均匀分布，首尾对齐容器边缘
- `distribution: "spaceAround"` - 子元素在 Column 内均匀分布，每个元素周围有相等的空间
- `distribution: "spaceEvenly"` - 子元素在 Column 内均匀分布，元素之间的空间相等，包括首尾

每个 Column 组件内包含多个子元素，用于测试不同分布方式的效果。

## 预期结果

1. `distribution: "start"` 的 Column 应显示所有子元素在顶部对齐
2. `distribution: "center"` 的 Column 应显示所有子元素在垂直中心对齐
3. `distribution: "end"` 的 Column 应显示所有子元素在底部对齐
4. `distribution: "spaceBetween"` 的 Column 应显示子元素之间有均等间距，首尾元素紧贴容器边缘
5. `distribution: "spaceAround"` 的 Column 应显示每个子元素周围有相等的间距，边缘间距是中间间距的一半
6. `distribution: "spaceEvenly"` 的 Column 应显示所有空间均匀分布，包括元素之间和元素与容器边缘之间的空间

## 验证点

- 验证每种分布类型是否正确应用（应映射为 CSS 的`justify-content`属性）
- 验证子元素的垂直位置是否符合对应的分布方式
- 验证具有不同分布方式的 Column 容器内子元素间距是否符合预期
- 验证当 Column 高度变化时，分布方式是否仍然正确应用

## 实际结果

<!-- 测试后填写 -->

## 测试状态

- [ ] 未测试
- [ ] 通过
- [ ] 失败

## 失败详情

<!-- 如果测试失败，在此处填写失败原因 -->

## 备注

Column 组件的分布方式属性对于控制子元素在垂直空间中的排列非常重要，特别是在创建响应式界面和具有不同高度内容的布局时。此测试验证了 Column 组件能否正确处理各种分布场景。

## 相关测试用例

- TC-CL-001：Column 组件基本布局测试
- TC-CL-002：Column 组件对齐属性测试
- TC-CL-004：Column 组件间距属性测试
