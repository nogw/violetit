import { ParameterizedContext } from 'koa';
import { Maybe } from '@violetit/types';

import { IUserDocument } from '../modules/user/UserModel';
import { DataLoaders } from '../modules/loader/loaderRegister';

export type GraphQLContext = {
  ctx: ParameterizedContext;
  user?: Maybe<IUserDocument>;
  dataloaders: DataLoaders;
};
