import { useEffect, useState } from "react";
import { Messager } from "common/helpers/messager";

export default <T=any>(messager: Messager<T>): T => {
    const [_, update] = useState(0);
    useEffect(() => messager.subscribe(() => update(Date.now())), [messager]);
    return messager.value;
}