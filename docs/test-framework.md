# GUIDS2HTML 测试框架文档

## 测试框架概述

GUIDS2HTML 测试框架是一个完整的、模块化的测试系统，旨在验证 GUIDS UI 描述到 HTML/CSS/JavaScript 的转换功能。该框架围绕组件类型组织，支持自动化测试和测试结果可视化展示。

## 测试目录结构

测试框架的目录结构如下：

```
tests/
├── button-test.js              # Button组件测试脚本
├── row-test.js                 # Row组件测试脚本
├── run-all-tests.js            # 运行所有测试的脚本
├── run-tests.bat               # Windows批处理文件，用于启动所有测试
├── run-row-tests.bat           # Windows批处理文件，仅运行Row组件测试
├── view-test-results.html      # 测试结果可视化查看器
│
├── data/                       # 测试输入数据目录
│   └── components/             # 按组件类型组织的测试数据
│       ├── button/             # Button组件测试数据
│       │   ├── TC-B-001.json   # Button基本渲染测试
│       │   └── ...
│       ├── row/                # Row组件测试数据
│       │   ├── TC-R-001.json   # Row基本布局测试
│       │   ├── TC-R-002.json   # Row组件间距测试
│       │   ├── TC-R-016.json   # Row自动换行功能测试
│       │   ├── TC-R-017.json   # Row内边距属性测试
│       │   ├── TC-R-018.json   # Row间距属性测试
│       │   └── ...
│       ├── column/             # Column组件测试数据
│       ├── text/               # Text组件测试数据
│       └── ...                 # 其他组件测试数据
│
├── test-case-docs/             # 测试用例文档目录
│   ├── TC-B-001.md             # Button组件测试用例详细文档
│   ├── TC-R-001.md             # Row组件测试用例详细文档
│   └── ...                     # 其他测试用例文档
│
└── output/                     # 测试输出目录
    ├── button/                 # Button组件测试输出
    ├── row/                    # Row组件测试输出
    ├── test-results.json       # 测试结果JSON文件
    └── test-report.html        # 测试报告HTML文件
```

## 测试用例命名规则

所有测试用例遵循以下命名规则：

- **格式**：`TC-{组件代码}-{序号}`
  - **组件代码**：组件类型的首字母或缩写
    - `B` - Button
    - `R` - Row
    - `CL` - Column
    - `T` - Text
    - 等等
  - **序号**：3 位数字，从 001 开始

例如：

- `TC-B-001` - Button 组件的第一个测试用例
- `TC-R-016` - Row 组件的第 16 个测试用例

## 测试用例文档结构

每个测试用例都有一个对应的 Markdown 文档，存放在`test-case-docs`目录中。每个文档包含以下部分：

1. **测试目的**：说明测试用例的目标
2. **测试环境**：列出运行测试所需的环境配置
3. **前置条件**：列出测试执行前的必要条件
4. **测试步骤**：详细描述测试执行的步骤
5. **测试数据**：说明测试所使用的数据
6. **预期结果**：描述测试预期的输出结果
7. **验证点**：列出关键的验证检查点
8. **实际结果**：记录测试的实际结果（待填写）
9. **测试状态**：标记测试的状态（未测试、通过、失败）
10. **失败详情**：如果测试失败，记录失败原因
11. **备注**：其他相关说明
12. **相关测试用例**：列出相关的测试用例

## 测试数据 JSON 文件结构

测试数据 JSON 文件遵循 GUIDS UI 描述格式，包含以下主要部分：

```json
{
  "version": "1.0",
  "name": "测试用例名称",
  "design": {
    "width": 1200,
    "height": 800
  },
  "components": {
    "组件ID": {
      "type": "组件类型",
      "position": { ... },
      "其他属性": { ... },
      "children": [ ... ]
    },
    ...
  }
}
```

## 测试脚本结构

每个组件类型都有一个专门的测试脚本（例如`button-test.js`、`row-test.js`）。测试脚本包括以下功能：

1. **组件识别**：识别 JSON 中的特定组件
2. **HTML 分析**：分析生成的 HTML 是否正确包含组件
3. **样式验证**：验证组件的 CSS 样式是否正确
4. **交互验证**：验证组件的交互行为（如适用）
5. **结果报告**：生成测试结果和报告

## 测试运行方式

可以通过以下几种方式运行测试：

1. **运行所有测试**：

   ```
   tests/run-tests.bat
   ```

2. **运行特定组件测试**：

   ```
   tests/run-row-tests.bat
   ```

3. **通过 Node.js 直接运行**：
   ```
   node tests/row-test.js
   ```

## 测试结果查看

测试完成后，可以通过以下方式查看结果：

1. **HTML 报告**：打开`tests/output/test-report.html`
2. **测试结果可视化**：打开`tests/view-test-results.html`
3. **控制台输出**：查看命令行窗口的输出信息
4. **输出文件**：查看`tests/output/[组件]`目录下的 HTML 文件

## 添加新测试用例

添加新测试用例的步骤：

1. 创建测试数据 JSON 文件（`tests/data/components/[组件]/TC-[代码]-[序号].json`）
2. 编写测试用例文档（`tests/test-case-docs/TC-[代码]-[序号].md`）
3. 将测试用例添加到对应的测试脚本中（如 `row-test.js` 的 `TEST_CASES` 数组）
4. 如果需要特定验证逻辑，在 `verifySpecificTestCase` 函数中添加对应的验证代码

## 测试工具和辅助函数

测试框架提供了以下工具和辅助函数：

1. **findComponentsOfType**：查找特定类型的组件
2. **analyzeOutput**：分析 HTML 输出
3. **verifyRendering**：验证渲染结果
4. **generateHtmlReport**：生成 HTML 测试报告

## 测试结果的解释

测试结果的状态包括：

- **通过（Passed）**：组件正确渲染，符合预期
- **失败（Failed）**：组件渲染有问题或不符合预期
- **未测试（Untested）**：测试用例尚未执行

如果测试失败，控制台输出和测试报告将提供详细的失败原因，以便开发人员快速定位问题。
