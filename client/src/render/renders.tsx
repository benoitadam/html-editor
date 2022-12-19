import { setLang, lang$, NClasses, getHomePage } from 'common/box';
import { useState } from 'react';
import useInterval from 'react-use/esm/useInterval';
import renderActions from './renderActions';
import RenderContent from './RenderContent';
import { RenderFactory, renderAdd, renderChildren, RenderDefault, RenderProps } from './RenderFactory';
import RenderPrice from './RenderPrice';
import useMessager from '~src/hooks/useMessager';
import setTitle from '~src/helpers/setTitle';
import app from '~src/app';
import router from '~src/helpers/router';
import { getSitePage } from '~src/site/sitePage';

renderAdd('box', RenderDefault);
renderAdd('btn', RenderDefault);
renderAdd('row', RenderDefault);
renderAdd('column', RenderDefault);
renderAdd('center', RenderDefault);
renderAdd('ctn', RenderContent);

renderAdd('header', ({ b, a }: RenderProps) => (
  <div {...a}>
    <RenderContent t="h3" b={b} p="title" />
    <RenderContent a={{ className: 'desc' }} b={b} p="desc" />
    {renderChildren(b)}
  </div>
));

renderAdd('page', ({ b, a }) => {
  useMessager(router.updated$);
  const sitePage = getSitePage();
  if (sitePage !== b.n.page) return null;
  setTitle(b.n.pageTitle);
  return <div {...a}>{renderChildren(b)}</div>;
});

renderAdd('img', ({ b, a }) => {
  const imgUrl = b.n.img;
  return imgUrl ? <img {...a} src={imgUrl} alt={b.n.alt} /> : null;
});

// renderAdd('video', ({ n, attrs }) => {
//   const url = getVideoUrl(n.video);
//   console.debug('Video render', n);
//   return url ? (
//     <video autoPlay loop {...attrs}>
//       <source src={url} type="video/mp4"></source>
//       Your browser does not support the video tag.
//     </video>
//   ) : null;
// });

renderAdd('cat', ({ b, a }: RenderProps) => (
  <div {...a}>
    <RenderContent t="h3" b={b} p="title" a={{ className: 'cat_title' }} />
    <RenderContent a={{ className: 'cat_desc' }} b={b} p="desc" />
    {renderChildren(b)}
  </div>
));

export const VegSvg = () => (
  <svg viewBox="0 0 24 24">
    <path d="M21.878.464l-2.486.557c-2.128.418-2.466.544-3.414 1.246-1.346 1.002-2.287 2.937-2.281 4.694.007.67.106 1.147.219 1.021a3 3 0 0 0 .199-.424c.404-.975 1.578-2.46 2.579-3.262.51-.411 1.538-.815 1.538-.603 0 .073-.351.51-.769.948-.391.418-.524.59-1.26 1.657-.762 1.121-1.757 3.123-2.426 4.906l-1.446 4.144-1.107 3.196c-.106.039-.397-.909-1.007-3.262-.948-3.686-1.353-4.953-2.321-7.26-.663-1.571-1.538-2.831-3.315-4.76-.974-1.068-2.36-2.089-3.195-2.367-.544-.186-.59-.093-.179.365C3.143 3.441 4.263 5.059 5.45 7.359c1.001 1.956 1.69 3.898 2.943 8.354l1.247 5.171.603 2.672a.39.39 0 0 0 .226.166 6.76 6.76 0 0 0 1.544 0c.345-.1.411-.372.889-3.501a36.28 36.28 0 0 1 1.133-5.271c.922-3.222 1.903-5.582 2.5-5.967.086-.053.51-.159.955-.232 1.723-.285 3.109-1.047 4.09-2.26.656-.809.829-1.406.995-3.395.086-1.054.139-1.352.338-1.982.126-.411.212-.783.199-.829-.047-.119-.153-.106-1.234.179z" />
  </svg>
);

export const BioSvg = () => (
  <svg viewBox="0 0 24 24">
    <path d="M24 0v24H0V0h24zM11.425 22.193l.014-13.389c-.028-1.616-2.024-2.013-4.273.129-1.105 1.053-2.583 2.323-4.361 5.853S.89 22.111.89 22.111l1.806-.027c.023-1.205.17-2.356.52-3.421H9.51l.055 3.53h1.86zm1.396-14.815l.055 14.815h4.022c1.834 0 4.31-.848 4.296-4.132-.011-2.736-2.469-3.739-2.853-3.739s1.567-.196 1.567-3.261-3.058-3.656-5.172-3.656c-1.395 0-1.915-.027-1.915-.027zm1.915 8.138s.69-.064 1.729-.064 2.923.694 2.923 2.445-1.204 2.572-2.38 2.572l-2.272.028v-4.981zM3.928 16.802l5.664.028V9.277c-2.659 2.331-4.828 4.774-5.664 7.525zm10.817-7.659h1.068c.848 0 2.33.387 2.371 2.23.047 2.085-1.44 2.542-2.165 2.542s-1.255-.013-1.255-.013l-.019-4.759zm.758-8.102s-1.033 1.81-.247 3.887c.75 1.982 3.041 2.976 5.148 2.439s2.761-2.742 2.761-2.742-1.09-.181-2.601.215c-1.149.301-2.38 1.756-2.38 1.756s.411-1.834-.383-3.284-2.298-2.271-2.298-2.271z" />
  </svg>
);

