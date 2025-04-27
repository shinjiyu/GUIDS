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
      "type": "Container",       // 组件类型
      "position": { ... },       // 位置和尺寸信息
      "background": { ... },     // 背景定义(可选)
      "style": "styleName",      // 引用的样式名(可选)
      "children": [ ... ],       // 子组件ID数组(可选)
      "layout": { ... },         // 布局规则(可选)
      "mask": { ... },           // 遮罩定义(可选)
      "clip": { ... },           // 裁剪定义(可选)
      "interactions": { ... },   // 交互定义(可选)
      "content": "文本内容",     // 文本内容(Text组件专用)
      "source": "image.png",     // 图像源(Image组件专用)
      "adaptive": { ... }        // 自适应规则(可选)
    }
  }
}
```

#### 位置系统

位置系统定义组件的位置和尺寸：

```json
{
  "position": {
    "top": 0, // 上边距(像素/百分比/表达式)
    "left": 0, // 左边距(像素/百分比/表达式)
    "right": 0, // 右边距(像素/百分比/表达式)
    "bottom": 0, // 下边距(像素/百分比/表达式)
    "width": "auto", // 宽度(像素/百分比/auto/表达式)
    "height": "auto", // 高度(像素/百分比/auto/表达式)
    "centerX": 0, // X轴中心偏移(可选)
    "centerY": 0, // Y轴中心偏移(可选)
    "rightOf": "elementId", // 定位在指定元素右侧(可选)
    "below": "elementId", // 定位在指定元素下方(可选)
    "margin": 10, // 相对元素间距(与rightOf/below一起使用)
    "alignY": "center", // 与参考元素的Y轴对齐(top/center/bottom)
    "alignX": "center", // 与参考元素的X轴对齐(left/center/right)
    "fill": true, // 填充父容器(简写属性，可选)
    "centerIn": "parent" // 在父元素中居中(简写属性，可选)
  }
}
```

位置值可以是：

- 数字(像素值)
- 字符串百分比("50%")
- "auto"(自动计算)
- 引用表达式("componentId.right"、"safeArea.top")

#### 背景定义

```json
{
  "background": {
    "type": "color", // 背景类型(color/image/gradient)
    "value": "#2C3E50", // 颜色值(color类型)
    "source": "bg.png", // 图像源(image类型)
    "colors": ["#3498DB", "#2980B9"], // 渐变颜色(gradient类型)
    "direction": "vertical", // 渐变方向(vertical/horizontal/diagonal/radial)
    "repeat": "no-repeat", // 图像重复方式(image类型，no-repeat/repeat/repeat-x/repeat-y)
    "size": "cover" // 图像大小(image类型，cover/contain/100% 50%)
  }
}
```

#### 组件类型

| 类型        | 描述       | 特有属性                          |
| ----------- | ---------- | --------------------------------- |
| Screen      | 屏幕根容器 | adaptiveStrategy, safeArea        |
| Container   | 容器组件   | layout, clip                      |
| Button      | 按钮组件   | content, interactions             |
| Text        | 文本组件   | content, textAlign, multiline     |
| Image       | 图像组件   | source, imageType                 |
| ProgressBar | 进度条     | value, min, max, direction        |
| ScrollView  | 滚动视图   | scrollDirection, showScrollbar    |
| InputField  | 输入字段   | placeholder, inputType, maxLength |
| Toggle      | 开关组件   | checked, toggleGroup              |
| Slider      | 滑块       | value, min, max, step             |
| Custom      | 自定义组件 | customType, customProps           |

### 3. 布局系统

布局系统定义容器内子元素的排列方式：

```json
{
  "layout": {
    // 容器内元素布局规则
    "type": "stack", // 布局类型(stack/grid/free/center)
    "direction": "vertical", // 方向(vertical/horizontal)，用于stack布局
    "spacing": 20, // 元素间距(像素)
    "padding": {
      // 内边距
      "top": 30, // 上内边距
      "right": 30, // 右内边距
      "bottom": 30, // 下内边距
      "left": 30 // 左内边距
    },
    "alignment": {
      // 对齐方式
      "horizontal": "center", // 水平对齐(left/center/right)
      "vertical": "top" // 垂直对齐(top/center/bottom)
    },
    "columns": 3, // 列数(grid布局专用)
    "columnWidth": "auto", // 列宽(grid布局专用)
    "rowHeight": "auto", // 行高(grid布局专用)
    "justifyContent": "space-between", // 主轴分布(flex相关属性)
    "alignItems": "center", // 交叉轴对齐(flex相关属性)
    "wrap": "wrap" // 是否换行(nowrap/wrap)
  }
}
```

布局类型：

- `free`: 自由布局，子元素使用 position 属性定位
- `stack`: 堆叠布局，子元素按 direction 方向排列
- `grid`: 网格布局，子元素按列数和行数排列
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

### 5. 适配规则

适配规则定义 UI 在不同环境下的响应式行为：

```json
{
  "adaptationRules": [
    // 适配规则数组
    {
      "condition": {
        // 触发条件
        "minWidth": 1280, // 最小宽度(像素)
        "maxWidth": 1920, // 最大宽度(像素)
        "minHeight": 720, // 最小高度(像素)
        "maxHeight": 1080, // 最大高度(像素)
        "aspectRatio": "<1.5", // 宽高比表达式
        "orientation": "landscape", // 方向(landscape/portrait)
        "deviceType": "mobile" // 设备类型(mobile/tablet/desktop)
      },
      "adjustments": {
        // 适配调整
        "global": {
          // 全局调整
          "scale": 0.8, // 整体缩放比例
          "fontSize": "scale(0.9)" // 字体大小调整
        },
        "components": {
          // 组件特定调整
          "componentId": {
            // 组件ID
            "height": 60, // 修改后的高度
            "layout": { "direction": "vertical" }, // 修改后的布局
            "visible": false // 是否可见
          }
        },
        "repositionElements": [
          // 元素重新定位
          {
            "id": "elementId",
            "newParent": "newContainerId"
          }
        ]
      }
    }
  ]
}
```

条件表达式：

- 数值比较：`<`, `>`, `<=`, `>=`, `==`
- 宽高比表达式：`"<1.5"`, `">1.77"`
- 方向：`"landscape"`, `"portrait"`
- 设备类型：`"mobile"`, `"tablet"`, `"desktop"`

### 6. 特效与高级视觉

特效和动画系统：

```json
{
  "effectsLibrary": {
    // 特效库
    "effectName": {
      // 特效名称
      "type": "glow", // 特效类型(glow/blur/shadow/etc)
      "color": "#FFCC00", // 特效颜色
      "intensity": 0.5, // 特效强度
      "size": 10 // 特效大小
    }
  },
  "transitions": {
    // 过渡动画
    "transitionName": {
      // 过渡名称
      "type": "animation", // 过渡类型
      "duration": 0.3, // 持续时间(秒)
      "easing": "easeOutQuad", // 缓动函数
      "keyframes": [
        // 关键帧数组
        {
          "time": 0, // 时间点(0-1)
          "opacity": 0, // 透明度
          "translateY": 20, // Y轴平移
          "scale": 0.8, // 缩放
          "rotate": 0 // 旋转(度)
        },
        {
          "time": 1, // 结束时间点
          "opacity": 1, // 结束透明度
          "translateY": 0, // 结束Y轴平移
          "scale": 1.0, // 结束缩放
          "rotate": 0 // 结束旋转
        }
      ]
    }
  }
}
```

应用特效和过渡：

```json
{
  "components": {
    "heroButton": {
      "type": "Button",
      "effects": ["glowEffect"], // 应用特效
      "transitions": {
        "appear": "fadeInTransition", // 出现过渡
        "disappear": "fadeOutTransition", // 消失过渡
        "stateChange": "pulseTransition" // 状态变化过渡
      }
    }
  }
}
```

### 7. 交互定义

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
    },
    "onHover": {
      // 悬停事件
      "action": "playSound", // 行为名称
      "params": {
        // 行为参数
        "sound": "hover.mp3"
      }
    },
    "onDrag": {
      // 拖拽事件
      "action": "moveElement",
      "params": {
        "constraints": "horizontal"
      }
    },
    "onRelease": {}, // 释放事件
    "onValueChange": {}, // 值变化事件(InputField, Slider等)
    "onFocus": {}, // 获得焦点事件
    "onBlur": {} // 失去焦点事件
  }
}
```

