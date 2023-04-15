import { Maybe } from '@violetit/types';

import { ParameterizedContext } from 'koa';
import jwt from 'jsonwebtoken';

import { UserModel, IUserDocument } from './modules/user/UserModel';
import { config } from './config';

const AUTH_COOKIE_NAME = 'violetit.jwt';

export const getUser = async (ctx: ParameterizedContext): Promise<Maybe<IUserDocument>> => {
  const token = ctx.cookies.get(AUTH_COOKIE_NAME);

  if (!token) return null;

  try {
    const subToken = token.substring(4);

    const decodedToken = jwt.verify(subToken, config.JWT_KEY) as {
      id: string;
    };

    const user = await UserModel.findOne({ _id: decodedToken.id });
    return user;
  } catch (err) {
    return null;
  }
};

export const generateJwtToken = (user: IUserDocument) => {
  return `JWT ${jwt.sign({ id: user._id }, config.JWT_KEY)}`;
};

export const setAuthCookie = (ctx: ParameterizedContext, user: IUserDocument) => {
  ctx.cookies.set(AUTH_COOKIE_NAME, generateJwtToken(user), {
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    signed: false,
  });
};
