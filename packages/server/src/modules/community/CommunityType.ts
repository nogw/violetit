import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLBoolean } from 'graphql';

import {
  withFilter,
  connectionArgs,
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
} from '@entria/graphql-mongo-helpers';

import { globalIdField } from 'graphql-relay';

import { GraphQLContext } from '../../graphql/types';
import { registerTypeLoader, nodeInterface } from '../node/typeRegister';

import { ICommunityDocument } from './CommunityModel';
import { load } from './CommunityLoader';

import { UserConnection } from '../user/UserType';
import UserLoader from '../user/UserLoader';

export const CommunityType = new GraphQLObjectType<ICommunityDocument, GraphQLContext>({
  name: 'Community',
  fields: () => ({
    id: globalIdField('Community'),
    ...objectIdResolver,
    ...timestampResolver,
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: community => community.name,
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: community => community.title,
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
        return await UserLoader.loadAll(context, withFilter(args, { communities: community._id }));
      },
    },
    joined: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: async (community, _, context) => {
        if (!context?.user) {
          return false;
        }

        return community.members.some(member => member.equals(context.user?._id));
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
