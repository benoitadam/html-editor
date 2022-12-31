import { HTMLAttributes } from 'react';
import { B } from 'common/box';
import { toNbr } from 'common/helpers/to';

export interface RenderPriceProps {
  b: B;
  p?: string;
  a?: Omit<HTMLAttributes<HTMLDivElement>, 'children'>;
}

let renderPrice = ({ b, p, a }: RenderPriceProps) => {
  if (!a) a = {};
  let v = toNbr((b.n as any)[p || 'price'], null);
  if (v === null) return null;
  v = Math.round(v * 100) / 100;
  const [int, d] = String(v).split('.');
  const dec = `<i${d?'':' class="dec-0"'}>,${(d || '').padEnd(2, '0')}</i>`;
  a.className = `${v===0 ? 'price price-0' : 'price'} ${p||''} ${a.className||''}`;
  a.dangerouslySetInnerHTML = { __html: `<b>${int}</b>${dec}<u>€</u>` };
  return <span key={v} {...a} />;
};

export const renderPriceGet = () => renderPrice;
export const renderPriceSet = (value: typeof renderPrice) => (renderPrice = value);

export default (props: RenderPriceProps) => renderPrice(props);
