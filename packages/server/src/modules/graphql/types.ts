import mongoose from 'mongoose';

import { DataLoaders } from '../loader/loaderRegister';
import { IUser } from '../user/UserModel';

declare type ObjectId = mongoose.Schema.Types.ObjectId;

export type GraphQLContext = {
  user?: IUser;
  dataloaders: DataLoaders;
};

export type LoaderFn = (
  ctx: GraphQLContext,
  id: string | ObjectId | object,
) => any;
