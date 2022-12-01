export default function getEnv(key: string): string {
  const v = process.env[key];
  if (v && typeof v === 'string') return v;
  const msg = `environment variable "${key}" is not string ${typeof v}`;
  console.error(msg);
  throw Error(msg);
}
