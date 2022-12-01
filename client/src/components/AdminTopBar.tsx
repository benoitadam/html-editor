import AccountCircle from '@mui/icons-material/AccountCircle';
import app from '~src/app';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { authSignOut } from '~src/api/auth';
import session$ from '~src/messagers/session$';
import Toolbar from '@mui/material/Toolbar';
import useMessager from '~src/hooks/useMessager';

export default () => {
  const session = useMessager(session$);
  return (
    <Toolbar className="AdminTopBar" variant="dense" sx={{ background: '#333', color: '#FFF', fontSize: '1em' }}>
      <Box component="h1" sx={{ p:0, mx: '2rem', fontSize: '1em' }}>Administration</Box>
      <Box sx={{ fontSize: '0.7em', opacity: 0.5 }}>(v{app.version})</Box>
      <Box sx={{ flex: 1 }} />
      {session.isAuth && (
        <>
          <Box>{session.user.email}</Box>
          <Button startIcon={<AccountCircle />} onClick={() => authSignOut()}>
            Se déconnecter
          </Button>
        </>
      )}
    </Toolbar>
  );
}
