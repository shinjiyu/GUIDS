# Column 组件

Column 组件是一个垂直布局容器，它使用 Flexbox 布局将子元素从上到下垂直排列。这是构建垂直结构的基础组件，如表单、列表、导航菜单等。

## 基本用法

```json
{
  "id": "myColumn",
  "type": "column",
  "style": {
    "width": "100%",
    "backgroundColor": "#f5f5f5",
    "padding": "10px"
  },
  "layout": {
    "alignment": "center",
    "distribution": "start",
    "spacing": 10
  },
  "children": ["child1", "child2", "child3"]
}
```

## 属性

| 属性     | 类型   | 必填 | 默认值 | 描述                      |
| -------- | ------ | ---- | ------ | ------------------------- |
| id       | string | 是   | -      | 组件的唯一标识符          |
| type     | string | 是   | -      | 组件类型，必须是 "column" |
| style    | object | 否   | {}     | 组件的样式属性            |
| layout   | object | 否   | {}     | 布局配置属性              |
| children | array  | 否   | []     | 子元素 ID 数组            |

## Layout 属性

| 属性         | 类型   | 可选值                                                                 | 默认值  | 描述                             |
| ------------ | ------ | ---------------------------------------------------------------------- | ------- | -------------------------------- |
| alignment    | string | "start", "center", "end", "stretch"                                    | "start" | 控制子元素在水平方向上的对齐方式 |
| distribution | string | "start", "center", "end", "spaceBetween", "spaceAround", "spaceEvenly" | "start" | 控制子元素在垂直方向上的分布方式 |
| spacing      | number | -                                                                      | 0       | 子元素之间的间距（像素）         |

## Style 属性

除了支持通用样式属性外，Column 组件还支持以下样式属性：

| 属性      | 类型          | 描述                           |
| --------- | ------------- | ------------------------------ |
| width     | string/number | 列宽度，可以是像素数值或百分比 |
| height    | string/number | 列高度，可以是像素数值或百分比 |
| minWidth  | string/number | 最小宽度                       |
| maxWidth  | string/number | 最大宽度                       |
| minHeight | string/number | 最小高度                       |
| maxHeight | string/number | 最大高度                       |

## 对齐方式说明

### alignment（水平对齐）

- **start**: 子元素在 Column 内左对齐
- **center**: 子元素在 Column 内水平居中对齐
- **end**: 子元素在 Column 内右对齐
- **stretch**: 子元素在水平方向上拉伸以填满整个 Column 的宽度（除非子元素有固定宽度）

### distribution（垂直分布）

- **start**: 子元素在 Column 内顶部对齐
- **center**: 子元素在 Column 内垂直居中
- **end**: 子元素在 Column 内底部对齐
- **spaceBetween**: 子元素之间有均等间距，首尾元素紧贴容器边缘
- **spaceAround**: 子元素周围有相等的间距，边缘间距是中间间距的一半
- **spaceEvenly**: 所有空间均匀分布，包括元素之间和元素与容器边缘之间的空间

## 示例

### 基本垂直布局

```json
{
  "id": "basicColumn",
  "type": "column",
  "style": {
    "width": "100%",
    "padding": "16px",
    "backgroundColor": "#f5f5f5"
  },
  "layout": {
    "spacing": 8
  },
  "children": ["title", "subtitle", "content"]
}
```

### 居中对齐的垂直布局

```json
{
  "id": "centeredColumn",
  "type": "column",
  "style": {
    "width": "100%",
    "height": "300px",
    "padding": "16px",
    "backgroundColor": "#e0e0e0"
  },
  "layout": {
    "alignment": "center",
    "distribution": "center",
    "spacing": 16
  },
  "children": ["icon", "title", "description", "button"]
}
```

### 固定高度的 Column 使用 spaceBetween 分布

```json
{
  "id": "spaceBetweenColumn",
  "type": "column",
  "style": {
    "width": "200px",
    "height": "400px",
    "padding": "16px",
    "backgroundColor": "#f0f0f0",
    "borderRadius": "8px"
  },
  "layout": {
    "distribution": "spaceBetween",
    "alignment": "stretch",
    "spacing": 0
  },
  "children": ["header", "content", "footer"]
}
```

## 嵌套使用

Column 组件可以嵌套使用，创建复杂的垂直布局结构：

```json
{
  "id": "nestedColumns",
  "type": "column",
  "style": {
    "width": "100%",
    "padding": "16px"
  },
  "layout": {
    "spacing": 16
  },
  "children": ["header", "mainSection", "footerSection"],

  "components": {
    "mainSection": {
      "id": "mainSection",
      "type": "row",
      "style": {
        "width": "100%"
      },
      "layout": {
        "spacing": 16
      },
      "children": ["sidebar", "contentArea"]
    },
    "sidebar": {
      "id": "sidebar",
      "type": "column",
      "style": {
        "width": "200px",
        "backgroundColor": "#e0e0e0",
        "padding": "8px"
      },
      "layout": {
        "spacing": 8
      },
      "children": ["navItem1", "navItem2", "navItem3"]
    },
    "contentArea": {
      "id": "contentArea",
      "type": "column",
      "style": {
        "flex": 1,
        "backgroundColor": "#f5f5f5",
        "padding": "16px"
      },
      "children": ["contentTitle", "contentBody"]
    }
  }
}
```

## 最佳实践

- 使用 Column 组件构建垂直流式布局
- 搭配 Row 组件可以创建复杂的网格布局
- 使用 distribution 属性控制内容在垂直空间中的分布方式
- 对于内部元素的水平对齐，使用 alignment 属性
- 使用 spacing 属性统一设置子元素间距，而不是在每个子元素上设置 margin

## 相关组件

- [Row](./row.md) - 水平布局容器
- [Container](./container.md) - 通用容器组件
- [Screen](./screen.md) - 顶层屏幕组件

## 更新记录

| 版本  | 日期       | 描述                                   |
| ----- | ---------- | -------------------------------------- |
| 1.0.0 | 2023-01-15 | 初始版本                               |
| 1.1.0 | 2023-03-20 | 添加了 spacing 属性                    |
| 1.2.0 | 2023-06-10 | 增强了分布方式选项，添加了 spaceEvenly |
