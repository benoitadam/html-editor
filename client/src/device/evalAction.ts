import { deviceRepo } from 'common/models/gqlRepos';
import session$ from '~src/messagers/session$';
import app from '~src/app';

function nameInfo(name: string) {
  if (!name) throw new Error('no key');
  const ks = name.split('.');
  let parent: any = app;
  for (let i = 0, l = ks.length - 1; i < l; ++i) parent = parent[ks[i]];
  const last = ks[ks.length - 1];
  const value = parent[last];
  return { parent, value, last };
}

function get(name: string) {
  return nameInfo(name).value;
}

function set(name: string, value: any) {
  const info = nameInfo(name);
  info.parent[info.last] = value;
}

function call(name: string, ...args: any[]) {
  const info = nameInfo(name);
  return info.parent[info.last](...args);
}

function keys(key: string) {
  return Object.keys(get(key));
}

type ActionData = {
  name: string;
  args?: any[];
  val?: string;
  err?: string;
};

async function _updateAction(action: ActionData) {
  const session = session$.value;
  if (!session.isAuth) return;
  await deviceRepo.update(session.user.id, { action: JSON.stringify(action) }).catch(() => {});
}

async function _eval(action: ActionData) {
  console.info('device eval', action);
  try {
    if (!action.name) return;
    let val = get(action.name);
    if (typeof val === 'function') {
      const args = action.args || [];
      val = await val(...args);
      if (val === undefined) val = 'void';
    }
    if (val === undefined) val = 'undefined';
    try {
      JSON.stringify(val); // can stringify
    } catch (err) {
      val = String(val);
    }
    action.val = val;
  } catch (err) {
    action.err = String(err);
  }
}

// screenshot | { "name": "screenshot", "args": [300, 300] }
let _action: any;
export default async function evalAction(deviceId: string, action?: string|null) {
  if (_action === action) return;
  _action = action;
  if (!action) return;
  if (typeof action !== 'string') return;

  try {
    const a: ActionData = action.startsWith('{') ? JSON.parse(action) : { name: action };
    if (a.val === undefined && a.err === undefined) {
      console.info('evalAction', a);
      a.val = 'start';
      await _updateAction(a);
      await _eval(a);
      await _updateAction(a);
    }
  } catch (err) {
    console.error('evalAction', action, err);
    await _updateAction({ name: action, err: String(err) });
  }
}