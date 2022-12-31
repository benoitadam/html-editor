import { dicoMap } from "../helpers/dico";
import { N, WB, NAliasFull, NFull, ND } from "./interfaces";

export type PropType = 'id' | 'bool' | 'nbr' | 'str' | 'ctn' | 'obj' | 'unit' | 'color' | 'file' | 'event' | 'arr';
export type PropClean = (value: any) => any;
export type PropApply = (b: WB, value: any) => void;
export type Prop = { type: PropType, clean: PropClean, apply?: PropApply };

const unit = (v: any): string | undefined => v === null || v === undefined || v === '' ? undefined : typeof v === 'number' ? `${v}px` : String(v);

const bool = (v: any): boolean | undefined => v === null || v === undefined ? undefined : Boolean(v);

const str = (v: any): string | undefined => v === null || v === undefined || v === '' ? undefined : String(v);

const obj = <T = any>(v: any): T | undefined => Array.isArray(v) || Object.keys(v||{}).length === 0 ? undefined : v;

const arr = <T = any>(v: any): T[] | undefined => Array.isArray(v) && v.length > 0 ? v : undefined;

const nbr = (v: any): number | undefined => {
    const nbr = Number(
        typeof v === "string"
            ? v.replace(/[^0-9,._]/g, "").replace(/,/g, ".")
            : v
    );
    return Number.isNaN(nbr) ? undefined : nbr;
}

const id = str;
const ctn = str;
const color = str;
const file = str;
const event = arr;

const cleanMap: Record<PropType, PropClean> = { id, bool, nbr, str, ctn, obj, arr, unit, color, file, event };

const p = (type: PropType, apply?: PropApply): Prop => ({ type, clean: cleanMap[type], apply });

const aliasMap: Record<keyof NAliasFull, (v: any, n: N) => any> = {
    tag: (v, n) => n.t = v,
    component: (v, n) => n.t = v,
    type: (v, n) => n.t = v,
    class: (v, n) => n.cls = v,
    border: (v, n) => n.b = v,
    borderWidth: (v, n) => n.b = v,
    borderTop: (v, n) => n.bt = v,
    borderRight: (v, n) => n.br = v,
    borderBottom: (v, n) => n.bb = v,
    borderLeft: (v, n) => n.bl = v,
    borderColor: (v, n) => n.bc = v,
    borderTopColor: (v, n) => n.btc = v,
    borderRightColor: (v, n) => n.brc = v,
    borderBottomColor: (v, n) => n.bbc = v,
    borderLeftColor: (v, n) => n.blc = v,
    hidden: (v, n) => n.visibility = v ? "hidden" : "visible",
    flexGrow: (v, n) => n.flex = v,
    boxShadow: (v, n) => n.shadow = v,
    width: (v, n) => n.w = v,
    height: (v, n) => n.h = v,
    minHeight: (v, n) => n.hMin = v,
    maxHeight: (v, n) => n.hMax = v,
    minWidth: (v, n) => n.wMin = v,
    maxWidth: (v, n) => n.wMax = v,
    left: (v, n) => n.x = v,
    top: (v, n) => n.y = v,
    margin: (v, n) => n.m = v,
    padding: (v, n) => n.p = v,
    mx: (v, n) => n.ml = n.mr = v,
    my: (v, n) => n.mt = n.mb = v,
    px: (v, n) => n.pl = n.pr = v,
    py: (v, n) => n.pt = n.pb = v,
    marginTop: (v, n) => n.mt = v,
    marginRight: (v, n) => n.mr = v,
    marginBottom: (v, n) => n.mb = v,
    marginLeft: (v, n) => n.ml = v,
    paddingTop: (v, n) => n.pt = v,
    paddingRight: (v, n) => n.pr = v,
    paddingBottom: (v, n) => n.pb = v,
    paddingLeft: (v, n) => n.pl = v,
    translates: (v, n) => n.tr = v,
    backgroundPosition: (v, n) => n.bgPos = v,
    backgroundPositionX: (v, n) => n.bgPosX = v,
    backgroundPositionY: (v, n) => n.bgPosY = v,
    backgroundRepeat: (v, n) => n.bgRepeat = v,
    backgroundSize: (v, n) => n.bgSize = v,
}

