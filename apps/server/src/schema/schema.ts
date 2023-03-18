import { GraphQLSchema } from 'graphql';

import { MutationType } from './MutationType';
import { QueryType } from './QueryType';

export const schema = new GraphQLSchema({
  mutation: MutationType,
  query: QueryType,
});
