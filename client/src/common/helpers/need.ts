type NotEmpty<T> = Exclude<Exclude<T, null>, undefined>;

function fail(message?: string): never {
    throw new Error(message);
}

export function needNotEmpty<T>(value: T, name: string): asserts value is NotEmpty<T> {
    if (value === null || value === undefined || value === '') {
        fail(`${name} is empty`);
    }
}

export function needStr(value: unknown, name: string): asserts value is string {
    if (typeof value !== 'string') {
        fail(`${name} is not a string`);
    }
}

export function needStrNotEmpty(value: unknown, name: string): asserts value is string {
    if (!value || typeof value !== 'string') {
        fail(`${name} is not a string`);
    }
}

export function needObj(value: unknown, name: string): asserts value is object {
    if (!value || typeof value !== 'object') {
        fail(`${name} is not an object`);
    }
}