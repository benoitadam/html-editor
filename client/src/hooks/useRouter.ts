
import router from "~src/helpers/router";
import useMessager from "./useMessager";

export default () => useMessager(router.updated$);