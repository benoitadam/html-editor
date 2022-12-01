import { deviceRepo } from 'common/models/gqlRepos';
import { commands } from './bridge';

let lastCommand: any;
export default async function evalCommand(deviceId: string, command?: string|null) {
  if (lastCommand === command) return;
  lastCommand = command;
  if (!command) return;
  if (typeof command !== 'string') return;

  const start = Date.now();

  try {
    let fun = commands[command];
    if (typeof fun !== 'function') throw new Error('not implemented');
    await deviceRepo.update(deviceId, { command: null, state: JSON.stringify({ command, start }) }).catch(() => 0);
    const result = await fun();
    const time = Date.now() - start;
    await deviceRepo.update(deviceId, { state: JSON.stringify({ command, start, time, result }) }).catch(() => 0);
  } catch (err: any) {
    const time = Date.now() - start;
    const error = String(err);
    await deviceRepo.update(deviceId, { state: JSON.stringify({ command, start, time, error }) }).catch(() => 0);
  }
}
