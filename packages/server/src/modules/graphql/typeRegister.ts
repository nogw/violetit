import { GraphQLObjectType } from 'graphql';

import { fromGlobalId, nodeDefinitions } from 'graphql-relay';
import { GraphQLContext } from './types';

type Load = (context: GraphQLContext, id: string) => any;

type TypeLoaders = {
  [key: string]: {
    type: GraphQLObjectType;
    load: Load;
  };
};

const getTypeRegister = () => {
  const typeLoaders: TypeLoaders = {};

  const getTypesLoaders = () => typeLoaders;

  const registerTypeLoader = (type: GraphQLObjectType, load: Load) => {
    typeLoaders[type.name] = {
      type,
      load,
    };

    return type;
  };

  const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
    async (globalId, context: GraphQLContext) => {
      const { type, id } = fromGlobalId(globalId);

      const { load } = typeLoaders[type] || { load: null };

      return (load && load(context, id)) || null;
    },

    obj => {
      const { type } = typeLoaders[obj.constructor.name] || { type: null };

      return type.name;
    },
  );

  return {
    registerTypeLoader,
    getTypesLoaders,
    nodeField,
    nodesField,
    nodeInterface,
  };
};

export const { registerTypeLoader, nodeInterface, nodeField, nodesField } =
  getTypeRegister();
