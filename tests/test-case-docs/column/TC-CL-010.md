# 测试用例：TC-CL-010

## 测试目的

验证 Column 组件在极端尺寸（如极小、极大、零宽高、超大数值）下的布局和渲染表现，确保不会出现溢出、错位或渲染异常。

## 测试环境

- GUIDS2HTML 转换器版本：1.0.0 或更高
- 支持的浏览器：Chrome 90+, Firefox 90+, Safari 14+, Edge 90+

## 前提条件

- 已正确安装和配置 GUIDS2HTML 转换器
- 已准备好测试用例 JSON 文件 `tests/data/components/column/TC-CL-010.json`

## 测试步骤

1. 加载测试用例 JSON 文件
2. 使用 GUIDS2HTML 转换器将 JSON 转换为 HTML
3. 在支持的浏览器中打开生成的 HTML 文件
4. 观察 Column 组件在极端尺寸下的渲染结果

## 测试数据

测试用例 JSON 结构包含多种极端尺寸的 Column 组件：

- 宽度/高度为 0 的 Column
- 宽度/高度为极大值（如 10000px）的 Column
- 宽度/高度为负数或非法值的 Column
- 同时测试 minWidth/maxWidth、minHeight/maxHeight 的边界情况

## 预期结果

1. 宽高为 0 的 Column 不应显示内容或不应报错
2. 极大尺寸的 Column 应能正常渲染且不影响其它布局
3. 非法尺寸值应被忽略或安全降级，不应导致页面崩溃
4. min/max 限制应被正确应用

## 验证点

- 验证 Column 在极端尺寸下的渲染表现
- 验证 minWidth/maxWidth、minHeight/maxHeight 的生效情况
- 验证非法尺寸输入的容错能力

## 实际结果

<!-- 测试后填写 -->

## 测试状态

- [ ] 未测试
- [ ] 通过
- [ ] 失败

## 失败详情

<!-- 如果测试失败，在此处填写失败原因 -->

## 备注

极端尺寸测试有助于发现布局引擎的边界问题和容错能力，保障 UI 稳定性。

## 相关测试用例

- TC-CL-001：Column 组件基本布局测试
- TC-CL-009：Column 组件嵌套测试
