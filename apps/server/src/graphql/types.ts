import { DataLoaders } from '../modules/loader/loaderRegister';
import { IUserDocument } from '../modules/user/UserModel';
import { Maybe } from '@violetit/types';

export type GraphQLContext = {
  user?: Maybe<IUserDocument>;
  dataloaders: DataLoaders;
};
