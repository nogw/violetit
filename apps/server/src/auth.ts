import { Maybe } from '@violetit/types';

import { ParameterizedContext } from 'koa';
import jwt from 'jsonwebtoken';

import { UserModel, IUserDocument } from './modules/user/UserModel';
import { config } from './config';

const AUTH_COOKIE_NAME = 'violetit.jwt';

export const getUser = async (ctx: ParameterizedContext): Promise<{ user: Maybe<IUserDocument> }> => {
  const token = ctx.cookies.get(AUTH_COOKIE_NAME);

  try {
    if (!token) return { user: null };

    const subToken = token.substring(6); // TODO: resolve json
    const decodedToken = jwt.verify(subToken, config.JWT_KEY);
    const decodedId = decodedToken as { id: string };

    const user = await UserModel.findOne({ _id: decodedId.id });

    return { user };
  } catch (err) {
    return { user: null };
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
