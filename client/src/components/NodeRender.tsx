// import { createElement, FunctionComponent, useMemo } from 'preact/hooks';
// import { NRender } from 'common/box';
// import { useObservabl } from 'react-use';

// export const templateMap: Record<string, FunctionComponent<NRenderProps>> = {};

// export const addTemplate = (t: string, f: FunctionComponent<NRenderProps>) => {
//   renderMap[t] = f;
// }

// export const nodeFactory = (render: NRender) => {
//   const template = templateMap[render.t] || templateMap.default;
//   const children = render.children.map(nodeFactory);



//   return createElement(render, { id, node, attrs, style, classes });
// }






// // function NotRegisterRender(props: NRenderProps) {
// //   return <div style={{ background: 'red' }}>Factory not render register "{props.node.t}"</div>;
// // }

// // export function getChildren(props: NRenderProps) {
// //   return (props.children || []).map((child) => <Factory  />);
// // }

// // export default function Factory(props: NRenderProps) {

// //   const t = props.t || '';
// //   const render = renders[t] || NotRegisterRender;

// //   const style = props.style || {};
// //   const classes = props.classes || {};
// //   const attrs = props.attrs || {};

// //   const props: RenderProps = { id, node, attrs, style, classes };

// //   // attrs.style = style;
// //   // attrs.ref = (el: HTMLElement) => nodes.setEl(id, el);
  
// //   props.ref = (el: HTMLElement) => nodes.setEl(id, el);
// //   props.attrs.className = useMemo(() => Object.keys(classes).join(' '), [classes]);

// //   return createElement(render, props);
// // }
