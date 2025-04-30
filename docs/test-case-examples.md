# GUIDS2HTML 测试用例示例

本文档提供了 GUIDS2HTML 转换工具的具体测试用例示例，包括测试 JSON 文件和验证方法。

## 1. 基础组件测试用例

### 1.1 Screen 组件基本测试 (SCR-01)

**测试 JSON**:

```json
{
  "version": "1.0",
  "name": "ScreenTest",
  "designReference": {
    "width": 1920,
    "height": 1080
  },
  "root": "screen",
  "components": {
    "screen": {
      "type": "Screen",
      "adaptiveStrategy": "fitWidth"
    }
  }
}
```

**验证方法**:

1. 转换上述 JSON 为 HTML
2. 验证生成的 HTML 包含一个全屏容器元素
3. 验证该元素具有 `guids-screen` 类和 `fitWidth` 的 `data-strategy` 属性

### 1.2 Container 组件带背景色测试 (CNT-02)

**测试 JSON**:

```json
{
  "version": "1.0",
  "name": "ContainerTest",
  "designReference": {
    "width": 1920,
    "height": 1080
  },
  "root": "screen",
  "components": {
    "screen": {
      "type": "Screen",
      "adaptiveStrategy": "fitWidth",
      "children": ["testContainer"]
    },
    "testContainer": {
      "type": "Container",
      "background": {
        "type": "color",
        "value": "#FF5733"
      },
      "position": {
        "centerIn": "parent",
        "width": 300,
        "height": 200
      }
    }
  }
}
```

**验证方法**:

1. 转换上述 JSON 为 HTML
2. 验证生成的 HTML 包含一个 ID 为 `testContainer` 的元素
3. 验证该元素有 `background-color: #FF5733` 的样式
4. 验证该元素位于屏幕中央，尺寸为 300x200 像素

### 1.3 Text 组件基本测试 (TXT-01)

**测试 JSON**:

```json
{
  "version": "1.0",
  "name": "TextTest",
  "designReference": {
    "width": 1920,
    "height": 1080
  },
  "root": "screen",
  "components": {
    "screen": {
      "type": "Screen",
      "adaptiveStrategy": "fitWidth",
      "children": ["testText"]
    },
    "testText": {
      "type": "Text",
      "content": "Hello World",
      "position": {
        "centerIn": "parent",
        "width": 200,
        "height": 50
      }
    }
  }
}
```

**验证方法**:

1. 转换上述 JSON 为 HTML
2. 验证生成的 HTML 包含一个 ID 为 `testText` 的元素
3. 验证该元素包含文本 "Hello World"
4. 验证该元素位于屏幕中央

### 1.4 Button 组件基本测试 (BTN-01)

**测试 JSON**:

```json
{
  "version": "1.0",
  "name": "ButtonTest",
  "designReference": {
    "width": 1920,
    "height": 1080
  },
  "root": "screen",
  "components": {
    "screen": {
      "type": "Screen",
      "adaptiveStrategy": "fitWidth",
      "children": ["testButton"]
    },
    "testButton": {
      "type": "Button",
      "content": "Click Me",
      "position": {
        "centerIn": "parent",
        "width": 200,
        "height": 50
      },
      "interactions": {
        "onClick": {
          "action": "testAction",
          "params": {
            "id": "test"
          }
        }
      }
    }
  }
}
```

**验证方法**:

1. 转换上述 JSON 为 HTML
2. 验证生成的 HTML 包含一个 ID 为 `testButton` 的按钮元素
3. 验证该元素包含文本 "Click Me"
4. 验证该元素有 `data-action="testAction"` 和 `data-params='{"id":"test"}'` 属性

## 2. 样式测试用例

### 2.1 基本样式应用测试 (STY-01)

**测试 JSON**:

```json
{
  "version": "1.0",
  "name": "StyleTest",
  "designReference": {
    "width": 1920,
    "height": 1080
  },
  "root": "screen",
  "components": {
    "screen": {
      "type": "Screen",
      "adaptiveStrategy": "fitWidth",
      "children": ["styledText"]
    },
    "styledText": {
      "type": "Text",
      "content": "Styled Text",
      "position": {
        "centerIn": "parent",
        "width": 300,
        "height": 100
      },
      "style": "customStyle"
    }
  },
  "styles": {
    "customStyle": {
      "fontFamily": "Arial",
      "fontSize": 24,
      "fontWeight": "bold",
      "textColor": "#00AAFF",
      "textAlign": "center"
    }
  }
}
```

**验证方法**:

