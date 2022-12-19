import { NFull } from 'common/box';
import { dicoMap } from 'common/helpers/dico';
import { toStr } from 'common/helpers/to';
import { renderMap } from '~src/render';

export type FieldType = 'id' | 'bool' | 'str' | 'arr' | 'obj' | 'unit' | 'color' | 'nbr' | 'file' | 'img' | 'event' | 'ctn';
export interface FieldInfo {
  prop: string;
  label: string;
  type: FieldType;
  values?: string[];
  tooltip?: string;
  parse: (v?: string) => any;
  stringify: (v?: any) => string;
}

const parseMap: Record<string, (v?: string) => any> = {
  default: (v) => toStr(v, ''),
  obj: (v) => JSON.parse(v||''),
  arr: (v) => JSON.parse(v||''),
  event: (v) => JSON.parse(v||''),
}

const stringifyMap: Record<string, (v?: any) => string> = {
  default: (v) => toStr(v, ''),
  obj: (v) => JSON.stringify(v, null, 2),
  arr: (v) => JSON.stringify(v, null, 2),
  event: (v) => JSON.stringify(v, null, 2),
}

const p = (label: string, type: FieldType, values?: string[]) => {
  return (prop: string) => ({
    prop,
    label,
    type,
    values,
    parse: parseMap[type] || parseMap.default,
    stringify: stringifyMap[type] || stringifyMap.default,
  });
};

