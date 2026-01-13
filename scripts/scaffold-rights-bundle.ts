import { writeFileSync } from "fs";
import { join } from "path";

const code = process.argv[2] || "NEW_BUNDLE";
const dir = join(process.cwd(), "docs");
const file = join(dir, `${code.toLowerCase()}.bundle.json`);

const template = {
  code,
  version: "1.0.0",
  jurisdiction: "US-AZ",
  sections: []
};

writeFileSync(file, JSON.stringify(template, null, 2));
console.log(`Scaffolded bundle template at ${file}`);
