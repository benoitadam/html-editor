const regExp = /^[0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{12}$/;

const isUuid = (str: string) => regExp.test(str.toLowerCase());

export default isUuid;