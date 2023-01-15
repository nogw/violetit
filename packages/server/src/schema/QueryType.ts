import { GraphQLObjectType } from 'graphql';

import { nodeField, nodesField } from '../modules/node/typeRegister';

import { UserType } from '../modules/user/UserType';
import UserLoader from '../modules/user/UserLoader';

// import * as userQueries from '../modules/user/queries';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of all queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    me: {
      type: UserType,
      resolve: (root, args, context) =>
        UserLoader.load(context, context.user?._id),
    },
    // ...userQueries,
  }),
});
