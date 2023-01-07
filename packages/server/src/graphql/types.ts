import { DataLoaders } from '../modules/loader/loaderRegister';
import { IUser } from '../modules/user/UserModel';
import { Maybe } from '@violetit/types';

export type GraphQLContext = {
  user?: Maybe<IUser>;
  dataloaders: DataLoaders;
};
