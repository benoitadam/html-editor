import session$ from '~src/messagers/session$';
import authDevice from './authDevice';
import { info, reload } from './bridge';
import evalAction from './evalAction';
import evalCommand from './evalCommand';
import { deviceConsoleInit } from './deviceConsole';
// import deviceConfig from './deviceConfig';
// import nodes from '~src/render/NodesController';
// import { DeviceCommand, DeviceModel } from 'common/models/interfaces';
// import { gqlObserveItem } from '~src/api/gqlObserve';
import { deviceRepo } from 'common/models/gqlRepos';
import { DeviceModel } from 'common/models/interfaces';
import { GqlProps } from 'common/models/gqlRepo';
import { storageGet } from 'common/helpers/storage';

let isFirstStep = true;

const SECOND = 1000;
const MINUTE = 60 * SECOND;

let _resetReloadTimer: any;
function resetReload() {
  clearTimeout(_resetReloadTimer);
  _resetReloadTimer = setTimeout(reload, 5 * MINUTE);
}

const getDevice = async (id: string) => {
  const props: GqlProps<DeviceModel> = ['id', 'action', 'command'];
  let device = await deviceRepo.update(id, { lastSeen: 'now()' }, props);
  if (!device) device = await deviceRepo.insert({ lastSeen: 'now()' }, props);
  return device;
}

const deviceFirstStep = async (id: string) => {
  const device = await deviceRepo.update(id, { info: info() }, ['config']);
  if (!device) throw new Error('deviceFirstStep no device');
  console.debug('config', device?.config);
}

const deviceLoop = async () => {
  try {
    const deviceId = session$.value.user?.id;
    if (!deviceId) return;
    const device = await getDevice(deviceId);
    if (!device) {
      console.error('no device');
      return;
    }
    if (isFirstStep) {
      await deviceFirstStep(deviceId);
      isFirstStep = false;
    }
    resetReload();
    await evalAction(deviceId, device.action);
    await evalCommand(deviceId, device.command);
  }
  catch(error) {
    console.error('deviceLoop error', error);
  }
};

export default async function deviceInit() {
  resetReload();
  if (storageGet('stopDeviceConsole') === true) deviceConsoleInit();
  // deviceConfig();

  console.info('device init');
  await authDevice().catch(() => {});
  setInterval(deviceLoop, 5000);

  return true;
}
