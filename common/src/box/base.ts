import uuid from "../helpers/uuid";

export const ROOT_ID = 'root';

let _nId = Date.now();
export const createId = () => uuid().substring(0,7) + ((_nId++) % (32*32*32)).toString(32).padStart(3, '0');