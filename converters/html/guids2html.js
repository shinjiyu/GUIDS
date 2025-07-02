/**
 * GUIDS to HTML Converter
 * 将GUIDS描述文件转换为HTML+CSS代码
 */

class GUIDS2HTML {
  constructor(guidsDef, options = {}) {
    this.guids = guidsDef;
    this.options = Object.assign(
      {
        inlineStyles: true, // 是否使用内联样式
        generateWrapper: true, // 是否生成包装容器
        responsiveScaling: true, // 是否启用响应式缩放
        useModernFeatures: true, // 是否使用现代CSS特性
      },
      options
    );

    this.styleRules = [];
    this.generatedIds = new Set(); // 追踪生成的ID，避免重复
    this.animationCounter = 0; // 用于生成唯一的动画名称
  }

  /**
   * 生成HTML并返回
   */
  generate() {
    const rootComponent = this.guids.components[this.guids.root];
    if (!rootComponent) {
      throw new Error(`根组件 "${this.guids.root}" 未找到`);
    }

    let html = "";

    // 添加文档头部
    if (this.options.generateWrapper) {
      const title = this.guids.name || "GUIDS Generated UI";
      html += `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style id="guids-styles">
${this.generateBaseStyles()}
    </style>
</head>
<body>
`;
    }

    // 生成主要内容
    html += this.renderComponent(this.guids.root, rootComponent);

    // 为所有生成的样式创建样式表
    if (!this.options.inlineStyles) {
      html += `
<style>
${this.styleRules.join("\n")}
</style>
`;
    }

    // 添加JS交互支持
    html += `
<script>
${this.generateInteractionSupport()}
</script>
`;

    // 添加文档尾部
    if (this.options.generateWrapper) {
      html += `
</body>
</html>`;
    }

    return html;
  }

  /**
   * 生成基础样式
   */
  generateBaseStyles() {
    // 设置基础样式
    return `
/* GUIDS基础样式 */
:root {
    --guids-design-width: ${this.guids.designReference?.width || 1920}px;
    --guids-design-height: ${this.guids.designReference?.height || 1080}px;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
}

.guids-screen {
    position: relative;
    width: var(--guids-design-width);
    height: var(--guids-design-height);
    overflow: hidden;
    margin: 0 auto;
}

.guids-container {
    position: relative;
}

.guids-row {
    display: flex;
    flex-direction: row;
    position: relative;
}

.guids-column {
    display: flex;
    flex-direction: column;
    position: relative;
}

.guids-button {
    cursor: pointer;
    user-select: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.guids-image {
    display: block;
    object-fit: contain;
}

.guids-text {
    word-wrap: break-word;
}
`;
  }

  /**
   * 生成交互支持的JS代码
   */
  generateInteractionSupport() {
    return `
// GUIDS交互支持
document.addEventListener('DOMContentLoaded', function() {
    // 注册点击事件
    document.querySelectorAll('[data-action]').forEach(element => {
        element.addEventListener('click', function(e) {
            const action = this.getAttribute('data-action');
            const params = JSON.parse(this.getAttribute('data-params') || '{}');
            console.log('执行操作:', action, '参数:', params);
            
            // 这里可以实现模拟操作（示例）
            switch(action) {
                case 'navigateTo':
                    if (params.screen) {
                        alert('导航到: ' + params.screen);
                    }
                    break;
                case 'openURL':
                    if (params.url) {
                        window.open(params.url, '_blank');
                    }
                    break;
                default:
                    // 自定义操作可通过事件派发
                    const customEvent = new CustomEvent('guids-action', {
                        detail: { action, params, element: this }
                    });
                    document.dispatchEvent(customEvent);
            }
        });
    });
    
    // 处理hover状态
    document.querySelectorAll('[data-has-hover]').forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('guids-hover');
        });
        element.addEventListener('mouseleave', function() {
            this.classList.remove('guids-hover');
        });
    });
    
    // 处理pressed状态
    document.querySelectorAll('[data-has-pressed]').forEach(element => {
        element.addEventListener('mousedown', function() {
            this.classList.add('guids-pressed');
        });
        element.addEventListener('mouseup', function() {
            this.classList.remove('guids-pressed');
        });
        element.addEventListener('mouseleave', function() {
            this.classList.remove('guids-pressed');
        });
    });
});
`;
  }

