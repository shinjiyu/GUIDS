# GUIDS2HTML 组件规范

本文档详细说明 GUIDS2HTML 转换器支持的组件类型、属性和使用方法，为开发者提供完整的组件参考。

## 基础组件

### Screen

屏幕是 UI 描述的根容器，代表整个应用的一个界面。

```json
{
  "type": "Screen",
  "id": "mainScreen",
  "width": 375,
  "height": 812,
  "backgroundColor": "#FFFFFF",
  "children": []
}
```

**属性说明：**

| 属性名          | 类型   | 必填 | 描述                          |
| --------------- | ------ | ---- | ----------------------------- |
| type            | String | 是   | 固定为 "Screen"               |
| id              | String | 是   | 屏幕唯一标识符                |
| width           | Number | 是   | 设计基准宽度(px)              |
| height          | Number | 是   | 设计基准高度(px)              |
| backgroundColor | String | 否   | 背景色，支持颜色名、HEX、RGBA |
| backgroundImage | String | 否   | 背景图片 URL                  |
| safeArea        | Object | 否   | 安全区域定义                  |
| statusBarStyle  | String | 否   | 状态栏样式："dark"/"light"    |
| children        | Array  | 是   | 子组件数组                    |

### Container

通用容器组件，用于布局和组织其他组件。

```json
{
  "type": "Container",
  "id": "cardContainer",
  "width": 300,
  "height": 200,
  "backgroundColor": "#F5F5F5",
  "layout": {
    "type": "stack",
    "direction": "vertical",
    "spacing": 10,
    "alignment": "center"
  },
  "children": []
}
```

**属性说明：**

| 属性名          | 类型          | 必填 | 描述                             |
| --------------- | ------------- | ---- | -------------------------------- |
| type            | String        | 是   | 固定为 "Container"               |
| id              | String        | 是   | 容器唯一标识符                   |
| width           | Number/String | 否   | 宽度，可为具体数值或百分比"100%" |
| height          | Number/String | 否   | 高度，可为具体数值或百分比"100%" |
| backgroundColor | String        | 否   | 背景色                           |
| backgroundImage | String        | 否   | 背景图片 URL                     |
| borderRadius    | Number/Object | 否   | 边框圆角半径                     |
| borderWidth     | Number/Object | 否   | 边框宽度                         |
| borderColor     | String/Object | 否   | 边框颜色                         |
| shadow          | Object        | 否   | 阴影效果                         |
| padding         | Number/Object | 否   | 内边距                           |
| margin          | Number/Object | 否   | 外边距                           |
| layout          | Object        | 否   | 布局配置                         |
| position        | Object        | 否   | 定位配置                         |
| opacity         | Number        | 否   | 透明度(0-1)                      |
| visible         | Boolean       | 否   | 是否可见                         |
| children        | Array         | 是   | 子组件数组                       |

### Text

显示文本内容的组件。

```json
{
  "type": "Text",
  "id": "titleText",
  "text": "Hello World",
  "fontSize": 24,
  "fontWeight": "bold",
  "color": "#333333",
  "textAlign": "center"
}
```

**属性说明：**

| 属性名        | 类型          | 必填 | 描述                                   |
| ------------- | ------------- | ---- | -------------------------------------- |
| type          | String        | 是   | 固定为 "Text"                          |
| id            | String        | 是   | 文本唯一标识符                         |
| text          | String        | 是   | 文本内容                               |
| fontSize      | Number        | 否   | 字体大小(px)，默认 16                  |
| fontFamily    | String        | 否   | 字体系列，默认系统字体                 |
| fontWeight    | String/Number | 否   | 字体粗细:"normal"/"bold"/数值          |
| fontStyle     | String        | 否   | 字体样式:"normal"/"italic"             |
| color         | String        | 否   | 文本颜色                               |
| textAlign     | String        | 否   | 对齐方式:"left"/"center"/"right"       |
| lineHeight    | Number        | 否   | 行高                                   |
| letterSpacing | Number        | 否   | 字距                                   |
| maxLines      | Number        | 否   | 最大行数                               |
| overflow      | String        | 否   | 溢出处理:"clip"/"ellipsis"             |
| decoration    | String        | 否   | 装饰:"none"/"underline"/"line-through" |
| width         | Number/String | 否   | 宽度限制                               |
| padding       | Number/Object | 否   | 内边距                                 |
| margin        | Number/Object | 否   | 外边距                                 |

