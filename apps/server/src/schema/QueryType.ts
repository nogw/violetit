import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs } from '@entria/graphql-mongo-helpers';
import { fromGlobalId } from 'graphql-relay';

import { nodeField, nodesField } from '../modules/node/typeRegister';
import { UserType } from '../modules/user/UserType';
import UserLoader from '../modules/user/UserLoader';

import { PostFiltersInputType } from '../modules/post/PostFilterInputType';
import { PostConnection } from '../modules/post/PostType';
import PostLoader from '../modules/post/PostLoader';

import { CommunityConnection, CommunityType } from '../modules/community/CommunityType';
import { CommunityFiltersInputType } from '../modules/community/CommunityFilterInputType';
import CommunityLoader from '../modules/community/CommunityLoader';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of all queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    me: {
      type: UserType,
      description: 'Logged user',
      resolve: (_root, _args, context) => {
        return UserLoader.load(context, context.user?._id);
      },
    },
    community: {
      type: CommunityType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_, { id }, ctx) => {
        const community = fromGlobalId(id);
        return CommunityLoader.load(ctx, community.id);
      },
    },
    communities: {
      type: new GraphQLNonNull(CommunityConnection.connectionType),
      description: 'Connection to all communities',
      args: {
        ...connectionArgs,
        filters: {
          type: CommunityFiltersInputType,
        },
      },
      resolve: async (_, args, context) => {
        return CommunityLoader.loadAll(context, args);
      },
    },
    posts: {
      type: new GraphQLNonNull(PostConnection.connectionType),
      description: 'Connection to all posts',
      args: {
        ...connectionArgs,
        filters: {
          type: PostFiltersInputType,
        },
      },
      resolve: async (_, args, context) => {
        return PostLoader.loadAll(context, args);
      },
    },
  }),
});
