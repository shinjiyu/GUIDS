# GUIDS: 游戏 UI 描述系统规范

版本: 1.0

## 简介

GUIDS(Game UI Description System)是一种用于描述游戏 UI 的 JSON 格式规范，旨在提供一种引擎无关的方式来定义 UI 布局、样式、交互和适配策略。本文档详细说明了 GUIDS 规范的各个部分及其用法。

## 文件结构

GUIDS 描述文件采用 JSON 格式，顶层结构如下：

```json
{
  "version": "1.0",
  "name": "UIName",
  "designReference": { ... },
  "root": "rootComponentId",
  "components": { ... },
  "styles": { ... },
  "adaptationRules": [ ... ],
  "effectsLibrary": { ... },
  "transitions": { ... },
  "assets": { ... }
}
```

## 详细规范

### 1. 核心概念

```json
{
  "version": "1.0", // 描述文件版本号，用于兼容性检查
  "name": "MainMenuUI", // UI描述文件名称，用于标识
  "designReference": {
    // 设计参考基准
    "width": 1920, // 设计参考宽度(像素)
    "height": 1080, // 设计参考高度(像素)
    "ppi": 96 // 设计参考像素密度(可选)
  },
  "root": "mainScreen" // 根元素ID，指向components中定义的组件
}
```

| 字段                   | 类型   | 必填 | 描述               |
| ---------------------- | ------ | ---- | ------------------ |
| version                | String | 是   | 描述文件格式版本   |
| name                   | String | 是   | UI 名称            |
| designReference        | Object | 是   | 设计基准信息       |
| designReference.width  | Number | 是   | 设计基准宽度(像素) |
| designReference.height | Number | 是   | 设计基准高度(像素) |
| designReference.ppi    | Number | 否   | 设计基准像素密度   |
| root                   | String | 是   | 根组件 ID          |

### 2. 组件定义

组件是 UI 的基本构建块，定义在`components`对象中：

```json
{
  "components": {                // 所有UI组件的集合
    "componentId": {             // 组件唯一标识符
      "type": "Column",         // 组件类型
      "position": { ... },       // 位置和尺寸信息
      "background": { ... },     // 背景定义(可选)
      "style": "styleName",     // 引用的样式名(可选)
      "children": [ ... ],       // 子组件ID数组(可选)
      "layout": { ... },         // 布局规则(可选)
      "mask": { ... },           // 遮罩定义(可选)
      "clip": { ... },           // 裁剪定义(可选)
      "interactions": { ... },   // 交互定义(可选)
      "content": "文本内容",     // 文本内容(Text/Button组件专用)
      "source": "image.png"     // 图像源(Image组件专用)
    }
  }
}
```

#### 组件类型（与 guids2html.js 一致）

| 类型        | 描述         | 特有属性                          |
| ----------- | ------------ | --------------------------------- |
| Screen      | 屏幕根容器   | adaptiveStrategy, safeArea        |
| Container   | 容器组件     | layout, clip                      |
| Row         | 水平布局容器 | layout, children                  |
| Column      | 垂直布局容器 | layout, children                  |
| Button      | 按钮组件     | content, interactions             |
| Text        | 文本组件     | content, textAlign                |
| Image       | 图像组件     | source, imageType                 |
| ProgressBar | 进度条       | value, min, max, direction        |
| ScrollView  | 滚动视图     | scrollDirection, showScrollbar    |
| InputField  | 输入字段     | placeholder, inputType, maxLength |

|
| Toggle | 暂未实现 | |
| Slider | 暂未实现 | |
| Custom | 暂未实现 | |

> 说明：如需支持更多组件类型，请先扩展 guids2html.js 的实现。

#### 通用属性

- id: 组件唯一标识符
- type: 组件类型（如上表）
- position: 位置和尺寸（top, left, right, bottom, width, height, ...）
- background: 背景定义（color/image/gradient）
- style: 引用的样式名或样式对象
- children: 子组件 ID 数组（容器类组件专用）
- layout: 布局规则（容器类组件专用）
- mask: 遮罩定义（可选）
- clip: 裁剪定义（可选）
- interactions: 交互定义（如 onClick）
- content: 文本内容（Text/Button 专用）
- source: 图像源（Image 专用）

#### 组件属性详解

- **Screen**: 支持 children、layout、background、style、mask、clip、interactions、adaptiveStrategy、safeArea
- **Container**: 支持 children、layout、background、style、mask、clip、interactions
- **Row/Column**: 支持 children、layout、background、style、mask、clip、interactions
- **Button**: 支持 content、background、style、interactions、mask、clip
- **Text**: 支持 content、textAlign、background、style、mask、clip
- **Image**: 支持 source、background、style、mask、clip
- **ProgressBar**: 支持 value、min、max、direction、background、style、mask、clip
- **ScrollView**: 支持 children、layout、background、style、mask、clip、scrollDirection、showScrollbar
- **InputField**: 支持 placeholder、inputType、maxLength、background、style、mask、clip、interactions

### 3. 布局系统

布局系统定义容器内子元素的排列方式：

