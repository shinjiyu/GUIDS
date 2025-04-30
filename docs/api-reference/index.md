# GUIDS2HTML API 参考文档

GUIDS2HTML 是一个将 GUI 描述 JSON 转换为 HTML 的工具，本文档提供了完整的 API 参考。

## 基础知识

在深入了解各个组件之前，建议先阅读以下基础文档：

- [基础知识和通用属性](./basics.md) - 了解通用概念和所有组件共享的属性

## 组件

GUIDS2HTML 支持以下组件类型：

### 容器组件

这些组件用于布局和组织其他组件：

- [Screen](./components/screen.md) - 顶层屏幕容器
- [Container](./components/container.md) - 通用容器组件
- [Row](./components/row.md) - 水平布局容器
- [Column](./components/column.md) - 垂直布局容器

### 内容组件

这些组件用于显示内容：

- [Text](./components/text.md) - 文本组件
- [Image](./components/image.md) - 图像组件
- [Button](./components/button.md) - 按钮组件

## 系统

除了组件 API，GUIDS2HTML 还提供了以下系统级功能：

- [布局系统](./systems/layout.md) - 了解布局原理和高级布局技术
- [样式系统](./systems/style.md) - 样式属性和主题定制
- [交互系统](./systems/interaction.md) - 事件处理和用户交互
- [响应式适配](./systems/responsive.md) - 创建响应式 UI

## 快速入门

如果您是首次使用 GUIDS2HTML，建议查看以下文档：

1. [安装指南](/docs/getting-started/installation.md)
2. [快速入门](/docs/getting-started/quickstart.md)
3. [基本概念](/docs/getting-started/concepts.md)

## 版本信息

当前 API 文档适用于 GUIDS2HTML v1.0.0 及以上版本。

## 文档结构

- [基础知识](./basics.md)

  - 基本概念
  - 通用属性
  - 架构概述

- **组件参考**

  - [Screen 组件](./components/screen.md)
  - [Container 组件](./components/container.md)
  - [Row 组件](./components/row.md)
  - [Column 组件](./components/column.md)
  - [Text 组件](./components/text.md)
  - [Button 组件](./components/button.md)
  - [Image 组件](./components/image.md)

- **系统参考**
  - [布局系统](./systems/layout.md)
  - [样式系统](./systems/style.md)
  - [交互系统](./systems/interaction.md)
  - [响应式适配](./systems/responsive.md)

## 示例代码

完整的 UI 界面定义示例可在[示例目录](../../examples/)中找到。

## 更新记录

| 日期       | 版本  | 更新内容                    |
| ---------- | ----- | --------------------------- |
| YYYY-MM-DD | 1.0.0 | 初始文档版本                |
| YYYY-MM-DD | 1.1.0 | 添加 Row 和 Column 组件文档 |
