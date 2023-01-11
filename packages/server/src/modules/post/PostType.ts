import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
} from '@entria/graphql-mongo-helpers';

import { globalIdField } from 'graphql-relay';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';
import { GraphQLContext } from '../../graphql/types';

import { UserConnection } from '../user/UserType';
import UserLoader from '../user/UserLoader';

import { IPostDocument } from './PostModel';
import { load } from './PostLoader';

import { CommunityConnection } from '../community/CommunityType';
import CommunityLoader from '../community/CommunityLoader';

import { VoteModel } from '../vote/VoteModel';

export const PostType = new GraphQLObjectType<IPostDocument, GraphQLContext>({
  name: 'Post',
  fields: () => ({
    id: globalIdField('Post'),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: post => post.title,
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: post => post.content,
    },
    author: {
      type: new GraphQLNonNull(UserConnection.connectionType),
      args: { ...connectionArgs },
      resolve: async (post, _, context) => {
        return UserLoader.load(context, post.author);
      },
    },
    community: {
      type: new GraphQLNonNull(CommunityConnection.connectionType),
      args: { ...connectionArgs },
      resolve: async (post, _, context) => {
        return CommunityLoader.load(context, post.community);
      },
    },
    votesCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async post =>
        (await VoteModel.countVotes({ post: post._id }))?.total,
    },
  }),
  interfaces: () => [nodeInterface],
});

export const PostConnection = connectionDefinitions({
  name: 'PostConnection',
  nodeType: PostType,
});

registerTypeLoader(PostType, load);
