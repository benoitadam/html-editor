const map: Record<string, HTMLElement> = {};

export default function addCssFile(url: string) {
  return new Promise((resolve) => {
    if (map[url]) return resolve(true);
    const el = document.createElement('link');
    console.debug('addCssFile', url, el);
    el.rel = 'stylesheet';
    el.type = 'text/css';
    el.onerror = (err) => {
      console.error('addCssFile onerror', url, err);
      resolve(false);
    };
    el.onload = () => {
      console.debug('addCssFile onload', url);
      resolve(true);
    };
    el.href = url;
    document.head.appendChild(el);
    map[url] = el;
  });
}
