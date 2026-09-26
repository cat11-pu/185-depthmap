// walk.js：走一步。左括号加一层，右括号减一层，其他字符不变。
export function stepDepth(depth, char) {
  if (char === "(") return depth + 1;
  if (char === ")") return depth - 1;
  return depth;
}
