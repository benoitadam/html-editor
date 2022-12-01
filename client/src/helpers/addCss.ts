const map: { [key: string]: { el: HTMLElement; css: string } } = {};

export const addCss = (key: string, css: string) => {
  const old = map[key];
  if (old) {
    if (old.css === css) return;
    old.el.remove();
    delete map[key];
  }
  if (css) {
    const el = document.createElement('style');
    el.textContent = css;
    document.head.appendChild(el);
    map[key] = { el, css };
  }
}

export default addCss;