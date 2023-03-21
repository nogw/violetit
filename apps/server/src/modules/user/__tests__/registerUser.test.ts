import { graphql } from 'graphql';

import {
  clearDatabaseAndRestartCounters,
  connectWithMongoose,
  disconnectWithMongoose,
  sanitizeTestObject,
} from '../../../../test';
import { createUser } from '../fixtures/createUser';
import { schema } from '../../../schema/schema';
import { getContext } from '../../../context';

beforeAll(connectWithMongoose);

beforeEach(clearDatabaseAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('UserRegisterMutation', () => {
  it('should registrate an user', async () => {
    const mutation = `
      mutation UserRegisterMutation($input: UserRegisterInput!) {
        userRegister(input: $input) {
          token
          error {
            message
          }
          me {
            username
          }
        }
      }
    `;

    const rootValue = {};
    const contextValue = getContext();
    const variables = {
      email: 'violetit@mail.com',
      username: 'awesomeusername',
      password: 'awesomepassword',
    };

    const result = await graphql({
      schema,
      rootValue,
      contextValue,
      source: mutation,
      variableValues: { input: variables },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.userRegister.error).toBeNull();
    expect(result.data.userRegister.token).toBeDefined();
    expect(result.data.userRegister.me.username).toBe(variables.username);
    expect(sanitizeTestObject(result.data, ['token'])).toMatchSnapshot();
  });

  it('should not registrate user if email belongs to another user', async () => {
    const { email } = await createUser({
      email: 'violetit@mail.com',
    });

    const mutation = `
      mutation UserRegisterMutation($input: UserRegisterInput!) {
        userRegister(input: $input) {
          token
          error {
            message
          }
        }
      }
    `;

    const rootValue = {};
    const contextValue = getContext();
    const variables = {
      email: email,
      username: 'awesomeusername',
      password: 'awesomepassword',
    };

    const result = await graphql({
      schema,
      rootValue,
      contextValue,
      source: mutation,
      variableValues: { input: variables },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.userRegister.token).toBeNull();
    expect(result.data.userRegister.error.message).toBe('This email is already used');
    expect(sanitizeTestObject(result.data)).toMatchSnapshot();
  });

  it('should not registrate user if username belongs to another user', async () => {
    const { username } = await createUser({
      username: 'nogw',
    });

    const mutation = `
        mutation UserRegisterMutation($input: UserRegisterInput!) {
          userRegister(input: $input) {
            token
            error {
              message
            }
          }
        }
      `;

    const rootValue = {};
    const contextValue = getContext();
    const variables = {
      email: 'violetit@mail.com',
      username: username,
      password: 'awesomepassword',
    };

    const result = await graphql({
      schema,
      rootValue,
      contextValue,
      source: mutation,
      variableValues: { input: variables },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.userRegister.token).toBeNull();
    expect(result.data.userRegister.error.message).toBe('This username is already used');
    expect(sanitizeTestObject(result.data)).toMatchSnapshot();
  });
});
