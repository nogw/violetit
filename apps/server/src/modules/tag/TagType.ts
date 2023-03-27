import { GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';

import { GraphQLContext } from '../../graphql/types';

import { ITagDocument } from './TagModel';
import TagLoader from './TagLoader';
import { timestampResolver } from '@entria/graphql-mongo-helpers';
import { UserType } from '../user/UserType';
import UserLoader from '../user/UserLoader';
import CommunityLoader from '../community/CommunityLoader';
import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

export const TagType = new GraphQLObjectType<ITagDocument, GraphQLContext>({
  name: 'Tag',
  fields: () => ({
    id: globalIdField('Tag'),
    ...timestampResolver,
    label: {
      type: GraphQLString,
      resolve: ({ label }) => label,
    },
    color: {
      type: GraphQLString,
      resolve: ({ color }) => color,
    },
    community: {
      type: UserType,
      resolve: ({ community }, _, context) => CommunityLoader.load(context, community),
    },
    createdBy: {
      type: UserType,
      resolve: ({ createdBy }, _, context) => UserLoader.load(context, createdBy),
    },
  }),
  interfaces: () => [nodeInterface],
});

export const TagConnection = connectionDefinitions({
  name: 'TagConnection',
  nodeType: TagType,
});

registerTypeLoader(TagType, TagLoader.load);
