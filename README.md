# GUIDS: 游戏 UI 描述系统

GUIDS(Game UI Description System)是一个跨引擎 UI 描述系统，旨在提供一种统一的方式来描述游戏 UI，并能够自动转换到多种游戏引擎和平台。

## 项目目标

- 提供一种引擎无关的 UI 描述格式
- 支持从 PSD/Figma 等设计工具导入 UI 设计
- 自动转换为 Unity、Unreal Engine、Cocos Creator 和 HTML/CSS 等目标平台
- 简化跨平台游戏 UI 开发流程

## 项目结构

```
/
├── docs/                  # 文档
│   ├── spec.md            # 详细规范文档
│   └── tutorials/         # 教程和指南
├── schema/                # JSON Schema定义
│   └── guids-schema.json  # GUIDS描述文件验证模式
├── examples/              # 示例文件
│   ├── simple_button.json # 简单按钮示例
│   ├── main_menu.json     # 主菜单示例
│   └── ...
├── converters/            # 转换器(待实现)
│   ├── unity/             # Unity转换器
│   ├── unreal/            # UE转换器
│   ├── cocos/             # Cocos转换器
│   └── html/              # HTML/CSS转换器
└── tools/                 # 工具集(待实现)
    ├── psd-importer/      # PSD导入工具
    └── figma-importer/    # Figma导入工具
```

## 快速开始

1. 查看`docs/spec.md`了解完整规范
2. 参考`examples/`目录下的示例文件
3. 使用`schema/guids-schema.json`验证您的 UI 描述文件

## 路线图

- [x] 基础规范设计
- [x] 组件系统设计
- [x] 布局系统设计
- [x] 视觉样式系统设计
- [x] 适配规则设计
- [x] 特效与动画系统设计
- [ ] 转换器设计和实现
- [ ] 设计工具导入功能
- [ ] 可视化编辑器

## 贡献

欢迎贡献代码、文档或示例！请查看`CONTRIBUTING.md`了解更多信息。

## 许可

本项目采用 MIT 许可证。详情请见 LICENSE 文件。
