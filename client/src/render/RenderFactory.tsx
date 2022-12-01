import { setEl, NClasses } from 'common/box';
import { createElement, FunctionComponent } from 'react';
import { B } from 'common/box';
import useB from '~src/hooks/useB';
import renderActions from './renderActions';
import RenderContent, { renderContentHtml } from './RenderContent';

export interface RenderFactoryProps {
  id: string;
  style?: { [prop: string]: string };
  classes?: NClasses;
  attrs?: { [prop: string]: any };
}

export interface RenderProps {
  b: B;
  a: Record<string, any>;
}

export const renderMap: Record<string, FunctionComponent<RenderProps>> = {};

export const renderAdd = (t: string, render: FunctionComponent<RenderProps>) => (renderMap[t] = render);

export const renderChildren = (b: B) => (b.n.childIds || []).map((id) => <RenderFactory key={id} id={id} />);

export const RenderDefault = ({ b, a }: RenderProps) => <div {...a}>{renderChildren(b)}</div>;

export const RenderFactory = (props: RenderFactoryProps) => {
  const b = useB(props.id);
  const n = b.n;
  if (!n) return null;

  const id = b.id;
  const t = n.t || 'box';
  const render = n.ctn ? RenderContent : renderMap[t] || RenderDefault;

  const a: Record<string, any> = {
    id,
    ...b.a,
    ...props.attrs,
    style: { ...b.s, ...props.style },
    className: Object.keys({ ...b.c, ...props.classes, [t]: 1 }).join(' '),
    ref: (el: HTMLElement) => setEl(id, el),
    onClick: () => renderActions(b, 'onClick', n.onClick),
  };

  // console.debug('RenderFactory', id, t, { props, b, a, render });
  return createElement(render, { b, a });
};

export default RenderFactory;