import { defaultN, updateN, getN, lang$ } from 'common/box';
import { useContext, useEffect, useState } from 'react';
import TranslateIcon from '@mui/icons-material/Translate';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import { tr } from 'common/helpers/tr';
import fieldMap from './fieldMap';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { translateBox } from '../api/translate';
import useMessager from '~src/hooks/useMessager';
import { BContext } from './Category';

export default ({ p, show }: { p: string; show?: boolean }) => {
    const lang = useMessager(lang$);
    const b = useContext(BContext);
    const [textValue, setTextValue] = useState('');
  
    useEffect(() => setTextValue(''), [b.id]);
  
    const n: any = b.n || defaultN;
    const trVal = (n.tr||{})[lang] || {};
    const nValue = trVal[p] || n[p];
    const field = fieldMap[p];
    const id = `${p}-field`;
    const text = textValue || field.stringify(nValue);
  
    const setValue = (value?: any) => {
      const oldTr = getN(b.id).tr || {};
      const newVal = { ...oldTr[lang], [p]: value };
      const tr = { ...oldTr, [lang]: newVal };
      updateN(b.id, { tr });
    };
  
    const setText = (textValue?: string) => {
      setTextValue(textValue||'');
      setValue(field.parse(textValue));
    };
  
    if (show === false) return null;
  
    return (
      <TextField
        id={id}
        multiline={true}
        sx={{ flex: 1, m: 1 }}
        label={tr(field.label)}
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        size="small"
        InputProps={{
          endAdornment: text && (
            <InputAdornment position="end">
              {field.type === 'ctn' && (
                <IconButton color='primary' onClick={() => translateBox(b.id, p)} onMouseDown={(e) => e.preventDefault()} size="small">
                  <TranslateIcon />
                </IconButton>
              )}
              <IconButton onClick={() => setText()} onMouseDown={(e) => e.preventDefault()} size="small">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }