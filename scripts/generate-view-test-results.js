const fs = require("fs");
const path = require("path");

const outputRoot = path.join(__dirname, "../tests/output");
const outputHtml = path.join(__dirname, "../tests/view-test-results.html");

// 递归收集所有 output 下的 html 文件
function collectTestCases(dir, component = null) {
  let cases = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      cases = cases.concat(
        collectTestCases(path.join(dir, entry.name), entry.name)
      );
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      const id = entry.name.replace(/\.html$/, "");
      cases.push({
        id,
        component: component || path.basename(dir),
        file: path
          .relative(
            path.join(__dirname, "../tests"),
            path.join(dir, entry.name)
          )
          .replace(/\\/g, "/"),
      });
    }
  }
  return cases;
}

function generateHtml(testCases) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GUIDS2HTML 测试结果查看器</title>
    <style>
      :root {
        --primary-color: #3498db;
        --secondary-color: #2c3e50;
        --success-color: #2ecc71;
        --danger-color: #e74c3c;
        --warning-color: #f39c12;
        --light-bg: #f5f7fa;
        --border-color: #ddd;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: var(--light-bg);
        padding: 20px;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      header {
        background-color: var(--secondary-color);
        color: white;
        padding: 20px;
        text-align: center;
      }
      h1 { font-size: 24px; margin-bottom: 5px; }
      .summary {
        background-color: var(--primary-color);
        color: white;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
      }
      .summary-item { text-align: center; flex: 1; }
      .summary-item span { font-size: 24px; font-weight: bold; display: block; }
      .test-list { list-style: none; padding: 0; max-height: 600px; overflow-y: auto; }
      .test-item { padding: 15px 20px; border-bottom: 1px solid var(--border-color); transition: background-color 0.2s; cursor: pointer; position: relative; }
      .test-item:hover { background-color: #f8f9fa; }
      .test-header { display: flex; justify-content: space-between; align-items: center; }
      .test-name { font-weight: bold; font-size: 16px; }
      .test-component { font-size: 14px; color: #888; margin-left: 10px; }
      .test-file { font-size: 14px; color: #888; margin-left: 10px; }
      .preview-container {
        background: #f8f9fa;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        margin: 10px 0 20px 0;
        padding: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        animation: fadeIn 0.2s;
        max-height: 420px;
        overflow: auto;
      }
      .preview-container iframe {
        width: 100%;
        height: 400px;
        border: none;
        border-radius: 4px;
        background: white;
        display: block;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      footer { padding: 20px; text-align: center; color: #666; font-size: 14px; }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>GUIDS2HTML 测试结果查看器</h1>
        <p>自动收集 output 目录下所有用例，点击用例可在下方直接展开预览</p>
      </header>
      <div class="summary">
        <div class="summary-item">
          <span id="total-tests">${testCases.length}</span>
          <p>总测试数</p>
        </div>
        <div class="summary-item">
          <span id="component-count">${
            [...new Set(testCases.map((tc) => tc.component))].length
          }</span>
          <p>组件种类</p>
        </div>
      </div>
      <ul class="test-list" id="test-list">
        ${testCases
          .map(
            (tc) => `
          <li class="test-item" data-file="${tc.file}">
            <div class="test-header">
              <div class="test-name">${tc.id}</div>
              <div class="test-component">${tc.component}</div>
              <div class="test-file">${tc.file}</div>
            </div>
          </li>
        `
          )
          .join("")}
      </ul>
      <footer>
        <p>GUIDS2HTML 测试框架 | 自动生成 | ${new Date().toLocaleString()}</p>
      </footer>
    </div>
    <script>
      document.querySelectorAll('.test-item').forEach(item => {
        item.addEventListener('click', function() {
          // toggle preview
          const already = this.nextElementSibling && this.nextElementSibling.classList.contains('preview-container');
          // 先移除所有已展开的预览
          document.querySelectorAll('.preview-container').forEach(el => el.parentNode.removeChild(el));
          if (!already) {
            const file = this.getAttribute('data-file');
            const preview = document.createElement('div');
            preview.className = 'preview-container';
            preview.innerHTML = '<iframe src="' + file + '"></iframe>';
            this.parentNode.insertBefore(preview, this.nextSibling);
            preview.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      });
    </script>
  </body>
</html>
`;
}

function main() {
  const testCases = collectTestCases(outputRoot);
  const html = generateHtml(testCases);
  fs.writeFileSync(outputHtml, html, "utf-8");
  console.log("已生成:", outputHtml);
}

main();