  /**
   * 渲染组件
   */
  renderComponent(id, component, parentComponent = null) {
    if (!component) return "";

    // 统一类型为小写
    const type = (component.type || "").toLowerCase();

    // 准备属性
    const attributes = this.prepareAttributes(id, component, type);

    // 如果父组件是row或column类型，对于当前子组件，修改其位置处理逻辑
    let styles;
    if (
      parentComponent &&
      ["row", "column"].includes((parentComponent.type || "").toLowerCase())
    ) {
      // 复制组件对象，以便修改位置处理而不影响原组件
      const modifiedComponent = { ...component };
      // 如果有position属性，修改它以禁用绝对定位
      if (modifiedComponent.position) {
        modifiedComponent.position = {
          ...modifiedComponent.position,
          // 为Flex子元素不使用绝对定位
          useRelativePosition: true,
        };
      }
      styles = this.prepareStyles(
        modifiedComponent,
        parentComponent.type.toLowerCase()
      );
    } else {
      styles = this.prepareStyles(component, type);
    }

    const tag = this.getHtmlTag(type);

    // 组织HTML
    let html = `<${tag} id="${id}" ${attributes}`;

    // 添加内联样式
    if (this.options.inlineStyles && styles) {
      html += ` style="${styles}"`;
    } else if (styles) {
      // 添加到样式规则集
      this.styleRules.push(`#${id} { ${styles} }`);
    }

    html += ">";

    // 添加内容（针对Text和Button）
    if (
      (type === "text" || type === "button") &&
      (component.text || component.content)
    ) {
      html += this.escapeHtml(component.text || component.content);
    }

    // 特殊处理Image
    if (type === "image" && component.source) {
      html += `<img src="${component.source}" alt="" class="guids-image-inner" style="width: 100%; height: 100%;">`;
    }

    // 渲染子组件
    if (component.children && component.children.length > 0) {
      component.children.forEach((childId) => {
        const childComponent = this.guids.components[childId];
        if (childComponent) {
          html += this.renderComponent(childId, childComponent, component);
        }
      });
    }

    html += `</${tag}>`;
    return html;
  }

  /**
   * 获取对应的HTML标签
   */
  getHtmlTag(componentType) {
    switch ((componentType || "").toLowerCase()) {
      case "text":
        return "p";
      case "button":
        return "button";
      case "image":
        return "div";
      case "screen":
        return "div";
      case "container":
        return "div";
      case "row":
        return "div";
      case "column":
        return "div";
      case "scrollview":
        return "div";
      case "inputfield":
        return "input";
      case "progressbar":
        return "div";
      default:
        return "div";
    }
  }

  /**
   * 准备HTML属性
   */
  prepareAttributes(id, component, typeOverride = null) {
    const attrs = [];
    const type = typeOverride || (component.type || "").toLowerCase();

    // 用数组收集所有类名
    const classNames = [`guids-${type}`];

    // 添加基于类型的特殊类名（避免重复）
    if (type === "screen") {
      classNames.push("guids-screen");
    } else if (type === "container") {
      classNames.push("guids-container");
    } else if (type === "row") {
      classNames.push("guids-row");
    } else if (type === "column") {
      classNames.push("guids-column");
    }

    // 添加事件处理属性
    if (component.interactions) {
      if (component.interactions.onClick) {
        attrs.push(`data-action="${component.interactions.onClick.action}"`);
        if (component.interactions.onClick.params) {
          attrs.push(
            `data-params='${JSON.stringify(
              component.interactions.onClick.params
            )}'`
          );
        }
      }

      // 检查悬停和按下状态
      if (
        component.style &&
        this.guids.styles &&
        this.guids.styles[component.style]
      ) {
        const style = this.guids.styles[component.style];
        if (style.states) {
          if (style.states.hover) attrs.push('data-has-hover="true"');
          if (style.states.pressed) attrs.push('data-has-pressed="true"');
        }
      }
    }

    // 去重并添加class属性
    const uniqueClassNames = Array.from(new Set(classNames));
    attrs.push(`class="${uniqueClassNames.join(" ")}"`);

    return attrs.join(" ");
  }