export const AocSvg = () => (
  <svg viewBox="0 0 24 24">
    <path d="m1.047 16.38c0.104-0.434 3.642-13.296 3.77-13.772 0.128-0.475 0.968-0.607 1.123-0.122 0.155 0.484 2.027 7.841 2.027 7.841s0.053-1.125 0.773-1.863c1.005-1.03 3.505-1.165 4.545-0.028 1.113 1.217 0.722 2.933 0.722 2.933s1.298-1.428 2.681-2.098c1.384-0.669 3.367-0.804 4.352-0.59s1.776 0.42 2.118 0.32c0.343-0.1 0.457-0.428 0.457-0.428l0.385 0.025-0.716 3.846-0.318-0.043s-0.101-0.961-0.46-1.74c-0.692-1.507-3.839-2.377-6.256 0.443-2.255 2.63-2.224 5.502-2.033 6.984 0.351 2.725 3.191 3.676 5.797 2.167 1.358-0.787 1.959-1.604 1.959-1.604l0.309 0.282s-2.033 3.096-5.747 2.875c-3.655-0.218-4.572-3.339-4.618-5.086-0.044-1.674 0.643-3.048 0.643-3.048s-0.8 0.371-2.174 0.24c-1.204-0.114-1.717-0.783-1.717-0.783s0.607 2.371 0.739 2.84c0.282 0.999-1.019 1.526-1.368 0.449-0.382-1.178-0.619-2.225-0.841-3.015-0.22-0.779-0.722-0.869-1.257-0.861-0.579 9e-3 -1.093-3e-3 -1.712-4e-3 -0.578 0-1.036 0.353-1.244 0.902-0.199 0.524-1.178 2.811-1.301 3.111-0.263 0.636-0.79 0.466-0.638-0.173zm-0.59 2.042-0.457 1.645s1.143-0.857 2.51-0.713c2.027 0.215 2.691 2.085 5.547 2.26 1.42 0.087 2.565-0.644 2.565-0.644l-0.312-1.306s-1.157 0.64-2.115 0.571c-2.54-0.183-3.048-2.128-5.593-2.233-1.438-0.059-2.145 0.42-2.145 0.42zm9.343-7.528c0.049 1.311 0.286 2.125 1.175 2.14 1.002 0.017 1.243-0.858 1.249-2.207 9e-3 -1.793-0.466-2.293-1.228-2.296-0.757-3e-3 -1.258 0.7-1.196 2.363zm-4.464-6.07s-1.306 5.696-1.408 6.069c-0.103 0.373 0.165 0.852 0.435 0.852 0.271 0 1.362-4e-3 1.705 0 0.344 4e-3 0.635-0.276 0.527-0.824-0.092-0.466-1.259-6.097-1.259-6.097z"/>
  </svg>
)

export const VegIcon = () => <div className="icon veg"><VegSvg /></div>;
export const VgnIcon = () => <div className="icon vgn"><VegSvg /><b>vegan</b></div>;
export const BioIcon = () => <div className="icon bio"><BioSvg /></div>;
export const AocIcon = () => <div className="icon aoc"><AocSvg /></div>;
export const AopIcon = () => <div className="icon aop">AOP</div>;

renderAdd('product', ({ b, a }) => (
  <div {...a}>
    <div className="row">
      <RenderContent t="h4" b={b} p="title" />
      <RenderContent a={{ className: 'info' }} b={b} p="info" />
      {b.n.vgn && <VgnIcon />}
      {b.n.veg && <VegIcon />}
      {b.n.bio && <BioIcon />}
      {b.n.aoc && <AocIcon />}
      {b.n.aop && <AopIcon />}
      <div className="flex"></div>
      <RenderContent a={{ className: 'info2' }} b={b} p="info2" />
      <RenderPrice b={b} p="price" />
      <RenderPrice b={b} p="price2" />
      <RenderPrice b={b} p="price3" />
    </div>
    <RenderContent a={{ className: 'desc' }} b={b} p="desc" />
    {renderChildren(b)}
  </div>
));

renderAdd('carousel', ({ b, a }) => {
  // console.debug('carousel render');
  const [count, setCount] = useState(0);
  const childIds = b.n.childIds || [];
  const length = childIds.length;

  useInterval(() => setCount((count) => count + 1), (b.n.duration || 10000) / length);

  if (count % length === 0) renderActions(b, 'onStart', b.n.onStart);
  if (count % length === length - 1) renderActions(b, 'onEnd', b.n.onEnd);

  const children = childIds.map((id, index) => {
    const classes: NClasses = {};
    if (index === (count - 1) % length) classes.last = 1;
    if (index === (count + 1) % length) classes.next = 1;
    if (index === count % length) classes.curr = 1;
    return <RenderFactory key={id} id={id} classes={classes} />;
  });

  return <div {...a}>{children}</div>;
});

renderAdd('lang', ({ b, a }) => {
  const curr = useMessager(lang$);
  const lang = b.n.lang || 'fr';
  return (
    <div
      {...a}
      className={curr === lang ? a.className + ' lang-active' : a.className}
      style={{
        backgroundImage: `url(https://${app.host}/files/flags/${lang}.svg?t)`,
        ...a.style,
      }}
      onClick={(e) => {
        setLang(lang);
        if (a.onClick) a.onClick(e);
      }}
    >
      {renderChildren(b)}
    </div>
  );
});