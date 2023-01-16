import { useEffect, useRef } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import useInterval from 'react-use/esm/useInterval';
import { useState } from 'react';
import { selectId$ } from '~src/helpers/select';
import { getN, updateN, getEl, N, NUnit } from 'common/box';
import { toNbr } from 'common/helpers/to';
import isAdvanced$ from './isAdvanced$';
import useMessager from '~src/hooks/useMessager';

const nullRect = { top: 0, left: 0, width: 0, height: 0 };

const events: any = {};

const defaultMove = { x: 0, y: 0, w: 0, h: 0 };
type Move = typeof defaultMove;

const unitParse = (u: NUnit | undefined, d: number) => toNbr(String(u||d).replace('px', ''), d);

const getCornerProps: (cornerType: string, setMove: (move: Move) => void) => BoxProps = (type, setMove) => ({
  className: `corner corner-${type}`,
  onMouseDown: (e) => {
    console.debug('handleCornerMouseDown', type, e.target);

    const initX = e.clientX;
    const initY = e.clientY;
    const move = { ...defaultMove };

    const clean = () => {
      if (events.onMove) {
        document.removeEventListener('mousemove', events.onMove);
        delete events.onMove;
      }
      if (events.onUp) {
        document.removeEventListener('mouseup', events.onUp);
        delete events.onUp;
      }
      setMove(defaultMove);
    };

    const onMove = (e: MouseEvent) => {
      const x = e.clientX - initX;
      const y = e.clientY - initY;

      if (type[0] === 't') {
        move.y = y;
        move.h = -y;
      } else if (type[0] === 'b') {
        move.h = y;
      }

      if (type[1] === 'l') {
        move.x = x;
        move.w = -x;
      } else if (type[1] === 'r') {
        move.w = x;
      }

      if (type === 'cc') {
        move.x = x;
        move.y = y;
      }

      setMove({ ...move });
    };

    const onUp = () => {
      const n = getN(selectId$.value);
      const rect = getEl(selectId$.value)?.getBoundingClientRect();

      const changes: Partial<N> = {};

      if (n.x || move.x) changes.x = Math.round(unitParse(n.x, 0) + move.x) + 'px';
      if (n.y || move.y) changes.y = Math.round(unitParse(n.y, 0) + move.y) + 'px';
      if (n.w || move.w) changes.w = Math.round(Math.max(unitParse(n.w, rect ? rect.width : 0) + move.w, 0)) + 'px';
      if (n.h || move.h) changes.h = Math.round(Math.max(unitParse(n.h, rect ? rect.height : 0) + move.h, 0)) + 'px';

      updateN(selectId$.value, changes);

      clean();
    };

    clean();

    events.onMove = onMove;
    events.onUp = onUp;

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  },
});

export default () => {
  const cElRef = useRef<HTMLDivElement>(null);
  const isAdvanced = useMessager(isAdvanced$);
  const sId = useMessager(selectId$);
  const [, setTime] = useState(0);

  useInterval(() => setTime(Date.now()), 100);

  const el = document.getElementById(sId);

  const cEl = cElRef.current;
  const cRect = cEl?.getBoundingClientRect() || nullRect;

  const cWidth = Math.ceil(cRect.width);
  const cHeight = Math.ceil(cRect.height);

  const rect = el?.getBoundingClientRect() || nullRect;
  const top = Math.floor(rect.top - cRect.top);
  const left = Math.floor(rect.left - cRect.left);
  const width = Math.ceil(rect.width);
  const height = Math.ceil(rect.height);

  useEffect(() => {
    if (cEl) {
      cEl.scrollTo({
        top: top + cEl.scrollTop - 100,
        left: left + cEl.scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [sId]);

  // console.debug('EditorSelected', {
  //   selectId,
  //   elId: (el as any)?.id,
  //   el2Id: (el2 as any)?.id,
  //   top,
  //   left,
  //   width,
  //   height,
  // });

  const [move, setMove] = useState(defaultMove);

  const x0 = move.x + rect.left - cRect.left;
  const y0 = move.y + rect.top - cRect.top;
  const x1 = move.w + x0 + rect.width;
  const y1 = move.h + y0 + rect.height;

  if (!el) return null;
  return (
    <>
      <Box
        ref={cElRef}
        className="editor_selected_mask"
        sx={{
          userSelect: 'none',
          pointerEvents: 'none',
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: '100%',
          width: '100%',
          '& .mask_container': {
            opacity: 0.2,
          },
          '& .mask': {
            position: 'absolute',
            // transition: '0.2s ease',
            backgroundColor: '#888',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          '& .corner': {
            userSelect: 'none',
            pointerEvents: 'all',
            position: 'absolute',
            width: 14,
            height: 14,
            boxSizing: 'border-box',
            border: '2px solid #1976d2',
            cursor: 'e-resize',
          },
          '& .corner-tl': { cursor: 'nw-resize' },
          '& .corner-tr': { cursor: 'ne-resize' },
          '& .corner-bl': { cursor: 'ne-resize' },
          '& .corner-br': { cursor: 'nw-resize' },
          '& .corner-tc': { cursor: 'n-resize' },
          '& .corner-bc': { cursor: 'n-resize' },
          '& .corner-cl': { cursor: 'e-resize' },
          '& .corner-cr': { cursor: 'e-resize' },
          '& .corner-cc': { cursor: 'move', borderRadius: '100%' },
        }}
      >
        <div className="mask_container">
          <div id="select_mt" className="mask" style={{ bottom: Math.max(cHeight - top, 0) }} />
          <div id="select_mb" className="mask" style={{ top: Math.max(top + height, 0) }} />
          <div id="select_ml" className="mask" style={{ right: Math.max(cWidth - left, 0) }} />
          <div id="select_mr" className="mask" style={{ left: Math.max(left + width, 0) }} />
        </div>

        {isAdvanced && (
          <>
            <Box {...getCornerProps('tl', setMove)} style={{ left: x0 - 14, top: y0 - 14 }} />
            <Box {...getCornerProps('tr', setMove)} style={{ left: x1, top: y0 - 14 }} />
            <Box {...getCornerProps('bl', setMove)} style={{ left: x0 - 14, top: y1 }} />
            <Box {...getCornerProps('br', setMove)} style={{ left: x1, top: y1 }} />
            <Box {...getCornerProps('tc', setMove)} style={{ left: (x0 - 14 + x1) / 2, top: y0 - 14 }} />
            <Box {...getCornerProps('bc', setMove)} style={{ left: (x0 - 14 + x1) / 2, top: y1 }} />
            <Box {...getCornerProps('cl', setMove)} style={{ left: x0 - 14, top: (y0 - 14 + y1) / 2 }} />
            <Box {...getCornerProps('cr', setMove)} style={{ left: x1, top: (y0 - 14 + y1) / 2 }} />
            <Box {...getCornerProps('cc', setMove)} style={{ left: (x0 - 14 + x1) / 2, top: (y0 - 14 + y1) / 2 }} />
          </>
        )}

        {/* <div style={{ top, left, width, height, background: 'none', boxr: 'red' }} /> */}
        {/* <Box boxShadow={2} style={{ position: 'absolute', top, left, width, height }} /> */}
      </Box>
    </>
  );
};
