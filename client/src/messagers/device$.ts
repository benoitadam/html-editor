import { storageMessager } from "common/helpers/storage";

export const device$ = storageMessager('device', { id: '', e: '', p: '', d: Date.now() });
export default device$;