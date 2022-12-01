import { gqlRegister } from 'common/models/gql';
import req from 'common/helpers/req';
import getEnv from './helpers/getEnv';

const GQL_URL = getEnv('GRAPHQL_URL');
const HASURA_GRAPHQL_ADMIN_SECRET = getEnv('HASURA_GRAPHQL_ADMIN_SECRET');
const GQL_HEADERS = { 'X-Hasura-Admin-Secret': HASURA_GRAPHQL_ADMIN_SECRET };

const initGql = () => {
  gqlRegister(async (q, vars) => {
    const res = await req.post(GQL_URL, { query: q, variables: vars }, { headers: GQL_HEADERS });
    return res.data;
  });
}

export default initGql;