import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
const traverse = traverseModule.default;

const SITE_URL = "https://macpatterson.com";

// --- Resolve __dirname for ESM ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Read App.jsx (your router definition) ---
const appFilePath = path.join(__dirname, "..", "src", "App.jsx");
const appCode = fs.readFileSync(appFilePath, "utf8");

// --- Parse JSX AST ---
const ast = parse(appCode, {
  sourceType: "module",
  plugins: ["jsx"],
});

const paths = new Set();

/**
 * We look for JSX like:
 *   <Route path="/about" element={<About />} />
 * Optionally:
 *   <Route path="/admin" element={<Admin />} sitemap={false} />
 *     -> will be excluded
 */
traverse(ast, {
  JSXOpeningElement(pathNode) {
    const node = pathNode.node;

    // Only handle <Route ...>
    if (node.name.type !== "JSXIdentifier" || node.name.name !== "Route") {
      return;
    }

    let routePath = null;
    let excludeFromSitemap = false;

    for (const attr of node.attributes) {
      if (attr.type !== "JSXAttribute") continue;
      const attrName = attr.name.name;

      // Extract path prop if it's a plain string literal: path="/about"
      if (attrName === "path") {
        if (!attr.value) continue;

        if (attr.value.type === "StringLiteral") {
          routePath = attr.value.value;
        }
      }

      // Optional prop: sitemap={false} or sitemap="false" to exclude from sitemap
      if (attrName === "sitemap" && attr.value) {
        if (
          attr.value.type === "JSXExpressionContainer" &&
          attr.value.expression.type === "BooleanLiteral" &&
          attr.value.expression.value === false
        ) {
          excludeFromSitemap = true;
        } else if (
          attr.value.type === "StringLiteral" &&
          attr.value.value === "false"
        ) {
          excludeFromSitemap = true;
        }
      }
    }

    // Only include:
    // - routes with a path
    // - NOT flagged as "sitemap=false"
    // - NOT dynamic (no :id params)
    if (
      routePath &&
      !excludeFromSitemap &&
      !routePath.includes(":") &&
      routePath !== "*"
    ) {
      paths.add(routePath);
    }
  },
});

// Ensure root route exists if you use an index route instead of path="/"
if (!paths.has("/")) {
  // If you actually use an index route for home, you can manually add "/":
  // paths.add("/");
}

const routes = Array.from(paths).sort();

// --- Generate XML ---
function generateSitemap(urls) {
  const urlEntries = urls
    .map(
      (url) => `
  <url>
    <loc>${SITE_URL}${url.startsWith('/') ? url : '/' + url}</loc>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

function writeSitemap() {
  const sitemapXml = generateSitemap(routes);
  const outPath = path.join(__dirname, "..", "public", "sitemap.xml");

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, sitemapXml, "utf8");

  console.log(`✅ Sitemap generated at ${outPath}`);
  console.log(`   Routes included:`);
  routes.forEach((r) => console.log("   -", r));
}

writeSitemap();