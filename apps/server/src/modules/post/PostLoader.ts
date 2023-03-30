import { connectionFromMongoAggregate } from '@entria/graphql-mongoose-loader';
import { createLoader } from '@entria/graphql-mongo-helpers';
import { GraphQLContext } from 'src/graphql/types';

import { registerLoader } from '../loader/loaderRegister';
import { PostFilterMapping } from './PostFilterInputType';
import { PostModel } from './PostModel';
import { ConnectionArguments } from 'graphql-relay';

const Loader = createLoader({
  model: PostModel,
  loaderName: 'PostLoader',
  filterMapping: PostFilterMapping,
  isAggregate: true,
  defaultFilters: (_, args) => (args.filters?.trending ? {} : { orderBy: [{ field: 'createdAt', direction: 1 }] }),
});

export const loadTrendingPosts = async (args: ConnectionArguments, context: GraphQLContext) => {
  const aggregate = PostModel.aggregate([
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
    args,
    loader: load as any,
  });
};

export const { Wrapper: Post, getLoader, clearCache, load, loadAll } = Loader;
export default Loader;

registerLoader('PostLoader', getLoader);
