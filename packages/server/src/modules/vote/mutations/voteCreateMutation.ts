import { GraphQLEnumType, GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { getObjectId } from '@entria/graphql-mongo-helpers';

import { GraphQLContext } from '../../../graphql/types';

import { PostModel } from '../../post/PostModel';
import { PostType } from '../../post/PostType';

import { VoteConnection } from '../VoteType';
import { VoteModel } from '../VoteModel';
import VoteLoader from '../VoteLoader';

export const VoteCreate = mutationWithClientMutationId({
  name: 'VoteCreate',
  inputFields: {
    postId: { type: new GraphQLNonNull(GraphQLString) },
    type: {
      type: new GraphQLEnumType({
        name: 'VoteType',
        values: {
          UPVOTE: { value: 'UPVOTE' },
          DOWNVOTE: { value: 'DOWNVOTE' },
        },
      }),
    },
  },
  mutateAndGetPayload: async ({ postId, type }, context: GraphQLContext) => {
    if (!context?.user) {
      throw new Error('You are not logged in!');
    }

    const postFound = await PostModel.findById(getObjectId(postId));

    if (!postFound) {
      throw new Error("This post doesn't exist");
    }

    const hasVoted = await VoteModel.findOne({
      ...{ post: postFound._id },
      user: context.user._id,
    });

    if (hasVoted) {
      if (hasVoted.type !== type) {
        await VoteModel.findByIdAndUpdate(hasVoted._id, {
          type,
        });
      }

      return {
        userId: context.user._id,
        voteId: hasVoted._id,
        postId: postFound._id,
      };
    }

    const vote = await new VoteModel({
      ...{ post: postFound._id },
      user: context.user._id,
      type,
    }).save();

    return {
      userId: context.user._id,
      voteId: vote._id,
      postId: postFound._id,
    };
  },
  outputFields: {
    post: {
      type: PostType,
      resolve: async ({ postId }) => await PostModel.findById(postId),
    },
    vote: {
      type: VoteConnection.edgeType,
      resolve: async ({ voteId }, _, context) => {
        const vote = await VoteLoader.load(context, voteId);

        if (!vote) {
          return null;
        }

        return {
          cursor: toGlobalId('Vote', vote._id),
          node: vote,
        };
      },
    },
  },
});
