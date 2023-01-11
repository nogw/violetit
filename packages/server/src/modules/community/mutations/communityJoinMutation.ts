import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../../graphql/types';

import { CommunityModel } from '../CommunityModel';
import { CommunityType } from '../CommunityType';

export const communityJoin = mutationWithClientMutationId({
  name: 'CommunityJoin',
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
      throw new Error('You are already a mem of this community');
    }

    await Promise.all([
      community.updateOne({
        $addToSet: { members: [...community.members, context.user._id] },
      }),
      context.user.updateOne({
        $addToSet: {
          communities: [...(context.user.communities || []), community._id],
        },
      }),
    ]);

    return {
      userId: context.user._id,
      communityId: community._id,
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
