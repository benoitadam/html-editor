import { getChildIds, downId, exportND, importND, getParentId, removeB, upId, ND, duplicateND, stringifyND, parseND } from "common/box";
import messager from "common/helpers/messager";

export const selectId$ = messager('');

export const getSelectId = () => selectId$.value;

export const setSelectId = (selectId: string) => {
  selectId$.next(selectId);
  return selectId;
}

export const selectParent = () => setSelectId(getParentId(getSelectId()));

export const selectChild = (index = 0) => setSelectId(getChildIds(getSelectId())[index]);

export const selectUp = () => setSelectId(upId(getSelectId()));

export const selectDown = () => setSelectId(downId(getSelectId()));

export const selectExport = () => {
  const id = getSelectId();
  const nd = exportND(id);
  const json = stringifyND(nd);
  return json;
}

export const selectImport = (json?: string|null) => {
  if (!json) return;
  const nd = duplicateND(parseND(json));
  const parentId = getParentId(getSelectId());
  importND(nd, parentId);
  setSelectId(nd.id||'');
}

export const selectRemove = () => {
  const id = getSelectId();
  if (id === selectUp()) selectParent();
  removeB(id);
};






// export const rSelectList = () => rList().filter(r => r.selected);

// export const rSelectDescending = () => rSelectList().sort((a, b) => a.selected - b.selected).reverse();

// export const rSelectLast = () => rSelectDescending()[0];

// export const rSelectClean = () => rList().forEach(r => rUpdate(r.id, { selected: 0 }));

// export const rSelectId = () => (rSelectLast()||{}).id;

// export const selectUp = () => {
//     console.debug('selectUp');
//     const id = selectIdGet();
//     const index = boxIndexGet(id);
//     if (index !== -1) {
//         const childIds = boxParentChildIds(id);
//         const endIndex = childIds.length - 1;
//         const nextIndex = index === 0 ? endIndex : index - 1;
//         selectIdSet(childIds[nextIndex] || id);
//     }
// }

// export const selectDown = () => {
//     console.debug('selectDown');
//     const id = selectIdGet();
//     const index = boxIndexGet(id);
//     if (index !== -1) {
//         const childIds = boxParentChildIds(id);
//         const endIndex = childIds.length - 1;
//         const nextIndex = index === endIndex ? 0 : index + 1;
//         selectIdSet(childIds[nextIndex] || id);
//     }
// }

// export const selectLeft = () => {
//     console.debug('selectLeft');
//     const id = selectIdGet();
//     selectIdSet(boxParentId(id) || id);
// }

// export const selectRight = () => {
//     console.debug('selectRight');
//     const id = selectIdGet();
//     selectIdSet(boxChildIds(id)[0] || id);
// }
