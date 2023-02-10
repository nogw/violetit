import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { timestampResolver } from '@entria/graphql-mongo-helpers';
import { connectionDefinitions, globalIdField } from 'graphql-relay';

import { GraphQLContext } from '../../graphql/types';
import { nodeInterface, registerTypeLoader } from '../node/typeRegister';
import { IVote } from './VoteModel';
import { load } from './VoteLoader';

export const VoteType = new GraphQLObjectType<IVote, GraphQLContext>({
  name: 'Vote',
  fields: () => ({
    id: globalIdField('Vote'),
    ...timestampResolver,
    type: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: vote => vote.type,
    },
    post: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: vote => vote.post,
    },
    user: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: vote => vote.user,
    },
  }),
  interfaces: () => [nodeInterface],
});

export const VoteConnection = connectionDefinitions({
  name: 'VoteConnection',
  nodeType: VoteType,
});

registerTypeLoader(VoteType, load);
