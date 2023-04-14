import {
  Network,
  Variables,
  CacheConfig,
  FetchFunction,
  ConcreteRequest,
  RequestParameters,
  QueryResponseCache,
} from 'relay-runtime';

import { NetworkWithResponseCache } from './RelayTypes';
import { isMutation, isQuery } from './RelayHelpers';
import { InternalError } from '../utils/error';

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL as string;

async function fetchGraphQL(params: RequestParameters, variables: Variables, headers?: HeadersInit) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...headers,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  const json = await response.json();

  if (Array.isArray(json.errors)) {
    const errorStr = JSON.stringify(json.errors);
    const variableStr = JSON.stringify(json.variables);

    throw new InternalError(`GraphQL: Error fetching "${params.name}" with variables "${variableStr}": ${errorStr}`);
  }

  return json;
}

const ONE_MINUTE_IN_MS = 60 * 1000;

function createNetwork() {
  const responseCache = new QueryResponseCache({
    size: 100,
    ttl: ONE_MINUTE_IN_MS,
  });

  const cacheHandler: FetchFunction = async (
    operation: RequestParameters,
    variables: Variables,
    cacheConfig: CacheConfig,
  ) => {
    const queryId = operation.text || '';
    const forceFetch = cacheConfig && cacheConfig.force;

    if (isMutation(operation)) {
      responseCache.clear();
      return fetchGraphQL(operation, variables);
    }

    if (isQuery(operation) && !forceFetch) {
      const fromCache = responseCache.get(queryId, variables);
      if (fromCache !== null) {
        return Promise.resolve(fromCache);
      }
    }

    const response = await fetchGraphQL(operation, variables);

    if (response) {
      responseCache.set(queryId, variables, response);
    }

    return response;
  };

  const network = Network.create(cacheHandler) as NetworkWithResponseCache;
  network.responseCache = responseCache;

  return network;
}

async function getPreloadedQuery({ params }: ConcreteRequest, variables: Variables, headers?: HeadersInit) {
  const response = await fetchGraphQL(params, variables, headers);

  return {
    params,
    variables,
    response,
  };
}

export { createNetwork, getPreloadedQuery };
