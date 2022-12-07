import { gqlRegister } from 'common/models/gql';
import req from 'common/helpers/req';
import app from '~src/app';
import session$ from '~src/messagers/session$';

export const initGql = () => {
  gqlRegister(async (q, vars) => {
    const session = session$.value;
    const headers = (session.expireTime||0) > Date.now() ? session.headers : {};
    const res = await req.post(app.gqlUrl + '?t=' + Date.now(), { query: q, variables: vars }, { headers });
    return res.data;
  });
}

export default initGql;