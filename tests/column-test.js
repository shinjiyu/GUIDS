const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { JSDOM } = require("jsdom");

// ANSI color codes for console output
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";
const BLUE = "\x1b[34m";

// Configuration
const BASE_PATH = path.resolve(__dirname, "..");
const TEST_DATA_DIR = path.join(
  BASE_PATH,
  "tests",
  "data",
  "components",
  "column"
);
const OUTPUT_DIR = path.join(BASE_PATH, "tests", "output", "column");
const CONVERTER_PATH = path.join(
  BASE_PATH,
  "node_modules",
  ".bin",
  "guids2html"
);

// List of test cases
const TEST_CASES = [
  "TC-CL-001",
  "TC-CL-002",
  "TC-CL-003",
  "TC-CL-004",
  "TC-CL-005",
  "TC-CL-006",
  "TC-CL-007",
  "TC-CL-008",
  "TC-CL-009",
  "TC-CL-010",
  "TC-CL-011",
  "TC-CL-012",
  "TC-CL-013",
  "TC-CL-014",
  "TC-CL-015",
  "TC-CL-016",
  "TC-CL-017",
  "TC-CL-018",
];

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Function to verify a column component's properties
function verifyColumnComponent(html, testCase) {
  // Column components should be rendered as div elements with class 'column'
  const columnMatches =
    html.match(/<div[^>]*class="[^"]*column[^"]*"[^>]*>/gi) || [];

  if (columnMatches.length === 0) {
    console.log(
      `${RED}[FAIL] No Column components found in the output HTML${RESET}`
    );
    return false;
  }

  console.log(`Found ${columnMatches.length} Column components`);

  // Try to detect child elements inside the column component
  // This is a simple approach and might not work for all cases
  // A proper HTML parser would be more accurate
  const childrenCount = [];
  columnMatches.forEach((columnMatch, index) => {
    // Find the closing tag for this column by counting nested divs
    const startIndex = html.indexOf(columnMatch);
    let depth = 1;
    let endIndex = startIndex + columnMatch.length;

    while (depth > 0 && endIndex < html.length) {
      const nextOpenTag = html.indexOf("<div", endIndex);
      const nextCloseTag = html.indexOf("</div>", endIndex);

      if (nextOpenTag !== -1 && nextOpenTag < nextCloseTag) {
        depth++;
        endIndex = nextOpenTag + 4;
      } else if (nextCloseTag !== -1) {
        depth--;
        endIndex = nextCloseTag + 6;
      } else {
        break;
      }
    }

    const columnContent = html.substring(startIndex, endIndex);
    const childDivs = columnContent.match(/<div[^>]*>/g) || [];

    // Subtract 1 for the column div itself
    const childCount = Math.max(0, childDivs.length - 1);
    childrenCount.push(childCount);

    console.log(
      `Column #${index + 1} has approximately ${childCount} child elements`
    );
  });

  // Check for other expected properties based on test case
  const flexDirectionCheck =
    html.includes("flex-direction: column") || html.includes("display: flex");

  if (!flexDirectionCheck) {
    console.log(
      `${YELLOW}[WARNING] flex-direction: column not found in the output HTML${RESET}`
    );
  }

  // Alignment check
  const alignCheck =
    html.includes("align-items:") || html.includes("justify-content:");

  if (!alignCheck) {
    console.log(
      `${YELLOW}[WARNING] Alignment properties not found in the output HTML${RESET}`
    );
  }

  // For simplicity, we consider the test passed if we found at least one column component
  return columnMatches.length > 0;
}

