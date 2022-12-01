export const toStr = (v: any, def: string = ""): string => {
  return v === null || v === undefined ? def : String(v);
}

export const toArr = <T = any>(v: any, def: T[] = []): T[] => {
  return v === null || v === undefined ? def : Array.isArray(v) ? v : [v];
}

export const toObj = <T = any>(v: any, def: T = {} as any): T => {
  return v === null || typeof v !== "object" || Array.isArray(v) ? def : v;
}

type ToNbr = {
  (v: any): number | undefined;
  <D>(v: any, nanVal: D): number | D;
}
export const toNbr: ToNbr = <D>(v: any, nanVal?: D): number | D | undefined => {
  const nbr = Number(
    typeof v === "string"
      ? v.replace(/[^0-9,._]/g, "").replace(/,/g, ".")
      : v
  );
  return Number.isNaN(nbr) ? nanVal : nbr;
}

type ToBool = {
  (v: any): boolean | undefined;
  <T>(v: any, defVal: T): boolean | T;
}
export const toBool: ToBool = <T>(v: any, defVal?: T): boolean|T => {
  if (typeof v === "string")
    return v === "true" || v === "ok" || v === "on";
  return v === undefined || v === null ? defVal : !!v;
}

type ToEnum = {
  <T>(v: any, values: T[]): T | undefined;
  <T, D>(v: any, values: T[], defVal: D): T|D;
}
export const toEnum: ToEnum = <T>(v: any, values: T[], defVal?: T): T => {
  return values.indexOf(v) === -1 ? defVal : v;
}

type ToEnumGetter = {
  <T>(values: T[]): (v: any) => T | undefined;
  <T, D>(values: T[], defVal: D): (v: any) => T|D;
}
export const toEnumGetter: ToEnumGetter = <T>(values: T[], defVal?: T) => (v: any): T => {
  return values.indexOf(v) === -1 ? defVal : v;
}