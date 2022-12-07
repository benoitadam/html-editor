import isUuid from "./isUuid";

describe('isUuid', () => {
    const testUuid = (uuid: string, value: boolean) => test(uuid, () => expect(isUuid(uuid)).toBe(value));

    testUuid('00000000-0000-0000-0000-000000000000', true);
    testUuid('ffffffff-ffff-ffff-ffff-ffffffffffff', true);
    testUuid('7ae77ebe-16c8-458b-8a44-4396dbe7f6f4', true);
    testUuid('7AE77EBE-16C8-458B-8A44-4396DBE7F6F4', true);
    testUuid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', false);
    testUuid('7ae77ebea16c8-458b-8a44-4396dbe7f6f4', false);
    testUuid('7ae77ebea16c8458b8a444396dbe7f6f4', false);
});