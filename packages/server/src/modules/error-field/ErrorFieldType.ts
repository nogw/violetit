import { GraphQLObjectType, GraphQLString } from 'graphql';

import { GraphQLContext } from '../../graphql/types';
import { FieldError } from '../../utils/fieldError';

export const FieldErrorType = new GraphQLObjectType<FieldError, GraphQLContext>({
  name: 'FieldError',
  fields: () => ({
    field: {
      type: GraphQLString,
      resolve: ({ field }) => field,
    },
    message: {
      type: GraphQLString,
      resolve: ({ message }) => message,
    },
  }),
});
