import { userRepo, userRoleRepo } from 'common/models/gqlRepos';
import firebaseSignIn from './firebase/firebaseSignIn';
import req from 'common/helpers/req';
import { AuthSession, UserModel } from 'common/models/interfaces';
import { needObj, needStrNotEmpty } from 'common/helpers/need';

const signInUrl = `${process.env.AUTH_SERVER_URL}/signin/email-password`;
const signUpUrl = `${process.env.AUTH_SERVER_URL}/signup/email-password`;

const signIn = async (email: string, password: string): Promise<AuthSession|null> => {
  const inRes = await req.post(signInUrl, { email, password }).catch(() => null);
  if (inRes?.data) return inRes?.data.session as AuthSession || null;
  
  const fbRes = await firebaseSignIn({ email, password }).catch(() => null);
  if (!fbRes?.data) throw new Error('invalid-fb-email-password');
  
  const upRes = await req.post(signUpUrl, { email, password }).catch(() => null);
  return upRes?.data.session as AuthSession || null;
}

const setDefaultRole = async (user: UserModel, role: string) => {
  if (user.defaultRole === role) return;
  const userId = user.id;
  await userRoleRepo.insert({ userId, role }).catch(() => null);
  await userRepo.update(userId, { locale: 'fr', defaultRole: 'editor' }).catch(() => null);
  user.locale = 'fr';
  user.defaultRole = role;
  user.roles.push(role);
}

const initUser = async (email: unknown, password: unknown, role: string) => {
  console.info('initUser', email);
  try {
    needStrNotEmpty(email, 'email');
    needStrNotEmpty(password, 'password');

    const session = await signIn(email, password);
    needObj(session, 'session');
    needObj(session.user, 'user');

    await setDefaultRole(session.user, role);
    
    return { session };
  } catch (error) {
    console.error('initUser error', email, error);
    throw error;
  }
}

// export const initUserDevice = async ({ email, password }: any) => {
//   console.info('initUserDevice', email);
//   return await initUser(email, password, 'device');
// }

export const initUserEditor = async ({ email, password }: any) => {
  console.info('initUserEditor', email);
  return await initUser(email, password, 'editor');
}

// await req.post(app.apiUrl + '/init-editor', { email, password });
//       await authRefresh();
//     }
//   }
//   catch (error) {
//     console.error('authSignInEditor', email, password);
//   }
// }

// export const authSignInDevice = async (email: string, password: string) => {
//   try {
//     const session = await authSignIn(email, password).catch(() => null);
//     if (session?.user.defaultRole === 'device') {
//       await req.post(app.apiUrl + '/init-device', { email, password });
//       await authRefresh();
//     }

// export default async function login({ email, password }: { email: string; password: string }) {
//   console.info('login', email, password.replace(/./g, '*'));
//   try {
//     if (!email) {
//       throw new Error('no-email');
//     }
//     if (!password) {
//       throw new Error('no-password');
//     }

//     const signInUrl = `${process.env.AUTH_SERVER_URL}/signin/email-password`;
//     const signUpUrl = `${process.env.AUTH_SERVER_URL}/signup/email-password`;

//     let signRes = await req.post(signInUrl, { email, password }).catch(() => null);
//     console.debug('login signInData', signRes?.data);
    
//     if (!signRes?.data) {
//       const firebaseSignInRes = await firebaseSignIn({ email, password }).catch(() => null);
//       console.debug('login firebaseSignInData', firebaseSignInRes?.data);

//       if (!signRes?.data && !firebaseSignInRes?.data) {
//         throw new Error('invalid-email-password');
//       }

//       if (!signRes?.data) {
//         signRes = await req.post(signUpUrl, { email, password }).catch(() => null);
//       }
      
//       const signData = signRes?.data as { session: AuthSession };
//       const userId = signData?.session?.user?.id;
//       console.debug('login userId', userId);

//       if (!userId) {
//         throw new Error('error-server-up');
//       }

//       // const fireUser = await fireUserRepo.find({ email }, ['id', 'deviceKeys']);
//       // if (fireUser) {
//       //   await fireUserRepo.update(fireUser.id, { userId });
//       //   await Promise.all(
//       //     (fireUser.deviceKeys || []).map(async (deviceKey) => {
//       //       const device = await deviceRepo.find({ key: deviceKey }, ['id', 'key', 'projectId']);
//       //       const projectId = device?.projectId;
//       //       if (!projectId) return;
//       //       await editorRepo.insert({ userId, projectId });
//       //     }).map(p => p.catch((error) => console.error('login editorRepo', error)))
//       //   )
//       // }

//       signRes = await req.post(signInUrl, { email, password }).catch(() => null);
//     }

//     const session: AuthSession = signRes?.data?.session;
//     const user = session?.user;
//     if (user && user.defaultRole !== 'editor') {
//       const userId = user.id;
//       await userRoleRepo.insert({ userId, role: 'editor' }).catch(() => 0);
//       await userRepo.update(userId, { locale: 'fr', defaultRole: 'editor' }).catch(() => 0);
//       user.locale = 'fr';
//       user.defaultRole = 'editor';
//       user.roles.push('editor');
//     }
    
//     return signRes?.data;
//   } catch (error) {
//     console.error('login error', error);
//     throw error;
//   }
// }