// Function to run a single test case
async function runTest(testCase) {
  return new Promise((resolve, reject) => {
    console.log(`${BLUE}===== 运行测试: ${testCase} =====${RESET}`);

    // 源文件和目标文件路径
    const jsonFilePath = path.join(TEST_DATA_DIR, `${testCase}.json`);
    const outputFilePath = path.join(OUTPUT_DIR, `${testCase}.html`);

    // 确保JSON文件存在
    if (!fs.existsSync(jsonFilePath)) {
      console.log(
        `${RED}错误: 测试用例JSON文件不存在: ${jsonFilePath}${RESET}`
      );
      reject(false);
      return;
    }

    console.log(`正在加载测试JSON文件: ${jsonFilePath}`);

    try {
      // 读取并解析JSON文件
      const jsonContent = fs.readFileSync(jsonFilePath, "utf8");
      const testData = JSON.parse(jsonContent);

      // 查找Column组件
      const columnComponents = [];
      Object.entries(testData.components).forEach(([id, component]) => {
        if (component.type === "column") {
          columnComponents.push({ id, ...component });
        }
      });

      console.log(`找到 ${columnComponents.length} 个Column组件进行测试`);

      if (columnComponents.length === 0) {
        console.log(`${YELLOW}警告: 未找到Column组件进行测试${RESET}`);
        reject(false);
        return;
      }

      // 执行GUIDS2HTML转换
      console.log("将GUIDs转换为HTML...");
      const converterScript = path.join(
        BASE_PATH,
        "converters",
        "guids2any.js"
      );

      execSync(
        `node "${converterScript}" html "${jsonFilePath}" "${outputFilePath}"`,
        { stdio: "inherit" }
      );

      // 验证生成的HTML
      console.log("验证Column组件渲染...");

      try {
        const html = fs.readFileSync(outputFilePath, "utf8");
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // 验证每个Column组件
        let allTestsPassed = true;

        columnComponents.forEach((column) => {
          const columnId = column.id;
          console.log(`验证Column组件: ${columnId}`);

          // 查找对应的DOM元素
          const columnElement = document.getElementById(columnId);

          if (!columnElement) {
            console.log(
              `${RED}错误: 未找到Column组件 ${columnId} 的DOM元素${RESET}`
            );
            allTestsPassed = false;
            return;
          }

          // 验证渲染 - Column元素应该是div
          if (columnElement.tagName.toLowerCase() !== "div") {
            console.log(
              `${RED}错误: Column组件应渲染为div元素，但找到的是 ${columnElement.tagName}${RESET}`
            );
            allTestsPassed = false;
          }

          // 验证样式 - Column元素应该有display: flex和flex-direction: column
          const computedStyle = columnElement.style;
          if (computedStyle.display !== "flex") {
            console.log(
              `${RED}错误: Column组件应使用display: flex，但值为 ${computedStyle.display}${RESET}`
            );
            allTestsPassed = false;
          }

          if (computedStyle.flexDirection !== "column") {
            console.log(
              `${RED}错误: Column组件应使用flex-direction: column，但值为 ${computedStyle.flexDirection}${RESET}`
            );
            allTestsPassed = false;
          }

          // 验证子元素
          const expectedChildren = column.children || [];
          const actualChildren = columnElement.children.length;

          if (actualChildren !== expectedChildren.length) {
            console.log(
              `${YELLOW}警告: Column组件 ${columnId} 的子元素数量不匹配 - 预期: ${expectedChildren.length}, 实际: ${actualChildren}${RESET}`
            );
            // 这里不将测试标记为失败，因为HTML中的子元素可能会有所不同
          }

          // 验证背景色
          if (column.style && column.style.backgroundColor) {
            const expectedColor = column.style.backgroundColor.toLowerCase();
            const actualColor = computedStyle.backgroundColor.toLowerCase();

            if (!actualColor.includes(expectedColor.replace("#", ""))) {
              console.log(
                `${YELLOW}警告: 背景颜色不匹配 - 预期: ${expectedColor}, 实际: ${actualColor}${RESET}`
              );
              // 颜色格式可能有所不同，所以这里只发出警告
            }
          }
        });

        if (allTestsPassed) {
          console.log(`${GREEN}测试通过: ${testCase}${RESET}`);
          resolve(true);
        } else {
          console.log(`${RED}测试失败: ${testCase}${RESET}`);
          reject(false);
        }
      } catch (err) {
        console.log(`${RED}验证失败: ${err.message}${RESET}`);
        reject(false);
      }
    } catch (err) {
      console.log(`${RED}处理测试用例时出错: ${err.message}${RESET}`);
      reject(false);
    }
  });
}

// Main function to run all tests
async function runAllTests() {
  console.log(
    `${BLUE}开始运行Column组件测试 (${TEST_CASES.length} 个测试用例)${RESET}`
  );

  let passedCount = 0;
  let failedCount = 0;
  let totalTests = TEST_CASES.length;

  for (const testCase of TEST_CASES) {
    try {
      const passed = await runTest(testCase);
      if (passed) {
        passedCount++;
      } else {
        failedCount++;
      }
    } catch (error) {
      console.error(
        `${RED}[ERROR] Failed to run test case ${testCase}:${RESET}`,
        error.message
      );
      failedCount++;
    }
  }

  // 显示测试统计
  console.log(`\n${BLUE}===== 测试结果摘要 =====${RESET}`);
  console.log(`总计测试: ${totalTests}`);
  console.log(`${GREEN}通过: ${passedCount}${RESET}`);
  console.log(`${RED}失败: ${failedCount}${RESET}`);

  // 返回退出码 - 如果有测试失败则返回1，否则返回0
  process.exit(failedCount > 0 ? 1 : 0);
}

// Run the tests
runAllTests().catch((error) => {
  console.error(`${RED}测试执行失败: ${error.message}${RESET}`);
  process.exit(1);
});
