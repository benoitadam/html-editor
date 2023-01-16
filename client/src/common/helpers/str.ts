export const strFirstUpper = (value: string) => {
  value = String(value);
  if (value.length === 0) return "";
  return value[0].toUpperCase() + value.substring(1);
}
