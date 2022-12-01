import { propHelpers } from 'common/box';
import addCss from '~src/helpers/addCss';
import addFont from '~src/helpers/addFont';
import { toArr } from 'common/helpers/to';
import setTitle from '~src/helpers/setTitle';

export * from './RenderFactory';
export * from './RenderContent';
export * from './RenderPrice';
export * from './renders';

propHelpers.setTitle = setTitle;
propHelpers.fontImport = (font: string|string[]) => toArr(font).forEach(addFont);
propHelpers.addCss = addCss;

// export const renderChildren = (n: N) => [];

// export const rLang = (lang: string) => {
//   boxDefault.lang = lang;
//   boxList().forEach(box => boxUpdate(box.id, { lang }));
// }

// export const Html = ({ html, htmlTag, ...attrs }: HtmlProps) => {
//   attrs.dangerouslySetInnerHTML = { __html: html || '' };
//   delete attrs.children;
//   return h((htmlTag as any) || 'div', attrs);
// };

// export interface RenderPriceProps {
//   value: any;
// }

// export let RenderPrice = (props: RenderPriceProps) => {
//   const { value } = props;
//   let v = value as number;
//   if (v === null || v === undefined) return null;
//   if (typeof v !== 'number') v = parseFloat(String(v));
//   if (Number.isNaN(v)) return null;
//   v = Math.round(v * 100) / 100;
//   const [int, d] = String(v).split('.');
//   const dec = ',' + (d || '').padEnd(2, '0');
//   return (
//     <span className="price">
//       <b>{int}</b>
//       <i>{dec}</i>
//       <u>€</u>
//     </span>
//   );
// };

// export const renderPriceSet = (value: typeof RenderPrice) => {
//   RenderPrice = value;
// };