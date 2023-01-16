import { render } from 'react-dom';
import addFont from '~src/helpers/addFont';
import { setDefaultOptions } from 'date-fns';
import dateLocaleFr from 'date-fns/locale/fr';
import Box from '@mui/material/Box';
import { authRefresh } from '~src/api/auth';
import CssBaseline from '@mui/material/CssBaseline';
import AdminTopBar from '../components/AdminTopBar';
import AdminContent from '../components/AdminContent';
import app from '../app';
import router from '~src/helpers/router';

console.debug('admin loaded');

const initAdmin = async () => {
  console.debug('initAdmin');
  document.title = `Admin v${app.version}`;
  
  setDefaultOptions({ locale: dateLocaleFr });
  await addFont('Roboto');

  router.add('/admin', null);

  router.add('/admin/auth', null, { admin: 'auth' });

  router.add('/admin/site', null, { admin: 'site' });
  router.add('/admin/:siteKey', null, { admin: 'site' });
  router.add('/admin/:siteKey/:sitePage', null, { admin: 'site' });

  router.add('/admin/device', null, { admin: 'device' });
  router.add('/admin/device/:deviceId', null, { admin: 'device' });

  router.add('/admin/project', null, { admin: 'project' });
  router.add('/admin/project/:projectId', null, { admin: 'project' });

  router.forceRefresh();

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