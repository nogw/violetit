import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { UserModel } from '../UserModel';
import { UserType } from '../UserType';

import { generateJwtToken } from '../../../auth';
import { findUserByEmail, findUserByUsername } from '../UserService';

export const userRegisterMutation = mutationWithClientMutationId({
  name: 'UserRegister',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ email, username, password }) => {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      throw new Error('This email is already used');
    }

    const usernameTaken = await findUserByUsername(username);

    if (usernameTaken) {
      throw new Error('This username is already used');
    }

    const user = new UserModel({
      email,
      username,
      password,
    });

    await user.save();

    const token = generateJwtToken(user._id);

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
  },
});