  /**
   * 准备CSS样式
   */
  prepareStyles(component, parentType = null) {
    const styles = [];

    // 处理位置和尺寸
    if (component.position) {
      styles.push(...this.processPosition(component.position));
    }

    // 处理背景
    if (component.background) {
      styles.push(...this.processBackground(component.background));
    }

    // 处理引用的样式
    if (
      component.style &&
      this.guids.styles &&
      this.guids.styles[component.style]
    ) {
      styles.push(...this.processStyle(this.guids.styles[component.style]));
    }

    // 针对容器类组件，强制 box-sizing: border-box
    if (["column", "row", "container"].includes(component.type)) {
      styles.push("box-sizing: border-box;");
    }

    // 处理边框圆角
    if (component.cornerRadius) {
      styles.push(`border-radius: ${component.cornerRadius}px;`);
    }

    // 处理布局
    if (component.layout) {
      styles.push(...this.processLayout(component.layout, parentType));
    }

    // 处理透明度
    if (component.opacity !== undefined) {
      styles.push(`opacity: ${component.opacity};`);
    }

    // 处理可见性
    if (component.visible === false) {
      styles.push("display: none;");
    }

    // 处理遮罩
    if (component.mask) {
      styles.push(...this.processMask(component.mask));
    }

    // 处理裁剪
    if (component.clip && component.clip.enabled) {
      styles.push("overflow: hidden;");

      if (component.clip.softness > 0) {
        styles.push(`backdrop-filter: blur(${component.clip.softness}px);`);
      }
    }

    // 将样式数组合并为字符串
    return styles.join(" ");
  }

  /**
   * 处理位置属性
   */
  processPosition(position) {
    const styles = [];

    // 判断是否使用相对定位（适用于Row和Column的子元素）
    if (position.useRelativePosition) {
      // 使用相对定位而非绝对定位
      styles.push("position: relative;");
    } else {
      // 处理定位方式
      styles.push("position: absolute;");
    }

    // 处理位置
    if (position.fill) {
      styles.push("top: 0; right: 0; bottom: 0; left: 0;");
      return styles;
    }

    // 仅当不是相对定位时应用以下定位属性
    if (!position.useRelativePosition) {
      if (position.centerIn) {
        styles.push("top: 50%; left: 50%; transform: translate(-50%, -50%);");
      } else {
        // 处理上下左右位置
        if (position.top !== undefined)
          styles.push(`top: ${this.convertUnit(position.top)};`);
        if (position.left !== undefined)
          styles.push(`left: ${this.convertUnit(position.left)};`);
        if (position.right !== undefined)
          styles.push(`right: ${this.convertUnit(position.right)};`);
        if (position.bottom !== undefined)
          styles.push(`bottom: ${this.convertUnit(position.bottom)};`);

        // 处理中心偏移
        if (position.centerX !== undefined) {
          styles.push(`left: 50%; transform: translateX(-50%);`);
          if (position.centerY !== undefined) {
            styles.pop(); // 移除之前的transform
            styles.push(`top: 50%; transform: translate(-50%, -50%);`);
          }
        } else if (position.centerY !== undefined) {
          styles.push(`top: 50%; transform: translateY(-50%);`);
        }
      }
    }

    // 处理宽高
    if (position.width !== undefined)
      styles.push(`width: ${this.convertUnit(position.width)};`);
    if (position.height !== undefined)
      styles.push(`height: ${this.convertUnit(position.height)};`);

    // 处理最大/最小宽高
    if (position.maxWidth !== undefined)
      styles.push(`max-width: ${this.convertUnit(position.maxWidth)};`);
    if (position.maxHeight !== undefined)
      styles.push(`max-height: ${this.convertUnit(position.maxHeight)};`);
    if (position.minWidth !== undefined)
      styles.push(`min-width: ${this.convertUnit(position.minWidth)};`);
    if (position.minHeight !== undefined)
      styles.push(`min-height: ${this.convertUnit(position.minHeight)};`);

    return styles;
  }

