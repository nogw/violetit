import { GraphQLEnumType, GraphQLID, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../../graphql/types';
import { VoteModel } from '../VoteModel';

import { PostModel } from 'src/modules/post/PostModel';
import { PostType } from 'src/modules/post/PostType';

export const VoteCreate = mutationWithClientMutationId({
  name: 'VoteCreate',
  inputFields: {
    postId: { type: new GraphQLNonNull(GraphQLID) },
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
    if (!context.user) {
      throw new Error('You are not logged in!');
    }

    const postFound = await PostModel.findById(postId);

    if (!postFound) {
      throw new Error("This post doesn't exist");
    }

    const hasVoted = await VoteModel.findOne({
      ...{ post: postFound._id },
      user: context.user._id,
    });

    if (hasVoted) {
      return {
        userId: context.user._id,
        voteId: hasVoted._id,
        postId: postFound._id,
      };
    }

    const vote = await new VoteModel({
      ...{ post: postFound._id },
      author: context.user._id,
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
  },
});
