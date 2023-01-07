import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';
import { CommunityModel } from './CommunityModel';

const Loader = createLoader({
  model: CommunityModel,
  loaderName: 'CommunityLoader',
  shouldValidateContextUser: true,
});

export const { Wrapper: User, getLoader, clearCache, load, loadAll } = Loader;
export default Loader;

registerLoader('UserLoader', getLoader);
