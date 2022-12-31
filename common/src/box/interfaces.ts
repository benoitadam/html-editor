export type NImage = {
  source?: string;
  name?: string;
  size?: [number, number];
  mode?: string;
  type?: string;
  url?: string;
};

export type NVideo = {
  source?: string;
  items: { t?: string, w?: number, h?: number, k?: string }[]
};

export type NTranslate = Record<string, Partial<Node>>;

export interface NProp {
  name?: string;
  type?: string;
  label?: string; // label
  values?: string[]; // select values
  canCustom?: boolean; // label
  isAdvanced?: boolean; // label
}

export type NId = string;
export type NLanguage = string; // fr, en...
export type NColor = number|string; // #FFFFFF | 1 => theme.colors[1]
export type NUnit = number|string; // if the value is between [0, 1], it's converted to a percentage; 0.5 = "50%"; 1 = 1px
export type NNumber = number;
export type NFileId = string;

export type NDisplay = 'inline' | 'block' | 'flex' | 'inline-flex' | 'none';
export type NOverflow = 'hidden' | 'auto';
export type NTextOverflow = 'clip' | 'ellipsis';
export type NVisibility = 'visible' | 'hidden';
export type NWhiteSpace = 'nowrap' | 'normal';
export type NPosition = 'absolute' | 'fixed' | 'relative';
export type NFlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type NFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type NJustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
export type NAlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
export type NAlignContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
export type NAlignSelf = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
export type NFontStyle = 'normal'|'italic'|'oblique';
export type NFontWeight = number|'light'|'regular'|'medium'|'bold';
export type NTextAlign = 'left'|'center'|'right';
export type NTextTransform = 'capitalize'|'lowercase'|'uppercase';
export type NLineHeight = number|'normal';
export type NBgPos = 'center'|'right'|'left'|'top'|'bottom';
export type NBgPosX = 'right'|'left'|'center';
export type NBgPosY = 'top'|'center'|'bottom';
export type NBgRepeat = 'no-repeat'|'repeat'|'repeat-x'|'repeat-y';
export type NBgSize = 'auto'|'contain'|'cover';
export type NAnim = 'none'|'slide'|'fade'|'zoom';
export type NAction = Readonly<{ to?: NId; changes?: N; fun?: string; args?: any[]; }>;
export type NTr = Readonly<Record<NLanguage, Partial<NFull>>>;
export type NContent = string;
export type NIcon = string;
export type NPrice = number;
export type NClasses = Record<string, 1>;

export interface NFull {
  // ID
  id: NId;

  // Base
  label: string; // label in editor
  t: string; // "div", "span", htmlTag, templateId
  cls: string; // class
  style: string|Record<string, string>; // style
  attrs: Record<string, string>; // attributes

  // Page
  page: string; // display page with url
  pageTitle: string;
  siteTitle: string;
  homePage: string;

  // Borders
  b: NUnit;
  bt: NUnit;
  br: NUnit;
  bb: NUnit;
  bl: NUnit;
  bc: NColor;
  btc: NColor;
  brc: NColor;
  bbc: NColor;
  blc: NColor;

  // Display
  display: NDisplay;
  overflow: NOverflow;
  textOverflow: NTextOverflow;
  visibility: NVisibility;
  whiteSpace: NWhiteSpace;
  zIndex: NNumber;
  position: NPosition;

  // Flexbox : https://mui.com/system/flexbox/ ; https://the-echoplex.net/flexyboxes/
  flexDirection: NFlexDirection;
  flexWrap: NFlexWrap;
  justifyContent: NJustifyContent;
  alignItems: NAlignItems;
  alignContent: NAlignContent;
  order: NNumber;
  flex: NNumber;
  flexShrink: NNumber;
  flexBasis: NNumber;
  alignSelf: NAlignSelf;

  // Shadows
  shadow: string; // "1" => shadowMap[val] || val

  // Sizing : 
  w: NUnit;
  h: NUnit;
  wMin: NUnit;
  hMin: NUnit;
  wMax: NUnit;
  hMax: NUnit;

  // Spacing
  x: NUnit; // left
  y: NUnit; // top
  m: NUnit; // margin
  p: NUnit; // padding
  mt: NUnit; // marginTop
  mr: NUnit; // marginRight
  mb: NUnit; // marginBottom
  ml: NUnit; // marginLeft
  pt: NUnit; // paddingTop
  pr: NUnit; // paddingRight
  pb: NUnit; // paddingBottom
  pl: NUnit; // paddingLeft

