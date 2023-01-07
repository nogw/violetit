import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import {
  withFilter,
  connectionArgs,
  connectionDefinitions,
} from '@entria/graphql-mongo-helpers';

import { UserConnection } from '../user/UserType';
import UserLoader from '../user/UserLoader';

import { registerTypeLoader, nodeInterface } from '../node/typeRegister';

import { ICommunityDocument } from './CommunityModel';
import { load } from './CommunityLoader';

export const CommunityType = new GraphQLObjectType<ICommunityDocument>({
  name: 'Community',
  fields: () => ({
    id: globalIdField('Community'),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: community => community.name,
    },
    admin: {
      type: new GraphQLNonNull(GraphQLID),
    },
    mods: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLID)),
      resolve: community => community.mods,
    },
    members: {
      type: new GraphQLNonNull(UserConnection.connectionType),
      args: { ...connectionArgs },
      resolve: async (community, args, context) => {
        await UserLoader.loadAll(
          context,
          withFilter(args, { communities: community._id }),
        );
      },
    },
  }),
  interfaces: () => [nodeInterface],
});

export const CommunityConnection = connectionDefinitions({
  name: 'CommunityConnection',
  nodeType: CommunityType,
});

registerTypeLoader(CommunityType, load);
