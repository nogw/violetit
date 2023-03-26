import { connectionDefinitions, timestampResolver } from '@entria/graphql-mongo-helpers';
import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';
import { GraphQLContext } from '../../graphql/types';

import { UserType } from '../user/UserType';
import UserLoader from '../user/UserLoader';

import { IPostDocument } from './PostModel';
import PostLoader from './PostLoader';

import { CommunityType } from '../community/CommunityType';
import CommunityLoader from '../community/CommunityLoader';

import { VoteModel } from '../vote/VoteModel';
import { VoteType } from '../vote/VoteType';
import VoteLoader from '../vote/VoteLoader';

import { TagType } from '../tag/TagType';
import TagLoader from '../tag/TagLoader';

export const PostType = new GraphQLObjectType<IPostDocument, GraphQLContext>({
  name: 'Post',
  fields: () => ({
    id: globalIdField('Post'),
    ...timestampResolver,
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: post => post.title,
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: post => post.content,
    },
    // TODO:  It should be a connection pagination
    tags: {
      type: new GraphQLList(TagType),
      resolve: (post, _, context) => {
        if (!post.tags) return [];
        return post.tags.map(tag => TagLoader.load(context, tag));
      },
    },
    author: {
      type: UserType,
      resolve: (post, _, context) => {
        return UserLoader.load(context, post.author);
      },
    },
    community: {
      type: CommunityType,
      resolve: (post, _, context) => {
        return CommunityLoader.load(context, post.community);
      },
    },
    votesCount: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: async post => {
        return (await VoteModel.countVotes({ post: post._id }))?.total;
      },
    },
    meHasVoted: {
      type: VoteType,
      resolve: async (post, _, context) => {
        if (!context.user?._id) return null;

        const vote = await VoteModel.findOne({
          post: post._id,
          user: context.user._id,
        });

        if (!vote) return null;

        return VoteLoader.load(context, vote._id);
      },
    },
  }),
  interfaces: () => [nodeInterface],
});

export const PostConnection = connectionDefinitions({
  name: 'Post',
  nodeType: PostType,
});

registerTypeLoader(PostType, PostLoader.load);
