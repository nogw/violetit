import { getObjectId, successField } from '@entria/graphql-mongo-helpers';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { GraphQLContext } from '../../../graphql/types';
import { errorField } from '../../error-field/ErrorField';
import { fieldError } from '../../../utils/fieldError';

import { CommunityModel } from '../../community/CommunityModel';
import { TagConnection } from '../TagType';
import { TagModel } from '../TagModel';
import TagLoader from '../TagLoader';

export const tagCreateMutation = mutationWithClientMutationId({
  name: 'TagCreate',
  inputFields: {
    label: { type: new GraphQLNonNull(GraphQLString) },
    color: { type: new GraphQLNonNull(GraphQLString) },
    communityId: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ label, color, communityId }, context: GraphQLContext) => {
    if (!context?.user) {
      return fieldError('credentials', 'You are not logged in!');
    }

    const foundCommunity = await CommunityModel.findById(getObjectId(communityId));

    if (!foundCommunity) {
      return fieldError('community', "This community doesn't exist");
    }

    const foundMemberIdInAdmin = foundCommunity.admin.equals(context.user._id);
    const foundMemberIdInMods = foundCommunity.mods.includes(context.user?._id);

    if (!foundMemberIdInAdmin || !foundMemberIdInMods) {
      return fieldError('community', 'You are not allowed to create tags');
    }

    const tag = await new TagModel({
      label,
      color,
      community: foundCommunity._id,
      createdBy: context.user,
    }).save();

    return {
      id: tag._id,
      success: 'Tag created with success',
    };
  },
  outputFields: () => ({
    tagEdge: {
      type: TagConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const tag = await TagLoader.load(context, id);

        if (!tag) return null;

        return {
          cursor: toGlobalId('Tag', tag._id),
          node: tag,
        };
      },
    },
    ...successField,
    ...errorField,
  }),
});
