#!/usr/bin/env node

const fs = require("fs");
const converters = require("./index");

const format = process.argv[2]; // 例如 'html'
const input = process.argv[3];
const output = process.argv[4];

if (!format || !input || !output) {
  console.error("用法: node guids2any.js <format> <input.json> <outputfile>");
  process.exit(1);
}

if (!converters[format]) {
  console.error(`错误: 未找到转换器 "${format}"`);
  process.exit(1);
}

try {
  const guidsDef = JSON.parse(fs.readFileSync(input, "utf8"));
  const ConverterClass = converters[format];
  const converter = new ConverterClass(guidsDef, {
    /* 可扩展选项 */
  });
  fs.writeFileSync(output, converter.generate(), "utf8");
  console.log(`✓ 成功将 ${input} 转换为 ${output} (格式: ${format})`);
} catch (err) {
  console.error("错误:", err.message);
  process.exit(1);
}
