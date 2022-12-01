import app from '~src/app';
import { AuthSession } from 'common/models/interfaces';
import req, { ReqOption } from 'common/helpers/req';
import session$, { noAuth } from '~src/messagers/session$';

export const authRequest = async (url: string, data?: any, options?: ReqOption) => {
  try {
    console.debug('authRequest', url, data, options);
    const res = await req.post(url, data, options);
    return authParseData(res.data);
  } catch (error) {
    console.warn('authRequest error', error);
    return session$.next({ isAuth: false, error });
  }
}

export const authParseData = (result: any) => {
  try {
    console.debug('parseAuthResult', result);
    if (!result) throw new Error('no result');
    if (result.error === 'invalid-refresh-token') return session$.next(noAuth);
    if (result.error) throw new Error(result.error);

    const session = (result.session || result) as AuthSession;
    if (!session.user?.id) throw new Error('no user id');
    if (!session.accessToken) throw new Error('no accessToken');

    session.expireInMs = (session.accessTokenExpiresIn || 500) * 1000;
    session.expireTime = Date.now() + session.expireInMs;

    const roles = session.user.roles || [];
    if (roles.includes('admin')) session.role = 'admin';
    else if (roles.includes('editor')) session.role = 'editor';
    else if (roles.includes('user')) session.role = 'user';
    else throw new Error('no user role');

    session.canEdit = session.role === 'admin' || session.role === 'editor';

    session.headers = {};
    session.headers['X-Hasura-Role'] = session.role;
    session.headers['Authorization'] = `Bearer ${session.accessToken}`;

    session$.next({ isAuth: true, ...session });

    if (location.href.includes('/auth')) history.pushState({}, '', '/admin');

    return session$.value;
  } catch (error) {
    console.warn('parseAuthResult error', error);
    return session$.next({ isAuth: false, error });
  }
}

export const authRefreshToken = async (refreshToken: string) => {
  console.debug('authRefreshToken', refreshToken);
  return authRequest(app.authUrl + '/token', { refreshToken });
}

export const authRefresh = async (clearSession: boolean = false) => {
  const session = session$.value;
  console.debug('authRefresh', session);
  if (session.isAuth) {
    const { refreshToken, headers } = session;
    if (clearSession) session$.next(noAuth);
    return authRequest(app.authUrl + '/token', { refreshToken }, { headers });
  }
  return session$.value;
}

export const authSignIn = async (email: string, password: string) => {
  return await authRequest(app.authUrl + '/signin/email-password', { email, password });
}

export const authSignUp = async (email: string, password: string) => {
  return await authRequest(app.authUrl + '/signup/email-password', { email, password });
}

export const authSignOut = async () => {
  const session = session$.value;
  if (session.isAuth) {
    const { refreshToken, headers } = session;
    session$.next(noAuth);
    return await req.post(app.authUrl + '/signout', { refreshToken }, { headers });
  }
}

export const authPasswordReset = async (email: string, redirectTo: string) => {
  const res = await req.post<string>(app.authUrl + '/user/password/reset', {
    email,
    options: { redirectTo }
  }, {
    responseType: 'text'
  });
  console.info('authPasswordReset', email, res.data);
  return res.data === 'OK';
}

export const authPasswordResetSuccess = async (email: string, redirectTo: string) => {
  const res = await req.post<string>(app.authUrl + '/user/password/reset', {
    email,
    options: { redirectTo }
  }, {
    responseType: 'text'
  });
  console.info('authPasswordResetSuccess', email, res.data);
  return res.data === 'OK';
}

export const authSignInEditor = async (email: string, password: string) => {
  try {
    const session = await authSignIn(email, password);
    if (!session.isAuth) return;
    if (session.user.defaultRole !== 'editor') {
      await req.post(app.apiUrl + '/init-editor', { email, password });
      await authRefresh();
    }
  }
  catch (error) {
    console.error('authSignInEditor', email, password);
  }
}

export const authSignInDevice = async (email: string, password: string) => {
  try {
    const session = await authSignIn(email, password);
    if (session.isAuth && session.user.defaultRole === 'device') {
      await req.post(app.apiUrl + '/init-device', { email, password });
      await authRefresh();
    }
  }
  catch (error) {
    console.error('authSignInDevice', email, password);
  }
}