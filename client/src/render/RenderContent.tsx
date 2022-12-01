import { createElement, HTMLAttributes } from 'react';
import { B } from 'common/box';

export interface RenderContentProps {
  b: B;
  t?: string;
  p?: string;
  a?: Omit<HTMLAttributes<HTMLDivElement>, 'children'>;
}

export const renderContentHtml = (b: B, p: string) => String(b.t[p] || (b.n as any)[p] || '');

let renderContent = ({ b, p, t, a }: RenderContentProps) => {
  const html = renderContentHtml(b, p||'ctn');
  if (!html) return null;
  if (!a) a = {};
  a.dangerouslySetInnerHTML = { __html: html };
  delete (a as any).children;
  return createElement((t as any) || 'div', a);
};

export const renderContentGet = () => renderContent;
export const renderContentSet = (value: typeof renderContent) => (renderContent = value);

export default (props: RenderContentProps) => renderContent(props);
