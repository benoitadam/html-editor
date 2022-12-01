import {
  execFile,
  exec,
  ExecFileOptionsWithBufferEncoding,
  ExecFileException,
  ExecOptions,
  ExecException,
} from 'child_process';
import { Readable } from 'stream';

export interface CmdProps<T = any> {
  name?: string;
  cmd: string | string[];
  replace?: Record<string, any>;
  options?: T;
}

export interface CmdInfo extends CmdProps {
  name: string;
  command: string;
  bin: string;
  args: string[];
}

export interface CmdResult extends CmdInfo {
  error: ExecException | ExecFileException | null;
  stdout: string | Buffer | Readable | null;
  stderr: string | Buffer | Readable | null;
}

export function cmdInfo(props: CmdProps): CmdInfo {
  const { cmd, replace } = props;
  const args = Array.isArray(cmd) ? cmd : String(cmd).split(' ');
  if (replace) {
    args.forEach((arg, i) => {
      const val: any = replace[arg];
      if (val !== undefined) args[i] = typeof val === 'string' ? val : JSON.stringify(val);
    });
  }
  const command = args.map((a) => (/^[\w-]+$/.test(a) ? a : `"${a}"`)).join(' ');
  const bin = args.shift();
  if (bin === undefined) throw new Error('no bin');
  console.debug('cmdInfo', bin, args, props);
  return { name: bin, ...props, command, bin, args };
}

export class CmdError extends Error {
  constructor(public result: CmdResult) {
    super(result.error?.message || result.name);
  }
}

export async function cmdExecFile(props: CmdProps<ExecFileOptionsWithBufferEncoding>) {
  return await new Promise<CmdResult>((resolve, reject) => {
    const info = cmdInfo(props);
    execFile(info.bin, info.args, props.options || {}, (error, stdout, stderr) => {
      const result = { ...info, stderr, stdout, error };
      if (result.error) {
        reject(new CmdError(result));
        return;
      }
      resolve(result);
    });
  });
}

export async function cmdExec(props: CmdProps<ExecOptions>) {
  return await new Promise<CmdResult>((resolve, reject) => {
    const info = cmdInfo(props);
    exec(info.command, props.options, (error, stdout, stderr) => {
      const result = { ...info, stderr, stdout, error };
      if (result.error) {
        reject(new CmdError(result));
        return;
      }
      resolve(result);
    });
  });
}
