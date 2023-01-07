import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { UserModel } from '../UserModel';
import { UserType } from '../UserType';

import { generateJwtToken } from '../../../auth';

export const userLoginMutation = mutationWithClientMutationId({
  name: 'UserLogin',
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ email, password }) => {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error('This user was not registered');
    }

    if (!(await user.authenticate(password))) {
      throw new Error('This password is incorrect');
    }

    const token = generateJwtToken(user._id);

    return {
      token,
      user,
    };
  },

  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    me: {
      type: UserType,
      resolve: ({ user }) => user,
    },
  },
});
