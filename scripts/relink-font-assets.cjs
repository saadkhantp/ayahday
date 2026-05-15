/**
 * Fontsource CSS uses url(files/...); paths are relative to each package.
 * Resolve files from node_modules/@fontsource (noto-sans-arabic, noto-nastaliq-urdu) and emit dist/font-files/.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const distDir = path.join(root, "dist");
const cssPath = path.join(distDir, "app.css");
const fontDir = path.join(distDir, "font-files");

const searchRoots = [
  path.join(root, "node_modules/@fontsource/noto-sans-arabic/files"),
  path.join(root, "node_modules/@fontsource/noto-nastaliq-urdu/files"),
];

if (!fs.existsSync(cssPath)) {
  console.error("dist/app.css missing; run postcss first");
  process.exit(1);
}

fs.mkdirSync(fontDir, { recursive: true });

let css = fs.readFileSync(cssPath, "utf8");
const urlRe =
  /url\(\s*(['"]?)files\/([^'")]+\.(?:woff2|woff))\1\s*\)/gi;

const basenames = new Set();
let m;
while ((m = urlRe.exec(css)) !== null) {
  basenames.add(m[2]);
}

let copied = 0;
for (const base of basenames) {
  let src = null;
  for (const dir of searchRoots) {
    const candidate = path.join(dir, base);
    if (fs.existsSync(candidate)) {
      src = candidate;
      break;
    }
  }
  if (!src) {
    console.warn("missing font file:", base);
    continue;
  }
  fs.copyFileSync(src, path.join(fontDir, base));
  copied += 1;
  for (const variant of [
    `url(files/${base})`,
    `url('files/${base}')`,
    `url("files/${base}")`,
  ]) {
    css = css.split(variant).join(`url(font-files/${base})`);
  }
}

fs.writeFileSync(cssPath, css);
console.log(`relink-font-assets: ${copied} / ${basenames.size} fonts → dist/font-files/`);
