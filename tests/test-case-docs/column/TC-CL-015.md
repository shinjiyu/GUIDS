# 测试用例：TC-CL-015

## 测试目的

验证 Column 组件及其子元素的交互属性（如 onClick）配置和触发效果，确保交互事件能正确绑定和响应。

## 测试环境

- GUIDS2HTML 转换器版本：1.0.0 或更高
- 支持的浏览器：Chrome 90+, Firefox 90+, Safari 14+, Edge 90+

## 前提条件

- 已正确安装和配置 GUIDS2HTML 转换器
- 已准备好测试用例 JSON 文件 `tests/data/components/column/TC-CL-015.json`

## 测试步骤

1. 加载测试用例 JSON 文件
2. 使用 GUIDS2HTML 转换器将 JSON 转换为 HTML
3. 在支持的浏览器中打开生成的 HTML 文件
4. 点击 Column 组件及其子元素，观察交互事件的触发效果

## 测试数据

测试用例 JSON 结构包含：

- 配置 onClick 事件的 Column 组件
- 配置 onClick 事件的 Column 子元素（如 Button、Text 等）
- 不同事件参数和行为（如 navigateTo、openURL、自定义事件等）

## 预期结果

1. 配置了 onClick 的 Column 组件被点击时应触发对应事件
2. 配置了 onClick 的子元素被点击时应触发各自的事件，且不影响父组件
3. 事件参数和行为应按 JSON 配置正确传递和执行

## 验证点

- 验证 Column 及其子元素的 onClick 事件绑定和触发
- 验证事件参数的正确性
- 验证父子组件事件的独立性

## 实际结果

<!-- 测试后填写 -->

## 测试状态

- [ ] 未测试
- [ ] 通过
- [ ] 失败

## 失败详情

<!-- 如果测试失败，在此处填写失败原因 -->

## 备注

交互属性是 UI 组件响应用户操作的基础能力，本用例验证 Column 组件及其子元素的 onClick 事件支持情况。

## 相关测试用例

- TC-CL-001：Column 组件基本布局测试
- TC-CL-014：Column 组件与 Row 组件组合布局测试
