# Column 组件阴影样式测试

## 测试目的

验证 Column 组件的阴影样式功能，确保组件能够正确应用不同类型的阴影样式。

## 测试环境

- GUIDS2HTML 转换器版本：1.0.0
- 支持的浏览器：Chrome 90+、Firefox 88+、Safari 14+

## 前置条件

1. GUIDS2HTML 转换器已正确安装和配置
2. 测试数据文件 `TC-CL-008.json` 存在且格式正确

## 测试步骤

1. 加载测试数据文件 `TC-CL-008.json`
2. 使用 GUIDS2HTML 转换器将 JSON 转换为 HTML
3. 在支持的浏览器中打开生成的 HTML 文件
4. 观察不同类型阴影样式下 Column 组件的渲染结果

## 测试数据

测试数据包含五个 Column 组件，分别使用不同类型的阴影样式：

1. 无阴影：使用 `boxShadow: "none"` 设置无阴影
2. 小阴影：使用 `boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"` 设置小阴影
3. 中等阴影：使用 `boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)"` 设置中等阴影
4. 大阴影：使用 `boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"` 设置大阴影
5. 自定义阴影：使用 `boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)"` 设置自定义阴影

## 预期结果

1. 无阴影的 Column：

   - 组件没有阴影效果
   - 边框为 1px 宽的浅灰色实线
   - 子元素为彩色背景，清晰可见
   - 子元素之间保持 8px 的间距

2. 小阴影的 Column：

   - 组件有轻微的阴影效果
   - 阴影偏移为 0px 垂直、2px 水平
   - 阴影模糊半径为 4px
   - 阴影颜色为半透明黑色（rgba(0, 0, 0, 0.1)）
   - 子元素为彩色背景，清晰可见
   - 子元素之间保持 8px 的间距

3. 中等阴影的 Column：

   - 组件有中等程度的阴影效果
   - 阴影偏移为 0px 垂直、4px 水平
   - 阴影模糊半径为 8px
   - 阴影颜色为半透明黑色（rgba(0, 0, 0, 0.15)）
   - 子元素为彩色背景，清晰可见
   - 子元素之间保持 8px 的间距

4. 大阴影的 Column：

   - 组件有明显的阴影效果
   - 阴影偏移为 0px 垂直、8px 水平
   - 阴影模糊半径为 16px
   - 阴影颜色为半透明黑色（rgba(0, 0, 0, 0.2)）
   - 子元素为彩色背景，清晰可见
   - 子元素之间保持 8px 的间距

5. 自定义阴影的 Column：

   - 组件有自定义的阴影效果
   - 阴影偏移为 0px 垂直、4px 水平
   - 阴影模糊半径为 12px
   - 阴影颜色为半透明蓝色（rgba(33, 150, 243, 0.3)）
   - 子元素为彩色背景，清晰可见
   - 子元素之间保持 8px 的间距

## 验证点

1. 每个 Column 组件是否正确应用了指定的阴影样式
2. 阴影的偏移量是否正确
3. 阴影的模糊半径是否正确
4. 阴影的颜色和透明度是否正确
5. 阴影是否与组件的圆角完美贴合
6. 子元素是否清晰可见，不受阴影影响
7. 子元素之间的间距是否正确
8. 整体布局是否美观且符合预期
9. 不同阴影样式之间的差异是否明显

## 实际结果

<!-- 测试后填写 -->

## 测试状态

- [ ] 未测试
- [ ] 通过
- [ ] 失败

## 失败详情

<!-- 如果测试失败，请在此处填写失败原因 -->

## 备注

- 此测试用例验证 Column 组件的阴影样式功能
- 测试用例使用相同尺寸的子元素，以便更好地观察阴影效果
- 所有 Column 组件使用相同的容器尺寸，便于比较不同阴影样式的效果
- 子元素使用不同的背景色，以验证阴影与内容的对比效果
- 所有组件使用相同的边框样式，以便于比较不同阴影的效果

## 相关测试用例

- TC-CL-001：Column 组件基本渲染测试
- TC-CL-002：Column 组件对齐属性测试
- TC-CL-003：Column 组件间距属性测试
- TC-CL-004：Column 组件内边距属性测试
- TC-CL-005：Column 组件背景样式测试
- TC-CL-006：Column 组件边框样式测试
- TC-CL-007：Column 组件圆角样式测试
