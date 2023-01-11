import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { CommunityModel } from 'src/modules/community/CommunityModel';

import { GraphQLContext } from '../../../graphql/types';

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
    { title, content, community },
    context: GraphQLContext,
  ) => {
    if (!context.user) {
      throw new Error('You are not logged in!');
    }

    const communityById = await CommunityModel.findById(community);

    if (!communityById) {
      throw new Error('Community not found');
    }

    const post = await new PostModel({
      title,
      content,
      author: context.user._id,
      community: communityById._id,
    }).save();

    return { post };
  },
  outputFields: () => ({
    post: {
      type: PostType,
      resolve: post => post,
    },
  }),
});
