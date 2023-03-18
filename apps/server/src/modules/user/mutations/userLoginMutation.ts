import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { successField } from '@entria/graphql-mongo-helpers';

import { generateJwtToken } from '../../../auth';
import { fieldError } from '../../../utils/fieldError';
import { errorField } from '../../error-field/ErrorField';

import { UserModel } from '../UserModel';
import { UserType } from '../UserType';

export const userLogin = mutationWithClientMutationId({
  name: 'UserLogin',
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ email, password }) => {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return fieldError('email', 'This user was not registered');
    }

    if (!(await user.authenticate(password))) {
      return fieldError('password', 'This password is incorrect');
    }

    const token = generateJwtToken(user._id);

    return {
      token,
      user,
      success: 'Logged with success',
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
    ...successField,
    ...errorField,
  },
});
