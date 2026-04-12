const fs = require("fs");
const path = require("path");

const root = process.cwd();
const jsonFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".json")) {
      jsonFiles.push(fullPath);
    }
  }
}

walk(root);

let failed = false;
for (const file of jsonFiles) {
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (err) {
    failed = true;
    console.error(`Invalid JSON: ${path.relative(root, file)}`);
    console.error(err.message);
  }
}

if (failed) {
  process.exit(1);
}

console.log(`Validated ${jsonFiles.length} JSON files.`);
