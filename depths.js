// depths.js：深度序列（基线：一律给全零）
import { stepDepth } from "./walk.js";

export function depthMap(text) {
  return { depths: text.split("").map(() => 0), deepest: 0 };
}
