import { createLoader } from '@entria/graphql-mongo-helpers';

import { VoteFilterMapping } from './VoteFilterInputType';
import { registerLoader } from '../loader/loaderRegister';
import { VoteModel } from './VoteModel';

const Loader = createLoader({
  model: VoteModel,
  loaderName: 'VoteLoader',
  filterMapping: VoteFilterMapping,
});

export const { Wrapper: Vote, getLoader, clearCache, load, loadAll } = Loader;
export default Loader;

registerLoader('VoteLoader', getLoader);
