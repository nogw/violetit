import { connectionDefinitions, connectionArgs, withFilter, timestampResolver } from '@entria/graphql-mongo-helpers';
import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { registerTypeLoader, nodeInterface } from '../node/typeRegister';
import { GraphQLContext } from '../../graphql/types';

import { IUserDocument } from './UserModel';
import UserLoader from './UserLoader';

import { CommunityConnection } from '../community/CommunityType';
import CommunityLoader from '../community/CommunityLoader';

export const UserType = new GraphQLObjectType<IUserDocument, GraphQLContext>({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
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
      resolve: async (user, args, context) => {
        return CommunityLoader.loadAll(context, withFilter(args, { members: user._id }));
      },
    },
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});

registerTypeLoader(UserType, UserLoader.load);