export const propHelpers = {
    setTitle: (font: string) => {},
    fontImport: (font: string|string[]) => {},
    addCss: (id: string, css: string) => {},
}

export const propLangMap: Record<string, boolean> = {};

let homePage = 'home';
export let getHomePage = () => homePage;

const map: Record<keyof NFull, Prop> = {
    id: p('id'),
    label: p('str'),
    t: p('str'),
    cls: p('str', (b, v) => String(v).split(' ').forEach(p => b.c[p] = 1)),
    style: p('obj', (b, v) => Object.apply(b.s, v)),
    attrs: p('obj', (b, v) => Object.apply(b.a, v)),
    b: p('str', (b, v) => b.s.border = v),
    bt: p('str', (b, v) => b.s.borderTop = v),
    br: p('str', (b, v) => b.s.borderRight = v),
    bb: p('str', (b, v) => b.s.borderBottom = v),
    bl: p('str', (b, v) => b.s.borderLeft = v),
    bc: p('color', (b, v) => b.s.borderColor = v),
    btc: p('color', (b, v) => b.s.borderTopColor = v),
    brc: p('color', (b, v) => b.s.borderRightColor = v),
    bbc: p('color', (b, v) => b.s.borderBottomColor = v),
    blc: p('color', (b, v) => b.s.borderLeftColor = v),
    display: p('str', (b, v) => b.s.display = v),
    overflow: p('str', (b, v) => b.s.overflow = v),
    textOverflow: p('str', (b, v) => b.s.textOverflow = v),
    visibility: p('str', (b, v) => b.s.visibility = v),
    whiteSpace: p('str', (b, v) => b.s.whiteSpace = v),
    zIndex: p('nbr', (b, v) => b.s.zIndex = v),
    position: p('str', (b, v) => b.s.position = v),
    flexDirection: p('str', (b, v) => b.s.flexDirection = v),
    flexWrap: p('str', (b, v) => b.s.flexWrap = v),
    justifyContent: p('str', (b, v) => b.s.justifyContent = v),
    alignItems: p('str', (b, v) => b.s.alignItems = v),
    alignContent: p('str', (b, v) => b.s.alignContent = v),
    order: p('nbr', (b, v) => b.s.order = v),
    flex: p('nbr', (b, v) => b.s.flex = v),
    flexShrink: p('nbr', (b, v) => b.s.flexShrink = v),
    flexBasis: p('nbr', (b, v) => b.s.flexBasis = v),
    alignSelf: p('str', (b, v) => b.s.alignSelf = v),
    color: p('color', (b, v) => b.s.color = v),
    bgColor: p('color', (b, v) => b.s.backgroundColor = v),
    shadow: p('str', (b, v) => b.s.boxShadow = v),
    w: p('unit', (b, v) => b.s.width = v),
    h: p('unit', (b, v) => b.s.height = v),
    wMin: p('unit', (b, v) => b.s.minWidth = v),
    hMin: p('unit', (b, v) => b.s.minHeight = v),
    wMax: p('unit', (b, v) => b.s.maxWidth = v),
    hMax: p('unit', (b, v) => b.s.maxHeight = v),
    x: p('unit', (b, v) => b.s.left = v),
    y: p('unit', (b, v) => b.s.top = v),
    m: p('unit', (b, v) => b.s.margin = v),
    p: p('unit', (b, v) => b.s.padding = v),
    mt: p('unit', (b, v) => b.s.marginTop = v),
    mr: p('unit', (b, v) => b.s.marginRight = v),
    mb: p('unit', (b, v) => b.s.marginBottom = v),
    ml: p('unit', (b, v) => b.s.marginLeft = v),
    pt: p('unit', (b, v) => b.s.paddingTop = v),
    pr: p('unit', (b, v) => b.s.paddingRight = v),
    pb: p('unit', (b, v) => b.s.paddingBottom = v),
    pl: p('unit', (b, v) => b.s.paddingLeft = v),
    fontImport: p('str', (_, v) => propHelpers.fontImport(v)),
    fontTitleFamily: p('str', (b, v) => propHelpers.addCss(`font-title-${b.id}`, `h1, h2, h3, h4, h5 { font-family:${v} }`)),
    fontFamily: p('str', (b, v) => b.s.fontFamily = v),
    fontSize: p('str', (b, v) => b.s.fontSize = v),
    fontStyle: p('str', (b, v) => b.s.fontStyle = v),
    fontWeight: p('str', (b, v) => b.s.fontWeight = v),
    textAlign: p('str', (b, v) => b.s.textAlign = v),
    textTransform: p('str', (b, v) => b.s.textTransform = v),
    letterSpacing: p('nbr', (b, v) => b.s.letterSpacing = v),
    lineHeight: p('str', (b, v) => b.s.lineHeight = v),
    bgImg: p('file', (b, v) => b.s.backgroundImage = `url('${v}')`),
    bgPos: p('str', (b, v) => b.s.backgroundPosition = v),
    bgPosX: p('str', (b, v) => b.s.backgroundPositionX = v),
    bgPosY: p('str', (b, v) => b.s.backgroundPositionY = v),
    bgRepeat: p('str', (b, v) => b.s.backgroundRepeat = v),
    bgSize: p('str', (b, v) => b.s.backgroundSize = v),
    duration: p('nbr'),
    onClick: p('event', (b, v) => v && (b.c.btn = 1)),
    onStart: p('event'),
    onEnd: p('event'),
    css: p('str', (b, v) => propHelpers.addCss(b.id, v)),
    ctn: p('ctn', (b, v) => b.t.ctn = v),
    props: p('obj'),
    icon: p('str'),
    alt: p('str'),
    img: p('file', (b, v) => b.a.src = v),
    video: p('file'),
    vp8HD: p('file'),
    vp8SD: p('file'),
    mp4HD: p('file'),
    mp4SD: p('file'),
    anim: p('str', (b, v) => b.c['anim-' + v] = 1),
    page: p('str'),
    pageTitle: p('str'),
    siteTitle: p('str', (_, v) => propHelpers.setTitle(v)),
    homePage: p('str', (_, v) => homePage = v),
    template: p('str'),
    title: p('ctn', (b, v) => b.t.title = v),
    info: p('ctn', (b, v) => b.t.info = v),
    info2: p('ctn', (b, v) => b.t.info2 = v),
    price: p('nbr'),
    price2: p('nbr'),
    price3: p('nbr'),
    cl: p('nbr'),
    desc: p('ctn', (b, v) => b.t.desc = v),
    out: p('bool', (b, v) => v && (b.c.out = 1)),
    del: p('bool', (b, v) => v && (b.c.del = 1)),
    vgn: p('bool', (b, v) => v && (b.c.vgn = 1)),
    veg: p('bool', (b, v) => v && (b.c.veg = 1)),
    bio: p('bool', (b, v) => v && (b.c.bio = 1)),
    aoc: p('bool', (b, v) => v && (b.c.aoc = 1)),
    aop: p('bool', (b, v) => v && (b.c.aop = 1)),
    lang: p('str', (_, v) => propLangMap[v] = true),
    tr: p('obj'),
}

// [other: string]: p('var', (b, v) => b.vars[other] = v),

export const propAliasMap = aliasMap as Record<string, (v: any, n: ND) => any>;
export const propMap = map as Record<string, Prop>;
export const propTypeMap = dicoMap(map, v => v.type);
export const propCleanMap = dicoMap(map, v => v.clean);
export const propApplyMap = dicoMap(map, v => v.apply);