import { exportND, importND, parseND, stringifyND, updateB$ } from "common/box";

let lastJson = '';
const undos: string[] = [];
const redos: string[] = [];

updateB$.debounce(5000).subscribe(() => {
  const nd = exportND();
  const json = stringifyND(nd);
  if (json === lastJson) return;
  lastJson = json;
  undos.push(json);
  redos.length = 0;
  if (undos.length > 30) undos.shift();
});

export const editorHistoryUndo = () => {
  console.debug('editorHistoryUndo');
  const json = undos.pop();
  if (!json) return;
  redos.push(json);
  const nd = parseND(json);
  importND(nd);
}

export const editorHistoryRedo = () => {
  console.debug('editorHistoryRedo');
  const json = redos.pop();
  if (!json) return;
  undos.push(json);
  const nd = parseND(json);
  importND(nd);
}