  /**
   * 处理背景属性
   */
  processBackground(background) {
    const styles = [];

    switch (background.type) {
      case "color":
        styles.push(`background-color: ${background.value};`);
        break;

      case "image":
        styles.push(`background-image: url('${background.source}');`);
        if (background.repeat)
          styles.push(`background-repeat: ${background.repeat};`);
        if (background.size)
          styles.push(`background-size: ${background.size};`);
        else styles.push("background-size: cover;");
        break;

      case "gradient":
        if (background.colors && background.colors.length >= 2) {
          let gradientType = "linear-gradient";
          let direction = "to bottom"; // 默认垂直

          if (background.direction === "horizontal") direction = "to right";
          else if (background.direction === "diagonal")
            direction = "to bottom right";
          else if (background.direction === "radial") {
            gradientType = "radial-gradient";
            direction = "circle at center";
          }

          styles.push(
            `background: ${gradientType}(${direction}, ${background.colors.join(
              ", "
            )});`
          );
        }
        break;
    }

    return styles;
  }

  /**
   * 处理样式属性
   */
  processStyle(style) {
    const styles = [];

    // 处理继承的样式
    if (
      style.extends &&
      this.guids.styles &&
      this.guids.styles[style.extends]
    ) {
      styles.push(...this.processStyle(this.guids.styles[style.extends]));
    }

    // 常用样式属性映射
    if (style.width) styles.push(`width: ${style.width};`);
    if (style.height) styles.push(`height: ${style.height};`);
    if (style.backgroundColor)
      styles.push(`background-color: ${style.backgroundColor};`);
    if (style.border) styles.push(`border: ${style.border};`);
    if (style.borderRadius)
      styles.push(`border-radius: ${style.borderRadius};`);
    if (style.padding) styles.push(`padding: ${style.padding};`);
    if (style.margin) styles.push(`margin: ${style.margin};`);
    if (style.fontSize)
      styles.push(
        `font-size: ${
          typeof style.fontSize === "number"
            ? style.fontSize + "px"
            : style.fontSize
        };`
      );
    if (style.fontWeight) styles.push(`font-weight: ${style.fontWeight};`);
    if (style.color) styles.push(`color: ${style.color};`);
    if (style.fontFamily) styles.push(`font-family: ${style.fontFamily};`);
    if (style.textAlign) styles.push(`text-align: ${style.textAlign};`);
    if (style.textColor) styles.push(`color: ${style.textColor};`);
    if (style.marginBottom)
      styles.push(`margin-bottom: ${style.marginBottom};`);
    if (style.marginTop) styles.push(`margin-top: ${style.marginTop};`);
    if (style.marginLeft) styles.push(`margin-left: ${style.marginLeft};`);
    if (style.marginRight) styles.push(`margin-right: ${style.marginRight};`);

    // 处理背景
    if (style.background) {
      styles.push(...this.processBackground(style.background));
    }

    // 处理边框（对象形式）
    if (style.border && typeof style.border === "object") {
      if (style.border.width)
        styles.push(`border-width: ${style.border.width}px;`);
      if (style.border.color)
        styles.push(`border-color: ${style.border.color};`);
      if (style.border.style)
        styles.push(`border-style: ${style.border.style};`);
      else styles.push("border-style: solid;");
    }

    // 处理圆角
    if (style.cornerRadius)
      styles.push(`border-radius: ${style.cornerRadius}px;`);

    // 处理阴影
    if (style.shadow) {
      const shadow = style.shadow;
      styles.push(
        `box-shadow: ${shadow.offsetX || 0}px ${shadow.offsetY || 0}px ${
          shadow.blur || 0
        }px ${shadow.color || "rgba(0,0,0,0.5)"};`
      );
    }

    // 处理透明度
    if (style.opacity !== undefined) styles.push(`opacity: ${style.opacity};`);

    // 处理内边距（对象形式）
    if (style.padding && typeof style.padding === "object") {
      const padding = style.padding;
      styles.push(
        `padding: ${padding.top || 0}px ${padding.right || 0}px ${
          padding.bottom || 0
        }px ${padding.left || 0}px;`
      );
    }

    // 处理状态样式（通过CSS类实现）
    if (style.states) {
      this.processStateStyles(style.states);
    }

    return styles;
  }

