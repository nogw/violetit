import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { GraphQLContext } from '../../../graphql/types';

import { CommunityConnection } from '../CommunityType';
import { CommunityModel } from '../CommunityModel';
import CommunityLoader from '../CommunityLoader';

export const communityCreate = mutationWithClientMutationId({
  name: 'CommunityCreate',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ name, ...rest }, context: GraphQLContext) => {
    if (!context.user) {
      throw new Error('You are not logged in!');
    }

    const foundCommunity = await CommunityModel.findOne({
      name: name,
    });

    if (foundCommunity) {
      throw new Error('A community with this name has already been created');
    }

    const community = new CommunityModel({
      ...rest,
      name,
      admin: context.user,
      members: context.user,
    });

    await Promise.all([
      community.save(),
      context.user.updateOne({
        $addToSet: { communities: community._id },
      }),
    ]);

    return {
      id: community._id,
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
