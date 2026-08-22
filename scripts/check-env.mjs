/**
 * Report which env files exist and which keys have values.
 * Prints key NAMES and value LENGTHS only — never a value.
 *
 *   node scripts/check-env.mjs
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECTS = dirname(REPO);

function report(path) {
  let raw;
  try {
    raw = readFileSync(path, "utf8");
  } catch {
    return;
  }
  const st = statSync(path);
  console.log(`\n${path}`);
  console.log(`  ${st.size} bytes · modified ${st.mtime.toISOString()}`);

  const lines = raw.split(/\r?\n/);
  let found = 0;
  for (const line of lines) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=(.*)$/);
    if (!m) continue;
    found++;
    const [, name, rawVal] = m;
    const val = rawVal.trim().replace(/^["']|["']$/g, "");
    const looksPlaceholder = /^(PASTE|YOUR|REPLACE|<|sk-your)/i.test(val);
    const status = !val
      ? "EMPTY"
      : looksPlaceholder
        ? `PLACEHOLDER (${val.length} chars)`
        : `${val.length} chars`;
    console.log(`    ${name} = ${status}`);
  }
  if (!found) console.log("    (no KEY=value lines)");
}

console.log("Searching for env files…");

// This repo
for (const f of readdirSync(REPO)) {
  if (f.startsWith(".env")) report(join(REPO, f));
}

// Any sibling repo that has an ANTHROPIC-ish key, in case it went elsewhere
console.log("\n─── sibling repos containing an Anthropic-style key ───");
let hits = 0;
for (const dir of readdirSync(PROJECTS)) {
  const p = join(PROJECTS, dir);
  try {
    if (!statSync(p).isDirectory()) continue;
  } catch {
    continue;
  }
  for (const name of [".env.local", ".env", ".dev.vars"]) {
    const f = join(p, name);
    if (!existsSync(f)) continue;
    let raw;
    try {
      raw = readFileSync(f, "utf8");
    } catch {
      continue;
    }
    if (/sk-ant-/.test(raw)) {
      const keys = [
        ...raw.matchAll(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*sk-ant-\S+/gm),
      ].map((m) => m[1]);
      console.log(
        `  ${dir}/${name} → ${keys.join(", ") || "(anthropic key present)"}`,
      );
      hits++;
    }
  }
}
if (!hits) console.log("  none found");
