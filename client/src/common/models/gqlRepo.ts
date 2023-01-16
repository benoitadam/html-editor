import { strFirstUpper } from "../helpers/str";
import { gqlItem, gqlItems, gqlObserveItem, gqlObserveItems } from "./gql";
import whereParse, { Where } from "./whereParse";

export type GqlProps<T = any> = (keyof T)[]|Record<keyof T, any>;

export const qProps = (props: GqlProps): string => {
  if (!props) return 'id';
  if (typeof props === 'string') return props;
  if (Array.isArray(props)) return props.length ? props.join(" ") : 'id';
  return Object.entries(props)
    .filter((kv) => kv[1])
    .map(([k,v]) => typeof v !== 'object' ? k : `${k} { ${qProps(v)} }`)
    .join(' ');
}

export const qAll = (table: string, props: GqlProps) => {
  const t = table;
  const T = strFirstUpper(t);
  return `query All${T} { ${t} { ${qProps(props)} } }`;
}

export const qGet = (single: string, props: GqlProps) => {
  const s = single;
  const S = strFirstUpper(s);
  return `query Get${S}($id:uuid!) { ${s}(id:$id) { ${qProps(props)} } }`;
}

export const qFilter = (table: string, where: Where, limit: number = 0, props: GqlProps) => {
  const t = table;
  const T = strFirstUpper(t);
  const w = whereParse(where, limit);
  return `query Select${T} { ${t}(where:${w}) { ${qProps(props)} } }`;
}

export const qUpdateItems = (table: string, where: Where, props: GqlProps) => {
  const t = table;
  const T = strFirstUpper(t);
  const w = whereParse(where);
  return `mutation Update${T}($changes: ${t}_set_input = {}) {
    update${T}(where:${w}, _set:$changes) { returning { ${qProps(props)} } } }`;
}

export const qInsertItems = (table: string, props: GqlProps) => {
  const t = table;
  const T = strFirstUpper(table);
  return `mutation Insert${T}($items:[${t}_insert_input!] = {}) {
    insert${T}(objects:$items) { returning { ${qProps(props)} } } }`;
}

export const qInsert = (table: string, single: string, props: GqlProps) => {
  const t = table;
  const S = strFirstUpper(single);
  return `mutation Insert${S}($item:${t}_insert_input = {}) {
    insert${S}(object:$item) { ${qProps(props)} } }`;
}

export const qUpdate = (table: string, single: string, props: GqlProps) => {
  const t = table;
  const S = strFirstUpper(single);
  return `mutation Update${S}($id:uuid!, $changes:${t}_set_input) {
    update${S}(pk_columns:{id:$id}, _set:$changes) { ${qProps(props)} } }`;
}

export const qSub = (q: string) => q.replace('query', 'subscription');

export class GqlRepo<T extends { id: string }> {
  single: string;

  constructor(public table: string, public props: GqlProps<T>) {
    this.single = table.substring(0, table.length - 1);
  }

  get(id: string, props?: GqlProps<T>) {
    return gqlItem<T>(qGet(this.single, props||this.props), { id });
  }

  getObserve(id: string, props?: GqlProps<T>) {
    return gqlObserveItem<T>(qSub(qGet(this.single, props||this.props)), { id });
  }

  all(props?: GqlProps<T>) {
    return gqlItems<T>(qAll(this.table, props||this.props), {});
  }

  allObserve(props?: GqlProps<T>) {
    return gqlObserveItems<T>(qSub(qAll(this.table, props||this.props)), {});
  }

  filter(where: Where<T>, limit: number = 0, props?: GqlProps<T>) {
    return gqlItems<T>(qFilter(this.table, where, limit, props||this.props), {});
  }

  filterObserve(where: Where<T>, limit: number = 0, props?: GqlProps<T>) {
    return gqlObserveItems<T>(qSub(qFilter(this.table, where, limit, props||this.props)), {});
  }

  find(where: Where<T>, props?: GqlProps<T>) {
    return this.filter(where, 1, props||this.props).then(items => items[0] || null);
  }

  findObserve(where: Where<T>, props?: GqlProps<T>) {
    return this.filterObserve(where, 1, props||this.props).map(items => items[0] || null);
  }

  updateItems(
    where: Where<T>,
    changes: Partial<T>,
    props?: GqlProps<T>
  ) {
    return gqlItems<T>(qUpdateItems(this.table, where, props||this.props), { changes });
  }

  insertItems(items: Partial<T>[], props?: GqlProps<T>) {
    return gqlItems<T>(qInsertItems(this.table, props||this.props), { items });
  }

  insert(item: Partial<T>, props?: GqlProps<T>) {
    return gqlItem<T>(qInsert(this.table, this.single, props||this.props), { item });
  }

  update(id: string, changes: Partial<T>, props?: GqlProps<T>) {
    return gqlItem<T>(qUpdate(this.table, this.single, props||this.props), { id, changes });
  }
}

export const gqlRepo = <T extends { id: string }>(table: string, props: GqlProps<T> = ['id']) => new GqlRepo<T>(table, props);

export default gqlRepo;