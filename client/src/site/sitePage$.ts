import { messager } from "common/helpers/messager";

export const sitePage$ = messager('');
export const getPage = sitePage$.getter;
export const setPage = sitePage$.setter;
export const pageSet = setPage;
export default sitePage$;