### Button

可点击的按钮组件。

```json
{
  "type": "Button",
  "id": "submitButton",
  "text": "Submit",
  "width": 200,
  "height": 50,
  "backgroundColor": "#2196F3",
  "borderRadius": 25,
  "interaction": {
    "onClick": {
      "action": "submit",
      "params": { "formId": "userForm" }
    },
    "states": {
      "hover": {
        "backgroundColor": "#1E88E5",
        "scale": 1.05
      },
      "pressed": {
        "backgroundColor": "#1976D2",
        "scale": 0.98
      }
    }
  }
}
```

**属性说明：**

| 属性名          | 类型          | 必填 | 描述            |
| --------------- | ------------- | ---- | --------------- |
| type            | String        | 是   | 固定为 "Button" |
| id              | String        | 是   | 按钮唯一标识符  |
| text            | String        | 否   | 按钮文本        |
| icon            | String        | 否   | 图标 URL 或名称 |
| width           | Number/String | 否   | 宽度            |
| height          | Number/String | 否   | 高度            |
| backgroundColor | String        | 否   | 背景色          |
| textColor       | String        | 否   | 文本颜色        |
| fontSize        | Number        | 否   | 字体大小        |
| fontWeight      | String/Number | 否   | 字体粗细        |
| borderRadius    | Number/Object | 否   | 圆角半径        |
| borderWidth     | Number/Object | 否   | 边框宽度        |
| borderColor     | String/Object | 否   | 边框颜色        |
| padding         | Number/Object | 否   | 内边距          |
| margin          | Number/Object | 否   | 外边距          |
| shadow          | Object        | 否   | 阴影效果        |
| disabled        | Boolean       | 否   | 是否禁用        |
| interaction     | Object        | 否   | 交互配置        |

### Image

显示图像的组件。

```json
{
  "type": "Image",
  "id": "profileImage",
  "src": "https://example.com/image.jpg",
  "width": 100,
  "height": 100,
  "borderRadius": 50,
  "fit": "cover"
}
```

**属性说明：**

| 属性名       | 类型          | 必填 | 描述                                     |
| ------------ | ------------- | ---- | ---------------------------------------- |
| type         | String        | 是   | 固定为 "Image"                           |
| id           | String        | 是   | 图片唯一标识符                           |
| src          | String        | 是   | 图片 URL                                 |
| width        | Number/String | 否   | 宽度                                     |
| height       | Number/String | 否   | 高度                                     |
| fit          | String        | 否   | 填充模式:"fill"/"contain"/"cover"/"none" |
| borderRadius | Number/Object | 否   | 圆角半径                                 |
| opacity      | Number        | 否   | 透明度(0-1)                              |
| filter       | String        | 否   | CSS 滤镜效果                             |
| alt          | String        | 否   | 替代文本                                 |
| padding      | Number/Object | 否   | 内边距                                   |
| margin       | Number/Object | 否   | 外边距                                   |
| shadow       | Object        | 否   | 阴影效果                                 |
| interaction  | Object        | 否   | 交互配置                                 |

## 高级组件

### Input

用户输入组件。

```json
{
  "type": "Input",
  "id": "emailInput",
  "placeholder": "Enter your email",
  "width": 300,
  "height": 50,
  "borderRadius": 8,
  "borderWidth": 1,
  "borderColor": "#CCCCCC",
  "padding": 12,
  "inputType": "email",
  "validation": {
    "pattern": "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
    "message": "Please enter a valid email"
  }
}
```

**属性说明：**

| 属性名          | 类型          | 必填 | 描述                                 |
| --------------- | ------------- | ---- | ------------------------------------ |
| type            | String        | 是   | 固定为 "Input"                       |
| id              | String        | 是   | 输入框唯一标识符                     |
| value           | String        | 否   | 默认值                               |
| placeholder     | String        | 否   | 占位文本                             |
| inputType       | String        | 否   | 输入类型:"text"/"password"/"email"等 |
| width           | Number/String | 否   | 宽度                                 |
| height          | Number/String | 否   | 高度                                 |
| fontSize        | Number        | 否   | 字体大小                             |
| color           | String        | 否   | 文本颜色                             |
| backgroundColor | String        | 否   | 背景色                               |
| borderRadius    | Number/Object | 否   | 圆角半径                             |
| borderWidth     | Number/Object | 否   | 边框宽度                             |
| borderColor     | String/Object | 否   | 边框颜色                             |
| padding         | Number/Object | 否   | 内边距                               |
| margin          | Number/Object | 否   | 外边距                               |
| maxLength       | Number        | 否   | 最大字符数                           |
| disabled        | Boolean       | 否   | 是否禁用                             |
| readOnly        | Boolean       | 否   | 是否只读                             |
| validation      | Object        | 否   | 验证规则                             |
| interaction     | Object        | 否   | 交互配置                             |

