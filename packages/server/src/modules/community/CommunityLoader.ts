import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';
import { communityFilterMapping } from './CommunityFilterInputType';
import { CommunityModel } from './CommunityModel';

const Loader = createLoader({
  model: CommunityModel,
  loaderName: 'CommunityLoader',
  filterMapping: communityFilterMapping,
});

export const { Wrapper: Community, getLoader, clearCache, load, loadAll } = Loader;
export default Loader;

registerLoader('CommunityLoader', getLoader);
