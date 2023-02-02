import { GraphQLID, GraphQLInputObjectType } from 'graphql';

import {
  FILTER_CONDITION_TYPE,
  getObjectId,
} from '@entria/graphql-mongo-helpers';

export const postFilterMapping = {
  community: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (value: string) => value && getObjectId(value),
  },
};

export const PostFilterInputType = new GraphQLInputObjectType({
  name: 'PostFilter',
  description: 'Used to filter posts',
  fields: () => ({
    community: {
      type: GraphQLID,
    },
  }),
});
