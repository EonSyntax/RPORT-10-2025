import fs from "fs";
import { chromium } from "playwright";

const out = [];
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

page.on("console", (msg) => {
  const text = msg.text();
  const type = msg.type();
  const location = msg.location();
  const entry = { kind: "console", type, text, location };
  console.log("[console]", type, text);
  out.push(entry);
});

page.on("pageerror", (err) => {
  const entry = { kind: "pageerror", message: err.message, stack: err.stack };
  console.error("[pageerror]", err.message);
  out.push(entry);
});

page.on("requestfailed", (req) => {
  const entry = {
    kind: "requestfailed",
    url: req.url(),
    failure: req.failure(),
  };
  console.warn("[requestfailed]", req.url(), req.failure());
  out.push(entry);
});

try {
  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  // give the page some time to run dynamic imports
  await page.waitForTimeout(5000);
} catch (e) {
  console.error("Navigation error", e && e.message);
  out.push({ kind: "navigationerror", message: e && e.message });
}

// dump captured logs to file
const file = "logs/console-capture.json";
fs.mkdirSync("logs", { recursive: true });
fs.writeFileSync(file, JSON.stringify(out, null, 2));
console.log("Wrote logs to", file);

await browser.close();
process.exit(0);
