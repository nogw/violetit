import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../../graphql/types';

import { CommunityModel } from '../CommunityModel';
import { CommunityType } from '../CommunityType';

export const communityExitAsAdmin = mutationWithClientMutationId({
  name: 'CommunityExitAsAdmin',
  inputFields: {
    community: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ community }, context: GraphQLContext) => {
    if (!context.user) {
      throw new Error('You are not logged in!');
    }

    const communityFound = await CommunityModel.findOne({ name: community });

    if (!communityFound) {
      throw new Error("This community doesn't exist");
    }

    const foundMemberIdInCommunity = community.member.includes(
      context.user._id,
    );

    const foundCommunityIdInUser = context.user.communities.includes(
      community._id,
    );

    if (foundMemberIdInCommunity || foundCommunityIdInUser) {
      throw new Error('You are not a member of this community');
    }

    if (communityFound.mods.length > 0) {
      await communityFound.updateOne({
        admin: communityFound.mods[0]._id,
        $pull: {
          mods: communityFound.mods[0]._id,
          members: context.user._id,
        },
      });
    } else {
      await communityFound.remove();
    }

    await context.user.updateOne({
      $pull: { communities: communityFound._id },
    });

    return {
      userId: context.user._id,
      communityId: communityFound._id,
    };
  },
  outputFields: () => ({
    community: {
      type: CommunityType,
      resolve: async ({ communityId }) =>
        await CommunityModel.findById(communityId),
    },
  }),
});
