import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { connectionArgs } from '@entria/graphql-mongo-helpers';

import { nodeField, nodesField } from '../modules/node/typeRegister';

import { PostFilterInputType } from '../modules/post/PostFilterInputType';
import { PostConnection } from '../modules/post/PostType';
import PostLoader from '../modules/post/PostLoader';

import { CommunityConnection } from '../modules/community/CommunityType';
import CommunityLoader from '../modules/community/CommunityLoader';

import { UserType } from '../modules/user/UserType';
import UserLoader from '../modules/user/UserLoader';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of all queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,

    me: {
      type: UserType,
      resolve: (_root, _args, context) => {
        return UserLoader.load(context, context.user?._id);
      },
    },

    communities: {
      type: new GraphQLNonNull(CommunityConnection.connectionType),
      description: 'Connection to all communities',
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context) =>
        CommunityLoader.loadAll(context, args),
    },

    posts: {
      type: new GraphQLNonNull(PostConnection.connectionType),
      description: 'Connection to all posts',
      args: {
        ...connectionArgs,
        filters: {
          type: PostFilterInputType,
        },
      },
      resolve: async (_, args, context) => PostLoader.loadAll(context, args),
    },
  }),
});
