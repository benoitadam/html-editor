import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import isAdvanced$ from './isAdvanced$';
import { defaultN, ROOT_ID, setIndex, addIndex, addB, getB, getIndex, getParentId, setParentId } from 'common/box';
import { selectId$, setSelectId, selectExport, selectImport, selectRemove, getSelectId } from '~src/helpers/select';
import useB from '~src/hooks/useB';
import IconButton from '@mui/material/IconButton';
import ArticleIcon from '@mui/icons-material/Article';
import MouseIcon from '@mui/icons-material/Mouse';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AbcIcon from '@mui/icons-material/Abc';
import ImageIcon from '@mui/icons-material/Image';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { createContext, DragEvent, useContext, useMemo, useRef, useState } from 'react';
import { clipboardCopy, clipboardPaste } from '~src/helpers/clipboard';
import { Tooltip } from '@mui/material';
import useMessager from '~src/hooks/useMessager';

const iconByType: Record<string, (props: any) => JSX.Element> = {
  box: ArticleIcon,
  btn: MouseIcon,
  carousel: ViewCarouselIcon,
  center: ZoomInMapIcon,
  column: ViewColumnIcon,
  header: AbcIcon,
  img: ImageIcon,
  video: SlideshowIcon,
  page: MenuBookIcon,
  product: BrunchDiningIcon,
  row: TableRowsIcon,
};

class Drag {
  startId = '';
  enterId = '';

  start(e: DragEvent, id: string) {
    console.log('Drag.start', e.target, id);
    this.startId = id;
  }

  enter(e: DragEvent, id: string) {
    console.log('Drag.enter', e.target, id);
    if (getParentId(this.startId) !== getParentId(id)) return;
    this.enterId = id;
  }

  end(e: DragEvent, id: string) {
    console.log('Drag.end', e.target, id);
    if (!this.startId) return;
    if (!this.enterId) return;
    if (getParentId(this.startId) !== getParentId(this.enterId)) return;
    // bParentIdSet(this.startId, bParentId(this.enterId));
    setIndex(this.startId, getIndex(this.enterId));
  }
}

const DragContext = createContext(new Drag());

const BoxItem = ({ tab, id, ...props }: BoxProps & { tab: number; id?: string }) => {
  const drag = useContext(DragContext);
  const isAdvanced = useMessager(isAdvanced$);
  const b = useB(id);
  const n = b.n || defaultN;
  const t = n.t || 'box';
  const Icon = iconByType[t] || iconByType.box;

  const label = n.label || n.title || n.ctn || n.alt || n.cls || 'Élément';
  const labelShort = label.length > 30 ? label.substring(0, 27).trimEnd() + '...' : label;

  if (!id) return null;

  return (
    <Box
      {...props}
      style={{
        ...props.style,
        textDecoration: n.out ? 'line-through' : undefined,
        opacity: n.del ? '0.5' : undefined,
      }}
      sx={{
        m: 0,
        ml: tab * 2 + 0.5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '& .MuiButtonBase-root': { p: 0.5, fontSize: '0.7em' },
        '& .arrow': { py: 0, my: -0.5 },
        '& .MuiSvgIcon-root': { height: '0.8em', width: '0.8em', color: 'black' },
        '&.active, &.active .MuiButtonBase-root': { fontWeight: 'bold' },
      }}
      draggable
      onDragStart={(e) => drag.start(e, id)}
      onDragEnter={(e) => drag.enter(e, id)}
      onDragEnd={(e) => drag.end(e, id)}
    >
      <Icon />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton className="arrow" size="small" onClick={() => addIndex(id, -1)}>
          <ArrowDropUpIcon />
        </IconButton>
        <IconButton className="arrow" size="small" onClick={() => addIndex(id, +1)}>
          <ArrowDropDownIcon />
        </IconButton>
      </Box>
      <Button sx={{ mx: 1 }} onClick={() => setSelectId(b.id)}>
        {labelShort}
      </Button>
      <Tooltip title="Dupliquer">
        <IconButton color="primary" onClick={() => setSelectId(id) && selectImport(selectExport())}>
          <LibraryAddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Supprimer">
        <IconButton color="error" onClick={() => setSelectId(id) && selectRemove()}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {isAdvanced && (
        <>
          <Tooltip title="Couper">
            <IconButton onClick={() => setSelectId(id) && clipboardCopy(selectExport()) && selectRemove()}>
              <ContentCutIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Copier">
            <IconButton onClick={() => setSelectId(id) && clipboardCopy(selectExport())}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Coller">
            <IconButton onClick={() => setSelectId(id) && selectImport(clipboardPaste())}>
              <ContentPasteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

const EditorTreeItems = ({ id }: { id?: string }) => {
  const drag = useMemo(() => new Drag(), [id]);
  const isAdvanced = useMessager(isAdvanced$);
  const select = useB(id);
  const parentId = select.n?.pId;
  const parent = useB(parentId);

  if (!id) return null;

  const siblingIds = parent.n?.childIds || [];
  if (siblingIds.indexOf(id) === -1) siblingIds.push(id);

  const childIds = select.n?.childIds || [];
  const firstChildId = childIds[0];

  const items: JSX.Element[] = [];

  items.push(<BoxItem key={parentId} tab={0} id={parentId} className="parent" />);

  siblingIds.forEach(siblingId => {
    items.push(<BoxItem tab={1} key={siblingId} id={siblingId} className={siblingId === id ? 'active' : 'sibling'} />);
    if (siblingId === id) {
      items.push(<BoxItem tab={2} key={firstChildId} id={firstChildId} />);
    }
  });

  if (isAdvanced) {
    items.push((
      <Box
        sx={{
          m: 0.5,
          ml: 4 + 0.5,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          '& .MuiButtonBase-root': { p: 0.5 },
          '& .MuiButtonBase-root .MuiSvgIcon-root': { height: '0.8em' },
        }}
      >
        <AddIcon />
        <Button onClick={() => addB(getSelectId())}>Ajouter un enfant</Button>
      </Box>
    ));
  }

  return (
    <DragContext.Provider value={drag}>
      {items}
    </DragContext.Provider>
  );
};

export default () => {
  console.debug('EditorTree');
  const selectId = useMessager(selectId$) || ROOT_ID;

  return (
    <Box
      key={selectId}
      className="editor_tree"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        p: 0.5,
        flex: 1,
        overflow: 'hidden',
        overflowY: 'auto',
        minHeight: 300,
      }}
    >
      <EditorTreeItems key={selectId} id={selectId} />
    </Box>
  );
};
