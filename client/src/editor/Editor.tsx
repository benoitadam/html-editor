import EditorViewport from './EditorViewport';
import Box from '@mui/material/Box';
import EditorTree from './EditorTree';
import EditorForm from './EditorForm';
import EditorActions from './EditorActions';
import { renderContentGet, renderContentSet, RenderContentProps } from '~src/render';
import { renderPriceGet, renderPriceSet, RenderPriceProps } from '~src/render';
import { selectId$ } from '~src/helpers/select';
import useMessager from '~src/hooks/useMessager';
import { updateN } from 'common/box';
import { toNbr } from 'common/helpers/to';
import CodeEditorLazy from './CodeEditorLazy';

const initRenderContent = renderContentGet();
renderContentSet((props: RenderContentProps) => {
  const a = props.a || (props.a = {});
  const p = props.p || 'ctn';
  a.contentEditable = true;
  a.onBlur = (e) => {
    const value = (e.target as HTMLDivElement).innerHTML;
    console.debug('Editor RenderContent onBlur', props, value);
    if (value !== null) updateN(props.b.id, { [p]: value });
  };
  return initRenderContent(props);
});

const initRenderPrice = renderPriceGet();
renderPriceSet((props: RenderPriceProps) => {
  const a = props.a || (props.a = {});
  const p = props.p || 'price';
  a.contentEditable = true;
  a.onBlur = (e) => {
    const value = toNbr((e.target as HTMLDivElement).innerText, null);
    console.debug('Editor RenderPrice onBlur', props, value);
    if (value !== null) updateN(props.b.id, { [p]: value });
  };
  return initRenderPrice(props);
});

export default function Editor() {
  const selectId = useMessager(selectId$);

  return (
    <Box
      className="editor"
      sx={{
        position: 'relative',
        flex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          flex: 1,
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <EditorViewport />
        <CodeEditorLazy />
      </Box>
      <Box
        className="editor_side"
        boxShadow={2}
        sx={{
          width: 500,
          height: '100%',
          overflow: 'hidden',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <EditorTree />
        <Box sx={{ height: '1px', background: '#000' }} />
        {selectId && <EditorForm key={selectId} id={selectId} />}
        <EditorActions />
      </Box>
    </Box>
  );
}
