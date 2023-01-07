import { GraphQLObjectType } from 'graphql';

import * as userMutations from '../modules/user/mutations';

export const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Root of all mutations',
  fields: () => ({
    ...userMutations,
  }),
});
