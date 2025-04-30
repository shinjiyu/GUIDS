# 布局系统

GUIDS2HTML 支持多种布局方式，可以满足不同的 UI 布局需求。本文档详细介绍了 GUIDS2HTML 的布局系统。

## 布局类型

GUIDS2HTML 支持以下三种主要布局类型：

### 1. Flex 布局

基于 CSS Flexbox 实现，通过 Row 和 Column 组件提供。

#### Row 组件（水平布局）

使用`flex-direction: row`，子元素在水平方向排列。

```json
{
  "id": "headerRow",
  "type": "Row",
  "layout": {
    "type": "row",
    "alignment": "center",
    "distribution": "space-between"
  }
}
```

详细信息请参考[Row 组件文档](../components/row.md)。

#### Column 组件（垂直布局）

使用`flex-direction: column`，子元素在垂直方向排列。

```json
{
  "id": "sidebarColumn",
  "type": "Column",
  "layout": {
    "type": "column",
    "alignment": "stretch",
    "distribution": "start"
  }
}
```

详细信息请参考[Column 组件文档](../components/column.md)。

### 2. 堆叠布局

通过 Container 组件实现，设置 layout.type = "stack"，类似于 Flex 布局但功能更简单。

```json
{
  "id": "stackContainer",
  "type": "Container",
  "layout": {
    "type": "stack",
    "direction": "horizontal", // 或 "vertical"
    "spacing": 10,
    "alignment": "center"
  }
}
```

### 3. 绝对定位

通过 position 属性配置，适用于所有组件，默认的定位方式。

```json
{
  "id": "absoluteElement",
  "type": "Container",
  "position": {
    "top": 20,
    "left": 30,
    "width": 200,
    "height": 100
  }
}
```

## 布局属性

### Flex 布局属性

| 布局属性       | 作用于组件 | 说明               | 可选值                                                                    |
| -------------- | ---------- | ------------------ | ------------------------------------------------------------------------- |
| `alignment`    | Row/Column | 子元素对齐方式     | "start", "center", "end", "stretch"                                       |
| `distribution` | Row/Column | 子元素分布方式     | "start", "center", "end", "space-between", "space-around", "space-evenly" |
| `spacing`      | Row/Column | 子元素间距（像素） | 数值                                                                      |
| `wrap`         | Row/Column | 子元素是否换行     | true, false                                                               |
| `padding`      | Row/Column | 内边距（像素）     | 数值或对象                                                                |

### 堆叠布局属性

| 布局属性    | 作用于组件 | 说明           | 可选值                              |
| ----------- | ---------- | -------------- | ----------------------------------- |
| `direction` | Container  | 堆叠方向       | "horizontal", "vertical"            |
| `spacing`   | Container  | 子元素间距     | 数值                                |
| `alignment` | Container  | 子元素对齐方式 | "start", "center", "end", "stretch" |

### 绝对定位属性

绝对定位使用组件的 position 属性进行配置，关键属性包括：

| 属性名                           | 类型          | 说明                   |
| -------------------------------- | ------------- | ---------------------- |
| `top`, `left`, `right`, `bottom` | Number/String | 边距值                 |
| `width`, `height`                | Number/String | 尺寸值                 |
| `centerIn`                       | String        | 居中对齐，值为"parent" |
| `centerX`, `centerY`             | Boolean       | 水平/垂直居中          |

## 布局组合

可以通过嵌套不同的布局组件来创建复杂的 UI 布局。例如：

```json
{
  "id": "pageLayout",
  "type": "Column",
  "layout": {
    "type": "column",
    "spacing": 0
  },
  "children": ["header", "mainContent", "footer"],
  "components": {
    "header": {
      "type": "Row",
      "layout": {
        "type": "row",
        "distribution": "space-between"
      }
    },
    "mainContent": {
      "type": "Row",
      "layout": {
        "type": "row",
        "spacing": 20
      },
      "children": ["sidebar", "content"]
    },
    "footer": {
      "type": "Container"
    }
  }
}
```

## 响应式布局

GUIDS2HTML 支持响应式布局，可以根据不同设备或屏幕尺寸调整布局。详细信息请参考[响应式适配](./responsive.md)。

## 最佳实践

1. **选择合适的布局类型**

   - 对于线性排列的元素，使用 Row 或 Column
   - 对于需要精确定位的元素，使用绝对定位
   - 对于简单的堆叠布局，使用 Stack

2. **嵌套使用布局组件**

   - Row 内可以嵌套 Column，反之亦然
   - 复杂布局应拆分为多层嵌套的简单布局

3. **混合使用定位方式**

   - 外层容器使用 Flex 布局
   - 内部元素可使用相对定位或绝对定位

4. **设置合理的间距**
   - 使用 spacing 设置元素间距
   - 使用 padding 设置内部间距
   - 保持一致的间距值，提高 UI 的一致性
