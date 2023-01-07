import { GraphQLFieldConfig } from 'graphql';

import { UserType } from '../UserType';
import UserLoader from '../UserLoader';

// todo: fix type
export const me: GraphQLFieldConfig<any, any, any> = {
  type: UserType,
  resolve: (_root, _args, context) => {
    return UserLoader.load(context, context.user?._id);
  },
};
