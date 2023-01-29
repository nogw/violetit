import { GraphQLFieldConfig, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { connectionArgs } from '@entria/graphql-mongo-helpers';

import { nodeField, nodesField } from '../modules/node/typeRegister';

import { PostConnection } from '../modules/post/PostType';
import PostLoader from '../modules/post/PostLoader';

import { CommunityConnection } from '../modules/community/CommunityType';
import CommunityLoader from '../modules/community/CommunityLoader';

import * as userQueries from '../modules/user/queries';

const posts: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLNonNull(PostConnection.connectionType),
  args: {
    ...connectionArgs,
  },
  resolve: async (_, args, context) => PostLoader.loadAll(context, args),
};

const communities: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLNonNull(CommunityConnection.connectionType),
  args: {
    ...connectionArgs,
  },
  resolve: async (_, args, context) => CommunityLoader.loadAll(context, args),
};

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of all queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    communities,
    posts,
    ...userQueries,
  }),
});