1. 转换上述 JSON 为 HTML
2. 验证 `styledText` 元素的样式包含：
   - font-family: Arial
   - font-size: 24px
   - font-weight: bold
   - color: #00AAFF
   - text-align: center

### 2.2 样式继承测试 (INH-01)

**测试 JSON**:

```json
{
  "version": "1.0",
  "name": "StyleInheritanceTest",
  "designReference": {
    "width": 1920,
    "height": 1080
  },
  "root": "screen",
  "components": {
    "screen": {
      "type": "Screen",
      "adaptiveStrategy": "fitWidth",
      "children": ["childButton"]
    },
    "childButton": {
      "type": "Button",
      "content": "Inherited Style",
      "position": {
        "centerIn": "parent",
        "width": 200,
        "height": 60
      },
      "style": "childStyle"
    }
  },
  "styles": {
    "baseStyle": {
      "fontFamily": "Arial",
      "fontSize": 18,
      "textColor": "#FFFFFF",
      "background": {
        "type": "color",
        "value": "#3498DB"
      }
    },
    "childStyle": {
      "extends": "baseStyle",
      "fontSize": 24,
      "cornerRadius": 8
    }
  }
}
```

**验证方法**:

1. 转换上述 JSON 为 HTML
2. 验证 `childButton` 元素的样式包含：
   - font-family: Arial (从 baseStyle 继承)
   - font-size: 24px (覆盖了 baseStyle 中的值)
   - color: #FFFFFF (从 baseStyle 继承)
   - background-color: #3498DB (从 baseStyle 继承)
   - border-radius: 8px (childStyle 特有)

## 3. 布局测试用例

### 3.1 堆叠布局测试 - 水平 (STK-01)

**测试 JSON**:

```json
{
  "version": "1.0",
  "name": "HorizontalStackTest",
  "designReference": {
    "width": 1920,
    "height": 1080
  },
  "root": "screen",
  "components": {
    "screen": {
      "type": "Screen",
      "adaptiveStrategy": "fitWidth",
      "children": ["container"]
    },
    "container": {
      "type": "Container",
      "position": {
        "centerIn": "parent",
        "width": 600,
        "height": 100
      },
      "layout": {
        "type": "stack",
        "direction": "horizontal",
        "spacing": 20,
        "alignment": {
          "vertical": "center"
        }
      },
      "children": ["item1", "item2", "item3"]
    },
    "item1": {
      "type": "Container",
      "background": {
        "type": "color",
        "value": "#FF5733"
      },
      "position": {
        "width": 100,
        "height": 100
      }
    },
    "item2": {
      "type": "Container",
      "background": {
        "type": "color",
        "value": "#33FF57"
      },
      "position": {
        "width": 100,
        "height": 80
      }
    },
    "item3": {
      "type": "Container",
      "background": {
        "type": "color",
        "value": "#3357FF"
      },
      "position": {
        "width": 100,
        "height": 60
      }
    }
  }
}
```

**验证方法**:

1. 转换上述 JSON 为 HTML
2. 验证 `container` 元素的样式包含 `display: flex` 和 `flex-direction: row`
3. 验证子项目之间的间距为 20px (`gap: 20px`)
4. 验证子项目垂直居中对齐 (`align-items: center`)
5. 验证三个子项目水平排列

### 3.2 网格布局测试 (GRD-01)

**测试 JSON**:

```json
{
  "version": "1.0",
  "name": "GridTest",
  "designReference": {
    "width": 1920,
    "height": 1080
  },
  "root": "screen",
  "components": {
    "screen": {
      "type": "Screen",
      "adaptiveStrategy": "fitWidth",
      "children": ["gridContainer"]
    },
    "gridContainer": {
      "type": "Container",
      "position": {
        "centerIn": "parent",
        "width": 400,
        "height": 400
      },
      "layout": {
        "type": "grid",
        "columns": 2,
        "spacing": 10
      },
      "children": ["gridItem1", "gridItem2", "gridItem3", "gridItem4"]
    },
    "gridItem1": {
      "type": "Container",
      "background": {
        "type": "color",
        "value": "#FF5733"
      }
    },
    "gridItem2": {
      "type": "Container",
      "background": {
        "type": "color",
        "value": "#33FF57"
      }
    },
    "gridItem3": {
      "type": "Container",
      "background": {
        "type": "color",
        "value": "#3357FF"
      }
    },
    "gridItem4": {
      "type": "Container",
      "background": {
        "type": "color",
        "value": "#F3FF33"
      }
    }
  }
}
```

**验证方法**:

