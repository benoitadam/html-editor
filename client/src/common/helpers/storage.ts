import { Messager } from "./messager";

const s = {
  prefix: 'm_',
  valMap: {} as Record<string, any>,
  stringify: (value: any): string => {
    try {
      return value === undefined ? '' : JSON.stringify(value);
    } catch(error) {
      console.error('storage.stringify', value);
      return '';
    }
  },
  parse: (json: string|null|undefined): any => {
    try {
      return json ? JSON.parse(json) : undefined;
    } catch(error) {
      console.error('storage.parse', json);
      return undefined;
    }
  },
  _set: (_key: string, _json: string) => {},
  _get: (_key: string): string => '',
  set: (key: string, value: any) => {
    if (s.prefix) key = s.prefix + key;
    if (value === undefined) delete s.valMap[key];
    else s.valMap[key] = value;
    s._set(key, s.stringify(value));
  },
  get: (key: string): any => {
    if (s.prefix) key = s.prefix + key;
    const val = s.valMap[key];
    if (val !== undefined) return val;
    return s.valMap[key] = s.parse(s._get(key));
  },
}

if (localStorage) {
  s._set = (key: string, json: string) => json === '' ? localStorage.removeItem(key) : localStorage.setItem(key, json);
  s._get = (key: string) => localStorage.getItem(key) || '';
}

export const _storage = s;

export const storageGet = (key: string) => s.get(key);
export const storageSet = (key: string, value: any) => s.set(key, value);

export class StorageMessager<T=any, U=any> extends Messager<T, U> {
  static map: Record<string, StorageMessager> = {};

  static getOrCreate<T=any, U=any>(key: string, init: T): StorageMessager<T, U> {
    return this.map[key] || (this.map[key] = new StorageMessager<T, U>(key, init));
  }

  protected constructor(public readonly key: string, init: T) {
    super(init);
    console.debug('StorageMessager', key);
    const value = storageGet(key);
    if (value === undefined) return;
    this.next(value);
  }

  next(value: T) {
    const old = this.value;
    if (value === old) return value;
    storageSet(this.key, value);
    super.next(value);
    return value;
  }
}

export const storageMessager = <T=any, U=any>(key: string, init: T) => StorageMessager.getOrCreate<T, U>(key, init);