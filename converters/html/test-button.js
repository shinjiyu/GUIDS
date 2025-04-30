/**
 * GUIDS HTML转换器 - 按钮测试
 */

const fs = require("fs");
const path = require("path");
const GUIDS2HTML = require("./guids2html");

// 设置路径
const inputPath = path.join(__dirname, "../../examples/simple_button.json");
const outputPath = path.join(__dirname, "./output/simple_button.html");

// 确保输出目录存在
if (!fs.existsSync(path.join(__dirname, "./output"))) {
  fs.mkdirSync(path.join(__dirname, "./output"));
}

// 显示开始信息
console.log("开始转换按钮...");
console.log(`输入文件: ${inputPath}`);
console.log(`输出文件: ${outputPath}`);

try {
  // 读取GUIDS JSON
  const guidsDef = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  console.log("GUIDS文件读取成功");

  // 创建转换器
  const converter = new GUIDS2HTML(guidsDef);
  console.log("转换器创建成功");

  // 生成HTML
  const html = converter.generate();
  console.log("HTML生成成功");

  // 写入输出文件
  fs.writeFileSync(outputPath, html, "utf8");
  console.log(`✅ 转换完成，已保存到: ${outputPath}`);
} catch (err) {
  console.error("❌ 转换失败:");
  console.error(err);
}
