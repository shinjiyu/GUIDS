# 基础知识

## 基本概念

GUIDS2HTML 是一个将 GUIDS UI 描述文件转换为 HTML、CSS 和 JavaScript 的工具。本文档介绍 GUIDS 格式的基本概念和通用属性。

### 项目结构

一个典型的 GUIDS UI 描述文件结构如下：

```json
{
  "version": "1.0",
  "name": "示例UI",
  "designReference": {
    "width": 1200,
    "height": 800
  },
  "root": "mainScreen",
  "components": {
    "mainScreen": {
      "type": "Screen",
      "children": ["container1", "container2"]
    },
    "container1": {
      "type": "Container",
      "position": {
        "width": 300,
        "height": 200
      }
    },
    "container2": {
      "type": "Text",
      "content": "Hello World"
    }
  },
  "styles": {
    "primaryButton": {
      "backgroundColor": "#4CAF50"
    }
  }
}
```

GUIDS 文件包含以下主要部分：

- `version`: GUIDS 格式版本
- `name`: UI 界面名称
- `designReference`: 设计参考尺寸
- `root`: 根组件 ID
- `components`: 组件定义集合
- `styles`: 全局样式定义集合

## 通用属性

所有组件通用的基础属性：

| 属性名         | 类型    | 说明             | 默认值     |
| -------------- | ------- | ---------------- | ---------- |
| `id`           | String  | 组件唯一标识符   | 无（必填） |
| `type`         | String  | 组件类型         | 无（必填） |
| `position`     | Object  | 位置和尺寸配置   | 无         |
| `background`   | Object  | 背景配置         | 无         |
| `style`        | String  | 引用样式 ID      | 无         |
| `cornerRadius` | Number  | 圆角半径（像素） | 0          |
| `opacity`      | Number  | 不透明度 (0-1)   | 1          |
| `visible`      | Boolean | 是否可见         | true       |
| `children`     | Array   | 子组件 ID 列表   | []         |
| `interactions` | Object  | 交互行为配置     | 无         |
| `layout`       | Object  | 布局配置         | 无         |
| `mask`         | Object  | 遮罩配置         | 无         |
| `clip`         | Object  | 裁剪配置         | 无         |

### position 对象

| 属性名      | 类型          | 说明                 | 默认值 |
| ----------- | ------------- | -------------------- | ------ |
| `top`       | Number/String | 上边距               | 无     |
| `left`      | Number/String | 左边距               | 无     |
| `right`     | Number/String | 右边距               | 无     |
| `bottom`    | Number/String | 下边距               | 无     |
| `width`     | Number/String | 宽度                 | 无     |
| `height`    | Number/String | 高度                 | 无     |
| `centerIn`  | String        | 居中对齐（"parent"） | 无     |
| `centerX`   | Boolean       | 水平居中             | false  |
| `centerY`   | Boolean       | 垂直居中             | false  |
| `fill`      | Boolean       | 填充父容器           | false  |
| `maxWidth`  | Number/String | 最大宽度             | 无     |
| `minWidth`  | Number/String | 最小宽度             | 无     |
| `maxHeight` | Number/String | 最大高度             | 无     |
| `minHeight` | Number/String | 最小高度             | 无     |

### background 对象

| 属性名      | 类型   | 说明                                                             | 默认值      |
| ----------- | ------ | ---------------------------------------------------------------- | ----------- |
| `type`      | String | 背景类型（"color"/"image"/"gradient"）                           | 无（必填）  |
| `value`     | String | 当 type="color"时的颜色值                                        | 无          |
| `source`    | String | 当 type="image"时的图片 URL                                      | 无          |
| `repeat`    | String | 当 type="image"时的重复模式                                      | "no-repeat" |
| `size`      | String | 当 type="image"时的尺寸模式                                      | "cover"     |
| `colors`    | Array  | 当 type="gradient"时的颜色列表                                   | 无          |
| `direction` | String | 当 type="gradient"时的方向（"vertical"/"horizontal"/"diagonal"） | "vertical"  |

## 架构概述

GUIDS2HTML 转换器的基本工作流程如下：

1. 解析 GUIDS JSON 文件
2. 验证组件结构和属性
3. 构建组件树
4. 处理样式和布局
5. 生成 HTML、CSS 和 JavaScript 代码
6. 输出最终结果

转换器支持多种组件类型，每种组件类型都有特定的属性和渲染方式。具体的组件类型和属性，请参阅各个组件的文档。
