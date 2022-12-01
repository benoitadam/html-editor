import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAdded from '@mui/icons-material/BookmarkAdded';
import RefreshIcon from '@mui/icons-material/Refresh';
import PreviewIcon from '@mui/icons-material/Preview';
// import TvIcon from '@mui/icons-material/Tv';
// import TvOffIcon from '@mui/icons-material/TvOff';
// import RestartAltIcon from '@mui/icons-material/RestartAlt';
// import CloseIcon from '@mui/icons-material/Close';
// import LockIcon from '@mui/icons-material/Lock';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
// import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AdminLink from './HistoryLink';
import { DeviceCommand, DeviceModel } from 'common/models/interfaces';
import { MINUTE } from 'common/helpers/time';
import { formatDistance } from 'date-fns/esm';
import { deviceRepo } from 'common/models/gqlRepos';
import { useMemo } from 'preact/hooks';
import deviceLike$ from '~src/components/deviceLike$';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Messager } from 'common/helpers/messager';
import useMessager from '~src/hooks/useMessager';

const DeviceHeader = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const DeviceScreen = styled('div')(({ theme }) => ({
  flex: 1,
  backgroundPositionX: 'center',
  backgroundPositionY: 'center',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  // backgroundColor: theme.palette.neutral[100],
}));

const DeviceFooter = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const DeviceStatus = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const DeviceCommandsContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  maxWidth: 180,
});

const CommandButton = ({
  id,
  role,
  icon,
  command,
  name,
  desc,
}: {
  id: string;
  role?: string;
  icon: any;
  command: DeviceCommand;
  name: string;
  desc: string;
}) => {
  const Icon = icon;
  if (role) return null;
  return (
    <IconButton sx={{ m: 0 }} onClick={() => deviceRepo.update(id, { command })}>
      <Icon />
    </IconButton>
  );
};

const EditLink = ({ id }: { id: string }) => {
  return (
    <AdminLink to={`/admin/${id}`} sx={{ mr: 0, px: 1, py: 0.5 }}>
      Éditer
    </AdminLink>
  );
};

const DeviceCommands = ({ id }: { id: string }) => {
  return (
    <DeviceCommandsContainer>
      {/* <CommandButton
        role="admin"
        icon={TvIcon}
        command={DeviceCommand.TurnScreenOn}
        name="Allumer"
        desc="Allumer l'écran"
      />
      <CommandButton
        role="admin"
        icon={TvOffIcon}
        command={DeviceCommand.TurnScreenOff}
        name="Éteindre"
        desc="Éteindre l'écran"
      />
      <CommandButton
        role="admin"
        icon={RestartAltIcon}
        command={DeviceCommand.Restart}
        name="Redémarrer"
        desc="Redémarrer l'application"
      />
      <CommandButton
        role="admin"
        icon={CloseIcon}
        command={DeviceCommand.Exit}
        name="Sortir"
        desc="Sortir de l'application"
      />
      <CommandButton
        role="admin"
        icon={CancelPresentationIcon}
        command={DeviceCommand.BringToBackground}
        name="Cacher"
        desc="Mettre le kiosk à l'arrière-plan"
      />
      <CommandButton
        role="admin"
        icon={PresentToAllIcon}
        command={DeviceCommand.BringToForeground}
        name="Afficher"
        desc="Mettre le kiosk au premier plan"
      />
      <CommandButton
        role="admin"
        icon={LockOpenIcon}
        command={DeviceCommand.UnlockKiosk}
        name="Déverrouiller"
        desc="Déverrouiller le kiosque"
      />
      <CommandButton
        role="admin"
        icon={LockIcon}
        command={DeviceCommand.LockKiosk}
        name="Verrouiller"
        desc="Verrouiller le kiosque"
      /> */}
      <CommandButton
        id={id}
        icon={RefreshIcon}
        command={DeviceCommand.Reload}
        name="Rafraîchir"
        desc="Rafraîchir la page"
      />
      <CommandButton
        id={id}
        icon={PowerSettingsNewIcon}
        command={DeviceCommand.Reboot}
        name="Reboot"
        desc="Redémarrer l'appareil"
      />
      <CommandButton
        id={id}
        icon={PreviewIcon}
        command={DeviceCommand.Screenshot}
        name="Capture"
        desc="Prendre une capture d'écran"
      />
    </DeviceCommandsContainer>
  );
};

type DeviceCardProps = { device: DeviceModel, like: boolean };
const DeviceCard = ({ device, like }: DeviceCardProps) => {
  const { id, info, lastSeen, project } = device;
  const lastSeenDiff = Date.now() - new Date(lastSeen || 0).getTime();
  // const isTooOld = lastSeenDiff > 100 * DAY;
  // if (isTooOld) return null;
  const isOnline = lastSeenDiff < 5 * MINUTE;
  const distance = formatDistance(new Date(lastSeen || 0), new Date());

  const name$ = useMemo(() => {
    const m = new Messager('');
    m.debounce(500).subscribe((name) => name && deviceRepo.update(id, { name }));
    return m;
  }, [id]);

  const name = useMessager(name$) || device.name;
  console.debug('DeviceCard', { id, name, device })

  return (
    <Card variant="outlined" sx={{ width: 300, height: 280, m: 0.5, p: 0.5 }}>
      <DeviceHeader>
        <Typography fontSize="md" sx={{ flex: 1 }}>
          <TextField
            name="name"
            placeholder="Nom"
            fullWidth
            value={name}
            onChange={(e) => name$.next(e.target.value || '')}
          />
          {/* <b>{name}</b> {info?.version && <i>({info?.version})</i>} */}
        </Typography>
        <IconButton sx={{ m: -0.5, mr: -1 }} onClick={() => deviceLike$.setItem(id, !deviceLike$.getItem(id, false))}>
          {like ? <BookmarkAdded /> : <BookmarkAdd />}
        </IconButton>
      </DeviceHeader>
      <DeviceScreen
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1527549993586-dff825b37782?crop=entropy&auto=format&fit=crop&w=3270')",
        }}
      />
      <DeviceFooter>
        {!isOnline ? (
          <DeviceStatus>
            <Box color="danger">Hors ligne</Box>
            <Box sx={{ pl: 0.5, fontSize: '0.8em' }}>
              ({distance})
            </Box>
          </DeviceStatus>
        ) : (
          <DeviceStatus>
            <Box color="success">En ligne</Box>
          </DeviceStatus>
        )}
        <DeviceCommands id={id} />
        <EditLink id={id} />
      </DeviceFooter>
    </Card>
  );
};

export default DeviceCard;
