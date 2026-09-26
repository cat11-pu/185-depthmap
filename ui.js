// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "文本长度 " + String(spec.text || "").length + "，点按钮看深度序列。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.depths.forEach(function (value, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + spot + " 位";
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, value * 20) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = "深度 " + value;
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "最深 " + view.deepest + "，括号对数 " + view.pairs;
    parts.log.textContent = "结束深度 " + view.final_depth;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "算深度序列";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "末尾加一层括号";
  addButton.addEventListener("click", function () {
    spec.text = String(spec.text || "") + "(x)";
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后三个字符";
  dropButton.addEventListener("click", function () {
    spec.text = String(spec.text || "").slice(0, -3);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一段文本";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "(a(b))";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { text: box.value }));
      parts.out.textContent = box.value + " 的最深深度 " + view.deepest;
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看最深";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "最深 " + view.deepest + "，括号对数 " + view.pairs;
  });
  parts.controls.appendChild(readButton);

  draw();
}
