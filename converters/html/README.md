# GUIDS to HTML Converter

GUIDS2HTML 是一个将 GUIDS UI 描述文件转换为 HTML、CSS 和 JavaScript 的工具，用于快速实现和预览 UI 设计。

## 功能特点

- 将 GUIDS 格式的 UI 描述转换为标准 HTML/CSS/JS
- 支持响应式设计和自适应布局
- 支持状态和交互效果
- 支持各种基础组件和布局类型

## 支持的组件

GUIDS2HTML 目前支持以下组件类型：

- **Screen**: 屏幕/页面容器，作为 UI 的根组件
- **Container**: 通用容器，用于布局和组织其他组件
- **Row**: 水平布局容器，基于 Flexbox 实现行布局
- **Column**: 垂直布局容器，基于 Flexbox 实现列布局
- **Button**: 按钮组件，支持点击事件和状态效果
- **Text**: 文本组件，用于显示文本内容
- **Image**: 图像组件，支持各种图像资源

## 使用方法

### 命令行使用

```bash
node cli.js -i <输入文件路径> -o <输出文件路径> [选项]
```

#### 参数说明

- `-i, --input`: 输入 GUIDS JSON 文件路径
- `-o, --output`: 输出 HTML 文件路径
- `-s, --inline-styles`: 使用内联样式（默认为 true）
- `-r, --responsive`: 启用响应式缩放（默认为 true）
- `-m, --modern`: 使用现代 CSS 特性（默认为 true）
- `-h, --help`: 显示帮助信息

### 示例

转换简单按钮设计：

```bash
node cli.js -i ../../examples/simple_button.json -o ./output/simple_button.html
```

转换主菜单设计，使用外部样式表：

```bash
node cli.js -i ../../examples/main_menu.json -o ./output/main_menu.html --inline-styles=false
```

转换布局示例，使用 Row 和 Column 组件：

```bash
node cli.js -i ../../examples/layout_example.json -o ./output/layout_example.html
```

### 编程方式使用

```javascript
const GUIDS2HTML = require("./guids2html");
const fs = require("fs");

// 读取 GUIDS 定义
const guidsDef = JSON.parse(fs.readFileSync("input.json", "utf8"));

// 创建转换器实例
const converter = new GUIDS2HTML(guidsDef, {
  inlineStyles: true,
  responsiveScaling: true,
  useModernFeatures: true,
  generateWrapper: true,
});

// 生成 HTML
const html = converter.generate();

// 输出 HTML
fs.writeFileSync("output.html", html, "utf8");
```

## 布局系统

GUIDS2HTML 支持多种布局方式：

1. **Flex 布局**

   - 使用 Row 和 Column 组件实现灵活的行/列布局
   - 支持对齐、分布和间距控制
   - 基于 CSS Flexbox 实现

2. **堆叠布局**

   - 通过设置 Container 组件的 layout.type = "stack"
   - 可以实现水平或垂直堆叠
   - 控制对齐方式和间距

3. **绝对定位**
   - 通过设置组件的 position 属性
   - 支持相对于父容器的定位

## 布局示例

### Row（行布局）

```json
{
  "type": "Row",
  "layout": {
    "type": "row",
    "spacing": 10,
    "alignment": "center",
    "distribution": "space-between"
  },
  "children": ["item1", "item2", "item3"]
}
```

### Column（列布局）

```json
{
  "type": "Column",
  "layout": {
    "type": "column",
    "spacing": 20,
    "alignment": "stretch"
  },
  "children": ["item1", "item2", "item3"]
}
```

## 响应式设计

GUIDS2HTML 支持两种响应式设计方法：

1. **自适应缩放**：通过设置 Screen 组件的 adaptiveStrategy 属性

   - "fitWidth"：基于宽度缩放整个 UI
   - "fitHeight"：基于高度缩放整个 UI

2. **断点适配**：通过 adaptationRules 定义不同屏幕宽度下的样式和布局调整

## 贡献

欢迎贡献代码、报告问题或提出改进建议。可以通过以下方式参与：

1. 提交 Issue
2. 提交 Pull Request
3. 改进文档
4. 添加新功能

## 开发计划

- 完善所有基础组件
- 增强布局系统
- 添加更多交互支持
- 优化输出代码
- 提供可视化编辑器
