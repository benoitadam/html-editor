import { N, B, WB, NMap, ND } from "./interfaces";
import { propApplyMap } from "./prop";
import messager, { Messager } from "common/helpers/messager";
import { propAliasMap, propCleanMap } from "./prop";
import { ROOT_ID, createId } from "./base";

export const cleanND = (nd: ND) => {
    Object.entries(nd).forEach(([k, v]) => {
        if (v === undefined) return;
        const alias = propAliasMap[k];
        if (!alias) return;
        alias(v, nd);
        delete (nd as any)[k];
    });
    Object.entries(nd).forEach(([k, v]) => {
        const clean = v !== undefined && propCleanMap[k];
        if (clean) (nd as any)[k] = v = clean(v);
        if (v === undefined) delete (nd as any)[k];
    });
    if (!nd.id) nd.id = createId();
    nd.children = (nd.children||[]).map(cleanND);
    delete (nd as N).childIds;
    delete (nd as N).pId;
    return nd;
}

export const toNMap = (nd: ND, parentId?: string): NMap => {
    nd = cleanND(JSON.parse(JSON.stringify(nd)));
    if (!parentId) nd.id = ROOT_ID;
    const nMap: NMap = {};
    const rec = (nd: ND, pId?: string) => {
        const n = { ...nd, pId } as N;
        delete (n as ND).children;
        nMap[n.id] = n;
        if (nd.children) {
            n.childIds = nd.children.map(nd => nd.id||'');
            nd.children.forEach(child => rec(child, n.id));
        }
    };
    rec(nd, parentId);
    return nMap as NMap;
}

export const toND = (nMap: NMap, id: string) => {
    const n = nMap[id];
    const nd = { ...n } as ND;
    delete (nd as N).childIds;
    delete (nd as N).pId;
    if (n.childIds && n.childIds.length) {
        nd.children = n.childIds.map(childId => toND(nMap, childId));
    }
    return nd;
}

export const stringifyND = (nd: ND) => JSON.stringify(nd);

export const parseND = (str: string) => cleanND(JSON.parse(str));

export const changeIds = (n: ND) => {
    n.id = createId();
    n.children?.forEach(changeIds);
    return n;
}

export const duplicateND = (nd: ND) => {
    const clone = parseND(stringifyND(nd));
    changeIds(clone);
    return clone;
}

// import deepEqual from 'deep-equal';

type BUpdate = Readonly<{ id: string, changes: Readonly<Partial<B>>, old: Readonly<B>, b: Readonly<B> }>;
export const updateB$ = messager<BUpdate|undefined>(undefined);
export const b$Map: Record<string, Messager<B>> = {};

export const defaultN: N = { id: '' };
export const defaultB: B = { id: '', n: defaultN, t: {}, a: {}, s: {}, c: {}, u: 0 };

// subscribeB
// subscribeN
// getB
// setB
// updateB
// removeB
// getN
// setN
// updateN
// getEl
// setEl
// cloneB
// isB
// isN

export const cloneB = (box: B, changes?: Partial<B>): WB => {
    const clone = JSON.parse(JSON.stringify(box));
    if (changes) Object.assign(clone, changes);
    return clone;
}

export const b$ = (id: string = '') => b$Map[id||''] || (b$Map[id||''] = messager<B>({ ...defaultB, id, n: { id } }));

export const getB = (id?: string) => b$(id).value;

export const updateB = (id: string, changes: Partial<B>) => {
    // console.debug('rUpdate', id, changes);
    try {
        const subject = b$(id);
        const old = subject.value;
        const nextId = changes.n?.id || changes.id || id;
        if (id !== nextId) {
            b$Map[nextId] = subject;
            delete b$Map[id];
            id = nextId;
        }
        const b: WB = {
            ...old,
            ...changes,
            id,
            a: {},
            s: {},
            t: {},
            c: { box: 1 },
        };
        let n = b.n;
        if (n) {
            if (n.id !== nextId) n = { ...n, id: nextId };
            Object.entries(n).forEach(([k, v]) => {
                const apply = propApplyMap[k];
                if (apply) apply(b, v)
            });
        }
        Object.assign(b.t, (b.n?.tr||{})[lang$.value]||{});
        // if (deepEqual(old, b)) return;
        b.u = Date.now();
        // console.debug('rUpdate', { id, changes, old, b });
        subject.next(b);
        updateB$.next({ id, changes, old, b });
    }
    catch (error) {
        console.error('boxUpdate', id, changes, error);
    }
}

export const bList = () => Object.values(b$Map).map(s => s.value);

export const getN = (id: string) => getB(id).n;

export const setN = (id: string, n: Readonly<N> = { id }) => updateB(id, { n });

export const updateN = (id: string, changes: Partial<N> = {}) => setN(id, { ...getN(id), ...changes });

export const getChildIds = (id: string) => getN(id).childIds || [];

export const setChildIds = (id: string, childIds?: string[]) => updateN(id, { childIds });

export const getChildren = (id: string) => getChildIds(id).map(getB);

export const getParentId = (id: string) => getN(id).pId || '';

export const setParentId = (id: string, pId: string) => {
    const oldParentId = getParentId(id);
    if (oldParentId === pId) return;
    const childIds = [...getChildIds(oldParentId)].filter(cId => cId !== id);
    setChildIds(oldParentId, childIds);
    setN(id, { id, pId });
    setChildIds(pId, [...getChildIds(pId), id]);
}