1. 转换上述 JSON 为 HTML
2. 验证 `gridContainer` 元素的样式包含 `display: grid` 和 `grid-template-columns: repeat(2, 1fr)`
3. 验证网格间距为 10px (`gap: 10px`)
4. 验证四个子项目以 2x2 网格排列

## 4. 交互测试用例

### 4.1 点击事件测试 (CLK-01)

**测试 JSON**:

```json
{
  "version": "1.0",
  "name": "ClickTest",
  "designReference": {
    "width": 1920,
    "height": 1080
  },
  "root": "screen",
  "components": {
    "screen": {
      "type": "Screen",
      "adaptiveStrategy": "fitWidth",
      "children": ["clickButton"]
    },
    "clickButton": {
      "type": "Button",
      "content": "Click Test",
      "position": {
        "centerIn": "parent",
        "width": 200,
        "height": 60
      },
      "background": {
        "type": "color",
        "value": "#3498DB"
      },
      "interactions": {
        "onClick": {
          "action": "showAlert",
          "params": {
            "message": "Button was clicked!"
          }
        }
      }
    }
  }
}
```

**验证方法**:

1. 转换上述 JSON 为 HTML
2. 在浏览器中加载生成的 HTML
3. 点击按钮
4. 验证控制台日志中有 `执行操作: showAlert 参数: {message: "Button was clicked!"}`
5. 验证触发了自定义事件 `guids-action`

### 4.2 悬停状态测试 (BTN-03)

**测试 JSON**:

```json
{
  "version": "1.0",
  "name": "HoverTest",
  "designReference": {
    "width": 1920,
    "height": 1080
  },
  "root": "screen",
  "components": {
    "screen": {
      "type": "Screen",
      "adaptiveStrategy": "fitWidth",
      "children": ["hoverButton"]
    },
    "hoverButton": {
      "type": "Button",
      "content": "Hover Test",
      "position": {
        "centerIn": "parent",
        "width": 200,
        "height": 60
      },
      "style": "buttonStyle"
    }
  },
  "styles": {
    "buttonStyle": {
      "background": {
        "type": "color",
        "value": "#3498DB"
      },
      "textColor": "#FFFFFF",
      "cornerRadius": 8,
      "states": {
        "hover": {
          "background": {
            "type": "color",
            "value": "#5DADE2"
          },
          "scale": 1.05
        }
      }
    }
  }
}
```

**验证方法**:

1. 转换上述 JSON 为 HTML
2. 在浏览器中加载生成的 HTML
3. 将鼠标悬停在按钮上
4. 验证按钮背景色变为 #5DADE2
5. 验证按钮大小增加了 5%

## 5. 动画测试用例

### 5.1 淡入动画测试 (ANM-01)

**测试 JSON**:

```json
{
  "version": "1.0",
  "name": "FadeInTest",
  "designReference": {
    "width": 1920,
    "height": 1080
  },
  "root": "screen",
  "components": {
    "screen": {
      "type": "Screen",
      "adaptiveStrategy": "fitWidth",
      "children": ["animatedContainer"]
    },
    "animatedContainer": {
      "type": "Container",
      "position": {
        "centerIn": "parent",
        "width": 300,
        "height": 200
      },
      "background": {
        "type": "color",
        "value": "#3498DB"
      },
      "transitions": {
        "appear": "fadeIn"
      }
    }
  },
  "transitions": {
    "fadeIn": {
      "type": "animation",
      "duration": 1.0,
      "easing": "easeOutCubic",
      "keyframes": [
        {
          "time": 0,
          "opacity": 0
        },
        {
          "time": 1,
          "opacity": 1
        }
      ]
    }
  }
}
```

**验证方法**:

1. 转换上述 JSON 为 HTML
2. 在浏览器中加载生成的 HTML
3. 验证容器以淡入效果显示，持续时间约为 1 秒

### 5.2 平移动画测试 (ANM-03)

**测试 JSON**:

```json
{
  "version": "1.0",
  "name": "SlideInTest",
  "designReference": {
    "width": 1920,
    "height": 1080
  },
  "root": "screen",
  "components": {
    "screen": {
      "type": "Screen",
      "adaptiveStrategy": "fitWidth",
      "children": ["slidingContainer"]
    },
    "slidingContainer": {
      "type": "Container",
      "position": {
        "centerIn": "parent",
        "width": 300,
        "height": 200
      },
      "background": {
        "type": "color",
        "value": "#E74C3C"
      },
      "transitions": {
        "appear": "slideIn"
      }
    }
  },
  "transitions": {
    "slideIn": {
      "type": "animation",
      "duration": 0.5,
      "easing": "easeOutQuad",
      "keyframes": [
        {
          "time": 0,
          "translateX": -300,
          "opacity": 0
        },
        {
          "time": 1,
          "translateX": 0,
          "opacity": 1
        }
      ]
    }
  }
}
```

