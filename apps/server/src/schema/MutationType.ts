import { GraphQLObjectType } from 'graphql';

import * as userMutations from '../modules/user/mutations';
import * as communityMutations from '../modules/community/mutations';
import * as postMutations from '../modules/post/mutations';
import * as voteMutations from '../modules/vote/mutations';
import * as tagMutations from '../modules/tag/mutations';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root of all mutations',
  fields: () => ({
    ...communityMutations,
    ...userMutations,
    ...postMutations,
    ...voteMutations,
    ...tagMutations,
  }),
});
