import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';

import {
  connectionDefinitions,
  timestampResolver,
} from '@entria/graphql-mongo-helpers';

import { globalIdField } from 'graphql-relay';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';
import { GraphQLContext } from '../../graphql/types';

import { UserType } from '../user/UserType';
import UserLoader from '../user/UserLoader';

import { IPostDocument } from './PostModel';
import { load } from './PostLoader';

import { CommunityType } from '../community/CommunityType';
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
      type: UserType,
      resolve: ({ author }, _, context) => UserLoader.load(context, author),
    },
    community: {
      type: CommunityType,
      resolve: ({ community }, _, context) =>
        CommunityLoader.load(context, community),
    },
    votesCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async post =>
        (await VoteModel.countVotes({ post: post._id }))?.total,
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export const PostConnection = connectionDefinitions({
  name: 'PostConnection',
  nodeType: PostType,
});

registerTypeLoader(PostType, load);
