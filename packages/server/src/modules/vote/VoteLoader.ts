import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';
import { VoteModel } from './VoteModel';

const Loader = createLoader({
  model: VoteModel,
  loaderName: 'VoteLoader',
  shouldValidateContextUser: true,
});

export const { Wrapper: User, getLoader, clearCache, load, loadAll } = Loader;
export default Loader;

registerLoader('VoteLoader', getLoader);
