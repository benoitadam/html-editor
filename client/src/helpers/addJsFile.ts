const map: Record<string, HTMLElement> = {};

export default function addJsFile(url: string) {
  return new Promise((resolve) => {
    if (map[url]) return resolve(true);
    const el = document.createElement('script');
    console.debug('addJsFile', url, el);
    el.type = 'text/javascript';
    el.async = true;
    el.onerror = (err) => {
      console.error('addJsFile onerror', url, err);
      resolve(false);
    };
    el.onload = () => {
      console.debug('addJsFile onload', url);
      resolve(true);
    };
    el.src = url;
    document.head.appendChild(el);
    map[url] = el;
  });
}
