export const dicoById = <T extends { id: string }>(
  itemsOrMap: T[] | Record<string, T>
): Record<string, T> => {
  const items = Array.isArray(itemsOrMap)
    ? itemsOrMap
    : Object.values(itemsOrMap);
  return Object.fromEntries(items.map((item) => [item.id || "", item]));
}

export const dicoByProp = <T>(
  itemsOrMap: T[] | Record<string, T>,
  prop: keyof T
): Record<string, T> => {
  const items = Array.isArray(itemsOrMap)
    ? itemsOrMap
    : Object.values(itemsOrMap);
  return Object.fromEntries(
    items.map((item) => [String(item[prop] || ""), item])
  );
}

export const dicoMapKey = <T, U>(
  dico: Record<string, T>,
  map: (key: string, item: T) => U
): Record<string, U> => {
  return Object.fromEntries(
    Object.entries(dico).map(([key, item]) => [map(key, item), item])
  );
}

export const dicoMap = <T, U>(
  dico: Record<string, T>,
  map: (item: T, key: string) => U
): Record<string, U> => {
  return Object.fromEntries(
    Object.entries(dico).map(([key, item]) => [key, map(item, key)])
  );
}

export const dicoFromKeys = (keys: string[]): Record<string, boolean> => {
  return Object.fromEntries(keys.map(k => [k,true]));
}