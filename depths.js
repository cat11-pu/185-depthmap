// depths.js：深度序列。左括号记加层前的深度，其内容记加深后的深度，
// 右括号记减层后的深度。深度从零开始，出现负深度或结束不为零报 E_UNBALANCED。
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
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === "(") {
      depths[index] = depth;
      depth = stepDepth(depth, char);
    } else {
      depth = stepDepth(depth, char);
      if (depth < 0) throw unbalanced("depth went negative at index " + index);
      depths[index] = depth;
    }
    if (depth > deepest) deepest = depth;
  }
  if (depth !== 0) throw unbalanced("final depth is " + depth + ", expected 0");
  return { depths: depths, deepest: deepest };
}
