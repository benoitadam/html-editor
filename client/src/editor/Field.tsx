import { defaultN, updateN, propCleanMap } from 'common/box';
import { useContext, useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import { tr } from 'common/helpers/tr';
import fieldMap from './fieldMap';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import { toBool } from 'common/helpers/to';
import Tooltip from '@mui/material/Tooltip';
import { BContext, CategoryContext } from './Category';

const fieldTypeMap: Record<string, string> = {
    color: 'color',
};
  
export default ({ p, show }: { p: string; show?: boolean }) => {
    const b = useContext(BContext);
    const category = useContext(CategoryContext);
    const [textValue, setTextValue] = useState('');
  
    useEffect(() => setTextValue(''), [b.id]);
    useEffect(() => category.setProp(p), [b.id]);
  
    const n: any = b.n || defaultN;
    const nValue = n[p];
    const field = fieldMap[p] || console.error('Field', p);
    const id = `${p}-field`;
    const propClean = propCleanMap[p] || ((v) => v === '' ? undefined : v);
  
    const text = textValue || field.stringify(nValue);
    const setValue = (value?: any) => updateN(b.id, { [p]: propClean(value) });
    const setText = (textValue?: string) => {
      setTextValue(textValue||'');
      setValue(field.parse(textValue));
    };
  
    if (show === false) return null;
  
    if (field.type === 'bool') {
      return (
        <Tooltip title={tr(field.tooltip)}>
          <FormControlLabel
            id={id}
            sx={{ flex: 1, m: 1 }}
            control={(
              <Switch size="small" checked={toBool(nValue) || false} onChange={(e) => setValue(e.target.checked ? true : undefined)} />
            )}
            label={tr(field.label)}
          />
        </Tooltip>
      )
    }
  
    if (field.values) {
      return (
        <Autocomplete
          id={id}
          freeSolo
          sx={{ flex: 1, m: 1 }}
          value={text}
          onInputChange={(_, text) => setText(text)}
          renderInput={(params) => <TextField {...params} label={tr(field.label)} />}
          options={field.values}
          size="small"
        />
      );
    }
  
    return (
      <TextField
        id={id}
        multiline={field.type === 'ctn'}
        sx={{ flex: 1, m: 1 }}
        label={tr(field.label)}
        value={text}
        onChange={(e) => setText(e.target.value)}
        type={fieldTypeMap[field.type] || 'text'}
        size="small"
        InputProps={{
          endAdornment: text && (
            <InputAdornment position="end">
              <IconButton onClick={() => setText()} onMouseDown={(e) => e.preventDefault()} size="small">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  };
  