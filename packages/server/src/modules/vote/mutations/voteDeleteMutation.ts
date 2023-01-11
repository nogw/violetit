import { getObjectId } from '@entria/graphql-mongo-helpers';
import { GraphQLID, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { GraphQLContext } from '../../../graphql/types';
import { VoteModel } from '../VoteModel';

// todo: improve outputFields
export const VoteDelete = mutationWithClientMutationId({
  name: 'VoteDelete',
  inputFields: {
    voteId: { type: new GraphQLNonNull(GraphQLID) },
  },
  mutateAndGetPayload: async ({ voteId }, context: GraphQLContext) => {
    if (!context.user) {
      throw new Error('You are not logged in!');
    }

    const voteFound = await VoteModel.findOneAndDelete({
      _id: getObjectId(voteId),
    });

    if (!voteFound) {
      throw new Error("This vote doesn't exist");
    }

    return {
      voteId: voteFound._id,
    };
  },
  outputFields: {},
});
