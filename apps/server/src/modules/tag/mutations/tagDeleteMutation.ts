import { getObjectId, successField } from '@entria/graphql-mongo-helpers';
import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLString } from 'graphql';

import { GraphQLContext } from '../../../graphql/types';
import { fieldError } from '../../../utils/fieldError';
import { errorField } from '../../error-field/ErrorField';

import { CommunityModel } from '../../community/CommunityModel';
import { TagModel } from '../TagModel';

export const tagDeleteMutation = mutationWithClientMutationId({
  name: 'TagDelete',
  inputFields: {
    tagId: { type: new GraphQLNonNull(GraphQLString) },
    communityId: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ tagId, communityId }, context: GraphQLContext) => {
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

    await TagModel.findOneAndDelete({ _id: tagId });

    return {
      success: 'Tag deleted with success',
    };
  },
  outputFields: () => ({
    ...successField,
    ...errorField,
  }),
});
