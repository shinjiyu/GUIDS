/**
 * Run All Tests Script
 * This script runs all component tests and generates a summary report
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ANSI color codes for console output
const COLORS = {
  RESET: "\x1b[0m",
  GREEN: "\x1b[32m",
  RED: "\x1b[31m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  CYAN: "\x1b[36m",
  MAGENTA: "\x1b[35m",
};

// Store test results
const results = {
  total: 0,
  passed: 0,
  failed: 0,
  skipped: 0,
  startTime: new Date(),
  endTime: null,
  tests: [],
};

// Components to test
const components = [
  { name: "Button", testScript: "button-test.js" },
  { name: "Row", testScript: "row-test.js" },
  // Uncomment as more test scripts are created
  // { name: 'Column', testScript: 'column-test.js' },
  // { name: 'Text', testScript: 'text-test.js' },
];

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, "output");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Components to test
const COMPONENT_TYPES = ["row", "column", "button"];

// Get command line arguments
const args = process.argv.slice(2);
const componentType = args[0]; // Possible values: row, column, button, or empty (all tests)

// Validate component type
if (componentType && !COMPONENT_TYPES.includes(componentType)) {
  console.error(
    `${COLORS.RED}Error: Unsupported component type '${componentType}'${COLORS.RESET}`
  );
  console.log(
    `${COLORS.CYAN}Supported component types: ${COMPONENT_TYPES.join(", ")}${
      COLORS.RESET
    }`
  );
  process.exit(1);
}

// Run all tests
async function runAllTests() {
  console.log(
    `${COLORS.CYAN}======================================${COLORS.RESET}`
  );
  console.log(
    `${COLORS.CYAN}       GUIDS2HTML TEST RUNNER        ${COLORS.RESET}`
  );
  console.log(
    `${COLORS.CYAN}======================================${COLORS.RESET}`
  );
  console.log(
    `${COLORS.BLUE}Started at: ${results.startTime.toLocaleString()}${
      COLORS.RESET
    }`
  );
  console.log();

  if (componentType) {
    console.log(
      `${COLORS.BLUE}Running tests for component type: ${componentType}${COLORS.RESET}`
    );
    await runComponentTests(componentType);
  } else {
    console.log(
      `${COLORS.BLUE}Running tests for all component types${COLORS.RESET}`
    );

    // Run tests for all component types
    let failedTypes = [];

    for (const type of COMPONENT_TYPES) {
      try {
        console.log(
          `${COLORS.BLUE}====================================${COLORS.RESET}`
        );
        console.log(
          `${COLORS.BLUE}Running tests for component type: ${type}${COLORS.RESET}`
        );
        await runComponentTests(type);
      } catch (error) {
        console.error(
          `${COLORS.RED}Component ${type} tests failed: ${error.message}${COLORS.RESET}`
        );
        failedTypes.push(type);
      }
    }

    // Output total results
    console.log(
      `${COLORS.BLUE}====================================${COLORS.RESET}`
    );
    console.log(`${COLORS.BLUE}Tests completed${COLORS.RESET}`);

    if (failedTypes.length > 0) {
      console.log(
        `${COLORS.RED}Failed component types: ${failedTypes.join(", ")}${
          COLORS.RESET
        }`
      );
      process.exit(1);
    } else {
      console.log(`${COLORS.GREEN}All component tests passed${COLORS.RESET}`);
    }
  }

  // Calculate test duration
  results.endTime = new Date();
  const duration = (results.endTime - results.startTime) / 1000;

  // Print summary
  console.log(
    `${COLORS.CYAN}======================================${COLORS.RESET}`
  );
  console.log(
    `${COLORS.CYAN}           TEST SUMMARY              ${COLORS.RESET}`
  );
  console.log(
    `${COLORS.CYAN}======================================${COLORS.RESET}`
  );
  console.log(`${COLORS.BLUE}Total tests:    ${results.total}${COLORS.RESET}`);
  console.log(
    `${COLORS.GREEN}Passed:         ${results.passed}${COLORS.RESET}`
  );
  console.log(`${COLORS.RED}Failed:         ${results.failed}${COLORS.RESET}`);
  console.log(
    `${COLORS.YELLOW}Skipped:        ${results.skipped}${COLORS.RESET}`
  );
  console.log(
    `${COLORS.BLUE}Duration:       ${duration.toFixed(2)} seconds${
      COLORS.RESET
    }`
  );
  console.log(
    `${COLORS.BLUE}Completed at:   ${results.endTime.toLocaleString()}${
      COLORS.RESET
    }`
  );
  console.log();

  // Generate JSON results file
  const resultsJson = JSON.stringify(results, null, 2);
  fs.writeFileSync(path.join(outputDir, "test-results.json"), resultsJson);
  console.log(
    `${COLORS.BLUE}Results saved to: ${path.join(
      outputDir,
      "test-results.json"
    )}${COLORS.RESET}`
  );

  // Generate HTML report
  generateHtmlReport(results);

  // Return exit code based on test results
  return results.failed === 0 ? 0 : 1;
}

// Run tests and exit with appropriate code
runAllTests().then((exitCode) => {
  process.exit(exitCode);
});

// Run tests for a specific component type
async function runComponentTests(type) {
  const testScript = path.join(__dirname, `${type}-test.js`);

  // Check if test script exists
  if (!fs.existsSync(testScript)) {
    console.error(
      `${COLORS.RED}Error: Test script not found: ${testScript}${COLORS.RESET}`
    );
    throw new Error(`Test script not found: ${testScript}`);
  }

  try {
    // Run the test script
    console.log(
      `${COLORS.CYAN}Running test script: ${testScript}${COLORS.RESET}`
    );
    execSync(`node "${testScript}"`, { stdio: "inherit" });
    console.log(
      `${COLORS.GREEN}Component ${type} tests completed successfully${COLORS.RESET}`
    );
    results.passed++;
    results.tests.push({
      component: type,
      status: "passed",
    });
  } catch (error) {
    console.error(
      `${COLORS.RED}✗ Component ${type} tests failed${COLORS.RESET}`
    );
    results.failed++;
    results.tests.push({
      component: type,
      status: "failed",
      error: error.message,
    });
  }

  results.total++;
  console.log();
}

// Generate HTML report
function generateHtmlReport(results) {
  const reportPath = path.join(outputDir, "test-report.html");

  // Create simple HTML report
  const reportContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GUIDS2HTML Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; line-height: 1.6; }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { color: #333; }
        .summary { display: flex; margin-bottom: 20px; }
        .summary-item { margin-right: 20px; }
        .summary-item span { font-size: 24px; font-weight: bold; }
        .passed { color: #2ecc71; }
        .failed { color: #e74c3c; }
        .skipped { color: #f39c12; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f2f2f2; }
        .status-passed { background-color: #d5f5e3; }
        .status-failed { background-color: #fadbd8; }
        .status-skipped { background-color: #fef9e7; }
    </style>
</head>
<body>
    <div class="container">
        <h1>GUIDS2HTML Test Report</h1>
        <p>Test run completed at ${results.endTime.toLocaleString()}</p>
        
        <div class="summary">
            <div class="summary-item">
                <div>Total Tests</div>
                <span>${results.total}</span>
            </div>
            <div class="summary-item">
                <div>Passed</div>
                <span class="passed">${results.passed}</span>
            </div>
            <div class="summary-item">
                <div>Failed</div>
                <span class="failed">${results.failed}</span>
            </div>
            <div class="summary-item">
                <div>Skipped</div>
                <span class="skipped">${results.skipped}</span>
            </div>
        </div>
        
        <div>Duration: ${((results.endTime - results.startTime) / 1000).toFixed(
          2
        )} seconds</div>
        
        <table>
            <thead>
                <tr>
                    <th>Component</th>
                    <th>Status</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                ${results.tests
                  .map(
                    (test) => `
                <tr class="status-${test.status}">
                    <td>${test.component}</td>
                    <td>${test.status.toUpperCase()}</td>
                    <td>${test.error || ""}</td>
                </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    </div>
</body>
</html>
  `;

  fs.writeFileSync(reportPath, reportContent);
  console.log(
    `${COLORS.BLUE}HTML Report saved to: ${reportPath}${COLORS.RESET}`
  );
}

// Output usage instructions
function showUsage() {
  console.log(`
Usage: node run-all-tests.js [component type]

Parameters:
  component type    Optional parameter, specify the component type to test. Supported values: ${COMPONENT_TYPES.join(
    ", "
  )}
                    If not provided, all component types will be tested.

Examples:
  node run-all-tests.js          # Test all components
  node run-all-tests.js row      # Test only the Row component
  node run-all-tests.js column   # Test only the Column component
  node run-all-tests.js button   # Test only the Button component
  `);
}

// If command line contains --help, show usage instructions
if (args.includes("--help") || args.includes("-h")) {
  showUsage();
} else {
  // Execute tests
  runAllTests().catch((error) => {
    console.error(
      `${COLORS.RED}Test execution failed: ${error.message}${COLORS.RESET}`
    );
    process.exit(1);
  });
}
