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

type postCreateArgs = {
  tags: string[];
  title: string;
  content: string;
  community: string;
};

export const postCreate = mutationWithClientMutationId({
  name: 'PostCreate',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    community: {
      type: new GraphQLNonNull(GraphQLString),
    },
    tags: {
      type: new GraphQLList(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ tags, community, ...rest }: postCreateArgs, context: GraphQLContext) => {
    if (!context?.user) {
      return fieldError('credentials', 'You are not logged in!');
    }

    const communityFound = await CommunityModel.findById(getObjectId(community));

    if (!communityFound) {
      return fieldError('community', 'Community not found!');
    }

    const tagsObjectId = tags.map(id => getObjectId(id));

    const postCreated = await new PostModel({
      tags: tagsObjectId,
      author: context.user._id,
      community: communityFound._id,
      ...rest,
    }).save();

    return {
      id: postCreated._id,
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
