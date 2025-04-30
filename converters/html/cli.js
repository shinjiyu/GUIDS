#!/usr/bin/env node

/**
 * GUIDS到HTML转换器的命令行工具
 */

const fs = require("fs");
const path = require("path");
const GUIDS2HTML = require("./guids2html");

// 解析命令行参数
const args = process.argv.slice(2);
const options = {
  input: null,
  output: null,
  inlineStyles: true,
  responsiveScaling: true,
  useModernFeatures: true,
};

// 帮助信息
function showHelp() {
  console.log(`
GUIDS to HTML Converter - 命令行工具

用法:
  node cli.js -i input.json [-o output.html] [options]

参数:
  -i, --input <file>         输入的GUIDS JSON文件路径（必需）
  -o, --output <file>        输出的HTML文件路径（可选，默认为与输入同名的.html文件）
  --no-inline-styles         不使用内联样式，而是生成单独的样式表
  --no-responsive            不生成响应式缩放功能
  --no-modern-css            不使用现代CSS特性（用于更好的兼容性）
  -h, --help                 显示此帮助信息

示例:
  node cli.js -i ../../examples/simple_button.json -o button.html
  node cli.js -i ../../examples/main_menu.json --no-inline-styles
`);
  process.exit(0);
}

// 解析参数
for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  switch (arg) {
    case "-h":
    case "--help":
      showHelp();
      break;

    case "-i":
    case "--input":
      options.input = args[++i];
      break;

    case "-o":
    case "--output":
      options.output = args[++i];
      break;

    case "--no-inline-styles":
      options.inlineStyles = false;
      break;

    case "--no-responsive":
      options.responsiveScaling = false;
      break;

    case "--no-modern-css":
      options.useModernFeatures = false;
      break;

    default:
      console.error(`未知选项: ${arg}`);
      showHelp();
  }
}

// 检查必需参数
if (!options.input) {
  console.error("错误: 必须提供输入文件 (-i 或 --input)");
  showHelp();
}

// 如果未提供输出路径，基于输入路径生成
if (!options.output) {
  const inputPath = path.parse(options.input);
  options.output = path.join(inputPath.dir, `${inputPath.name}.html`);
}

// 执行转换
try {
  // 读取GUIDS JSON文件
  const guidsDef = JSON.parse(fs.readFileSync(options.input, "utf8"));

  // 创建转换器实例
  const converter = new GUIDS2HTML(guidsDef, {
    inlineStyles: options.inlineStyles,
    responsiveScaling: options.responsiveScaling,
    useModernFeatures: options.useModernFeatures,
    generateWrapper: true,
  });

  // 生成HTML
  const html = converter.generate();

  // 输出到文件
  fs.writeFileSync(options.output, html, "utf8");

  console.log(`✓ 成功将 ${options.input} 转换为 ${options.output}`);
} catch (err) {
  console.error(`错误: ${err.message}`);
  process.exit(1);
}
