import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';
import { PostModel } from './PostModel';

const Loader = createLoader({
  model: PostModel,
  loaderName: 'PostLoader',
});

export const { Wrapper: Post, getLoader, clearCache, load, loadAll } = Loader;
export default Loader;

registerLoader('PostLoader', getLoader);
