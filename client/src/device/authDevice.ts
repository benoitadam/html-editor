import uuid from 'common/helpers/uuid';
import { authRefresh, authSignIn, authSignUp } from '~src/api/auth';
import session$ from '~src/messagers/session$';
import { storageGet, storageSet } from 'common/helpers/storage';
import deviceEmail$ from '~src/messagers/deviceEmail$';
import devicePassword$ from '~src/messagers/devicePassword$';
import app from '~src/app';

let interval: any;

export default async function authDevice() {
  let session = session$.value;
  console.debug('authDevice', session);
  // session.role = 'me';

  clearInterval(interval);
  interval = setInterval(authDevice, 10000);

  if (session.isAuth && session.expireTime > Date.now() + 20000) return;

  console.debug('authDevice refresh');
  session = await authRefresh();

  if (session.isAuth) {
    console.info('authDevice refresh ok', session.user.id);
    return;
  }

  let email = deviceEmail$.value;
  let password = devicePassword$.value;

  if (email && password) {
    console.debug('authDevice signIn', email);
    try {
      session = await authSignIn(email, password);
      if (session.isAuth) {
        console.info('authDevice signIn ok', email, session.user.id);
        return;
      }
    } catch (err: any) {
      console.error('authDevice signIn ko', String(err));
      if (err.message === 'invalid-email-password') {
        console.info('authDevice reset user', email);
        email = '';
        password = '';
        deviceEmail$.next('');
        devicePassword$.next('');
      }
    }
    console.warn('authDevice signIn ko', email);
  }

  if (!email) {
    email = uuid() + '@' + app.host;
    password = uuid();
    console.debug('authDevice signUp', email);
    session = await authSignUp(email, password);
    if (session.isAuth) {
      console.info('authDevice signUp ok', email, session.user.id);
      deviceEmail$.next(email);
      devicePassword$.next(password);
      return;
    }
    console.warn('authDevice signUp ko', email);
  }

  throw new Error('no session');
}