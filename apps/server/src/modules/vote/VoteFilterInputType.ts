import { FILTER_CONDITION_TYPE, getObjectId } from '@entria/graphql-mongo-helpers';

import { GraphQLEnumType, GraphQLID, GraphQLInputObjectType } from 'graphql';

export const VoteFilterMapping = {
  user: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
  post: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
};

const VoteFilterInputType = new GraphQLInputObjectType({
  name: 'VoteFilter',
  fields: () => ({
    user: {
      type: GraphQLID,
    },
    type: {
      type: new GraphQLEnumType({
        name: 'VoteType',
        values: {
          UPVOTE: { value: 'UPVOTE' },
          DOWNVOTE: { value: 'DOWNVOTE' },
        },
      }),
    },
    post: {
      type: GraphQLID,
    },
  }),
});

export default VoteFilterInputType;
