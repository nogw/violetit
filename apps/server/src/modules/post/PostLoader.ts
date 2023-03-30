import { connectionFromMongoAggregate } from '@entria/graphql-mongoose-loader';
import { createLoader, getObjectId } from '@entria/graphql-mongo-helpers';
import { Maybe } from '@violetit/types';

import { registerLoader } from '../loader/loaderRegister';
import { GraphQLContext } from '../../graphql/types';
import { PostFilterMapping } from './PostFilterInputType';
import { PostModel } from './PostModel';

const Loader = createLoader({
  model: PostModel,
  loaderName: 'PostLoader',
  filterMapping: PostFilterMapping,
  isAggregate: true,
  defaultFilters: (_, args) => (args.filters?.trending ? {} : { orderBy: [{ field: 'createdAt', direction: -1 }] }),
});

export const loadTrendingPosts = async (community: Maybe<string>, tags: Maybe<string>, context: GraphQLContext) => {
  const matchStageCommunity = community ? { community: getObjectId(community) } : {};
  const matchStageTags = tags ? { tags: { $in: [getObjectId(tags)] } } : {};

  const aggregate = PostModel.aggregate([
    { $match: matchStageCommunity },
    { $match: matchStageTags },
    {
      $lookup: {
        from: 'Vote',
        localField: '_id',
        foreignField: 'post',
        as: 'votes',
      },
    },
    {
      $addFields: {
        upvotes: {
          $size: {
            $filter: { input: '$votes', as: 'vote', cond: { $eq: ['$$vote.type', 'UPVOTE'] } },
          },
        },
        downvotes: {
          $size: {
            $filter: { input: '$votes', as: 'vote', cond: { $eq: ['$$vote.type', 'DOWNVOTE'] } },
          },
        },
      },
    },
    {
      $addFields: {
        voteDifference: { $subtract: ['$upvotes', '$downvotes'] },
      },
    },
    {
      $sort: {
        voteDifference: -1,
      },
    },
  ]);

  return connectionFromMongoAggregate({
    aggregate,
    context,
    args: {},
    loader: load as any,
  });
};

export const { Wrapper: Post, getLoader, clearCache, load, loadAll } = Loader;
export default Loader;

registerLoader('PostLoader', getLoader);
