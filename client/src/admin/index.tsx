import { render } from 'preact';
import addFont from '~src/helpers/addFont';
import { setDefaultOptions } from 'date-fns';
import dateLocaleFr from 'date-fns/locale/fr';
import Box from '@mui/material/Box';
import { authRefresh } from '~src/api/auth';
import CssBaseline from '@mui/material/CssBaseline';
import AdminTopBar from '../components/AdminTopBar';
import AdminContent from '../components/AdminContent';
import app from '../app';
import { routerAdd, routerForceRefresh, RouterValue } from '~src/helpers/router';

console.debug('admin loaded');

const initAdmin = async () => {
  console.debug('initAdmin');
  document.title = `Admin v${app.version}`;
  
  setDefaultOptions({ locale: dateLocaleFr });
  await addFont('Roboto');

  routerAdd('admin', null);

  routerAdd('admin/auth', null, { admin: 'auth' });

  routerAdd('admin/site', null, { admin: 'site' });
  routerAdd('admin/:siteKey', null, { admin: 'site' });
  routerAdd('admin/:siteKey/:sitePage', null, { admin: 'site' });

  routerAdd('admin/device', null, { admin: 'device' });
  routerAdd('admin/device/:deviceId', null, { admin: 'device' });

  routerAdd('admin/project', null, { admin: 'project' });
  routerAdd('admin/project/:projectId', null, { admin: 'project' });

  routerForceRefresh();

  authRefresh();
  
  render(
    <>
      <CssBaseline />
      <Box
        id="admin"
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          position: 'absolute',
          left: 0,
          right: 0,
        }}
      >
        <AdminTopBar />
        <AdminContent />
        {/* <DeviceEdit /> */}
      </Box>
    </>,
    document.body,
  );
}

initAdmin();