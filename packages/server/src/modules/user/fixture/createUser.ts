import { DeepPartial } from '@violetit/types';

import { UserModel, IUser } from '../UserModel';

import { getCounter } from '../../../../test/counters';

export const createUser = (args: DeepPartial<IUser> = {}) => {
  const i = getCounter('user');

  return new UserModel({
    name: `user#${i}`,
    email: `user#${i}@test.com`,
    password: `password#${i}`,
    ...args,
  }).save();
};