  // Typography
  color: NColor;
  fontImport: string|string[];
  fontTitleFamily: string;
  fontFamily: string;
  fontSize: NUnit;
  fontStyle: NFontStyle;
  fontWeight: NFontWeight;
  textAlign: NTextAlign;
  textTransform: NTextTransform;
  letterSpacing: NNumber;
  lineHeight: NLineHeight;

  // Background Image
  bgImg: NFileId;
  bgPos: NBgPos;
  bgPosX: NBgPosX;
  bgPosY: NBgPosY;
  bgRepeat: 'no-repeat'|'repeat'|'repeat-x'|'repeat-y';
  bgSize: 'auto'|'contain'|'cover';
  bgColor: NColor;

  // Events
  duration: NNumber;
  onClick: NAction[];
  onStart: NAction[];
  onEnd: NAction[];

  // Translate
  tr: NTr;

  // Root
  css: string;

  // Image or Video
  alt: string;
  img: NFileId;

  // Video
  video: NFileId;
  vp8HD: NFileId;
  vp8SD: NFileId;
  mp4HD: NFileId;
  mp4SD: NFileId;

  // Carousel
  anim: NAnim;

  // Template
  template: string;
  props: NProp[];
  icon: NIcon;

  // Content
  ctn: NContent;

  // Product & Header
  title: NContent,
  info: NContent,
  info2: NContent,
  desc: NContent,
  price: NPrice,
  price2: NPrice,
  price3: NPrice,
  tPrice: NContent,
  tPrice2: NContent,
  tPrice3: NContent,
  cl: NNumber;
  
  out: boolean,
  del: boolean,
  vgn: boolean,
  veg: boolean,
  bio: boolean,
  aoc: boolean,
  aop: boolean,

  lang: string;
}

export interface NAliasFull {
  // Base
  tag: string; // t
  type: string; // t
  class: string; // cls

  // Borders
  border: NUnit; // b
  borderWidth: NUnit; // b
  borderTop: NUnit; // bt
  borderRight: NUnit; // br
  borderBottom: NUnit; // bb
  borderLeft: NUnit; // bl
  borderColor: NColor; // bc
  borderTopColor: NColor; // btc
  borderRightColor: NColor; // brc
  borderBottomColor: NColor; // bbc
  borderLeftColor: NColor; // blc

  // Display
  component: string; // t
  hidden: boolean; // visibility = "hidden"

  // Flexbox
  flexGrow: number; // flex

  // Color

  // Shadows
  boxShadow: string; // shadow

  // Sizing
  width: NUnit; // -> w
  height: NUnit; // -> h
  minHeight: NUnit; // -> hMin
  maxHeight: NUnit; // -> hMax
  minWidth: NUnit; // -> wMin
  maxWidth: NUnit; // -> wMax

  // Spacing
  left: NUnit; // x
  top: NUnit; // y
  margin: NUnit; // m
  padding: NUnit; // p
  mx: NUnit; // -> ml, mr
  my: NUnit; // -> mt, mb
  px: NUnit; // -> pl, pr
  py: NUnit; // -> pt, pb
  marginTop: NUnit; // -> mt
  marginRight: NUnit; // -> mr
  marginBottom: NUnit; // -> mb
  marginLeft: NUnit; // -> ml
  paddingTop: NUnit; // -> pt
  paddingRight: NUnit; // -> pr
  paddingBottom: NUnit; // -> pb
  paddingLeft: NUnit; // -> pl

  // Typography

  // Background Image
  backgroundPosition: NBgPos; // bgPos
  backgroundPositionX: NBgPosX; // bgX
  backgroundPositionY: NBgPosY; // bgY
  backgroundRepeat: NBgRepeat; // bgRepeat
  backgroundSize: NBgSize; // bgSize

  // Events

  // State

  // Translate
  translates: Record<NLanguage, N>; // t

  // Root

  // Template

  // Image

  // Video Player

  // Carousel
}

export interface NAlias extends Partial<NAliasFull> {}

export interface N extends Partial<NFull> {
  id: NId;
  pId?: NId;
  childIds?: NId[];
}

export interface ND extends Partial<NFull & NAliasFull> {
  children?: ND[];
};

export interface NItem extends Omit<Omit<Partial<NFull & NAliasFull>, 'id'>, 'pId'> {};

export interface WB {
  id: NId;
  n: Readonly<N>;
  a: Record<string, any>;
  s: Partial<CSSStyleDeclaration>;
  c: NClasses;
  r?: number;
  u: number;
  t: Record<string, any>;
}

export interface B extends Readonly<WB> {}

export type NMap = Record<string, N>;
export type NDMap = Record<string, ND>;