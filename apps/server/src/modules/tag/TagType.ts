import { connectionDefinitions, objectIdResolver, timestampResolver } from '@entria/graphql-mongo-helpers';
import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';
import { GraphQLContext } from '../../graphql/types';

import { ITagDocument } from './TagModel';
import TagLoader from './TagLoader';

import { CommunityType } from '../community/CommunityType';
import CommunityLoader from '../community/CommunityLoader';

export const TagType = new GraphQLObjectType<ITagDocument, GraphQLContext>({
  name: 'Tag',
  fields: () => ({
    id: globalIdField('Tag'),
    label: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ label }) => label,
    },
    color: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ color }) => color,
    },
    community: {
      type: CommunityType,
      resolve: ({ community }, _, context) => CommunityLoader.load(context, community),
    },
    ...objectIdResolver,
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

export const TagConnection = connectionDefinitions({
  name: 'Tag',
  nodeType: TagType,
});

registerTypeLoader(TagType, TagLoader.load);
