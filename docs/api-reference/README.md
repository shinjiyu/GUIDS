# GUIDS2HTML API 参考文档目录

本目录包含 GUIDS2HTML 转换器的完整 API 参考文档。文档已按照组件类型和系统功能进行分类，方便查阅和维护。

## 文档结构

```
api-reference/
├── README.md                 # 本文件
├── index.md                  # 主索引页面
├── basics.md                 # 基础知识和通用属性
├── components/               # 组件文档
│   ├── screen.md             # Screen组件
│   ├── container.md          # Container组件
│   ├── row.md                # Row组件
│   ├── column.md             # Column组件
│   ├── text.md               # Text组件
│   ├── button.md             # Button组件
│   └── image.md              # Image组件
└── systems/                  # 系统文档
    ├── layout.md             # 布局系统
    ├── style.md              # 样式系统
    ├── interaction.md        # 交互系统
    └── responsive.md         # 响应式适配
```

## 文档维护指南

### 添加新组件文档

1. 在`components`目录下创建新的 Markdown 文件，命名格式为`组件名称小写.md`
2. 使用已有组件文档作为模板
3. 更新`index.md`文件中的组件列表
4. 更新`README.md`文件中的文档结构

### 更新现有组件文档

1. 编辑相应的 Markdown 文件
2. 在文档底部的更新记录表格中添加新条目
3. 如有必要，更新相关的示例代码

### 文档格式规范

- 使用 Markdown 语法
- 组件属性使用表格形式呈现
- 示例代码使用 JSON 格式，并使用代码块标记
- 重要内容使用加粗或引用块标记
- 相关组件或系统使用链接引用
