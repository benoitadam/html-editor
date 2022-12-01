import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { storageMessager } from "common/helpers";
import useMessager from "~src/hooks/useMessager";
import { defaultN, getRootB } from 'common/box';
import fieldMap from "./fieldMap";

export const categoryExpandedMap$ = storageMessager<Record<string, boolean>, boolean>('categoryExpandedMap', {});

export interface CategoryProps extends PropsWithChildren<{ k: string; title: string; show?: boolean }> {}

export const BContext = createContext(getRootB());

export interface CategoryInfo {
    propMap: Record<string, boolean>;
    setProp: (prop: string) => void;
}

export const defaultCategoryInfo: CategoryInfo = { propMap: {}, setProp: () => {} };
export const CategoryContext = createContext(defaultCategoryInfo);

export default ({ k, title, show, children }: CategoryProps) => {
  const b = useContext(BContext);
  const [info, setInfo] = useState(defaultCategoryInfo);
  useMessager(categoryExpandedMap$);

  const n: any = b.n || defaultN;

  info.setProp = (prop) => {
    if (info.propMap[prop]) return;
    setInfo((info) => ({ ...info, propMap: { ...info.propMap, [prop]: true } }));
  };

  const desk = useMemo(() => {
    return Object.keys(info.propMap)
      .filter((p) => n[p] !== undefined)
      .map((p) => fieldMap[p].label)
      .join(', ');
  }, [info.propMap, n]);

  if (show === false) return null;

  const expanded = categoryExpandedMap$.getItem(k, !!desk);

  return (
    <CategoryContext.Provider value={info}>
      <Accordion
        sx={{ '&.Mui-expanded': { m: 0, mt: 0.8, mb: 0.2 } }}
        expanded={expanded}
        onChange={(e, expanded) => {
          console.debug('expanded', k, expanded);
          categoryExpandedMap$.setItem(k, expanded);
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel-${k}-content`}
          id={`panel-${k}-header`}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>{title}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{desk}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', p: 0.5 }}>
          {children}
        </AccordionDetails>
      </Accordion>
    </CategoryContext.Provider>
  );
};
