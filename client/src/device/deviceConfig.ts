export default {};

// import app from '~src/app';
// import { turnScreenOff, turnScreenOn } from './bridge';
// import { hideConsole, remoteConsole, showConsole } from './deviceConsole';
// import { DeviceConfig } from 'common/models/interfaces';
// import { DAY, timeParse } from 'common/helpers/time';

// let _screenTimer: any;
// function screenOnTime(start?: string, end?: string) {
//   const now = Date.now();
//   const tStart = timeParse(start || '00:00:00');
//   const tEnd = timeParse(end || '24:00:00');
//   const tNow = now % DAY;
//   const screenOn = tStart < tNow && tNow < tEnd;
//   console.debug('_screen', { start, end, now, tStart, tEnd, tNow, screenOn });
//   screenOn ? turnScreenOn() : turnScreenOff();
// }

// let _last: any;
// export default function deviceConfig(config?: DeviceConfig) {
//   if (!config) return;
//   if (_last === config) return;
//   _last = config;
//   clearInterval(_screenTimer);
//   if (config) {
//     const { screenStart, screenEnd } = config;
//     if (screenStart || screenEnd) {
//       _screenTimer = setInterval(() => screenOnTime(screenStart, screenEnd), 10000);
//     }
//     config.showConsole ? showConsole() : hideConsole();
//     config.remoteConsole && remoteConsole();
//   }
// }