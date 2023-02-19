import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { getObjectId } from '@entria/graphql-mongo-helpers';

import { GraphQLContext } from '../../../graphql/types';

import { CommunityConnection } from '../CommunityType';
import { CommunityModel } from '../CommunityModel';
import CommunityLoader from '../CommunityLoader';

export const communityExitAsAdmin = mutationWithClientMutationId({
  name: 'CommunityExitAsAdmin',
  inputFields: {
    communityId: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ communityId }, context: GraphQLContext) => {
    if (!context?.user) {
      throw new Error('You are not logged in!');
    }

    const foundCommunity = await CommunityModel.findById(getObjectId(communityId));

    if (!foundCommunity) {
      throw new Error("This community doesn't exist");
    }

    const foundMemberIdInCommunity = foundCommunity.members.includes(context.user?._id);

    const foundCommunityIdInUser = context.user.communities.includes(foundCommunity._id);

    if (!foundMemberIdInCommunity || foundCommunityIdInUser) {
      throw new Error('You are not a member of this community');
    }

    if (foundCommunity.mods.length > 0) {
      await foundCommunity.updateOne({
        admin: foundCommunity.mods[0]._id,
        $pull: {
          mods: foundCommunity.mods[0]._id,
          members: context.user._id,
        },
      });
    } else {
      await foundCommunity.remove();
    }

    await context.user.updateOne({
      $pull: { communities: foundCommunity._id },
    });

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
  }),
});
