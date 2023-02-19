import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { GraphQLContext } from '../../../graphql/types';
import { CommunityModel } from '../../community/CommunityModel';

import { PostConnection } from '../PostType';
import { PostModel } from '../PostModel';
import PostLoader from '../PostLoader';
import { getObjectId } from '@entria/graphql-mongo-helpers';

export const postCreateMutation = mutationWithClientMutationId({
  name: 'PostCreate',
  inputFields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    community: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ title, community, ...rest }, context: GraphQLContext) => {
    if (!context?.user) {
      throw new Error('You are not logged in!');
    }

    const communityFound = await CommunityModel.findById(getObjectId(community));

    if (!communityFound) {
      throw new Error('Community not found!');
    }

    const post = await new PostModel({
      title,
      author: context.user._id,
      community: communityFound._id,
      ...rest,
    }).save();

    return {
      id: post._id,
    };
  },
  outputFields: () => ({
    postEdge: {
      type: PostConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        // temp-anno: load new edge from loader
        const post = await PostLoader.load(context, id);
        // temp-anno: returns null if no node was loaded
        if (!post) {
          return null;
        }

        return {
          cursor: toGlobalId('Post', post._id),
          node: post,
        };
      },
    },
  }),
});
