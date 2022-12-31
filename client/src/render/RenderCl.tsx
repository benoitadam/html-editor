import { HTMLAttributes } from 'react';
import { B } from 'common/box';
import { toNbr } from 'common/helpers/to';

export interface RenderClProps {
  b: B;
  p?: string;
  a?: Omit<HTMLAttributes<HTMLDivElement>, 'children'>;
}

let renderCl = ({ b, p, a }: RenderClProps) => {
  if (!a) a = {};
  let v = toNbr((b.n as any)[p || 'price'], null);
  if (v === null) return null;
  v = Math.round(v * 100) / 100;
  const [int, d] = String(v).split('.');
  const dec = d ? `<i>,${d}</i>` : '';
  a.className = `${v===0 ? 'cl cl-0' : 'cl'} ${p||''} ${a.className||''}`;
  a.dangerouslySetInnerHTML = { __html: `(<b>${int}</b>${dec}<u>cl</u>)` };
  return <span key={v} {...a} />;
};

export const renderClGet = () => renderCl;
export const renderClSet = (value: typeof renderCl) => (renderCl = value);

export default (props: RenderClProps) => renderCl(props);