行为类型：

- UI 行为：`"showElement"`, `"hideElement"`, `"toggleElement"`, `"navigateTo"`
- 系统行为：`"playSound"`, `"vibrate"`, `"openURL"`
- 游戏行为：自定义行为，如`"startGame"`, `"pauseGame"`, `"loadLevel"`

### 8. 元素遮罩和裁剪

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

遮罩类型：

- `circle`: 圆形遮罩，需要 radius 参数
- `rectangle`: 矩形遮罩，可指定 width/height 或使用元素边界
- `ellipse`: 椭圆形遮罩，需要 radiusX 和 radiusY 参数
- `roundedRect`: 圆角矩形，需要指定 radius 或 radiusTopLeft 等参数
- `custom`: 自定义遮罩，使用图像源作为遮罩

### 9. 资源管理与优化

资源管理系统：

```json
{
  "assets": {
    // 资源管理
    "atlases": [
      // 图集定义
      {
        "name": "uiAtlas", // 图集名称
        "sources": [
          // 源图像路径(支持glob模式)
          "assets/buttons/*.png",
          "assets/icons/*.png"
        ],
        "maxSize": 2048, // 最大尺寸
        "padding": 2, // 图像间距
        "allowRotation": true, // 是否允许旋转
        "powerOfTwo": true, // 是否强制2的幂次方尺寸
        "quality": "high" // 质量设置(low/medium/high)
      }
    ],
    "fonts": [
      // 字体定义
      {
        "name": "mainFont",
        "source": "fonts/Arial.ttf",
        "sizes": [12, 16, 24, 32], // 预生成尺寸
        "styles": ["normal", "bold"] // 预生成样式
      }
    ],
    "preload": [
      // 预加载资源列表
      "uiAtlas",
      "assets/backgrounds/main.jpg"
    ],
    "lazyLoad": [
      // 延迟加载资源列表
      "assets/avatars/*.png"
    ]
  }
}
```

## 扩展性

GUIDS 设计了扩展机制，允许添加自定义属性：

```json
{
  "components": {
    "customElement": {
      "type": "Custom",
      "customType": "MyCustomWidget",
      "customProps": {
        "prop1": "value1",
        "prop2": 123
      },
      "_unitySpecific": {
        // 引擎特定属性(前缀为下划线)
        "renderMode": "WorldSpace"
      },
      "_ueSpecific": {
        "widgetClass": "MyCustomWidgetBP"
      }
    }
  }
}
```

引擎特定的扩展使用下划线前缀，如`_unitySpecific`、`_ueSpecific`、`_cocosSpecific`等。

## 数据绑定

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

GUIDS 提供了一种全面、灵活且可扩展的方式来描述游戏 UI。通过统一的描述格式，开发者可以一次设计，多处部署，大大简化跨平台游戏 UI 开发流程。

本规范仍在发展中，欢迎社区贡献和反馈。