```json
{
  "layout": {
    // 容器内元素布局规则
    "type": "stack", // 布局类型(stack/grid/free/center/row/column)
    "direction": "vertical", // 方向(vertical/horizontal)，用于stack布局
    "spacing": 20, // 元素间距(像素)
    "padding": {
      // 内边距
      "top": 30,
      "right": 30,
      "bottom": 30,
      "left": 30
    },
    "alignment": {
      // 对齐方式
      "horizontal": "center", // 水平对齐(left/center/right)
      "vertical": "top" // 垂直对齐(top/center/bottom)
    },
    "wrap": "wrap" // 是否换行(nowrap/wrap)
  }
}
```

布局类型：

- `free`: 自由布局，子元素使用 position 属性定位
- `stack`: 堆叠布局，子元素按 direction 方向排列
- `row`: 水平布局（Row 组件专用）
- `column`: 垂直布局（Column 组件专用）
- `center`: 居中布局，所有子元素在容器中居中

### 4. 视觉样式

样式系统允许定义可重用的视觉样式：

```json
{
  "styles": {
    // 样式定义集合
    "styleName": {
      // 样式名称
      "extends": "parentStyle", // 继承自其他样式(可选)
      "fontFamily": "Arial", // 字体系列
      "fontSize": 24, // 字体大小
      "fontWeight": "bold", // 字体粗细(normal/bold)
      "textColor": "#FFFFFF", // 文本颜色
      "textAlign": "center", // 文本对齐(left/center/right)
      "background": {
        // 背景定义
        "type": "gradient", // 背景类型
        "colors": [], // 颜色数组(渐变专用)
        "direction": "vertical" // 渐变方向
      },
      "cornerRadius": 8, // 圆角半径
      "border": {
        // 边框定义
        "width": 1, // 边框宽度
        "color": "#000000", // 边框颜色
        "style": "solid" // 边框样式(solid/dashed/dotted)
      },
      "shadow": {
        // 阴影定义
        "color": "#000000", // 阴影颜色
        "offsetX": 2, // X轴偏移
        "offsetY": 2, // Y轴偏移
        "blur": 4 // 模糊半径
      },
      "opacity": 1.0, // 透明度(0-1)
      "visible": true, // 可见性
      "padding": {
        // 内边距
        "top": 10,
        "right": 20,
        "bottom": 10,
        "left": 20
      },
      "margin": {
        // 外边距
        "top": 5,
        "right": 10,
        "bottom": 5,
        "left": 10
      },
      "states": {
        // 状态样式定义
        "hover": {
          // 悬停状态样式
          "background": {
            "type": "color",
            "value": "#3498DB"
          },
          "scale": 1.05
        },
        "pressed": {
          // 按下状态样式
          "background": {
            "type": "color",
            "value": "#2980B9"
          },
          "scale": 0.95
        },
        "disabled": {
          // 禁用状态样式
          "opacity": 0.5,
          "textColor": "#CCCCCC"
        }
      }
    }
  }
}
```

样式可以应用于任何组件，组件也可以覆盖样式中的部分属性。

### 5. 交互定义

交互系统定义组件的行为：

```json
{
  "interactions": {
    // 交互定义
    "onClick": {
      // 点击事件
      "action": "startGame", // 行为名称
      "params": {
        // 行为参数
        "param1": "value1"
      }
    }
  }
}
```

行为类型：

- UI 行为：`"showElement"`, `"hideElement"`, `"toggleElement"`, `"navigateTo"`
- 系统行为：`"playSound"`, `"vibrate"`, `"openURL"`
- 游戏行为：自定义行为，如`"startGame"`, `"pauseGame"`, `"loadLevel"`

### 6. 遮罩和裁剪

遮罩和裁剪定义：

```json
{
  "mask": {
    // 遮罩定义
    "type": "circle", // 遮罩类型(circle/rectangle/ellipse/roundedRect/custom)
    "params": {
      // 遮罩参数
      "radius": "50%" // 圆形遮罩半径
    },
    "source": "maskImage.png", // 自定义遮罩图像(custom类型专用)
    "feather": 0, // 边缘虚化程度
    "invertMask": false // 是否反转遮罩
  },
  "clip": {
    // 裁剪定义
    "enabled": true, // 是否启用裁剪
    "region": "bounds", // 裁剪区域(bounds/custom)
    "custom": {
      // 自定义裁剪区域
      "top": 5, // 上边界
      "right": 5, // 右边界
      "bottom": 5, // 下边界
      "left": 5 // 左边界
    },
    "softness": 0 // 边缘柔和度
  }
}
```

### 7. 数据绑定

数据绑定允许将 UI 元素与数据源连接：

```json
{
  "components": {
    "playerNameLabel": {
      "type": "Text",
      "content": "{playerData.name}", // 绑定表达式
      "visible": "{playerData.isActive}"
    },
    "healthBar": {
      "type": "ProgressBar",
      "value": "{playerData.health / playerData.maxHealth}",
      "adaptive": {
        "visibilityRules": [
          {
            "condition": "{playerData.health > 0}",
            "visible": true
          }
        ]
      }
    }
  }
}
```

## 结论

本规范与 guids2html.js 实现保持一致，后续如有扩展请同步更新本文件。
