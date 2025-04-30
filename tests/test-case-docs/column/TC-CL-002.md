# 测试用例：TC-CL-002

## 测试目的

验证 Column 组件是否能正确应用不同的对齐属性，以控制子元素在水平方向上的对齐方式。

## 测试环境

- GUIDS2HTML 转换器版本：1.0.0 或更高
- 支持的浏览器：Chrome 90+, Firefox 90+, Safari 14+, Edge 90+

## 前提条件

- 已正确安装和配置 GUIDS2HTML 转换器
- 已准备好测试用例 JSON 文件 `tests/data/components/column/TC-CL-002.json`

## 测试步骤

1. 加载测试用例 JSON 文件
2. 使用 GUIDS2HTML 转换器将 JSON 转换为 HTML
3. 在支持的浏览器中打开生成的 HTML 文件
4. 观察不同对齐方式的 Column 组件的渲染结果

## 测试数据

测试用例 JSON 结构包含多个 Column 组件，每个具有不同的对齐配置：

- `alignment: "start"` - 子元素在 Column 内左对齐
- `alignment: "center"` - 子元素在 Column 内居中对齐
- `alignment: "end"` - 子元素在 Column 内右对齐
- `alignment: "stretch"` - 子元素在水平方向上拉伸以填满整个 Column 的宽度

每个 Column 组件内包含多个子元素，具有不同的宽度，用于测试对齐效果。

## 预期结果

1. `alignment: "start"` 的 Column 应显示所有子元素在左侧对齐
2. `alignment: "center"` 的 Column 应显示所有子元素在水平中心对齐
3. `alignment: "end"` 的 Column 应显示所有子元素在右侧对齐
4. `alignment: "stretch"` 的 Column 应显示所有子元素被拉伸至与 Column 相同的宽度（除非子元素有固定宽度）

## 验证点

- 验证每种对齐类型是否正确应用（应映射为 CSS 的`align-items`属性）
- 验证子元素的位置是否符合对应的对齐方式
- 验证拉伸对齐时，子元素是否正确扩展到容器宽度
- 验证不同宽度的子元素在各种对齐模式下是否正确渲染

## 实际结果

<!-- 测试后填写 -->

## 测试状态

- [ ] 未测试
- [ ] 通过
- [ ] 失败

## 失败详情

<!-- 如果测试失败，在此处填写失败原因 -->

## 备注

Column 组件的对齐属性对于创建具有良好视觉层次结构和对齐的界面至关重要。能够控制子元素的水平对齐是实现各种设计模式的基础。

## 相关测试用例

- TC-CL-001：Column 组件基本布局测试
- TC-CL-003：Column 组件分布方式属性测试
- TC-CL-004：Column 组件间距属性测试
