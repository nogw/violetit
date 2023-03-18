import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { successField, getObjectId } from '@entria/graphql-mongo-helpers';

import { errorField } from '../../error-field/ErrorField';
import { fieldError } from '../../../utils/fieldError';

import { GraphQLContext } from '../../../graphql/types';

import { CommunityConnection } from '../CommunityType';
import { CommunityModel } from '../CommunityModel';
import CommunityLoader from '../CommunityLoader';

export const communityExit = mutationWithClientMutationId({
  name: 'CommunityExit',
  inputFields: {
    communityId: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ communityId }, context: GraphQLContext) => {
    if (!context?.user) {
      return fieldError('credentials', 'You are not logged in!');
    }

    const foundCommunity = await CommunityModel.findById(getObjectId(communityId));

    if (!foundCommunity) {
      return fieldError('community', "This community doesn't exist");
    }

    const foundMemberIdInCommunity = foundCommunity.members.includes(context.user?._id);
    const foundCommunityIdInUser = context.user.communities.includes(foundCommunity._id);

    if (!foundMemberIdInCommunity || !foundCommunityIdInUser) {
      return fieldError('community', 'You are not a member of this community');
    }

    if (foundCommunity.admin.equals(context.user._id)) {
      return fieldError('community', 'You are the community admin, use communityExitAsAdmin to exit');
    }

    const foundMemberIdInCommunityMods = foundCommunity.mods.includes(context.user?._id);

    if (foundMemberIdInCommunityMods) {
      await foundCommunity.updateOne({ $pull: { mods: context.user._id } });
    }

    await Promise.all([
      foundCommunity.updateOne({ $pull: { members: context.user._id } }),
      context.user.updateOne({ $pull: { communities: foundCommunity._id } }),
    ]);

    return {
      id: foundCommunity._id,
    };
  },
  outputFields: () => ({
    communityEdge: {
      type: CommunityConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const community = await CommunityLoader.load(context, id);

        if (!community) {
          return null;
        }

        return {
          cursor: toGlobalId('Community', community._id),
          node: community,
        };
      },
    },
    ...errorField,
    ...successField,
  }),
});
