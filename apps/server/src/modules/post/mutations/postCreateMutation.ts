import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { successField, getObjectId } from '@entria/graphql-mongo-helpers';

import { errorField } from '../../error-field/ErrorField';
import { fieldError } from '../../../utils/fieldError';

import { GraphQLContext } from '../../../graphql/types';
import { CommunityModel } from '../../community/CommunityModel';

import { PostConnection } from '../PostType';
import { PostModel } from '../PostModel';
import PostLoader from '../PostLoader';

export const postCreate = mutationWithClientMutationId({
  name: 'PostCreate',
  inputFields: {
    tags: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    community: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ title, community, ...rest }, context: GraphQLContext) => {
    if (!context?.user) {
      return fieldError('credentials', 'You are not logged in!');
    }

    const communityFound = await CommunityModel.findById(getObjectId(community));

    if (!communityFound) {
      return fieldError('community', 'Community not found!');
    }

    const post = await new PostModel({
      title,
      author: context.user._id,
      community: communityFound._id,
      ...rest,
    }).save();

    return {
      id: post._id,
      success: 'Post created with success',
    };
  },
  outputFields: () => ({
    postEdge: {
      type: PostConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const post = await PostLoader.load(context, id);

        if (!post) return null;

        return {
          cursor: toGlobalId('Post', post._id),
          node: post,
        };
      },
    },
    ...errorField,
    ...successField,
  }),
});
