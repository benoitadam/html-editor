import { Messager } from "common/helpers/messager";

export const el$Map: Record<string, Messager<HTMLElement|null>> = {};

export const el$ = (id?: string) => el$Map[id||''] || (el$Map[id||''] = new Messager<HTMLElement|null>(null));

export const getEl = (id?: string) => el$(id).value;

export const getElAsync = (id: string) => el$(id).toPromise(el => !!el);

export const setEl = (id?: string, el: HTMLElement|null = null) => {
  if (el) (el as any)._BId = id;
  el$(id).next(el);
};

export const findElId = (el?: HTMLElement|null) => {
  while (el) {
    const id = (el as any)._BId;
    if (id) return id;
    el = el.parentElement;
  }
}