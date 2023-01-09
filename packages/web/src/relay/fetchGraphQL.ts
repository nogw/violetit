import { Variables } from 'relay-runtime';

import { config } from '@/config';

export const fetchGraphQL = async (query: string, variables: Variables) => {
  const response = await fetch(config.VITE_GRAPHQL_URL as string, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();

  return data;
};
