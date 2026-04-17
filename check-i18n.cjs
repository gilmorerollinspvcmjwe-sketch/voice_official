const fs = require('fs');
const path = require('path');

function findTsxFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findTsxFiles(fullPath));
    } else if (entry.name.endsWith('.tsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

const componentsDir = path.join(__dirname, 'src/components');
const pagesDir = path.join(__dirname, 'src/pages');
const files = [...findTsxFiles(componentsDir), ...findTsxFiles(pagesDir)];

const chineseRegex = /[\u4e00-\u9fff]/;
const results = [];

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let inBlockComment = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Track block comments
    if (inBlockComment) {
      if (trimmed.includes('*/')) {
        inBlockComment = false;
      }
      continue;
    }
    if (trimmed.startsWith('/*')) {
      if (!trimmed.includes('*/')) {
        inBlockComment = true;
      }
      continue;
    }

    // Skip single-line comments
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) continue;

    // Skip console.log
    if (line.includes('console.log')) continue;

    // Check for Chinese characters
    if (chineseRegex.test(line)) {
      const relPath = path.relative(__dirname, filePath);
      results.push({
        file: relPath,
        line: i + 1,
        content: trimmed.substring(0, 150)
      });
    }
  }
}

console.log(JSON.stringify(results, null, 2));
