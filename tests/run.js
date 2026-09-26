import assert from "node:assert";
import { stepDepth } from "../walk.js";
import { depthMap } from "../depths.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("stepDepth returns a number", () => {
  assert.strictEqual(typeof stepDepth(0, "("), "number");
});

check("depthMap returns depths", () => {
  assert.ok(Array.isArray(depthMap("(a)").depths));
});

check("depthMap returns deepest", () => {
  assert.strictEqual(typeof depthMap("(a)").deepest, "number");
});

check("render counts length", () => {
  assert.strictEqual(typeof render({ text: "(a)" }).length, "number");
});

check("render exposes final depth", () => {
  assert.strictEqual(typeof render({ text: "(a)" }).final_depth, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
