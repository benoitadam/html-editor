import { Bridge } from './interfaces';
import FullyBridge, { fully } from './FullyBridge';
import imgResize from '~src/helpers/imgResize';
import getInfoBase from './getInfoBase';

export let bridge: Bridge = {
  info: () => getInfoBase(),
  screenshot: () => Promise.resolve(''),
  screenOff: () => false,
  inBackground: () => false,
  kioskOn: () => false,
  reload: () => location.reload(),
  reboot: () => location.reload(),
  restart: () => location.reload(),
  exit: () => location.reload(),
  reset: () => location.reload(),
};

if (fully) bridge = new FullyBridge();

const keyMethodMap: Record<string, () => void> = {
  'ctrl+shift+r': () => reset(),
  'ctrl+r': () => reload(),
  'ctrl+h': () => bringToBackground(),
  'ctrl+e': () => exit(),
};

document.addEventListener('keydown', (e) => {
  if (!e || !e.key) return;
  let key = e.key.toLowerCase();
  if (e.altKey) key = `alt+${key}`;
  if (e.shiftKey) key = `shift+${key}`;
  if (e.ctrlKey) key = `ctrl+${key}`;
  if (keyMethodMap[key]) keyMethodMap[key]();
});

export function info() {
  return bridge.info();
}

export async function screenshot(width = 300, height?: number) {
  if (!height) height = (width * screen.height) / screen.width;
  const base64 = await bridge.screenshot();
  return await imgResize(base64, width, height);
}

export function turnScreenOn() {
  return bridge.screenOff(false);
}

export function turnScreenOff() {
  return bridge.screenOff(true);
}

export function lockKiosk() {
  return bridge.kioskOn(true);
}

export function unlockKiosk() {
  return bridge.kioskOn(false);
}

export function bringToBackground() {
  return bridge.inBackground(true);
}

export function bringToForeground() {
  return bridge.inBackground(false);
}

export function reload() {
  return bridge.reload();
}

export function reboot() {
  return bridge.reboot();
}

export function restart() {
  return bridge.restart();
}

export function exit() {
  return bridge.exit();
}

export function reset() {
  return bridge.reset();
}

export const commands: Record<string, (...args: any[]) => any> = {
  info,
  screenshot,
  turnScreenOn,
  turnScreenOff,
  lockKiosk,
  unlockKiosk,
  bringToBackground,
  bringToForeground,
  reload,
  reboot,
  restart,
  exit,
  reset,
};

export default {
  bridge,
  info,
  screenshot,
  turnScreenOn,
  turnScreenOff,
  lockKiosk,
  unlockKiosk,
  bringToBackground,
  bringToForeground,
  reload,
  reboot,
  restart,
  exit,
  reset,
};

// displayEl?: HTMLDivElement;
// displayTimer: any;
// display(message: string) {
//   clearTimeout(this.displayTimer);
//   if (!message && this.displayEl) {
//     this.displayEl.remove();
//     delete this.displayEl;
//     return;
//   }
//   if (!this.displayEl) {
//     this.displayEl = document.createElement('div');
//     this.displayEl.id = 'm_display';
//     Object.assign(this.displayEl.style, {
//       position: 'absolute',
//       bottom: '5px',
//       left: '0',
//       width: '100%',
//       color: 'red',
//       textAlign: 'center',
//     });
//     document.body.appendChild(this.displayEl);
//   }
//   this.displayEl.innerText = message;
//   this.displayTimer = setTimeout(() => this.display(''), 3000);
// }
