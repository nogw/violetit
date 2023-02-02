export type GraphQLArgFilter<T> = {
  filter?: {
    OR: T[];
    AND: T[];
  };
} & T;
