import { createLoader } from '@entria/graphql-mongo-helpers';

import { voteFilterMapping } from './VoteFilterInputType';
import { registerLoader } from '../loader/loaderRegister';
import { VoteModel } from './VoteModel';

// shouldValidateContextUser: true,
const Loader = createLoader({
  model: VoteModel,
  loaderName: 'VoteLoader',
  filterMapping: voteFilterMapping,
});

export const { Wrapper: Vote, getLoader, clearCache, load, loadAll } = Loader;
export default Loader;

registerLoader('VoteLoader', getLoader);
