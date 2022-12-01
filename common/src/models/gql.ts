import { Messager } from "common/helpers/messager";

export type GqlVars = Record<string, any>;
export type GqlPost = (q: string, vars?: GqlVars) => Promise<any>;
export type GqlObserve = (q: string, vars?: GqlVars) => Messager<any>;

export class GqlError extends Error {
  public q?: string;
  public vars?: GqlVars;
  constructor(public err: any) {
    super(String((err as Error)?.message || err));
  }
}

const gqlPostNotImplemented = () => {
  throw new GqlError('gqlPost not implemented');
}
const gqlObserveNotImplemented = () => {
  throw new GqlError('gqlObserve not implemented');
}

let _gqlPost: GqlPost = gqlPostNotImplemented
let _gqlObserve: GqlObserve = gqlObserveNotImplemented

export const gqlPost = (q: string, vars: GqlVars) => _gqlPost(q, vars);

export const gqlObserve = (q: string, vars?: GqlVars) => _gqlObserve(q, vars);

export const gqlRegister = (gqlPost?: GqlPost, gqlObserve?: GqlObserve) => {
  _gqlPost = gqlPost || gqlPostNotImplemented;
  _gqlObserve = gqlObserve || gqlObserveNotImplemented;
}

const gqlMatchExp = /(query|mutation|subscription)[ \n]+(\w+)/;
export const gqlMatch = (q: string) => {
  const match = gqlMatchExp.exec(q);
  if (!match) throw new GqlError('no match');
  const [, type, name] = match;
  return { type, name };
}

export const gqlRequest = async <T>(q: string, vars: GqlVars, map?: (data: any) => T): Promise<any> => {
  try {
    // const { type, name } = gqlMatch(q);
    // console.debug('gqlRequest', type, name, vars, q);
    const res = await gqlPost(q, vars);
    return map ? map(res) : res;
  }
  catch (error) {
    console.warn('gqlRequest error', q, vars, error);
    const gqlError = error instanceof GqlError ? error : new GqlError(error);
    gqlError.q = q;
    gqlError.vars = vars;
    throw gqlError;
  }
}

export const gqlDataMap = (res: any): any => {
  if (res.errors) {
    const firstError = Array.isArray(res.errors) && res.errors[0];
    const message = firstError ? firstError.message : JSON.stringify(res.errors);
    // message = "Could not verify JWT: JWTExpired"
    throw new GqlError(message);
  }
  if (!res.data) throw new GqlError("no data");
  return res.data;
}

export const gqlItemMap = <T>(res: any) => {
  const data = gqlDataMap(res);
  const item = Object.values(data)[0] as any;
  if (typeof item === 'object') {
    return item as T;
  }
  if (item === null) {
    return null;
  }
  throw new Error('no item');
}

export const gqlItemsMap = <T>(res: any) => {
  const data = gqlDataMap(res);
  const items = Object.values(data)[0] as any;
  if (Array.isArray(items)) {
    return items as T[];
  }
  if (Array.isArray(items.returning)) {
    return items.returning as T[];
  }
  throw new Error('no items');
}

export const gqlItem = <T>(q: string, vars: GqlVars): Promise<T | null> => {
  return gqlRequest(q, vars, gqlItemMap);
}

export const gqlItems = <T>(q: string, vars: GqlVars): Promise<T[]> => {
  return gqlRequest(q, vars, gqlItemsMap);
}

export const gqlObserveItem = <T = any>(query: string, vars?: GqlVars): Messager<T | null> => {
  return gqlObserve(query, vars).map(gqlItemMap<T>);
};

export const gqlObserveItems = <T = any>(query: string, vars?: GqlVars): Messager<T[]> => {
  return gqlObserve(query, vars).map(gqlItemsMap<T>);
};