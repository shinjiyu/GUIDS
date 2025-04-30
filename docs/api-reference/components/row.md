# Row 组件

Row 组件是一个水平布局容器，基于 CSS Flexbox 的行布局（flex-direction: row）实现。它用于在水平方向上排列子元素，支持多种对齐和分布方式。

## 属性

| 属性名   | 类型   | 说明                 | 默认值 |
| -------- | ------ | -------------------- | ------ |
| `layout` | Object | 行布局配置（见下表） | 无     |

除了上述特有属性外，Row 组件还支持[通用属性](../basics.md#通用属性)。

### layout 对象

| 属性名         | 类型          | 说明                                                                                   | 默认值  |
| -------------- | ------------- | -------------------------------------------------------------------------------------- | ------- |
| `type`         | String        | 布局类型，固定为"row"                                                                  | "row"   |
| `spacing`      | Number        | 子元素间距（像素）                                                                     | 0       |
| `alignment`    | String        | 子元素对齐方式（"start"/"center"/"end"/"stretch"）                                     | "start" |
| `distribution` | String        | 子元素分布方式（"start"/"center"/"end"/"space-between"/"space-around"/"space-evenly"） | "start" |
| `wrap`         | Boolean       | 是否允许换行                                                                           | false   |
| `padding`      | Number/Object | 内边距（像素）                                                                         | 0       |

### padding 对象（可选）

如果`padding`是一个对象，它可以包含以下属性：

| 属性名   | 类型   | 说明             | 默认值 |
| -------- | ------ | ---------------- | ------ |
| `top`    | Number | 上内边距（像素） | 0      |
| `right`  | Number | 右内边距（像素） | 0      |
| `bottom` | Number | 下内边距（像素） | 0      |
| `left`   | Number | 左内边距（像素） | 0      |

## 对齐方式（alignment）

Row 组件支持以下对齐方式：

| 值        | 说明                   | CSS 对应属性            |
| --------- | ---------------------- | ----------------------- |
| `start`   | 子元素对齐容器顶部     | align-items: flex-start |
| `center`  | 子元素垂直居中         | align-items: center     |
| `end`     | 子元素对齐容器底部     | align-items: flex-end   |
| `stretch` | 子元素垂直拉伸填充容器 | align-items: stretch    |

## 分布方式（distribution）

Row 组件支持以下分布方式：

| 值              | 说明                           | CSS 对应属性                   |
| --------------- | ------------------------------ | ------------------------------ |
| `start`         | 子元素靠左对齐                 | justify-content: flex-start    |
| `center`        | 子元素水平居中                 | justify-content: center        |
| `end`           | 子元素靠右对齐                 | justify-content: flex-end      |
| `space-between` | 两端对齐，中间等分空间         | justify-content: space-between |
| `space-around`  | 子元素周围等分空间             | justify-content: space-around  |
| `space-evenly`  | 子元素之间等分空间（包括首尾） | justify-content: space-evenly  |

## 示例

### 基本水平排列

```json
{
  "id": "menuBar",
  "type": "Row",
  "position": {
    "width": "100%",
    "height": 60
  },
  "background": {
    "type": "color",
    "value": "#2196F3"
  },
  "layout": {
    "type": "row",
    "spacing": 20,
    "alignment": "center",
    "distribution": "space-between",
    "padding": {
      "left": 16,
      "right": 16
    }
  },
  "children": ["logo", "navItems", "userMenu"]
}
```

### 均匀分布的卡片

```json
{
  "id": "cardRow",
  "type": "Row",
  "position": {
    "width": "100%",
    "height": "auto"
  },
  "layout": {
    "type": "row",
    "spacing": 16,
    "alignment": "start",
    "distribution": "space-evenly",
    "wrap": true
  },
  "children": ["card1", "card2", "card3", "card4"]
}
```

### 顶部导航栏

```json
{
  "id": "topNavBar",
  "type": "Row",
  "position": {
    "width": "100%",
    "height": 50
  },
  "background": {
    "type": "color",
    "value": "#333333"
  },
  "layout": {
    "type": "row",
    "alignment": "center",
    "distribution": "start",
    "padding": 10,
    "spacing": 20
  },
  "children": ["homeButton", "searchBar", "notificationIcon", "profileMenu"]
}
```

## 注意事项

1. Row 组件的子元素默认使用相对定位（position: relative）而非绝对定位，以确保它们正确参与 Flex 布局。

2. 如果需要子元素占据不同比例的空间，应该在子元素的 position 属性中设置 width，可以使用百分比值或者"flex"关键字。

3. spacing 属性等效于 CSS 的 gap 属性，用于设置子元素之间的间距，与 padding 和 margin 不同。

4. 当 wrap 设置为 true 时，子元素会在空间不足时自动换行，此时建议为子元素设置明确的宽度。

## 相关组件

- [Column 组件](./column.md)：垂直布局容器
- [Container 组件](./container.md)：通用容器
