import { Maybe } from '@violetit/types';
import { Request } from 'koa';

import { getDataloaders } from './modules/loader/loaderRegister';
import { GraphQLContext } from './graphql/types';
import { IUserDocument } from './modules/user/UserModel';

type ContextVars = {
  user?: Maybe<IUserDocument>;
  req?: Request;
};

export const getContext = (ctx?: ContextVars): GraphQLContext => {
  const dataloaders = getDataloaders();

  return {
    dataloaders,
    user: ctx?.user || null,
  };
};
