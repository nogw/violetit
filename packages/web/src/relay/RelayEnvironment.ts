import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
  QueryResponseCache,
  RequestParameters,
  CacheConfig,
  Variables,
} from 'relay-runtime';

import { fetchGraphQL } from './fetchGraphQL';

const ONE_MINUTE_IN_MS = 60 * 1000;

enum operationKind {
  MUTATION = 'mutation',
  QUERY = 'query',
}

export const isMutation = (request: RequestParameters): boolean => {
  return request.operationKind === operationKind.MUTATION;
};

export const isQuery = (request: RequestParameters): boolean => {
  return request.operationKind === operationKind.QUERY;
};

export const forceFetch = (cacheConfig: CacheConfig): boolean => {
  return !!(cacheConfig && cacheConfig.force);
};

const responseCache = new QueryResponseCache({
  size: 250,
  ttl: ONE_MINUTE_IN_MS,
});

const cacheHandler: FetchFunction = async (
  operation: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
) => {
  const id = operation.id || '';

  if (isMutation(operation)) {
    responseCache.clear();

    const mutationResult = await fetchGraphQL(operation, variables);

    return mutationResult;
  }

  if (isQuery(operation) && !forceFetch(cacheConfig)) {
    const fromCache = responseCache.get(id, variables);

    if (!fromCache) {
      return Promise.resolve(fromCache);
    }
  }

  const result = await fetchGraphQL(operation, variables);

  if (result) {
    responseCache.set(id, variables, result);
  }

  return result;
};

export const RelayEnvironment = new Environment({
  network: Network.create(cacheHandler),
  store: new Store(new RecordSource()),
});