**验证方法**:

1. 转换上述 JSON 为 HTML
2. 在浏览器中加载生成的 HTML
3. 验证容器从左侧滑入，同时淡入显示，持续时间约为 0.5 秒

## 6. 响应式测试用例

### 6.1 基本响应式缩放测试 (RSP-01)

**测试 JSON**:

```json
{
  "version": "1.0",
  "name": "ResponsiveTest",
  "designReference": {
    "width": 1920,
    "height": 1080
  },
  "root": "screen",
  "components": {
    "screen": {
      "type": "Screen",
      "adaptiveStrategy": "fitWidth",
      "children": ["testContainer"]
    },
    "testContainer": {
      "type": "Container",
      "position": {
        "top": 100,
        "left": 100,
        "width": 400,
        "height": 300
      },
      "background": {
        "type": "color",
        "value": "#3498DB"
      },
      "children": ["testText"]
    },
    "testText": {
      "type": "Text",
      "content": "Responsive Test",
      "position": {
        "centerIn": "parent"
      },
      "style": "titleText"
    }
  },
  "styles": {
    "titleText": {
      "fontFamily": "Arial",
      "fontSize": 24,
      "textColor": "#FFFFFF",
      "textAlign": "center"
    }
  }
}
```

**验证方法**:

1. 转换上述 JSON 为 HTML
2. 在浏览器中加载生成的 HTML
3. 调整浏览器窗口大小
4. 验证界面按照 `fitWidth` 策略进行缩放
5. 验证元素相对位置保持不变

### 6.2 自适应规则测试 (ADP-01)

**测试 JSON**:

```json
{
  "version": "1.0",
  "name": "AdaptationTest",
  "designReference": {
    "width": 1920,
    "height": 1080
  },
  "root": "screen",
  "components": {
    "screen": {
      "type": "Screen",
      "adaptiveStrategy": "fitWidth",
      "children": ["adaptContainer"]
    },
    "adaptContainer": {
      "type": "Container",
      "position": {
        "centerIn": "parent",
        "width": 600,
        "height": 400
      },
      "background": {
        "type": "color",
        "value": "#3498DB"
      },
      "children": ["adaptText"]
    },
    "adaptText": {
      "type": "Text",
      "content": "Adaptation Test",
      "position": {
        "centerIn": "parent"
      },
      "style": "normalText"
    }
  },
  "styles": {
    "normalText": {
      "fontFamily": "Arial",
      "fontSize": 36,
      "textColor": "#FFFFFF",
      "textAlign": "center"
    }
  },
  "adaptationRules": [
    {
      "condition": {
        "maxWidth": 800
      },
      "adjustments": {
        "components": {
          "adaptContainer": {
            "position": {
              "width": 300,
              "height": 200
            }
          },
          "adaptText": {
            "style": "smallText"
          }
        },
        "styles": {
          "smallText": {
            "extends": "normalText",
            "fontSize": 20
          }
        }
      }
    }
  ]
}
```

**验证方法**:

1. 转换上述 JSON 为 HTML
2. 在正常大小的浏览器中加载生成的 HTML
3. 验证容器尺寸为 600x400，文本大小为 36px
4. 将浏览器窗口调整到宽度小于 800px
5. 验证容器尺寸变为 300x200，文本大小变为 20px

## 7. 集成测试用例

### 7.1 简单按钮完整测试 (UI-01)

使用 examples/simple_button.json 作为测试用例。

**验证方法**:

1. 转换 simple_button.json 为 HTML
2. 在浏览器中加载生成的 HTML
3. 验证按钮居中显示，尺寸正确
4. 验证按钮文本内容正确
5. 验证按钮样式(背景色、文字颜色等)正确
6. 测试悬停效果
7. 测试点击效果
8. 调整浏览器窗口大小，验证响应式适配

### 7.2 主菜单界面完整测试 (UI-02)

使用 examples/main_menu.json 作为测试用例。

**验证方法**:

1. 转换 main_menu.json 为 HTML
2. 在浏览器中加载生成的 HTML
3. 验证顶部栏、内容区域、底部栏布局正确
4. 验证主菜单按钮布局正确
5. 测试按钮悬停和点击状态
6. 调整浏览器窗口大小，验证响应式适配
7. 测试竖屏(portrait)模式下的布局变化
