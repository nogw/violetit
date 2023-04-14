import type { RequestParameters } from 'relay-runtime';

enum operationKind {
  MUTATION = 'mutation',
  QUERY = 'query',
}

const isMutation = (request: RequestParameters): boolean => {
  return request.operationKind === operationKind.MUTATION;
};

const isQuery = (request: RequestParameters): boolean => {
  return request.operationKind === operationKind.QUERY;
};

export { isMutation, isQuery };
