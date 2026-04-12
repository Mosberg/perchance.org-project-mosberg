const fs = require("fs");
const path = require("path");

const root = process.cwd();
const fixturesDir = path.join(root, "tests", "fixtures");
const snapshotPath = path.join(
  root,
  "tests",
  "snapshots",
  "grammar-baseline.json",
);

const fixtureFiles = fs
  .readdirSync(fixturesDir)
  .filter((f) => f.endsWith(".perchance"))
  .map((f) => path.join(fixturesDir, f));

const combined = fixtureFiles
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n\n");

function countMatches(re) {
  const m = combined.match(re);
  return m ? m.length : 0;
}

const current = {
  imports: countMatches(/\{\s*import\s*:[^}\n]+\}/g),
  squareExpressions: countMatches(/\[[^\]\n]+\]/g),
  weights: countMatches(/\^\d+(?:\.\d+)?\b/g),
  methodCalls: countMatches(
    /\b(?:selectOne|selectMany|selectUnique|evaluateItem|joinItems|getLengthItems|getParent|getName|randomize|shuffle|map|filter|reduce|splitItems|repeat|contains|startsWith|endsWith|replaceItems|sortItems|joinWith|toUpperCase|toLowerCase|trim|slice|substring)\b/g,
  ),
  htmlTags: countMatches(/<\/?[A-Za-z][^>]*>/g),
  templateInterpolations: countMatches(/\$\{[^}\n]+\}/g),
  optionalChains: countMatches(/\?\./g),
  nullishCoalescing: countMatches(/\?\?/g),
};

if (process.env.UPDATE_SNAPSHOT === "1") {
  fs.writeFileSync(snapshotPath, `${JSON.stringify(current, null, 2)}\n`);
  console.log("Updated grammar baseline snapshot.");
  process.exit(0);
}

const expected = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
let failed = false;

for (const key of Object.keys(expected)) {
  if (expected[key] !== current[key]) {
    failed = true;
    console.error(
      `Snapshot mismatch for '${key}': expected ${expected[key]}, got ${current[key]}`,
    );
  }
}

if (failed) {
  process.exit(1);
}

console.log("Grammar snapshot check passed.");
