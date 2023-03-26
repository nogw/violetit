import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';
import { TagModel } from './TagModel';

const Loader = createLoader({
  model: TagModel,
  loaderName: 'TagLoader',
});

export const { Wrapper: Tag, getLoader, clearCache, load, loadAll } = Loader;
export default Loader;

registerLoader('TagLoader', getLoader);
