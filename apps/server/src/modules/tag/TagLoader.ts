import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';
import { TagFilterMapping } from './TagFilterInputType';
import { TagModel } from './TagModel';

const Loader = createLoader({
  model: TagModel,
  loaderName: 'TagLoader',
  filterMapping: TagFilterMapping,
});

export const { Wrapper: Tag, getLoader, clearCache, load, loadAll } = Loader;
export default Loader;

registerLoader('TagLoader', getLoader);
