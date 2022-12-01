
import req from 'common/helpers/req';
import importFirebase from './importFirebase';

export default async function firebaseSignIn({ email, password }: { email: string; password: string }) {
  const fire = await importFirebase();
  const apiKey = String(fire.config.apiKey);
  const fireSignInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
  return await req.post(fireSignInUrl, {
    email,
    password,
    returnSecureToken: true,
  });
}
