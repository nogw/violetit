import { Maybe } from '@violetit/types';
import { ParameterizedContext } from 'koa';

import { getDataloaders } from './modules/loader/loaderRegister';
import { GraphQLContext } from './graphql/types';
import { IUserDocument } from './modules/user/UserModel';

type ContextVars = {
  ctx: ParameterizedContext;
  user: Maybe<IUserDocument>;
};

export const getContext = async ({ ctx, user }: ContextVars): Promise<GraphQLContext> => {
  const dataloaders = getDataloaders();

  return {
    ctx,
    dataloaders,
    user,
  } as const;
};
