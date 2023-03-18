import { Maybe } from '@violetit/types';
import { UserModel, IUserDocument } from './UserModel';

export const findUserByEmail = async (email: string): Promise<Maybe<IUserDocument>> => {
  return await UserModel.findOne({ email });
};

export const findUserByUsername = async (username: string): Promise<Maybe<IUserDocument>> => {
  return await UserModel.findOne({ username });
};