### List

列表组件，用于显示重复项目。

```json
{
  "type": "List",
  "id": "userList",
  "data": "users",
  "direction": "vertical",
  "spacing": 10,
  "template": {
    "type": "Container",
    "height": 80,
    "padding": 10,
    "backgroundColor": "#FFFFFF",
    "borderRadius": 8,
    "shadow": {
      "color": "rgba(0,0,0,0.1)",
      "x": 0,
      "y": 2,
      "blur": 5
    },
    "children": [
      {
        "type": "Text",
        "text": "${item.name}",
        "fontWeight": "bold"
      },
      {
        "type": "Text",
        "text": "${item.email}",
        "color": "#666666"
      }
    ]
  }
}
```

**属性说明：**

| 属性名     | 类型          | 必填 | 描述                         |
| ---------- | ------------- | ---- | ---------------------------- |
| type       | String        | 是   | 固定为 "List"                |
| id         | String        | 是   | 列表唯一标识符               |
| data       | String/Array  | 是   | 数据源变量名或直接数组       |
| direction  | String        | 否   | 方向:"vertical"/"horizontal" |
| spacing    | Number        | 否   | 项目间距                     |
| template   | Object        | 是   | 项目模板组件                 |
| width      | Number/String | 否   | 宽度                         |
| height     | Number/String | 否   | 高度                         |
| padding    | Number/Object | 否   | 内边距                       |
| margin     | Number/Object | 否   | 外边距                       |
| scrollable | Boolean       | 否   | 是否可滚动                   |
| paged      | Boolean       | 否   | 是否分页                     |
| pageSize   | Number        | 否   | 每页项目数                   |

### Tabs

选项卡组件，管理多个内容视图。

```json
{
  "type": "Tabs",
  "id": "productTabs",
  "activeTab": 0,
  "width": "100%",
  "tabBarPosition": "top",
  "tabs": [
    {
      "title": "Details",
      "icon": "info",
      "content": {
        "type": "Container",
        "children": [
          {
            "type": "Text",
            "text": "Product details here..."
          }
        ]
      }
    },
    {
      "title": "Reviews",
      "icon": "star",
      "content": {
        "type": "List",
        "data": "reviews",
        "template": {
          "type": "Container",
          "children": [
            {
              "type": "Text",
              "text": "${item.author}"
            },
            {
              "type": "Text",
              "text": "${item.comment}"
            }
          ]
        }
      }
    }
  ]
}
```

**属性说明：**

| 属性名         | 类型          | 必填 | 描述                                     |
| -------------- | ------------- | ---- | ---------------------------------------- |
| type           | String        | 是   | 固定为 "Tabs"                            |
| id             | String        | 是   | 选项卡唯一标识符                         |
| activeTab      | Number        | 否   | 初始活动选项卡索引                       |
| width          | Number/String | 否   | 宽度                                     |
| height         | Number/String | 否   | 高度                                     |
| tabBarPosition | String        | 否   | 选项卡位置:"top"/"bottom"/"left"/"right" |
| tabBarStyle    | Object        | 否   | 选项卡栏样式                             |
| tabs           | Array         | 是   | 选项卡数组                               |
| interaction    | Object        | 否   | 交互配置                                 |

## 布局配置

### 堆叠布局 (Stack)

```json
"layout": {
  "type": "stack",
  "direction": "vertical",
  "spacing": 10,
  "alignment": "center",
  "distribution": "start",
  "wrap": false
}
```

**Stack 属性说明：**

| 属性名       | 类型          | 必填 | 描述                                                                          |
| ------------ | ------------- | ---- | ----------------------------------------------------------------------------- |
| type         | String        | 是   | 固定为 "stack"                                                                |
| direction    | String        | 否   | 方向:"vertical"/"horizontal"，默认 vertical                                   |
| spacing      | Number        | 否   | 子元素间距                                                                    |
| alignment    | String        | 否   | 横向对齐:"start"/"center"/"end"/"stretch"                                     |
| distribution | String        | 否   | 纵向分布:"start"/"center"/"end"/"space-between"/"space-around"/"space-evenly" |
| wrap         | Boolean       | 否   | 是否允许换行                                                                  |
| padding      | Number/Object | 否   | 内边距                                                                        |

