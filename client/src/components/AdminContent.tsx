import Box from '@mui/material/Box';
import Auth from './Auth';
// import DeviceList from './DeviceList';
// import DeviceEdit from './DeviceEdit';
import useMessager from '~src/hooks/useMessager';
import PageEdit from './PageEdit';
import session$ from '~src/messagers/session$';
import useRouter from '~src/hooks/useRouter';
import { siteRepo } from 'common/models/gqlRepos';
import { importND } from 'common/box';
import isUuid from '~src/helpers/isUuid';

const CanNotEdit = () => (
    <Box color="danger">
      Votre compte n'a pas les droits d'édition
    </Box>
);

export default () => {
    const session = useMessager(session$);
    const route = useRouter();
    const params = route.params;
  
    console.debug('AdminContent', location, session, params);

    if (!session.isAuth || params.admin === 'auth') return <Auth />;
    if (!session.canEdit) return <CanNotEdit />;

    if (params.admin === 'device') {
      const deviceId = params.deviceId;
      if (deviceId) {
        // return <DeviceEdit deviceId={deviceId} />;
      }
      // return <DeviceList />;
    }

    if (params.admin === 'site') {
      const key = params.siteKey;
      if (key) {
        if (isUuid(key)) {
          siteRepo.get(key, ['id', 'key', 'title', 'items', 'updatedAt']).then(site => {
            adminSite$.next(site);
            importND(site?.items || {});
          });
        } else {
          siteRepo.find({ key }, ['id', 'key', 'title', 'items', 'updatedAt']).then(site => {
            importND(site?.items || {});
          });
        }
        return <PageEdit />
      }
      // return <SiteList />;
    }

    if (params.admin === 'project') {
      const projectId = params.projectId;
      if (projectId) {
        // return <ProjectEdit deviceId={deviceId} />;
      }
      // return <ProjectList />;
    }

    // return <Dashboard />;

    return <div>pas de site</div>
};