export const uuid: (() => string) = (() => {
  const crypto = require('crypto') || {};
  if (crypto.randomUUID) {
    return crypto.randomUUID.bind(crypto);
  }
  if (crypto.getRandomValues) {
    return () => {
      var buff = new Uint16Array(8);
      crypto.getRandomValues(buff);
      const S = (i: number) => buff[i].toString(16).padStart(4, '0');
      return S(0) + S(1) + '-' + S(2) + '-' + S(3) + '-' + S(4) + '-' + S(5) + S(6) + S(7);
    };
  }
  return () => {
    let h = '0123456789abcdef';
    let k = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    let u = '',
      i = 0,
      rb = (Math.random() * 0xffffffff) | 0;
    while (i++ < 36) {
      var c = k[i - 1],
        r = rb & 0xf,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      u += c == '-' || c == '4' ? c : h[v];
      rb = i % 8 == 0 ? (Math.random() * 0xffffffff) | 0 : rb >> 4;
    }
    return u;
  };
})();

export default uuid;
