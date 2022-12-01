
import { routerCurrent$ } from "~src/helpers/router";
import useMessager from "./useMessager";

export default () => useMessager(routerCurrent$);