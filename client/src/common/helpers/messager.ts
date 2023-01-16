export type MessagerHandler<T> = (value: T, oldValue: T) => void;

export class Messager<T=any, U=any> {
  protected readonly hs: MessagerHandler<T>[] = [];
  public readonly value: T;

  constructor(public readonly init: T) {
    this.value = init;
  }
  
  getter = () => this.value;
  setter = (value: T) => this.next(value);

  reset() {
    this.next(this.init);
  }

  next(value: T) {
    const old = this.value;
    if (value === old) return value;
    (this.value as T) = value;
    this.hs.forEach(h => h(value, old));
  }

  update(changes: Partial<T>) {
    this.next({ ...this.value, ...changes } as any);
  }

  setItem(id: string, value: U) {
    this.update({ [id]: value } as Partial<T>);
  }

  getItem(id: string): U|undefined;
  getItem<V>(id: string, undefinedValue: V): U|V;
  getItem<V>(id: string, undefinedValue: V|undefined = undefined): U|V|undefined {
    const val = (this.value as Record<string, U>)[id];
    return val === undefined ? undefinedValue : val;
  }

  subscribe(h: MessagerHandler<T>) {
    this.hs.push(h);
    return () => this.unsubscribe(h);
  }

  unsubscribe(h?: MessagerHandler<T>) {
    if (!h) this.hs.length = 0;
    else this.hs.splice(this.hs.indexOf(h), 1);
  }

  debounce(ms: number): Messager<T> {
    const result = new Messager<T>(this.value);
    let timer: any = undefined;
    const update = () => {
      clearTimeout(timer);
      timer = undefined;
      result.next(this.value);
    };
    this.subscribe(() => {
      if (timer) return;
      timer = setTimeout(update, ms);
    });
    return result;
  }

  map<U>(cb: ((value: T) => U)) {
    const result = new Messager<U>(cb(this.value));
    this.subscribe((value) => result.next(cb(value)));
    return result;
  }

  toPromise(filter: ((value: T) => boolean)) {
    return new Promise<T>((resolve) => {
      if (filter(this.value)) return resolve(this.value);
      const unsubscribe = this.subscribe((value) => {
        if (!filter(value)) return;
        unsubscribe();
        resolve(value);
      });
    });
  }
}

export const messager = <T=any>(init: T) => new Messager<T>(init);

export default messager;