  /**
   * 处理状态样式（悬停、按下等）
   */
  processStateStyles(states) {
    if (states.hover) {
      const hoverStyles = [];
      if (states.hover.background)
        hoverStyles.push(...this.processBackground(states.hover.background));
      if (states.hover.scale)
        hoverStyles.push(`transform: scale(${states.hover.scale});`);

      this.styleRules.push(`.guids-hover { ${hoverStyles.join(" ")} }`);
    }

    if (states.pressed) {
      const pressedStyles = [];
      if (states.pressed.background)
        pressedStyles.push(
          ...this.processBackground(states.pressed.background)
        );
      if (states.pressed.scale)
        pressedStyles.push(`transform: scale(${states.pressed.scale});`);

      this.styleRules.push(`.guids-pressed { ${pressedStyles.join(" ")} }`);
    }
  }

  /**
   * 处理布局
   */
  processLayout(layout, parentType = null) {
    const styles = [];

    // 判断布局类型
    const layoutType = layout.type || parentType;

    // 对于 Column/Row 组件，如果 layout 没有 type，也能处理 spacing/alignment
    // 堆叠布局 (Stack)
    if (layoutType === "stack") {
      styles.push("display: flex;");
      if (layout.direction === "horizontal") {
        styles.push("flex-direction: row;");
      } else {
        styles.push("flex-direction: column;");
      }
      if (layout.spacing !== undefined) {
        styles.push(`gap: ${layout.spacing}px;`);
      }
      if (layout.alignment) {
        let alignItems;
        if (typeof layout.alignment === "string") {
          alignItems = this.convertAlignment(layout.alignment);
        } else if (layout.alignment.horizontal) {
          alignItems = this.convertAlignment(layout.alignment.horizontal);
        } else {
          alignItems = "flex-start";
        }
        styles.push(`align-items: ${alignItems};`);
      }
      if (layout.distribution) {
        styles.push(
          `justify-content: ${this.convertDistribution(layout.distribution)};`
        );
      }
      if (layout.wrap) {
        styles.push("flex-wrap: wrap;");
      }
      if (layout.padding) {
        if (typeof layout.padding === "number") {
          styles.push(`padding: ${layout.padding}px;`);
        } else {
          if (layout.padding.top)
            styles.push(`padding-top: ${layout.padding.top}px;`);
          if (layout.padding.right)
            styles.push(`padding-right: ${layout.padding.right}px;`);
          if (layout.padding.bottom)
            styles.push(`padding-bottom: ${layout.padding.bottom}px;`);
          if (layout.padding.left)
            styles.push(`padding-left: ${layout.padding.left}px;`);
        }
      }
    }

    // Row/Column布局
    if (
      layoutType === "row" ||
      layoutType === "column" ||
      (!layout.type &&
        parentType &&
        (parentType === "row" || parentType === "column"))
    ) {
      styles.push("display: flex;");
      if (layoutType === "row" || (!layout.type && parentType === "row")) {
        styles.push("flex-direction: row;");
      } else {
        styles.push("flex-direction: column;");
      }
      if (layout.spacing !== undefined) {
        styles.push(`gap: ${layout.spacing}px;`);
      }
      if (layout.alignment) {
        styles.push(`align-items: ${this.convertAlignment(layout.alignment)};`);
      }
      if (layout.distribution) {
        styles.push(
          `justify-content: ${this.convertDistribution(layout.distribution)};`
        );
      }
      if (layout.wrap) {
        styles.push("flex-wrap: wrap;");
      }
      if (layout.padding) {
        if (typeof layout.padding === "number") {
          styles.push(`padding: ${layout.padding}px;`);
        } else {
          if (layout.padding.top)
            styles.push(`padding-top: ${layout.padding.top}px;`);
          if (layout.padding.right)
            styles.push(`padding-right: ${layout.padding.right}px;`);
          if (layout.padding.bottom)
            styles.push(`padding-bottom: ${layout.padding.bottom}px;`);
          if (layout.padding.left)
            styles.push(`padding-left: ${layout.padding.left}px;`);
        }
      }
    }

    return styles;
  }

