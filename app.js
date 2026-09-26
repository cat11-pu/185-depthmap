// app.js：渲染结果
import { stepDepth } from "./walk.js";
import { depthMap } from "./depths.js";

export function render(spec) {
  const text = String(spec.text || "");
  const view = depthMap(text);
  const depths = view.depths || [];
  let finalDepth = 0;
  for (const char of text) finalDepth = stepDepth(finalDepth, char);
  return { depths: depths, deepest: view.deepest || 0, pairs: text.split("(").length - 1,
           length: text.length, final_depth: finalDepth };
}
