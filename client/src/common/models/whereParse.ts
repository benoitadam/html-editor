export type WhereVal = {
  _eq?: string | number;
  _gt?: string | number;
  _gte?: string | number;
  _ilike?: string | number;
  _in?: string | number;
  _iregex?: string | number;
  _is_null?: boolean;
  _like?: string | number;
  _lt?: string | number;
  _lte?: string | number;
  _neq?: string | number;
  _nin?: string | number;
  _niregex?: string | number;
  _nlike?: string | number;
  _nregex?: string | number;
  _nsimilar?: string | number;
  _regex?: string | number;
  _similar?: string | number;
};

export type Where<T = any> =
  | string
  | Partial<Record<keyof T, string | number | null | WhereVal>>;

export const whereParse = <T = any>(where: Where<T>, limit: number = 0): string => {
  if (typeof where !== "object") return String(where);
  const whereFilter = Object.entries(where)
    .map(([prop, value]) => {
      if (value === null) return `${prop}:{_is_null:true}`;
      if (typeof value === "object") {
        const f: string = Object.entries(value)
          .map(([k, v]) => {
            if (k === "isNull") k = "is_null";
            return `${k}:${JSON.stringify(v)}`;
          })
          .join(",");
        return `${prop}:{${f}}`;
      }
      return `${prop}:{_eq:${JSON.stringify(value)}}`;
    })
    .join(",");
  const limitStr = limit ? `,limit:${limit}` : '';
  return `{${whereFilter}}${limitStr}`;
}

export default whereParse;