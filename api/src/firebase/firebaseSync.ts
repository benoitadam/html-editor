import { dicoById, dicoByProp, dicoMap } from 'common/helpers/dico';
import { deviceRepo, fireUserRepo, projectRepo } from 'common/models/gqlRepos';
import { DeviceModel, FireUserModel, ProjectModel } from 'common/models/interfaces';
import { MINUTE } from 'common/helpers/time';
import importFire from './importFirebase';
import { writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';

interface FUser {
  key: string;
  email: string;
}

interface FDevice {
  key: string;
  name: string;
}

const save = async (file: string, data: any) => {
  await writeFile(path.join(tmpdir(), `save_${file}.json`), JSON.stringify(data, null, 2));
};

const syncDevice = async () => {
  console.info('firebaseSync syncDevice');

  const { db } = await importFire();
  const fbDeviceByKey = (await db.ref('/devices').get()).val() as Record<string, FDevice>;

  await save('fbDeviceByKey', fbDeviceByKey);
  
  const deviceProps: (keyof DeviceModel)[] = ['id', 'name', 'key', 'projectId'];
  const devices = await deviceRepo.all(deviceProps);
  const deviceByKey = dicoByProp(devices, 'key');

  // await save('deviceByKey', deviceByKey);

  const projectProps: (keyof ProjectModel)[] = ['id', 'key', 'name'];
  const projects = await projectRepo.all(projectProps);
  const projectByKey = dicoByProp(projects, 'key');

  // await save('projectByKey', projectByKey);

  await Promise.all(
    Object.entries(fbDeviceByKey).map(async ([key, fbDevice]) => {
      const name = fbDevice.name;
      if (!name || name.trim().startsWith('_')) return;

      const device = deviceByKey[key] || await deviceRepo.insert({ key, name }, deviceProps);
      if (!device) return console.error('syncDevice no device', key, name);

      if (!device.projectId) {
        const project = projectByKey[key] || await projectRepo.insert({ key, name }, projectProps);
        await deviceRepo.update(device.id, { projectId: project.id });
      }

      await deviceRepo.update(device.id, { fire: fbDevice });
    }).map(promise => promise.catch(error => console.error('firebaseSync syncDevice save', error)))
  );
}

const syncUser = async () => {
  console.info('firebaseSync syncUser');

  const { db } = await importFire();
  const fbUserByKey = (await db.ref('/users').get()).val() as Record<string, FUser>;
  const roleByUserByDevice = (await db.ref('/deviceUsers').get()).val() as Record<string, Record<string, any>>;
  const roleByDeviceByUser = (await db.ref('/roles').get()).val() as Record<string, Record<string, any>>;

  await save('fbUserByKey', fbUserByKey);
  await save('roleByUserByDevice', roleByUserByDevice);
  await save('roleByDeviceByUser', roleByDeviceByUser);
  
  const fireUserProps: (keyof FireUserModel)[] = ['id', 'email', 'userId', 'key', 'deviceKeys'];
  const fireUsers = await fireUserRepo.all(fireUserProps);
  const fireUserById = dicoById(fireUsers);
  const fireUserByKey = dicoByProp(fireUserById, 'key');

  // await save('fireUserByKey', fireUserByKey);

  const deviceKeyMapByUserKey: Record<string, Record<string, boolean>> = {};
  const addUserDevice = (userKey: string, deviceKey: string) => {
    const deviceKeys = (deviceKeyMapByUserKey[userKey] || (deviceKeyMapByUserKey[userKey] = {}));
    deviceKeys[deviceKey] = true;
    return deviceKeys;
  }

  Object.entries(roleByDeviceByUser).forEach(([userKey, roleByDevice]) => {
    Object.entries(roleByDevice).forEach(([deviceKey]) => {
      if (userKey.length < 20 || deviceKey.length < 20) return;
      addUserDevice(userKey, deviceKey);
    });
  });
  Object.entries(roleByUserByDevice).forEach(([deviceKey, roleByUser]) => {
    Object.entries(roleByUser).forEach(([userKey]) => {
      if (userKey.length < 20 || deviceKey.length < 20) return;
      addUserDevice(userKey, deviceKey);
    });
  });

  await save('deviceKeyMapByUserKey', deviceKeyMapByUserKey);
  
  await Promise.all(
    Object.entries(fbUserByKey).map(async ([key, fbUser]) => {
      const email = fbUser.email;
      if (!email) return;

      const fireUser = fireUserByKey[key] || await fireUserRepo.insert({ key, email }, fireUserProps);

      const deviceKeyMap = addUserDevice(fireUser.key, fireUser.key);
      const deviceKeys = Object.keys(deviceKeyMap).sort((a, b) => a.localeCompare(b));

      await fireUserRepo.update(fireUser.id, { deviceKeys, email });
    }).map(promise => promise.catch(error => console.error('firebaseSync syncUser save', error))),
  );
}

export const firebaseSync = async () => {
  console.info('firebaseSync');
  await Promise.resolve(null);
  // await syncDevice();
  // await syncUser();

  // setInterval(syncDevice, 10 * MINUTE);
  // setInterval(syncUser, 10 * MINUTE);
}

export default firebaseSync;







  // const DEVICE_PROPS: (keyof DeviceModel)[] = ['id', 'name', 'fire', 'key', 'projectId'];
  // const PROJECT_PROPS: (keyof ProjectModel)[] = ['id', 'key', 'name'];
  // const FIRE_USER_PROPS: (keyof FireUserModel)[] = ['id', 'email', 'userId', 'key'];

  


  
  // const projectByUser: { [userKey: string]: { [projectId: string]: boolean } } = {};
  // const projectById = dicoById(await projectRepo.all(PROJECT_PROPS));

  // const deviceById = dicoById(await deviceRepo.all(DEVICE_PROPS));
  // const deviceByKey = dicoByProp(deviceById, 'key');
  // const projectByDeviceKey = dicoMap(deviceByKey, (device) => projectById[device.projectId || '']);

  

  // for (const fDevice of Object.values(fDeviceByKey)) {
  //   const deviceKey = fDevice.key;
  //   if (!deviceKey) return console.error('fSync projects no deviceKey', fDevice);
  //   const deviceName = fDevice.name;

  //   let project: ProjectModel|null = projectByDeviceKey[deviceKey];
  //   if (!project) {
  //     const projectKey = deviceKey;
  //     project = projectByKey[projectKey];
  //     if (!project) {
  //       project = await projectRepo.insert({ key: projectKey, name: projectKey }, ['id', 'key', 'name']);
  //       if (!project) {
  //         console.warn('firebaseSync no project', projectKey)
  //         continue;
  //       }
  //       projectById[project.id] = project;
  //       projectByKey[projectKey] = project;
  //     }
  //     projectByDeviceKey[deviceKey] = project;
  //   }
  //   let device: DeviceModel|null = deviceByKey[deviceKey];

  //   if (!device) {
  //     device = await deviceRepo.insert({ key: deviceKey }, DEVICE_PROPS);
  //     if (!device) {
  //       console.warn('firebaseSync no device', deviceKey)
  //       continue;
  //     }
  //     deviceById[device.id] = device;
  //     deviceByKey[deviceKey] = device;
  //   }

  //   device.name = deviceName;
  //   device.fire = fDevice;
  //   device.projectId = project.id;

  //   await deviceRepo.update(device.id, {
  //     name: deviceName,
  //     fire: fDevice,
  //     projectId: project.id,
  //   });
  // }

