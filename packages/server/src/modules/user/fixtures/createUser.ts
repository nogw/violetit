import { DeepPartial } from '@violetit/types';

import { getCounter } from '../../../../test/counters';

import { IUser, UserModel } from '../UserModel';

export const createUser = (args: DeepPartial<IUser> = {}) => {
  const { username, email, password, ...rest } = args;

  const i = getCounter('user');

  return new UserModel({
    email: email || `user${i}@violetit.com`,
    username: username || `user#${i}`,
    password: password || `password#${i}`,
    ...rest,
  }).save();
};