const map: Record<keyof NFull, (prop: string) => FieldInfo> = {
  id: p('ID', 'id'),
  // pId: p('ID Parent', 'str'),
  // childIds: p('ID enfants', 'arr'),
  label: p('Étiquette', 'str'),
  t: p('Type', 'str', Object.keys(renderMap)),
  cls: p('Class', 'str'),
  style: p('Style', 'obj'),
  attrs: p('Attributs', 'obj'),
  b: p('Bordure', 'unit'),
  bt: p('B. Haut', 'unit'),
  br: p('B. Droite', 'unit'),
  bb: p('B. Bas', 'unit'),
  bl: p('B. Gauche', 'unit'),
  bc: p('Couleur', 'color'),
  btc: p('C. Haut', 'color'),
  brc: p('C. Droite', 'color'),
  bbc: p('C. Bas', 'color'),
  blc: p('C. Gauche', 'color'),
  display: p('Affichage', 'str', ['inline', 'block', 'flex', 'inline-flex', 'none']),
  overflow: p('Débordement', 'str', ['hidden', 'auto']),
  textOverflow: p('Texte débordement', 'str', ['clip', 'ellipsis']),
  visibility: p('Visibilité', 'str', ['visible', 'hidden']),
  whiteSpace: p('Espace Blanc', 'str', ['nowrap', 'normal']),
  zIndex: p('Profondeur', 'unit'),
  position: p('Position', 'str', ['absolute', 'fixed', 'relative']),
  flexDirection: p('Direction', 'str', ['row', 'row-reverse', 'column', 'column-reverse']),
  flexWrap: p('Enveloppe', 'str', ['nowrap', 'wrap', 'wrap-reverse']),
  justifyContent: p('Justifier', 'str', ['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  alignItems: p('Aligner', 'str', ['flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
  alignContent: p('Contenu', 'str', ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch']),
  order: p('Ordre', 'nbr'),
  flex: p('Taille', 'nbr'),
  flexShrink: p('Rétrécir', 'nbr'),
  flexBasis: p('Base', 'nbr'),
  alignSelf: p('Aligner', 'str', ['flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
  color: p('Couleur', 'color'),
  bgColor: p('Couleur de l’arrière-plan', 'color'),
  shadow: p('Ombre', 'str'),
  w: p('Largeur', 'unit'),
  h: p('Hauteur', 'unit'),
  wMin: p('Largeur min', 'unit'),
  hMin: p('Hauteur min', 'unit'),
  wMax: p('Largeur max', 'unit'),
  hMax: p('Hauteur max', 'unit'),
  x: p('X', 'unit'),
  y: p('Y', 'unit'),
  m: p('Marge', 'unit'),
  p: p('Padding', 'unit'),
  mt: p('M. Haut', 'unit'),
  mr: p('M. Droite', 'unit'),
  mb: p('M. Bas', 'unit'),
  ml: p('M. Gauche', 'unit'),
  pt: p('P. Haut', 'unit'),
  pr: p('P. Droite', 'unit'),
  pb: p('P. Bas', 'unit'),
  pl: p('P. Gauche', 'unit'),
  fontImport: p('Importation', 'str'),
  fontTitleFamily: p('Police des titres', 'str'),
  fontFamily: p('Famille', 'str'),
  fontSize: p('Taille', 'str'),
  fontStyle: p('Style', 'str', ['normal', 'italic', 'oblique']),
  fontWeight: p('Poids', 'nbr', ['light', 'regular', 'medium', 'bold']),
  textAlign: p('Aligner', 'str', ['left', 'center', 'right']),
  textTransform: p('Transformation', 'str', ['capitalize', 'lowercase', 'uppercase']),
  letterSpacing: p('Espacement', 'nbr'),
  lineHeight: p('Hauteur de ligne', 'str', ['normal']),
  bgImg: p('Image de fond', 'img'),
  bgPos: p('Position', 'str', ['center center', 'right center', 'left center', 'center top', 'center bottom']),
  bgPosX: p('Position x', 'str', ['center', 'right', 'left']),
  bgPosY: p('Position y', 'str', ['center', 'top', 'bottom']),
  bgRepeat: p('Répéter', 'str', ['no-repeat', 'repeat', 'repeat-x', 'repeat-y']),
  bgSize: p('Taille', 'str', ['auto', 'contain', 'cover']),
  duration: p('Durée', 'nbr'),
  onClick: p('Au clic', 'event'),
  onStart: p('Au démarrage', 'event'),
  onEnd: p('À la fin', 'event'),
  css: p('CSS', 'str'),
  props: p('Propriétés', 'obj'),
  icon: p('Icône', 'str'),
  alt: p('Titre', 'str'),
  img: p('Image', 'img'),
  video: p('Vidéo', 'file'),
  vp8HD: p('Vp8HD', 'file'),
  vp8SD: p('Vp8SD', 'file'),
  mp4HD: p('Mp4HD', 'file'),
  mp4SD: p('Mp4SD', 'file'),
  anim: p('Animation', 'str', ['none', 'slide', 'fade', 'zoom']),
  page: p('Page', 'str'),
  pageTitle: p('Titre de la Page', 'str'),
  siteTitle: p('Titre du site', 'str'),
  homePage: p('Page d’accueil', 'str'),
  template: p('Modèle', 'str'),

  ctn: p('Contenu', 'ctn'),
  title: p('Titre', 'ctn'),
  info: p('Info Gauche', 'ctn'),
  info2: p('Info Droite', 'ctn'),
  price: p('Prix', 'nbr'),
  price2: p('Prix2', 'nbr'),
  price3: p('Prix3', 'nbr'),
  desc: p('Description', 'ctn'),

  out: p('Épuisé', 'bool'),
  del: p('Cacher', 'bool'),
  
  vgn: p('Vegan', 'bool'),
  veg: p('Végé', 'bool'),
  bio: p('BIO', 'bool'),
  aoc: p('AOC', 'bool'),
  aop: p('AOP', 'bool'),

  lang: p('Langue (ISO)', 'str'),
  tr: p('Traduction', 'obj'),
};

const fieldMap = dicoMap(map, (p, k) => p(k)) as Record<string, FieldInfo>;

fieldMap.out.tooltip = 'Rupture de stock';
fieldMap.del.tooltip = 'Cacher le produit';
fieldMap.vgn.tooltip = 'Aucun produit animal : viande, poisson, œuf, lait, fromage et miel';
fieldMap.veg.tooltip = 'Aucune chair d’origine animale : viande et poisson';
fieldMap.bio.tooltip = 'Produit BIO qui exclut l’usage des produits chimiques, OGM, insecticides…';
fieldMap.aoc.tooltip = 'Produit d’Appellation d’Origine Contrôlée';
fieldMap.aop.tooltip = 'Produit d’Appellation d’Origine Protégée';

export default fieldMap;
