import { Maybe } from '@violetit/types';
import { UserModel, IUser } from './UserModel';

export const findUserByEmail = async (email: string): Promise<Maybe<IUser>> => {
  return await UserModel.findOne({ email });
};

export const findUserByUsername = async (
  username: string,
): Promise<Maybe<IUser>> => {
  return await UserModel.findOne({ username });
};
