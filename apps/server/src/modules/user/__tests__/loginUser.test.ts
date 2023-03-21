import { graphql } from 'graphql';

import {
  clearDbAndRestartCounters,
  connectWithMongoose,
  disconnectWithMongoose,
  sanitizeTestObject,
} from '../../../../test';
import { createUser } from '../fixtures/createUser';
import { schema } from '../../../schema/schema';
import { getContext } from '../../../context';

beforeAll(connectWithMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('UserLoginMutation', () => {
  it('should login with a registered user', async () => {
    const { username, email } = await createUser({
      email: 'nogw@nogw.com',
      password: 'a9218c490c89864790bf',
    });

    const mutation = `
      mutation UserLoginMutation($input: UserLoginInput!) {
        userLogin(input: $input) {
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
      email: email,
      password: 'a9218c490c89864790bf',
    };

    const result = await graphql({
      schema,
      rootValue,
      contextValue,
      source: mutation,
      variableValues: { input: variables },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.userLogin.error).toBeNull();
    expect(result.data.userLogin.token).toBeDefined();
    expect(result.data.userLogin.me.username).toBe(username);
    expect(sanitizeTestObject(result.data, ['token'])).toMatchSnapshot();
  });

  it("should display error if username isn't exists", async () => {
    const mutation = `
      mutation UserLoginMutation($input: UserLoginInput!) {
        userLogin(input: $input) {
          token
          error {
            message
          }
          me {
            id
            username
          }
        }
      }
    `;

    const rootValue = {};
    const contextValue = getContext();
    const variables = {
      email: 'awesome@fpmail.com',
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
    expect(result.data.userLogin.token).toBeNull();
    expect(result.data.userLogin.me).toBeNull();
    expect(result.data.userLogin.error.message).toBe('This user was not registered');
    expect(sanitizeTestObject(result.data)).toMatchSnapshot();
  });

  it('should display error if password is incorrect', async () => {
    const { email } = await createUser({
      email: 'violetit@mail.com',
    });

    const mutation = `
      mutation UserLoginMutation($input: UserLoginInput!) {
        userLogin(input: $input) {
          token
          error {
            message
          }
          me {
            id
          }
        }
      }
    `;

    const rootValue = {};
    const contextValue = getContext();
    const variables = {
      email: email,
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
    expect(result.data.userLogin.token).toBeNull();
    expect(result.data.userLogin.me).toBeNull();
    expect(result.data.userLogin.error.message).toBe('This password is incorrect');
    expect(sanitizeTestObject(result.data)).toMatchSnapshot();
  });
});
