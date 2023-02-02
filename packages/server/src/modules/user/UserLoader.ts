import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';
import { UserModel } from './UserModel';

const Loader = createLoader({
  model: UserModel,
  loaderName: 'UserLoader',
});

export const { Wrapper: User, getLoader, clearCache, load, loadAll } = Loader;
export default Loader;

registerLoader('UserLoader', getLoader);