### 网格布局 (Grid)

```json
"layout": {
  "type": "grid",
  "columns": 3,
  "rowSpacing": 10,
  "columnSpacing": 10,
  "padding": 16
}
```

**Grid 属性说明：**

| 属性名        | 类型          | 必填 | 描述                    |
| ------------- | ------------- | ---- | ----------------------- |
| type          | String        | 是   | 固定为 "grid"           |
| columns       | Number        | 是   | 列数                    |
| rows          | Number        | 否   | 行数                    |
| rowSpacing    | Number        | 否   | 行间距                  |
| columnSpacing | Number        | 否   | 列间距                  |
| autoFlow      | String        | 否   | 自动排列:"row"/"column" |
| padding       | Number/Object | 否   | 内边距                  |

### 绝对定位 (Position)

```json
"position": {
  "type": "absolute",
  "left": 10,
  "top": 20,
  "right": null,
  "bottom": null,
  "zIndex": 1
}
```

**Position 属性说明：**

| 属性名 | 类型   | 必填 | 描述                          |
| ------ | ------ | ---- | ----------------------------- |
| type   | String | 是   | 固定为 "absolute"或"relative" |
| left   | Number | 否   | 左侧距离                      |
| top    | Number | 否   | 顶部距离                      |
| right  | Number | 否   | 右侧距离                      |
| bottom | Number | 否   | 底部距离                      |
| zIndex | Number | 否   | 层叠顺序                      |

## 效果配置

### 阴影效果

```json
"shadow": {
  "color": "rgba(0,0,0,0.2)",
  "x": 0,
  "y": 3,
  "blur": 6,
  "spread": 0
}
```

### 渐变背景

```json
"backgroundGradient": {
  "type": "linear",
  "start": { "x": 0, "y": 0 },
  "end": { "x": 1, "y": 1 },
  "colors": ["#FF416C", "#FF4B2B"]
}
```

## 交互配置

### 点击事件

```json
"interaction": {
  "onClick": {
    "action": "navigate",
    "params": { "screen": "detailsScreen" }
  }
}
```

### 状态样式

```json
"interaction": {
  "states": {
    "hover": {
      "backgroundColor": "#E3F2FD",
      "scale": 1.05
    },
    "pressed": {
      "backgroundColor": "#BBDEFB",
      "scale": 0.98
    },
    "disabled": {
      "opacity": 0.5
    }
  }
}
```

### 动画效果

```json
"animation": {
  "entry": {
    "type": "fade",
    "duration": 300,
    "delay": 0,
    "easing": "ease-out"
  },
  "exit": {
    "type": "slide",
    "direction": "left",
    "duration": 200,
    "easing": "ease-in"
  }
}
```

## 响应式配置

```json
"responsive": {
  "rules": [
    {
      "maxWidth": 768,
      "changes": {
        "width": "90%",
        "fontSize": 14
      }
    },
    {
      "maxWidth": 480,
      "changes": {
        "width": "100%",
        "fontSize": 12,
        "padding": 8
      }
    }
  ]
}
```

## 组件嵌套约束

- **Screen**: 只能作为根组件，不能嵌套在其他组件中
- **Container**: 可以包含任何组件，除了 Screen
- **Text**: 不能包含其他组件
- **Button**: 可以包含 Text 和 Image 组件
- **Image**: 不能包含其他组件
- **Input**: 不能包含其他组件
- **List**: 只能通过 template 属性定义子组件
- **Tabs**: 只能通过 tabs[].content 属性定义子组件

## 命名规范

- 组件 ID 应使用驼峰命名法
- ID 应具描述性，表明组件用途
- 避免使用通用名称如 container1、button2 等
- 避免使用特殊字符或保留关键字

## 最佳实践

1. 使用语义化 ID 便于理解和维护
2. 组件层级不宜过深，控制在 5 层以内
3. 优先使用布局系统而非绝对定位
4. 重复出现的 UI 模式应设计为可复用模板
5. 响应式规则应针对常见断点设计
6. 合理使用交互状态提高用户体验
7. 为可交互元素提供视觉反馈
8. 使用动画增强体验，但避免过度使用
