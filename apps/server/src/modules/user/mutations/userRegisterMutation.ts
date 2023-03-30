import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { successField } from '@entria/graphql-mongo-helpers';

import { generateJwtToken } from '../../../auth';
import { errorField } from '../../error-field/ErrorField';
import { fieldError } from '../../../utils/fieldError';

import { UserModel } from '../UserModel';
import { UserType } from '../UserType';

export const userRegister = mutationWithClientMutationId({
  name: 'UserRegister',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ email, username, password }) => {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return fieldError('email', 'This email is already used');
    }

    const usernameTaken = await UserModel.findOne({ username });

    if (usernameTaken) {
      return fieldError('password', 'This username is already used');
    }

    const user = await new UserModel({
      email,
      username,
      password,
    }).save();

    const token = generateJwtToken(user);

    return {
      token,
      id: user._id,
      success: 'User registered with success',
    };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    me: {
      type: UserType,
      resolve: async ({ id }) => await UserModel.findById(id),
    },
    ...successField,
    ...errorField,
  },
});
