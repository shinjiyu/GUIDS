# 游戏主菜单描述 (Game Main Menu Description)

`main_menu.json`文件定义了一个完整的游戏主菜单界面，以下是其结构和功能的详细描述。

## 基本信息 (Basic Information)

- **设计参考 (Design Reference)**: 1920x1080 像素
- **用途 (Purpose)**: 定义了一个包含顶部栏、内容区域和底部栏的游戏主菜单界面
- **特性 (Features)**: 响应式布局、纯色背景、交互按钮、社交媒体链接

## 屏幕结构 (Screen Structure)

- **主屏幕 (Main Screen)**: 全屏显示，采用"fitWidth"自适应策略和安全区域
- **背景 (Background)**: 深色纯色背景 (#1E1E2D)
- **布局 (Layout)**: 由顶部栏、内容区域和底部栏三个主要部分组成

## 顶部栏 (Top Bar)

- **位置 (Position)**: 屏幕顶部，高度 80 像素
- **背景 (Background)**: 半透明黑色 (rgba(0,0,0,0.8))
- **组件 (Components)**:
  - **标志文本 (Logo Text)**: 左对齐，"游戏标志"文本，尺寸 180x60 像素
  - **玩家信息 (Player Info)**: 右对齐，包含圆形头像、玩家名称和金币显示
  - **头像 (Avatar)**: 蓝色圆形 (#4285F4)
  - **金币图标 (Coin Icon)**: 金色圆角方形 (#FFD700)

## 内容区域 (Content Area)

- **位置 (Position)**: 在顶部栏和底部栏之间，内容居中
- **主菜单容器 (Main Menu Container)**:
  - **宽度 (Width)**: 屏幕宽度的 50%，最大 600 像素
  - **背景 (Background)**: 半透明黑色 (rgba(0,0,0,0.7))
  - **圆角 (Corner Radius)**: 15 像素

## 菜单按钮 (Menu Buttons)

- **开始游戏按钮 (Play Button)**:
  - **样式 (Style)**: primaryButton 样式（蓝色纯色 #3498DB）
  - **高度 (Height)**: 80 像素
  - **特效 (Special Effect)**: 发光效果
- **商店、设置按钮 (Store, Settings Buttons)**:
  - **样式 (Style)**: secondaryButton 样式（灰色纯色 #95A5A6）
  - **高度 (Height)**: 70 像素
- **退出按钮 (Exit Button)**:
  - **样式 (Style)**: dangerButton 样式（红色纯色 #E74C3C）
  - **高度 (Height)**: 70 像素

## 底部栏 (Bottom Bar)

- **位置 (Position)**: 屏幕底部，高度 60 像素
- **背景 (Background)**: 半透明黑色 (rgba(0,0,0,0.8))
- **组件 (Components)**:
  - **版本文本 (Version Text)**: 左对齐"版本 1.0.0"
  - **社交按钮 (Social Buttons)**: 右对齐的文本按钮"FB"、"TW"、"DC"

## 按钮交互 (Button Interactions)

- **菜单按钮通用效果 (Common Menu Button Effects)**:
  - **悬停效果 (Hover Effects)**: 背景变亮，尺寸放大
  - **按下效果 (Press Effects)**: 背景变暗，尺寸缩小
- **特定功能 (Specific Functions)**:
  - **开始游戏按钮**: 触发"startGame"动作
  - **商店/设置按钮**: 导航到相应的屏幕
  - **退出按钮**: 触发"exitGame"动作
  - **社交按钮**: 在浏览器中打开相应的 URL

## 响应式适配 (Responsive Adaptation)

- **竖屏方向 (Portrait Orientation)**:
  - 主菜单宽度增加到 80%
  - 顶部栏重排为垂直布局
- **屏幕宽度<800 像素 (Screen Width < 800px)**:
  - 全局比例缩小到 0.9
  - 按钮高度减小

## 视觉效果 (Visual Effect)

该界面呈现现代化游戏菜单的外观，带有半透明区域、纯色按钮和响应式布局。顶部显示玩家信息，中央是主要导航选项，底部提供版本信息和社交链接，整体设计保持了一致性和现代感。
