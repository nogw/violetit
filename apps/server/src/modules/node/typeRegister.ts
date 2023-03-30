import { fromGlobalId, nodeDefinitions } from 'graphql-relay';
import { GraphQLObjectType, GraphQLTypeResolver } from 'graphql';

import { GraphQLContext } from '../../graphql/types';

type Load = (context: GraphQLContext, id: string) => any;

type TypeLoaders = {
  [key: string]: {
    type: GraphQLObjectType;
    load: Load;
  };
};

const getTypeRegister = () => {
  const typesLoaders: TypeLoaders = {};

  const getTypesLoaders = () => typesLoaders;

  const registerTypeLoader = (type: GraphQLObjectType, load: Load) => {
    typesLoaders[type.name] = {
      type,
      load,
    };

    return type;
  };

  const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
    (globalId: string, context: GraphQLContext) => {
      const { type, id } = fromGlobalId(globalId);

      const { load } = typesLoaders[type] || { load: null };

      return (load && load(context, id)) || null;
    },
    (obj: GraphQLTypeResolver<unknown, GraphQLContext>) => {
      const { type } = typesLoaders[obj.constructor.name] || { type: null };

      return type.name;
    },
  );

  return {
    registerTypeLoader,
    getTypesLoaders,
    nodeInterface,
    nodesField,
    nodeField,
  };
};

const { registerTypeLoader, nodeField, nodesField, nodeInterface } = getTypeRegister();

export { registerTypeLoader, nodeField, nodesField, nodeInterface };
