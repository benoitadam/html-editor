import Link, { LinkProps } from '@mui/material/Link';
import router from '~src/helpers/router';

export default function RouterLink(props: LinkProps & { to: string }) {
  if (props.to !== undefined) {
    return (
      <Link
        {...props}
        href={props.to}
        onClick={(e) => {
          e.preventDefault();
          router.push(props.to);
        }}
      />
    );
  }
  return <Link {...props} />;
}
