// walk.js：走一步
export function stepDepth(depth, char) {
  if (char === "(") return depth + 1;
  if (char === ")") return depth - 1;
  return depth;
}
