import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../../graphql/types';
import { CommunityModel } from '../CommunityModel';
import { CommunityType } from '../CommunityType';

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

    const communityFound = await CommunityModel.findOne({
      name: name,
    });

    if (communityFound) {
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
      community,
    };
  },
  outputFields: () => ({
    community: {
      type: CommunityType,
      resolve: ({ community }) => community,
    },
  }),
});
