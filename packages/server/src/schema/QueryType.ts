import { GraphQLObjectType } from 'graphql';

import * as userQueries from '../modules/user/queries';

export const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Root of all queries',
  fields: () => ({
    ...userQueries,
  }),
});
