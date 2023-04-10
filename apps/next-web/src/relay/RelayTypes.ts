import { PreloadedQuery, Variables } from 'react-relay';
import { GraphQLResponse, OperationType, RequestParameters } from 'relay-runtime';

export type QueryRefs<T extends OperationType = any> = Record<string, PreloadedQuery<T>>;

export type PreloadedQueries = Record<
  string,
  {
    params: RequestParameters;
    response: GraphQLResponse;
    variables: Variables;
  }
>;
