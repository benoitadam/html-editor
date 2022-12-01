import EditorSelected from './EditorSelected';
import { ROOT_ID, findElId } from 'common/box';
import { setSelectId } from '~src/helpers/select';
import { RenderFactory } from '~src/render';
import Box from '@mui/material/Box';

export default () => {
  console.debug('EditorViewport');

  return (
    <Box
      className="editor_viewport"
      sx={{ position: 'relative', overflow: 'hidden', height: '100%', flex: 1, background: '#000' }}
    >
      <Box
        className="editor_pan"
        sx={{ position: 'absolute', overflow: 'scroll', top: 0, left: 0, width: '100%', height: '100%' }}
        onClick={(e) => {
          const id = findElId(e.target as HTMLElement);
          console.debug('Editor handleClick', e.target, (e.target as any).id, id);
          setSelectId(id || ROOT_ID);
        }}
      >
        <RenderFactory id={ROOT_ID} />
      </Box>
      <EditorSelected />
    </Box>
  );
};
