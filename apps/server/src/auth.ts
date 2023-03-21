import jwt from 'jsonwebtoken';

import { Maybe } from '@violetit/types';

import { UserModel, IUserDocument } from './modules/user/UserModel';
import { config } from './config';

export const getUser = async (token: Maybe<string>): Promise<Maybe<IUserDocument>> => {
  if (!token) return null;

  const subToken = token.substring(4);
  const decodedToken = jwt.verify(subToken, config.JWT_SECRET) as {
    id: string;
  };

  const user = await UserModel.findOne({ _id: decodedToken.id });

  if (!user) return null;

  return user;
};

export const generateJwtToken = (user: IUserDocument) => {
  return `JWT ${jwt.sign({ id: user._id }, config.JWT_SECRET)}`;
};
