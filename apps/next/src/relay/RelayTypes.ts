import { PreloadedQuery, Variables } from 'react-relay';
import { QueryResponseCache } from 'relay-runtime';

import type { GraphQLResponse, OperationType, RequestParameters } from 'relay-runtime';
import type { Network } from 'relay-runtime/lib/network/RelayNetworkTypes';

export type QueryRefs<T extends OperationType = OperationType> = Record<string, PreloadedQuery<T>>;

export type PreloadedQueries = Record<
  string,
  {
    params: RequestParameters;
    response: GraphQLResponse;
    variables: Variables;
  }
>;

export type NetworkWithResponseCache = Network & {
  responseCache: QueryResponseCache;
};
