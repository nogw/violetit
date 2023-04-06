import { createLoader } from '@entria/graphql-mongo-helpers';
import { connectionFromMongoAggregate } from '@entria/graphql-mongoose-loader';
import { GraphQLContext } from 'src/graphql/types';

import { registerLoader } from '../loader/loaderRegister';
import { communityFilterMapping } from './CommunityFilterInputType';
import { CommunityModel } from './CommunityModel';

const Loader = createLoader({
  model: CommunityModel,
  loaderName: 'CommunityLoader',
  filterMapping: communityFilterMapping,
  defaultFilters: (_, args) => (args.filters?.joinedByMe ? {} : { orderBy: [{ field: 'createdAt', direction: -1 }] }),
});

export const loadCommunitiesJoinedByMe = (context: GraphQLContext) => {
  if (!context?.user) {
    return;
  }

  const aggregate = CommunityModel.aggregate([{ $match: { members: { $in: [context.user._id] } } }]);

  return connectionFromMongoAggregate({
    aggregate,
    context,
    args: {},
    loader: load as any,
  });
};

export const { Wrapper: Community, getLoader, clearCache, load, loadAll } = Loader;
export default Loader;

registerLoader('CommunityLoader', getLoader);
