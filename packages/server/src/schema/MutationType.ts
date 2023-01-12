import { GraphQLObjectType } from 'graphql';

import * as userMutations from '../modules/user/mutations';
import * as communityMutations from '../modules/community/mutations';
import * as postMutations from '../modules/post/mutations';
import * as voteMutations from '../modules/vote/mutations';

export const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Root of all mutations',
  fields: () => ({
    ...userMutations,
    ...communityMutations,
    ...postMutations,
    ...voteMutations,
  }),
});