export const addB = (parentId: string) => {
    if (!parentId) return;
    const id = createId();
    setN(id, { id, pId: parentId });
    setChildIds(parentId, [...getChildIds(parentId), id]);
};

export const removeB = (id: string) => {
    const pId = getParentId(id);
    updateB(id, { n: defaultN, r: Date.now() });
    if (!pId) return;
    const childIds = [...getChildIds(pId)];
    const oldIndex = childIds.indexOf(id);
    if (oldIndex !== -1) childIds.splice(oldIndex, 1);
    updateN(pId, { childIds });
};

export const getParent = (id: string) => getB(getParentId(id));

export const getIndex = (id: string) => getChildIds(getParentId(id)).indexOf(id);

export const setIndex = (id: string, index: number, loop = false) => {
    const pId = getParentId(id);
    if (!pId) return;
    const childIds = [...getChildIds(pId)];
    const length = childIds.length;
    const oldIndex = childIds.indexOf(id);
    if (oldIndex !== -1) childIds.splice(oldIndex, 1);
    if (loop) {
        index = (length + index) % length;
    } else {
        if (index < 0) index = 0;
        if (index > length) index = length;
    }
    childIds.splice(index, 0, id);
    updateN(pId, { childIds });
};

export const addIndex = (id: string, add: number) => setIndex(id, getIndex(id) + add, true);

export const refreshB = (id: string) => {
    updateB(id, { u: Date.now() });
}

export const lang$ = messager('fr');

export const getLang = () => lang$.value;

export const setLang = (lang: string) => {
    if (lang$.value === lang) return;
    lang$.next(lang);
    bList().forEach(b => b.n?.tr && refreshB(b.id));
}

export const bIds = () => Object.keys(b$Map);

export const importND = (nd: ND, parentId?: string) => {
    try {
        console.debug('importND', nd, parentId, changeIds);
        const nMap = toNMap(nd, parentId);
        Object.values(nMap).forEach(n => setN(n.id, n));
        // if (n.pId) {
        //     const index = getIndex(oldId);
        //     setChildIds(n.pId, [...getChildIds(n.pId), n.id]);
        //     setIndex(n.id, index);
        // }
        // return n.id;
    }
    catch(error) {
        console.error('importND', nd, parentId, error);
        throw error;
    }
}

export const getNMap = (id: string) => {
    const nMap: NMap = {};
    const rec = (id: string) => {
        const n = getN(id) as N;
        nMap[id] = n;
        (n.childIds||[]).forEach(rec)
    }
    rec(id);
    return nMap;
}

export const exportND = (id: string = ROOT_ID) => toND(getNMap(id), id);

export const getRootB = () => getB(ROOT_ID);

export const getRootB$ = () => b$(ROOT_ID);

export const upId = (id: string, up = 1) => {
    const childIds = getChildIds(getParentId(id));
    const length = childIds.length;
    let index = childIds.indexOf(id) - up;
    index = (length + index) % length;
    return childIds[index];
}

export const downId = (id: string, down = 1) => upId(id, -down);

// export const exportBItemMap = () => {
//     const nMap = nMapFrom(cloneN(bRoot().n));
//     Object.values(nMap).forEach((v: Partial<N>) => {
//         delete v.children;
//         delete v.pId;
//         delete v.id;
//         if (v.childIds && v.childIds.length === 0) {
//             delete v.childIds;
//         }
//     })
//     return nMap as Record<string, NItem>;
// }

// export const importBItemMap = (itemMap: Record<string, NItem>) => {
//     let nMap: NMap = {};
//     Object.entries(itemMap).forEach(([id, item]) => {
//         nMap[id] = { id, ...item };
//     });
//     Object.values(nMap).forEach((n) => {
//         n.children = n.childIds ? n.childIds.map(id => {
//             const child = nMap[id];
//             child.pId = n.id;
//             return child;
//         }) : [];
//     });
//     nMap = cleanNMap(nMap);
//     return nMap;
// }

// export const nChildIdsRemove = (childIds: string[], id: string) => {
//     childIds = [...childIds];
//     const index = childIds.indexOf(id);
//     if (index !== -1) childIds.splice(index, 1);
//     return uniq(childIds);
// }

// export const nChildIdsInsert = (childIds: string[], id: string, index: number) => {
//     childIds = [...childIds];
//     const fromIndex = childIds.indexOf(id);
//     if (fromIndex !== -1) {
//         childIds.splice(fromIndex, 1);
//         if (index > fromIndex) index--;
//     }
//     childIds.splice(index, 0, id);
//     return uniq(childIds);
// }

// export const nChildrenMap = (nMap: NMap): Record<string, N[]> => {
//     const nChildrenMap: Record<string, N[]> = {};
//     Object.values(nMap).forEach(n => {
//         if (n.pId && typeof n.i === 'number') {
//             const children = nChildrenMap[n.pId] || (nChildrenMap[n.pId] = []);
//             if (children[n.i]) {
//                 console.warn('nChildrenMap splice', n);
//                 children.splice(n.i, 0, n);
//                 return;
//             }
//             children[n.i] = n;
//         }
//     });
//     return nChildrenMap;
// }