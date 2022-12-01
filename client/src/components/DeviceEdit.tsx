import styled from '@mui/material/styles/styled';
import Editor from '~src/editor/Editor';
// import EditorLoader from '../menu/components/EditorLoader';

// const Container = styled('div')(({ theme }) => ({
//   position: 'relative',
//   flex: 1,
//   width: '100%',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-around',
//   flexWrap: 'wrap',
//   overflowY: 'scroll',
// }));

export default function DeviceEdit({ deviceId }: { deviceId?: string }) {
  return <Editor />;
}
