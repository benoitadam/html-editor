import { Session } from "common/models/interfaces";
import { storageMessager } from "common/helpers/storage";

export const noAuth: Session = { isAuth: false };
export const session$ = storageMessager<Session>('session', noAuth);
export default session$;