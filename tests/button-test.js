// Button Component Test Script
const fs = require("fs");
const path = require("path");
const { GUIDS2HTML } = require("../src/index");

// Define paths
const TEST_FILE_PATH = path.join(
  __dirname,
  "data/components/button/TC-B-001.json"
);
const OUTPUT_PATH = path.join(__dirname, "output");
const OUTPUT_FILE = path.join(OUTPUT_PATH, "button-test-output.html");

// ANSI color codes for console output
const COLORS = {
  RESET: "\x1b[0m",
  GREEN: "\x1b[32m",
  RED: "\x1b[31m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  CYAN: "\x1b[36m",
};

/**
 * Run the Button component test
 */
async function testButton() {
  console.log(`${COLORS.CYAN}=== Button Component Test ====${COLORS.RESET}`);

  try {
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_PATH)) {
      fs.mkdirSync(OUTPUT_PATH, { recursive: true });
    }

    // Load test JSON file
    console.log(
      `${COLORS.BLUE}Loading test file: ${TEST_FILE_PATH}${COLORS.RESET}`
    );
    const jsonData = JSON.parse(fs.readFileSync(TEST_FILE_PATH, "utf8"));

    // Verify test data
    if (!jsonData || !jsonData.root) {
      throw new Error("Invalid test data structure");
    }

    // Find all button components in the test data
    const buttons = findButtonComponents(jsonData.root);
    console.log(
      `${COLORS.BLUE}Found ${buttons.length} button components to test${COLORS.RESET}`
    );

    // Initialize GUIDS2HTML converter
    const converter = new GUIDS2HTML({
      beautify: true,
      includeComments: true,
      generateIds: true,
    });

    // Generate HTML
    console.log(`${COLORS.BLUE}Converting GUIDS to HTML...${COLORS.RESET}`);
    const result = converter.convert(jsonData);

    // Analyze output for button elements
    const buttonElements = analyzeButtonOutput(result.html);

    // Write output to file
    fs.writeFileSync(OUTPUT_FILE, result.html, "utf8");
    console.log(
      `${COLORS.GREEN}Output saved to: ${OUTPUT_FILE}${COLORS.RESET}`
    );

    // Verify results
    verifyButtonRendering(buttons, buttonElements, result);

    console.log(
      `${COLORS.GREEN}✓ Button component test completed successfully${COLORS.RESET}`
    );
    return true;
  } catch (error) {
    console.error(
      `${COLORS.RED}✗ Button test failed: ${error.message}${COLORS.RESET}`
    );
    if (error.stack) {
      console.error(error.stack);
    }
    return false;
  }
}

/**
 * Recursively find all button components in the component tree
 */
function findButtonComponents(component, results = []) {
  if (!component) return results;

  if (component.type === "button") {
    results.push(component);
  }

  if (component.children && Array.isArray(component.children)) {
    component.children.forEach((child) => {
      findButtonComponents(child, results);
    });
  }

  return results;
}

/**
 * Very simple analysis of button elements in the output HTML
 * In a real implementation, this would use an HTML parser
 */
function analyzeButtonOutput(html) {
  const buttonRegex = /<button[^>]*id="([^"]*)"[^>]*>(.*?)<\/button>/gs;
  const results = [];

  let match;
  while ((match = buttonRegex.exec(html)) !== null) {
    results.push({
      id: match[1],
      content: match[2],
    });
  }

  return results;
}

/**
 * Verify that all buttons were rendered correctly
 */
function verifyButtonRendering(sourceButtons, renderedButtons, result) {
  console.log(`${COLORS.BLUE}Verifying button rendering...${COLORS.RESET}`);

  // Check count
  if (sourceButtons.length !== renderedButtons.length) {
    console.warn(
      `${COLORS.YELLOW}⚠ Button count mismatch: ${sourceButtons.length} in source, ${renderedButtons.length} rendered${COLORS.RESET}`
    );
  }

  // Check each button
  sourceButtons.forEach((sourceButton) => {
    const renderedButton = renderedButtons.find(
      (b) => b.id === sourceButton.id
    );

    if (!renderedButton) {
      console.error(
        `${COLORS.RED}✗ Button "${sourceButton.id}" not found in rendered output${COLORS.RESET}`
      );
      return;
    }

    // Check if content was rendered
    if (
      sourceButton.content &&
      !renderedButton.content.includes(sourceButton.content)
    ) {
      console.warn(
        `${COLORS.YELLOW}⚠ Button "${sourceButton.id}" content mismatch${COLORS.RESET}`
      );
    }

    // Check if styles were generated
    if (sourceButton.style) {
      if (!result.css.includes(`#${sourceButton.id}`)) {
        console.warn(
          `${COLORS.YELLOW}⚠ Button "${sourceButton.id}" styles not found in CSS${COLORS.RESET}`
        );
      }

      // Check for hover styles
      if (
        sourceButton.style.hoverState &&
        !result.css.includes(`#${sourceButton.id}:hover`)
      ) {
        console.warn(
          `${COLORS.YELLOW}⚠ Button "${sourceButton.id}" hover styles not found in CSS${COLORS.RESET}`
        );
      }

      // Check for pressed styles
      if (
        sourceButton.style.pressedState &&
        !result.css.includes(`:active`) &&
        !result.css.includes(`.pressed`)
      ) {
        console.warn(
          `${COLORS.YELLOW}⚠ Button "${sourceButton.id}" pressed styles not found in CSS${COLORS.RESET}`
        );
      }
    }

    // Check if click handler was generated
    if (
      sourceButton.onClick &&
      !result.js.includes(`document.getElementById('${sourceButton.id}')`)
    ) {
      console.warn(
        `${COLORS.YELLOW}⚠ Button "${sourceButton.id}" click handler not found in JavaScript${COLORS.RESET}`
      );
    }

    console.log(
      `${COLORS.GREEN}✓ Button "${sourceButton.id}" verified${COLORS.RESET}`
    );
  });
}

// Run the test
testButton().then((success) => {
  if (success) {
    console.log(
      `${COLORS.GREEN}Button test completed successfully!${COLORS.RESET}`
    );
  } else {
    console.log(
      `${COLORS.RED}Button test completed with errors${COLORS.RESET}`
    );
    process.exit(1);
  }
});
