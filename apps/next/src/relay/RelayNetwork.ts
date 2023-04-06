import { CacheConfig, FetchFunction, QueryResponseCache, RequestParameters, Variables } from 'relay-runtime';

import { getAuthToken } from '@/utils/storage';
import { GRAPHQL_URL } from '@/config/env';

enum operationKind {
  MUTATION = 'mutation',
  QUERY = 'query',
}

const ONE_MINUTE_IN_MS = 60 * 1000;

const isMutation = (request: RequestParameters): boolean => {
  return request.operationKind === operationKind.MUTATION;
};

const isQuery = (request: RequestParameters): boolean => {
  return request.operationKind === operationKind.QUERY;
};

const forceFetch = (cacheConfig: CacheConfig): boolean => {
  return !!(cacheConfig && cacheConfig.force);
};

const fetchGraphQL = async (params: RequestParameters, variables: Variables) => {
  const token = getAuthToken();

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: token || '',
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  const json = await response.json();

  return json;
};

const responseCache = new QueryResponseCache({
  size: 250,
  ttl: ONE_MINUTE_IN_MS,
});

export const cacheHandler: FetchFunction = async (
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
