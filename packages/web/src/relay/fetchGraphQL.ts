import { RequestParameters, Variables } from 'relay-runtime';

import * as config from '@/config';
import storage from '@/utils/storage';

export const fetchGraphQL = async (params: RequestParameters, variables: Variables) => {
  const token = storage.getAuthToken();

  const response = await fetch(config.GRAPHQL_URL, {
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
