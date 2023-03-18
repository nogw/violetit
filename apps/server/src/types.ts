import { Types } from 'mongoose';

export type ObjectId = Types.ObjectId;

export type GraphQLArgFilter<T> = {
  filter?: {
    OR: T[];
    AND: T[];
  };
} & T;
