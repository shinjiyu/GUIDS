/**
 * GUIDS HTML转换器测试脚本
 * 使用此脚本测试转换器功能
 */

const fs = require("fs");
const path = require("path");
const GUIDS2HTML = require("./guids2html");

console.log("GUIDS2HTML 转换测试开始...");

// 测试示例按钮
function testSimpleButton() {
  console.log("测试转换简单按钮...");
  const inputPath = path.join(__dirname, "../../examples/simple_button.json");
  const outputPath = path.join(__dirname, "./output/simple_button.html");

  console.log(`输入文件: ${inputPath}`);
  console.log(`输出文件: ${outputPath}`);

  // 确保输出目录存在
  if (!fs.existsSync(path.join(__dirname, "./output"))) {
    fs.mkdirSync(path.join(__dirname, "./output"), { recursive: true });
    console.log("创建输出目录");
  }

  try {
    // 检查输入文件是否存在
    if (!fs.existsSync(inputPath)) {
      throw new Error(`输入文件不存在: ${inputPath}`);
    }

    // 读取GUIDS JSON
    const fileContent = fs.readFileSync(inputPath, "utf8");
    console.log(`读取文件成功，文件大小: ${fileContent.length} 字节`);

    const guidsDef = JSON.parse(fileContent);
    console.log("JSON解析成功");

    // 创建转换器并生成HTML
    console.log("创建转换器...");
    const converter = new GUIDS2HTML(guidsDef);
    console.log("生成HTML...");
    const html = converter.generate();
    console.log(`HTML生成成功，大小: ${html.length} 字节`);

    // 写入输出文件
    fs.writeFileSync(outputPath, html, "utf8");
    console.log(`✓ 简单按钮转换完成，输出到: ${outputPath}`);
  } catch (err) {
    console.error(`简单按钮转换失败: ${err.message}`);
    console.error(err.stack);
    throw err;
  }
}

// 测试主菜单示例
function testMainMenu() {
  console.log("测试转换主菜单...");
  const inputPath = path.join(__dirname, "../../examples/main_menu.json");
  const outputPath = path.join(__dirname, "./output/main_menu.html");

  console.log(`输入文件: ${inputPath}`);
  console.log(`输出文件: ${outputPath}`);

  // 确保输出目录存在
  if (!fs.existsSync(path.join(__dirname, "./output"))) {
    fs.mkdirSync(path.join(__dirname, "./output"), { recursive: true });
    console.log("创建输出目录");
  }

  try {
    // 检查输入文件是否存在
    if (!fs.existsSync(inputPath)) {
      throw new Error(`输入文件不存在: ${inputPath}`);
    }

    // 读取GUIDS JSON
    const fileContent = fs.readFileSync(inputPath, "utf8");
    console.log(`读取文件成功，文件大小: ${fileContent.length} 字节`);

    const guidsDef = JSON.parse(fileContent);
    console.log("JSON解析成功");

    // 创建转换器并生成HTML
    console.log("创建转换器...");
    const converter = new GUIDS2HTML(guidsDef, {
      inlineStyles: false, // 使用外部样式表
    });
    console.log("生成HTML...");
    const html = converter.generate();
    console.log(`HTML生成成功，大小: ${html.length} 字节`);

    // 写入输出文件
    fs.writeFileSync(outputPath, html, "utf8");
    console.log(`✓ 主菜单转换完成，输出到: ${outputPath}`);
  } catch (err) {
    console.error(`主菜单转换失败: ${err.message}`);
    console.error(err.stack);
    throw err;
  }
}

// 测试布局示例
function testLayoutExample() {
  console.log("测试转换布局示例...");
  const inputPath = path.join(__dirname, "../../examples/layout_example.json");
  const outputPath = path.join(__dirname, "./output/layout_example.html");

  console.log(`输入文件: ${inputPath}`);
  console.log(`输出文件: ${outputPath}`);

  // 确保输出目录存在
  if (!fs.existsSync(path.join(__dirname, "./output"))) {
    fs.mkdirSync(path.join(__dirname, "./output"), { recursive: true });
    console.log("创建输出目录");
  }

  try {
    // 检查输入文件是否存在
    if (!fs.existsSync(inputPath)) {
      throw new Error(`输入文件不存在: ${inputPath}`);
    }

    // 读取GUIDS JSON
    const fileContent = fs.readFileSync(inputPath, "utf8");
    console.log(`读取文件成功，文件大小: ${fileContent.length} 字节`);

    const guidsDef = JSON.parse(fileContent);
    console.log("JSON解析成功");

    // 创建转换器并生成HTML
    console.log("创建转换器...");
    const converter = new GUIDS2HTML(guidsDef, {
      inlineStyles: false, // 使用外部样式表
    });
    console.log("生成HTML...");
    const html = converter.generate();
    console.log(`HTML生成成功，大小: ${html.length} 字节`);

    // 写入输出文件
    fs.writeFileSync(outputPath, html, "utf8");
    console.log(`✓ 布局示例转换完成，输出到: ${outputPath}`);
  } catch (err) {
    console.error(`布局示例转换失败: ${err.message}`);
    console.error(err.stack);
    throw err;
  }
}

// 运行测试
try {
  testSimpleButton();
  testMainMenu();
  testLayoutExample();
  console.log("所有测试完成!");
} catch (err) {
  console.error(`测试失败: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
}
