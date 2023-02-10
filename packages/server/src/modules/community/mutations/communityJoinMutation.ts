import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLID } from 'graphql';
import { getObjectId } from '@entria/graphql-mongo-helpers';

import { GraphQLContext } from '../../../graphql/types';

import { CommunityConnection } from '../CommunityType';
import { CommunityModel } from '../CommunityModel';
import CommunityLoader from '../CommunityLoader';

export const communityJoin = mutationWithClientMutationId({
  name: 'CommunityJoin',
  inputFields: {
    communityId: { type: new GraphQLNonNull(GraphQLID) },
  },
  mutateAndGetPayload: async ({ communityId }, context: GraphQLContext) => {
    if (!context.user) {
      throw new Error('You are not logged in!');
    }

    const foundCommunity = await CommunityModel.findById(getObjectId(communityId));

    if (!foundCommunity) {
      throw new Error("This community doesn't exist");
    }

    const foundMemberIdInCommunity = foundCommunity.members.some(community => community.equals(context.user?._id));

    // const foundCommunityIdInUser = context.user.communities.some(community => community.equals(foundCommunity._id));

    if (
      foundMemberIdInCommunity
      // || foundCommunityIdInUser
    ) {
      // // eslint-disable-next-line
      // console.log(foundCommunity._id);
      // // eslint-disable-next-line
      // console.log(context.user._id);
      // // eslint-disable-next-line
      // console.log(context.user.communities);
      throw new Error('You are already a member of this foundCommunity');
    }

    await Promise.all([
      foundCommunity.updateOne({
        $addToSet: { members: [...foundCommunity.members, context.user._id] },
      }),
      context.user.updateOne({
        $addToSet: { communities: [...(context.user.communities || []), foundCommunity._id] },
      }),
    ]);

    return {
      userId: context.user._id,
      communityId: foundCommunity._id,
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
