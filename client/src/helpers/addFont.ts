import addCssFile from './addCssFile';

// export function addFontIcon(family: string) {
//   return addCssFile(`https://fonts.googleapis.com/icon?family=${family}`);
// }

export default function addFont(family: string) {
  return addCssFile(`https://fonts.googleapis.com/css2?family=${family}&display=swap`);
}
