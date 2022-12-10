import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { css } from '@codemirror/lang-css';
import { selectId$ } from '~src/helpers';
import useMessager from '~src/hooks/useMessager';
import isAdvanced$ from './isAdvanced$';
import { b$, setN } from '~src/appAll';
import Box from '@mui/material/Box';

export default () => {
  const isAdvanced = useMessager(isAdvanced$);
  const selectId = useMessager(selectId$);
  const b = useMessager(b$(selectId));

  if (!isAdvanced) return null;

  return (
    <Box sx={{
      width: '100%',
      maxHeight: 300,
      overflow: 'auto'
    }}>
      <CodeMirror
        value={JSON.stringify(b.n, null, 2)}
        style={{ width: '100%' }}
        extensions={[json(), css()]}
        onChange={(value, viewUpdate) => {
          console.log('value:', value);
          try {
            const n = JSON.parse(value);
            setN(b.id, n);
          } catch (error) {}
        }}
      />
    </Box>
  );
};
