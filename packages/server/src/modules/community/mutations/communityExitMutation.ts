import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../../graphql/types';
import { CommunityModel } from '../CommunityModel';
import { CommunityType } from '../CommunityType';

export const communityExit = mutationWithClientMutationId({
  name: 'CommunityExit',
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

    if (communityFound.admin.equals(context.user._id)) {
      throw new Error(
        'You are the community admin, use communityExitAsAdmin to exit',
      );
    }

    // todo: delete user in mods?
    await Promise.all([
      communityFound.updateOne({ $pull: { members: context.user._id } }),
      context.user.updateOne({ $pull: { members: context.user._id } }),
    ]);

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
