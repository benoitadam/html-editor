const _cache: Record<string, any> = {};

const cache = <T>(key: string, init: () => T) => {
    return (_cache[key] || (_cache[key] = init())) as T;
}

export default cache;