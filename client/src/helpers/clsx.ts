export default function clsx(...classes: (string | false | undefined)[]) {
  return classes.filter((n) => n && typeof n === 'string').join(' ');
}
