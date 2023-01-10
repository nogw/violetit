import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  withFilter,
} from '@entria/graphql-mongo-helpers';

import { globalIdField } from 'graphql-relay';

import { GraphQLContext } from '../../graphql/types';
import { registerTypeLoader, nodeInterface } from '../node/typeRegister';

import { IUserDocument } from './UserModel';
import { load } from './UserLoader';

import { CommunityConnection } from '../community/CommunityType';
import CommunityLoader from '../community/CommunityLoader';

export const UserType = new GraphQLObjectType<IUserDocument, GraphQLContext>({
  name: 'User',
  fields: () => ({
    id: globalIdField(),
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: user => user.username,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: user => user.email,
    },
    communities: {
      type: new GraphQLNonNull(CommunityConnection.connectionType),
      args: { ...connectionArgs },
      resolve: async (user, args, context) =>
        await CommunityLoader.loadAll(
          context,
          withFilter(args, { members: user._id }),
        ),
    },
  }),
  interfaces: () => [nodeInterface],
});

export const UserConnection = connectionDefinitions({
  name: 'UserConnection',
  nodeType: UserType,
});

registerTypeLoader(UserType, load);
