import req from "common/helpers/req";
import { getChildIds, bList, updateN, propLangMap, getN } from "common/box";
import fieldMap from "~src/editor/fieldMap";
import { toArr, toObj } from "common/helpers/to";
import chunk from "lodash/chunk";

export const translate = async (contents: string[], source: string, target: string) => {
    console.debug('translate', contents, source, target);
    if (!contents || contents.length === 0) return [];
    const translateUrl = 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyBxSGQ12zRId0pDcaEz7rf7kzEdJT6UReQ';
    const groups = chunk(contents, 100);
    let results: string[] = [];
    for (const q of groups) {
        if (!q || q.length === 0) continue;
        const res = await req.post(translateUrl, { q, target, source });
        const data = res.data.data || res.data;
        const texts = data.translations.map((i: any) => i.translatedText);
        results = [ ...results, ...texts ];
    }
    return results;
};

export const translateProps = () => Object.values(fieldMap).filter(f => f.type === 'ctn').map(f => f.prop);

export const translateBox = async (ids: string|string[], prop?: string) => {
    console.debug('translateBox', ids, prop);
    const source = 'fr';
    const props = prop ? [prop] : translateProps();
    const items: { id: string, prop: string, value: string }[] = [];
    const trMap: Record<string, Record<string, Record<string, string>>> = {};
    toArr(ids).forEach(id => {
        if (!id) return;
        const n = getN(id) as any;
        trMap[id] = JSON.parse(JSON.stringify(toObj(n.tr)));
        props.forEach(prop => {
            const value = String(n[prop]||'');
            if (value) items.push({ id, prop, value });
        });
    });
    const targets = Object.keys(propLangMap).filter(l => l !== source);
    const values = items.map(item => item.value);
    await Promise.all(
        targets.map(async (target) => {
            const results = await translate(values, source, target);
            results.forEach((result, i) => {
                const item = items[i];
                const tr = trMap[item.id];
                if (!tr) return;
                const trTarget = tr[target] || (tr[target] = {});
                trTarget[item.prop] = result;
            });
        })
    );
    Object.entries(trMap).forEach(([id, tr]) => updateN(id, { tr }));
};

export const childIdsRecursive = (id: string, ids: string[]) => {
    ids.push(id);
    getChildIds(id).map(childId => childIdsRecursive(childId, ids));
}

export const translateChildren = async (id: string) => {
    console.debug('translateAll');
    const ids: string[] = [];
    childIdsRecursive(id, ids);
    await translateBox(ids);
};

export const translateAll = async () => {
    console.debug('translateAll');
    const ids = bList().map(p => p.id);
    await translateBox(ids);
};

export default translate;
