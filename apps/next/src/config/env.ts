import { z } from 'zod';

const envSchema = z.object({
  GRAPHQL_URL: z.string().nonempty(),
});

export const env = envSchema.parse({
  GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

export const { GRAPHQL_URL } = env;
