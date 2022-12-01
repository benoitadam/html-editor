import { LogModel } from 'common/models/interfaces';
import { logRepo } from 'common/models/gqlRepos';
import app from '~src/app';
import addCss from '../helpers/addCss';

const CSS = `
#display_console {
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  inset: 0px;
  user-select: none;
  pointer-events: none;
  overflow: hidden;
  z-index: 100000;
}
#display_console pre {
  margin: 0;
  padding: 0;
}
`;

const _console = app.global.console;
let _consoleEl: HTMLDivElement | undefined;
let _logs: Partial<LogModel>[] = [];
let _remoteTimer: any;

function deviceConsoleEl() {
  if (!_consoleEl) {
    addCss('display_console', CSS);
    _consoleEl = document.createElement('div');
    _consoleEl.id = 'display_console';
  }
  return _consoleEl;
}

export function deviceConsoleShow() {
  deviceConsoleInit();
  const el = deviceConsoleEl();
  if (!el.parentElement) document.body.appendChild(deviceConsoleEl());
}

export function deviceConsoleHide() {
  deviceConsoleInit();
  const el = deviceConsoleEl();
  if (el.parentElement) el.remove();
}

export function deviceConsoleRemote(remote = true) {
  deviceConsoleInit();
  clearInterval(_remoteTimer);
  if (!remote) return;
  _remoteTimer = setInterval(() => {
    if (_logs.length === 0) return;
    const logs = _logs;
    _logs = [];
    logRepo.insertItems(logs);
  }, 5000);
}

function deviceConsoleLog(type: string, text: string) {
  const consoleEl = deviceConsoleEl();
  if (consoleEl.children.length > 50) consoleEl.children[0].remove();
  const el = document.createElement('pre');
  el.className = type;
  el.innerText = text;
  consoleEl.appendChild(el);
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

function deviceConsoleStringify(value: string) {
  try {
    if (typeof value === 'object') value = JSON.stringify(value);
  } catch (err) {}
  value = String(value);
  if (value.length > 103) value = value.substring(0, 100) + '...';
  return value;
}

function deviceConsoleLogger(type: string) {
  return (...args: any[]) => {
    const c = (_console as any)[type];
    if (c) c(...args);
    const time = Date.now() % 60000;
    const msg = args.map(deviceConsoleStringify).join(' ');
    _logs.push({ type, time, msg });
    if (_logs.length > 50) _logs.shift();
    deviceConsoleLog(type, `${type} ${time} ${msg}`);
  };
}

let _isInit = false;
export function deviceConsoleInit() {
  if (_isInit) return;
  _isInit = true;
  app.global.console = {
    ..._console,
    trace: deviceConsoleLogger('trace'),
    debug: deviceConsoleLogger('debug'),
    log: deviceConsoleLogger('log'),
    info: deviceConsoleLogger('info'),
    error: deviceConsoleLogger('error'),
    warn: deviceConsoleLogger('warn'),
  };
}