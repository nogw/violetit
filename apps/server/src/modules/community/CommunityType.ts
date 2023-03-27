import {
  withFilter,
  connectionArgs,
  connectionDefinitions,
  objectIdResolver,
  timestampResolver,
} from '@entria/graphql-mongo-helpers';
import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { registerTypeLoader, nodeInterface } from '../node/typeRegister';
import { GraphQLContext } from '../../graphql/types';

import { ICommunityDocument } from './CommunityModel';
import CommunityLoader from './CommunityLoader';

import { UserConnection } from '../user/UserType';
import UserLoader from '../user/UserLoader';

import { TagConnection } from '../tag/TagType';
import TagLoader from '../tag/TagLoader';

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
    tags: {
      type: new GraphQLNonNull(TagConnection.connectionType),
      args: { ...connectionArgs },
      resolve: async (community, args, context) => {
        return await TagLoader.loadAll(context, withFilter(args, { community: community._id }));
      },
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

registerTypeLoader(CommunityType, CommunityLoader.load);
