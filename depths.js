// depths.js：深度序列（一次扫描，每字符走一步）
import { stepDepth } from "./walk.js";

function unbalanced(message) {
  const error = new Error(message);
  error.code = "E_UNBALANCED";
  return error;
}

export function depthMap(text) {
  const depths = new Array(text.length);
  let depth = 0;
  let deepest = 0;
  for (let spot = 0; spot < text.length; spot += 1) {
    const char = text[spot];
    if (char === ")") depth = stepDepth(depth, char);
    if (depth < 0) throw unbalanced("深度变负：右括号多于左括号");
    depths[spot] = depth;
    if (depth > deepest) deepest = depth;
    if (char === "(") depth = stepDepth(depth, char);
  }
  if (depth !== 0) throw unbalanced("扫描结束时深度不为零");
  return { depths: depths, deepest: deepest };
}
