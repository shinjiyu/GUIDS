# Column 组件内边距属性测试

## 测试目的

验证 Column 组件的内边距属性（padding）功能，确保组件能够正确应用不同的内边距值。

## 测试环境

- GUIDS2HTML 转换器版本：1.0.0
- 支持的浏览器：Chrome 90+、Firefox 88+、Safari 14+

## 前置条件

1. GUIDS2HTML 转换器已正确安装和配置
2. 测试数据文件 `TC-CL-004.json` 存在且格式正确

## 测试步骤

1. 加载测试数据文件 `TC-CL-004.json`
2. 使用 GUIDS2HTML 转换器将 JSON 转换为 HTML
3. 在支持的浏览器中打开生成的 HTML 文件
4. 观察不同内边距值下 Column 组件的渲染结果

## 测试数据

测试数据包含四个 Column 组件，分别使用不同的内边距值：

1. 0px：无内边距
2. 8px：小内边距
3. 16px：中等内边距
4. 32px：大内边距

## 预期结果

1. 无内边距（0px）的 Column：

   - 子元素紧贴容器边缘
   - 子元素之间保持 8px 的间距
   - 子元素保持原有尺寸

2. 小内边距（8px）的 Column：

   - 子元素与容器边缘保持 8px 的距离
   - 子元素之间保持 8px 的间距
   - 子元素保持原有尺寸

3. 中等内边距（16px）的 Column：

   - 子元素与容器边缘保持 16px 的距离
   - 子元素之间保持 8px 的间距
   - 子元素保持原有尺寸

4. 大内边距（32px）的 Column：
   - 子元素与容器边缘保持 32px 的距离
   - 子元素之间保持 8px 的间距
   - 子元素保持原有尺寸

## 验证点

1. 每个 Column 组件是否正确应用了指定的内边距值
2. 子元素与容器边缘的距离是否符合预期
3. 子元素之间的间距是否保持 8px
4. 子元素的尺寸是否正确
5. 整体布局是否美观且符合预期
6. 不同内边距值之间的差异是否明显

## 实际结果

<!-- 测试后填写 -->

## 测试状态

- [ ] 未测试
- [ ] 通过
- [ ] 失败

## 失败详情

<!-- 如果测试失败，请在此处填写失败原因 -->

## 备注

- 此测试用例验证 Column 组件的内边距属性功能
- 测试用例使用相同尺寸的子元素，以便更好地观察内边距效果
- 所有 Column 组件使用相同的容器尺寸，便于比较不同内边距值的效果
- 子元素之间的间距统一设置为 8px，以区分内边距和间距的效果

## 相关测试用例

- TC-CL-001：Column 组件基本渲染测试
- TC-CL-002：Column 组件对齐属性测试
- TC-CL-003：Column 组件间距属性测试