  /**
   * 转换对齐方式
   */
  convertAlignment(alignment) {
    switch (alignment) {
      case "start":
        return "flex-start";
      case "center":
        return "center";
      case "end":
        return "flex-end";
      case "stretch":
        return "stretch";
      default:
        return "flex-start";
    }
  }

  /**
   * 转换分布方式
   */
  convertDistribution(distribution) {
    switch (distribution) {
      case "start":
        return "flex-start";
      case "center":
        return "center";
      case "end":
        return "flex-end";
      case "space-between":
        return "space-between";
      case "space-around":
        return "space-around";
      case "space-evenly":
        return "space-evenly";
      default:
        return "flex-start";
    }
  }

  /**
   * 处理遮罩属性
   */
  processMask(mask) {
    const styles = [];

    if (this.options.useModernFeatures) {
      switch (mask.type) {
        case "circle":
          const radius = mask.params?.radius || "50%";
          styles.push(
            `mask-image: radial-gradient(${radius} at center, black 100%, transparent 100%);`
          );
          styles.push(
            "-webkit-mask-image: radial-gradient(${radius} at center, black 100%, transparent 100%);"
          );
          break;

        case "rectangle":
          styles.push(
            "mask-image: linear-gradient(to bottom, black 100%, transparent 100%);"
          );
          styles.push(
            "-webkit-mask-image: linear-gradient(to bottom, black 100%, transparent 100%);"
          );
          break;

        case "custom":
          if (mask.source) {
            styles.push(`mask-image: url('${mask.source}');`);
            styles.push(`-webkit-mask-image: url('${mask.source}');`);
          }
          break;
      }

      if (mask.feather > 0) {
        styles.push(`mask-feather: ${mask.feather}px;`);
        styles.push(`-webkit-mask-feather: ${mask.feather}px;`);
      }

      styles.push("mask-repeat: no-repeat;");
      styles.push("-webkit-mask-repeat: no-repeat;");
      styles.push("mask-size: 100% 100%;");
      styles.push("-webkit-mask-size: 100% 100%;");
    } else {
      // 降级方案：使用overflow: hidden和边框半径
      styles.push("overflow: hidden;");
      if (mask.type === "circle") {
        styles.push("border-radius: 50%;");
      }
    }

    return styles;
  }

  /**
   * 单位转换，处理百分比、像素和auto
   */
  convertUnit(value) {
    if (value === "auto") return "auto";
    if (typeof value === "string") {
      if (value.endsWith("%")) return value;
      if (value.includes(".")) {
        // 处理组件引用，这里简化处理，实际应该计算相对位置
        return "0px";
      }
    }
    return typeof value === "number" ? `${value}px` : value;
  }

  /**
   * HTML转义
   */
  escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// 如果在Node环境中，导出模块
if (typeof module !== "undefined" && module.exports) {
  module.exports = GUIDS2HTML;
}
