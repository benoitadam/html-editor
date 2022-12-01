import Box from '@mui/material/Box';
import DeviceCard from './DeviceCard';
import devicesController from '../controllers/devicesController';
import session$ from '~src/messagers/session$';
import { useEffect } from 'preact/hooks';
import deviceLike$ from '~src/components/deviceLike$';
import useMessager from '~src/hooks/useMessager';

export default function AdminDevices() {
  const devices = useMessager(devicesController.deviceItems$);
  useMessager(deviceLike$);

  useEffect(() => {
    devicesController.refresh();
  }, [session$.value]);

  console.debug('AdminDevices', devices);
  return (
    <Box sx={{
      position: 'relative',
      p: 1,
      flex: 1,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      overflowY: 'scroll',
    }}>
      {devices.map((device) => (
        <DeviceCard key={device.id} device={device} like={deviceLike$.getItem(device.id, false)} />
      ))}
    </Box>
  );
}

// const qProjects = projectRepo.qAll(['id', 'name']);
// const qDevices = deviceRepo.qAll({
//   id: true,
//   name: true,
//   info: true,
//   lastSeen: true,
//   projectId: true,
// });
// console.debug('qDevices', qProjects, qDevices);

// export interface DeviceDataComputed extends DeviceModel {
//   name: string;
//   lastSeenDiff: number;
//   isOnline: boolean;
// }

// type ProjectViewProps = { project: ProjectModel; devices: DeviceModel[] };
// const ProjectView = ({ project, devices }: ProjectViewProps) => {
//   return (
//     <Box sx={{ width: '100%', p: 0.5 }}>
//       <Typography level="h3" fontSize="md" sx={{ flex: 1, ml: 2 }}>
//         {project.name}
//       </Typography>
//       <DevicesView devices={devices} />
//     </Box>
//   );
// };

// function deviceMap(device: DeviceModel): DeviceDataComputed {
//   const lastSeenDiff = Date.now() - new Date(device.lastSeen||0).getTime();
//   const isOnline = lastSeenDiff < 5 * MINUTE;
//   const name = device.name || 'Sans titre';
//   return { ...device, name, lastSeenDiff, isOnline };
// }

// function projectCompare(a: ProjectModel, b: ProjectModel): number {
//   return (a.name||'').localeCompare(b.name||'');
// }

// function deviceCompare(a: DeviceDataComputed, b: DeviceDataComputed): number {
//   const diff = a.lastSeenDiff - b.lastSeenDiff;
//   const diffHour = Math.round(diff / HOUR);
//   return diffHour * 10000 + a.name.localeCompare(b.name) * 100 + a.id.localeCompare(b.id);
// }

// const useGqlObserveItems = (q: string, vars?: GqlVars) => {
//   const items$ = useMemo(() => gqlObserveItems<T>(qProjects), []);
// }

{
  /* 
  const devices$ = useMemo(() => gqlObserveItems<DeviceModel>(qDevices), []);

  const projects = (useObservabl(projects$) || []).sort((a, b) => (a.name||'').localeCompare(b.name||'')); */
}

// type ProjectContainerProps = { projects: ProjectModel[]; devices: DeviceModel[] };
// const ProjectContainer = ({ projects, devices }: ProjectContainerProps) => {
//   return (
//     <Container>
//       {projects.map((project) => (
//         <ProjectView key={project.id} project={project} devices={devices.filter((d) => d.projectId === project.id)} />
//       ))}
//     </Container>
//   );
// };


// <ProjectContainer projects={projects} devices={devices} />;
// const deviceColumns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 240 },
//   { field: 'name', headerName: 'Nom', width: 200, editable: true },
//   // {
//   //   field: 'created_at',
//   //   headerName: 'Date de création',
//   //   width: 150,
//   //   type: 'dateTime',
//   //   valueGetter: (params) => new Date(params.value),
//   // },
//   // {
//   //   field: 'updated_at',
//   //   headerName: 'Date de modification',
//   //   width: 150,
//   //   type: 'dateTime',
//   //   valueGetter: (params) => new Date(params.value),
//   // },
//   // {
//   //   field: 'last_seen',
//   //   headerName: 'Dernière Vu',
//   //   width: 150,
//   //   renderCell: (params) => {
//   //     const lastSeenTime = Date.now() - new Date(params.row.last_seen).getTime();
//   //     console.debug('renderCell', params, lastSeenTime, lastSeenTime < MINUTE);
//   //     return (
//   //       <strong>
//   //         {lastSeenTime < MINUTE ? 'OK' : 'KO'}
//   //       </strong>
//   //     );
//   //     // try {
//   //     //   const from = parseISO(params.value);
//   //     //   const distanceFormated = formatDistanceToNow(from, { includeSeconds: true })
//   //     //   const distance = Date.now() - from.getTime();
//   //     //   if (distance > MINUTE) {
//   //     //     return (<div className='lastSeen lastSeen-offline'}>{distanceFormated}</div>);
//   //     //   }
//   //     //   else {
//   //     //     return (<div className={distance > MINUTE ? 'lastSeen lastSeen-offline' : 'lastSeen'}>{distanceFormated}</div>);
//   //     //   }
//   //     // } catch (err) {
//   //     //   console.warn('last_seen', params, err);
//   //     //   return '';
//   //     // }
//   //   },
//   // },
//   // {
//   //   field: 'statuts',
//   //   headerName: 'Statut',
//   //   width: 150,
//   //   renderCell: (params) => {
//   //     const lastSeenTime = Date.now() - new Date(params.row.last_seen).getTime();
//   //     console.debug('renderCell', params, lastSeenTime, lastSeenTime < MINUTE);
//   //     return (
//   //       <strong>
//   //         {lastSeenTime < MINUTE ? 'OK' : 'KO'}
//   //       </strong>
//   //     );
//   //   },
//   // },
//   // {
//   //   field: 'action',
//   //   headerName: 'Action',
//   //   width: 150,
//   //   renderCell: (p) => (
//   //     <Button onClick={() => console.debug('edit', p.id)}>Éditer</Button>
//   //   ),
//   // },
// ];
