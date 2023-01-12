import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../../graphql/types';
import { CommunityModel } from '../../community/CommunityModel';

import { PostModel } from '../PostModel';
import { PostType } from '../PostType';

export const postCreateMutation = mutationWithClientMutationId({
  name: 'PostCreate',
  inputFields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    community: { type: new GraphQLNonNull(GraphQLID) },
  },
  mutateAndGetPayload: async (
    { title, community, ...rest },
    context: GraphQLContext,
  ) => {
    if (!context.user) {
      throw new Error('You are not logged in!');
    }

    const communityFound = await CommunityModel.findById(community);

    if (!communityFound) {
      throw new Error('Community not found');
    }

    const post = await new PostModel({
      ...rest,
      title,
      author: context.user._id,
      community: communityFound._id,
    }).save();

    return {
      post,
    };
  },
  outputFields: () => ({
    post: {
      type: PostType,
      resolve: post => post,
    },
  }),
});
