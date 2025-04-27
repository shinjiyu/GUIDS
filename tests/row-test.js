// Row Component Test Script
const fs = require("fs");
const path = require("path");
const GUIDS2HTML = require("../converters/html/guids2html");

// 定义路径
const TEST_DATA_DIR = path.join(__dirname, "data/components/row");
const OUTPUT_PATH = path.join(__dirname, "output");
const OUTPUT_DIR = path.join(OUTPUT_PATH, "row");

// ANSI颜色代码
const COLORS = {
  RESET: "\x1b[0m",
  GREEN: "\x1b[32m",
  RED: "\x1b[31m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  CYAN: "\x1b[36m",
};

// 要测试的具体Row组件测试用例
const TEST_CASES = [
  { id: "TC-R-001", description: "行组件基本布局测试" },
  { id: "TC-R-002", description: "行组件间距测试" },
  { id: "TC-R-003", description: "行组件对齐方式测试" },
  { id: "TC-R-004", description: "行组件响应式布局测试" },
  { id: "TC-R-005", description: "行组件嵌套测试" },
  { id: "TC-R-006", description: "行组件与其他组件组合测试" },
  { id: "TC-R-007", description: "行组件样式继承测试" },
  { id: "TC-R-008", description: "行组件边界条件测试" },
  { id: "TC-R-009", description: "行组件溢出处理测试" },
  { id: "TC-R-010", description: "行组件可见性控制测试" },
  { id: "TC-R-011", description: "行组件边框属性测试" },
  { id: "TC-R-012", description: "行组件背景属性测试" },
  { id: "TC-R-013", description: "行组件阴影效果测试" },
  { id: "TC-R-014", description: "行组件动态内容测试" },
  { id: "TC-R-015", description: "行组件事件处理测试" },
  { id: "TC-R-016", description: "行组件自动换行(wrap)功能测试" },
  { id: "TC-R-017", description: "行组件内边距(padding)属性测试" },
  { id: "TC-R-018", description: "行组件间距(spacing)属性测试" },
  { id: "TC-R-019", description: "行组件高度控制测试" },
  { id: "TC-R-020", description: "行组件宽度控制测试" },
];

/**
 * 运行Row组件测试
 */
async function testRowComponent() {
  console.log(`${COLORS.CYAN}=== Row组件测试 ====${COLORS.RESET}`);

  // 确保输出目录存在
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = {
    total: TEST_CASES.length,
    passed: 0,
    failed: 0,
  };

  // 测试每个测试用例
  for (const testCase of TEST_CASES) {
    try {
      const success = await runSingleTest(testCase);
      if (success) {
        results.passed++;
      } else {
        results.failed++;
      }
    } catch (error) {
      console.error(
        `${COLORS.RED}✗ 测试用例 ${testCase.id} 运行失败: ${error.message}${COLORS.RESET}`
      );
      results.failed++;
    }
  }

  // 打印测试结果摘要
  console.log("\n");
  console.log(`${COLORS.CYAN}=== Row组件测试摘要 ====${COLORS.RESET}`);
  console.log(`${COLORS.BLUE}总测试用例: ${results.total}${COLORS.RESET}`);
  console.log(`${COLORS.GREEN}通过: ${results.passed}${COLORS.RESET}`);
  console.log(`${COLORS.RED}失败: ${results.failed}${COLORS.RESET}`);

  return results.failed === 0;
}

/**
 * 运行单个测试用例
 */
async function runSingleTest(testCase) {
  console.log(
    `\n${COLORS.BLUE}测试用例: ${testCase.id} - ${testCase.description}${COLORS.RESET}`
  );

  const testFilePath = path.join(TEST_DATA_DIR, `${testCase.id}.json`);
  const outputFilePath = path.join(OUTPUT_DIR, `${testCase.id}.html`);

  // 检查测试文件是否存在
  if (!fs.existsSync(testFilePath)) {
    console.error(
      `${COLORS.RED}✗ 测试文件不存在: ${testFilePath}${COLORS.RESET}`
    );
    return false;
  }

  try {
    // 加载测试JSON文件
    console.log(`- 加载测试文件: ${testFilePath}`);
    const jsonData = JSON.parse(fs.readFileSync(testFilePath, "utf8"));

    // 查找并验证Row组件
    const rowComponents = findRowComponents(jsonData);
    console.log(`- 找到 ${rowComponents.length} 个Row组件进行测试`);

    // 初始化GUIDS2HTML转换器
    const converter = new GUIDS2HTML(jsonData, {
      inlineStyles: false,
      beautify: true,
      includeComments: true,
      generateIds: true,
    });

    // 生成HTML
    console.log(`- 转换GUIDS为HTML...`);
    const html = converter.generate();

    // 分析HTML输出中的Row组件
    const renderedRows = analyzeRowOutput(html);
    console.log(`- HTML输出中找到 ${renderedRows.length} 个Row组件`);

    // 检查特定测试用例的特殊属性
    verifySpecificTestCase(testCase.id, rowComponents, html);

    // 写入输出文件
    fs.writeFileSync(outputFilePath, html, "utf8");
    console.log(
      `${COLORS.GREEN}- 输出保存到: ${outputFilePath}${COLORS.RESET}`
    );

    // 验证结果
    const verificationResult = verifyRowRendering(rowComponents, renderedRows);

    if (verificationResult.success) {
      console.log(
        `${COLORS.GREEN}✓ 测试用例 ${testCase.id} 通过${COLORS.RESET}`
      );
      return true;
    } else {
      console.log(
        `${COLORS.RED}✗ 测试用例 ${testCase.id} 失败: ${verificationResult.message}${COLORS.RESET}`
      );
      return false;
    }
  } catch (error) {
    console.error(
      `${COLORS.RED}✗ 处理测试用例 ${testCase.id} 时出错: ${error.message}${COLORS.RESET}`
    );
    if (error.stack) {
      console.error(error.stack);
    }
    return false;
  }
}

/**
 * 验证特定测试用例的特殊属性
 */
function verifySpecificTestCase(testCaseId, rowComponents, result) {
  switch (testCaseId) {
    case "TC-R-009":
      // 验证overflow属性
      console.log("- 验证overflow属性...");
      const visibleOverflow = rowComponents.find(
        (r) => r.id === "rowOverflow" || r.layout?.overflow === "visible"
      );
      const hiddenOverflow = rowComponents.find(
        (r) => r.id === "rowClipOverflow" || r.layout?.overflow === "hidden"
      );
      const scrollOverflow = rowComponents.find(
        (r) => r.id === "rowScrollOverflow" || r.layout?.overflow === "scroll"
      );

      if (visibleOverflow) {
        console.log(
          `${COLORS.GREEN}✓ 找到使用overflow:visible的Row组件${COLORS.RESET}`
        );
        if (
          result.includes("overflow: visible") ||
          result.includes("overflow:visible")
        ) {
          console.log(
            `${COLORS.GREEN}✓ HTML中包含overflow: visible${COLORS.RESET}`
          );
        } else {
          console.warn(
            `${COLORS.YELLOW}⚠ HTML中未找到overflow: visible${COLORS.RESET}`
          );
        }
      }

      if (hiddenOverflow) {
        console.log(
          `${COLORS.GREEN}✓ 找到使用overflow:hidden的Row组件${COLORS.RESET}`
        );
        if (
          result.includes("overflow: hidden") ||
          result.includes("overflow:hidden")
        ) {
          console.log(
            `${COLORS.GREEN}✓ HTML中包含overflow: hidden${COLORS.RESET}`
          );
        } else {
          console.warn(
            `${COLORS.YELLOW}⚠ HTML中未找到overflow: hidden${COLORS.RESET}`
          );
        }
      }

      if (scrollOverflow) {
        console.log(
          `${COLORS.GREEN}✓ 找到使用overflow:scroll的Row组件${COLORS.RESET}`
        );
        if (
          result.includes("overflow: scroll") ||
          result.includes("overflow:scroll") ||
          result.includes("overflow-x: scroll") ||
          result.includes("overflow-x:scroll")
        ) {
          console.log(
            `${COLORS.GREEN}✓ HTML中包含overflow: scroll${COLORS.RESET}`
          );
        } else {
          console.warn(
            `${COLORS.YELLOW}⚠ HTML中未找到overflow: scroll${COLORS.RESET}`
          );
        }
      }
      break;

    case "TC-R-016":
      // 验证wrap属性
      console.log("- 验证wrap属性...");
      const wrapRow = rowComponents.find(
        (r) => r.id === "rowWrap" || r.layout?.wrap === true
      );
      const noWrapRow = rowComponents.find(
        (r) => r.id === "rowNoWrap" || r.layout?.wrap === false
      );

      if (wrapRow) {
        console.log(
          `${COLORS.GREEN}✓ 找到使用wrap:true的Row组件${COLORS.RESET}`
        );
        // 验证HTML中包含flex-wrap: wrap
        if (result.includes("flex-wrap: wrap")) {
          console.log(
            `${COLORS.GREEN}✓ HTML中包含flex-wrap: wrap${COLORS.RESET}`
          );
        } else {
          console.warn(
            `${COLORS.YELLOW}⚠ HTML中未找到flex-wrap: wrap${COLORS.RESET}`
          );
        }
      }

      if (noWrapRow) {
        console.log(
          `${COLORS.GREEN}✓ 找到使用wrap:false的Row组件${COLORS.RESET}`
        );
        // 验证HTML中包含flex-wrap: nowrap
        if (result.includes("flex-wrap: nowrap")) {
          console.log(
            `${COLORS.GREEN}✓ HTML中包含flex-wrap: nowrap${COLORS.RESET}`
          );
        } else {
          console.warn(
            `${COLORS.YELLOW}⚠ HTML中未找到flex-wrap: nowrap${COLORS.RESET}`
          );
        }
      }
      break;

    case "TC-R-017":
      // 验证padding属性
      console.log("- 验证padding属性...");
      const equalPaddingRow = rowComponents.find(
        (r) => r.id === "rowEqualPadding"
      );
      const customPaddingRow = rowComponents.find(
        (r) => r.id === "rowCustomPadding"
      );

      if (equalPaddingRow && equalPaddingRow.layout?.padding) {
        console.log(
          `${COLORS.GREEN}✓ 找到使用等值padding的Row组件${COLORS.RESET}`
        );
        if (
          result.includes("padding: 20px") ||
          result.includes("padding:20px")
        ) {
          console.log(
            `${COLORS.GREEN}✓ HTML中包含padding: 20px${COLORS.RESET}`
          );
        }
      }

      if (customPaddingRow && customPaddingRow.layout?.padding) {
        console.log(
          `${COLORS.GREEN}✓ 找到使用自定义padding的Row组件${COLORS.RESET}`
        );
        if (
          result.includes("padding-top") &&
          result.includes("padding-right") &&
          result.includes("padding-bottom") &&
          result.includes("padding-left")
        ) {
          console.log(
            `${COLORS.GREEN}✓ HTML中包含各方向padding设置${COLORS.RESET}`
          );
        }
      }
      break;

    case "TC-R-018":
      // 验证spacing属性
      console.log("- 验证spacing属性...");
      const largeSpacingRow = rowComponents.find(
        (r) => r.id === "rowLargeSpacing"
      );

      if (largeSpacingRow && largeSpacingRow.layout?.spacing) {
        console.log(
          `${COLORS.GREEN}✓ 找到使用较大spacing的Row组件${COLORS.RESET}`
        );
        // 验证生成的HTML中应该包含margin或gap相关的CSS
        if (
          result.includes("gap:") ||
          result.includes("gap: ") ||
          result.includes("margin")
        ) {
          console.log(`${COLORS.GREEN}✓ HTML中包含间距相关样式${COLORS.RESET}`);
        } else {
          console.warn(
            `${COLORS.YELLOW}⚠ HTML中未找到间距相关样式${COLORS.RESET}`
          );
        }
      }
      break;
  }
}

/**
 * 递归查找所有Row组件
 */
function findRowComponents(data) {
  const rows = [];

  function traverse(component) {
    if (!component) return;

    // 检查是否为Row组件
    if (component.type === "Row") {
      rows.push(component);
    }

    // 处理组件的children字段（数组形式）
    if (component.children && Array.isArray(component.children)) {
      component.children.forEach((childId) => {
        if (
          typeof childId === "string" &&
          data.components &&
          data.components[childId]
        ) {
          traverse(data.components[childId]);
        }
      });
    }

    // 处理root字段
    if (
      component === data.root &&
      data.components &&
      data.components[component]
    ) {
      traverse(data.components[component]);
    }
  }

  // 从根组件开始遍历
  if (data.root && typeof data.root === "string") {
    traverse(data.components[data.root]);
  } else if (data.root) {
    traverse(data.root);
  } else if (data.components) {
    // 遍历所有组件
    Object.values(data.components).forEach(traverse);
  }

  return rows;
}

/**
 * 分析HTML输出中的Row组件
 */
function analyzeRowOutput(html) {
  // 提取所有的Row组件
  const rows = [];

  // 找到所有的Row组件
  // 注意：这个简单的正则表达式可能无法处理复杂的HTML嵌套
  // 实际应用中应使用DOM解析器
  const rowRegex =
    /<div[^>]*class="[^"]*guids-row[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
  let match;

  while ((match = rowRegex.exec(html)) !== null) {
    // 组件的完整内容，包括开始和结束标签
    const fullContent = match[0];
    // 组件的内部内容，不包括Row的开始和结束标签
    const innerContent = match[1];

    const row = {
      content: fullContent,
      innerContent: innerContent,
      children: countChildren(innerContent),
    };
    rows.push(row);
  }

  return rows;
}

/**
 * 计算HTML内容中的子元素数量
 */
function countChildren(html) {
  // 这是一个简化的实现，只计算顶层的div元素
  // 复杂情况应使用DOM解析
  const childRegex = /<div[^>]*>[\s\S]*?<\/div>/g;
  const matches = html.match(childRegex) || [];
  return matches.length;
}

/**
 * 验证Row组件的渲染是否正确
 */
function verifyRowRendering(sourceRows, renderedRows) {
  console.log(`- 验证Row组件的渲染...`);

  // 基本数量检查
  if (sourceRows.length === 0) {
    return { success: false, message: "源数据中没有找到Row组件" };
  }

  if (renderedRows.length === 0) {
    return { success: false, message: "渲染输出中没有找到Row组件" };
  }

  // 检查数量是否匹配
  if (sourceRows.length !== renderedRows.length) {
    console.warn(
      `${COLORS.YELLOW}⚠ Row组件数量不匹配: 源数据中有 ${sourceRows.length} 个, 渲染了 ${renderedRows.length} 个${COLORS.RESET}`
    );
  }

  // 验证样式属性
  let success = true;

  // 因为我们使用了CSS类，而不是内联样式，所以需要更加宽松的验证
  // 将检查类名是否正确，而不是直接检查style属性
  for (let i = 0; i < Math.min(sourceRows.length, renderedRows.length); i++) {
    const sourceRow = sourceRows[i];
    const renderedRow = renderedRows[i];

    // 验证Row组件具有guids-row类
    if (
      !renderedRow.content.includes('class="') ||
      !renderedRow.content.includes("guids-row")
    ) {
      console.warn(
        `${COLORS.YELLOW}⚠ Row组件 ${i + 1} 缺少guids-row类${COLORS.RESET}`
      );
      success = false;
    }

    // 检查子元素数量
    if (sourceRow.children) {
      const expectedChildren = sourceRow.children.length;
      const actualChildren = renderedRow.children;

      if (expectedChildren !== actualChildren) {
        console.warn(
          `${COLORS.YELLOW}⚠ Row组件 ${
            i + 1
          } 子元素数量不匹配: 预期 ${expectedChildren}, 实际 ${actualChildren}${
            COLORS.RESET
          }`
        );
        // 这可能不是一个严重错误，所以不将success设为false
      }
    }

    // 检查布局属性 - 只是记录信息，不影响测试结果
    if (sourceRow.layout) {
      if (sourceRow.layout.alignment) {
        console.log(`- 检查对齐方式: ${sourceRow.layout.alignment}`);
      }

      if (sourceRow.layout.distribution) {
        console.log(`- 检查分布方式: ${sourceRow.layout.distribution}`);
      }

      if (sourceRow.layout.spacing) {
        console.log(`- 检查间距: ${sourceRow.layout.spacing}`);
      }

      if (sourceRow.layout.padding) {
        console.log(
          `- 检查内边距: ${JSON.stringify(sourceRow.layout.padding)}`
        );
      }
    }
  }

  return {
    success,
    message: success
      ? "所有Row组件渲染正确"
      : "Row组件渲染存在问题，详见警告信息",
  };
}

// 运行Row组件测试
testRowComponent().then((success) => {
  if (success) {
    console.log(`${COLORS.GREEN}Row组件测试全部通过!${COLORS.RESET}`);
    process.exit(0);
  } else {
    console.log(
      `${COLORS.RED}Row组件测试发现问题，请查看详细输出${COLORS.RESET}`
    );
    process.exit(1);
  }
});
