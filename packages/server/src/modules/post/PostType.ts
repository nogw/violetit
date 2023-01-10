import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
} from '@entria/graphql-mongo-helpers';

import { globalIdField } from 'graphql-relay';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';
import { GraphQLContext } from '../../graphql/types';

import { UserConnection } from '../user/UserType';
import UserLoader from '../user/UserLoader';

import { IPost } from './PostModel';
import { load } from './PostLoader';

import { CommunityConnection } from '../community/CommunityType';
import CommunityLoader from '../community/CommunityLoader';

const PostType = new GraphQLObjectType<IPost, GraphQLContext>({
  name: 'Post',
  fields: () => ({
    id: globalIdField('Post'),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: post => post.title,
    },
    content: {
      type: GraphQLString,
      resolve: post => post.content,
    },
    author: {
      type: new GraphQLNonNull(UserConnection.connectionType),
      args: { ...connectionArgs },
      resolve: async ({ author }, _, context) => {
        return UserLoader.load(context, author);
      },
    },
    community: {
      type: new GraphQLNonNull(CommunityConnection.connectionType),
      args: { ...connectionArgs },
      resolve: async ({ community }, _, context) => {
        return CommunityLoader.load(context, community);
      },
    },
  }),
  interfaces: () => [nodeInterface],
});

export const PostConnection = connectionDefinitions({
  name: 'PostConnection',
  nodeType: PostType,
});

registerTypeLoader(PostType, load);
