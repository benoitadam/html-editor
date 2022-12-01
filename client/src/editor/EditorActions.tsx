import AdvancedIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import useEvent from 'react-use/esm/useEvent';
import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import Button from '@mui/material/Button';
import isAdvanced$ from './isAdvanced$';
import { clipboardCopy, clipboardPaste } from '~src/helpers/clipboard';
import { editorHistoryRedo, editorHistoryUndo } from './editorHistory';
import { selectChild, selectDown, selectExport, selectId$, selectImport, selectParent, selectRemove, selectUp } from '~src/helpers/select';
import { Tooltip } from '@mui/material';
import { exportND, importND, addIndex, getRootB, getB, ROOT_ID } from 'common/box';
import { siteRepo } from 'common/models/gqlRepos';
import site$ from '~src/site/site$';

export interface EditorActionsProps {}


const subjectByKeydown: { [key: string]: () => void } = {
    'ctrl+c': () => clipboardCopy(selectExport()),
    'ctrl+v': () => selectImport(clipboardPaste()),
    'ctrl+d': () => selectImport(selectExport()),
    'ctrl+x': () => clipboardCopy(selectExport()) && selectRemove(),
    'ctrl+z': () => editorHistoryUndo(),
    'ctrl+shift+z': () => editorHistoryRedo(),
    'ctrl+y': () => editorHistoryRedo(),
    // 'ctrl+s': () => apiAdmin.save(),
    'ctrl+arrowup': () => addIndex(selectId$.value, -1),
    'ctrl+arrowdown': () => addIndex(selectId$.value, +1),
    delete: () => selectRemove(),
    arrowup: () => selectUp(),
    arrowdown: () => selectDown(),
    arrowleft: () => selectParent(),
    arrowright: () => selectChild(),
};

export interface EditorButtonProps {
  class?: string;
  children?: any;
  submit?: boolean;
  cancel?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const EditorButton = styled(Button)({
  margin: 3,
});

const handleKeyDown: EventListenerOrEventListenerObject = (e) => {
  console.debug('handleKeyDown', e);
  if (document.activeElement !== document.body) return;
  if (!(e instanceof KeyboardEvent)) return;
  let key = String(e.key).toLowerCase();
  if (e.shiftKey) key = 'shift+' + key;
  if (e.ctrlKey) key = 'ctrl+' + key;
  console.debug('handleKeyDown', key);
  const action = subjectByKeydown[key];
  if (action) {
    action();
    e.preventDefault();
    e.stopImmediatePropagation();
  }
};

export const EditorActions = (props: EditorActionsProps) => {
  console.debug('EditorActions', props);

  useEvent('keydown', handleKeyDown, document);

  return (
    <Box
      className="editor_actions"
      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', p: 1, pt: 0.5 }}
    >
      <Tooltip title="Mode Avancer">
        <EditorButton color="warning" startIcon={<AdvancedIcon />} onClick={() => isAdvanced$.next(!isAdvanced$.value)} />
      </Tooltip>
      <Box sx={{ flex: 1 }} />
      <EditorButton color="primary" variant="contained" startIcon={<SaveIcon />} onClick={async () => {
        console.debug('save');
        const site = site$.value;
        if (site) {
          const rootND = exportND();
          const selectND = exportND(selectId$.value);

          console.debug('save', { rootND, selectND });

          await siteRepo.update(site.id, { items: rootND });
        }
      }}>
        Enregistrer
      </EditorButton>
      <EditorButton color="error" startIcon={<CancelIcon />} onClick={async () => {
        console.debug('reset');
        const site = site$.value;
        if (site) {
          importND(site.items);
        }
      }}>
        Annuler
      </EditorButton>
    </Box>
  );
};

export default EditorActions;
