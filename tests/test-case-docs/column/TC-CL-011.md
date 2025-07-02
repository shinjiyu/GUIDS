# 测试用例：TC-CL-011

## 测试目的

验证 Column 组件及其子元素在 visible 属性为 false 时的隐藏效果，以及动态切换 visible 属性时的显示/隐藏表现。

## 测试环境

- GUIDS2HTML 转换器版本：1.0.0 或更高
- 支持的浏览器：Chrome 90+, Firefox 90+, Safari 14+, Edge 90+

## 前提条件

- 已正确安装和配置 GUIDS2HTML 转换器
- 已准备好测试用例 JSON 文件 `tests/data/components/column/TC-CL-011.json`

## 测试步骤

1. 加载测试用例 JSON 文件
2. 使用 GUIDS2HTML 转换器将 JSON 转换为 HTML
3. 在支持的浏览器中打开生成的 HTML 文件
4. 观察 Column 组件及其子元素的显示与隐藏效果

## 测试数据

测试用例 JSON 结构包含：

- visible 属性为 false 的 Column 组件
- visible 属性为 false 的 Column 子元素
- 动态切换 visible 属性的场景（如通过交互切换）

## 预期结果

1. visible 为 false 的 Column 组件及其内容应完全隐藏，不占据布局空间
2. visible 为 false 的子元素应被隐藏，其余子元素正常排列
3. 动态切换 visible 属性时，显示/隐藏效果应立即生效且无残影

## 验证点

- 验证 Column 及其子元素的隐藏/显示效果
- 验证隐藏元素不占据布局空间
- 验证动态切换 visible 属性的实时性

## 实际结果

<!-- 测试后填写 -->

## 测试状态

- [ ] 未测试
- [ ] 通过
- [ ] 失败

## 失败详情

<!-- 如果测试失败，在此处填写失败原因 -->

## 备注

隐藏与显示是 UI 交互的基础能力，本用例验证 Column 组件及其子元素的 visible 属性支持情况。

## 相关测试用例

- TC-CL-001：Column 组件基本布局测试
- TC-CL-010：Column 组件极端尺寸测试
