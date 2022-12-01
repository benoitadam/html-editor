import Link, { LinkProps } from '@mui/material/Link';
import { routerPush } from '~src/helpers/router';

export default function HistoryLink(props: LinkProps & { to: string }) {
  if (props.to !== undefined) {
    return (
      <Link
        {...props}
        href={props.to}
        onClick={(e) => {
          e.preventDefault();
          routerPush(props.to);
        }}
      />
    );
  }
  return <Link {...props} />;
}
