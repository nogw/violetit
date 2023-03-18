import { graphql } from 'graphql';

import { clearDatabaseAndRestartCounters, connectWithMongoose, disconnectWithMongoose } from '../../../../test';
import { createUser } from '../fixtures/createUser';
import { schema } from '../../../schema/schema';
import { getContext } from '../../../context';

beforeAll(connectWithMongoose);

beforeEach(clearDatabaseAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('UserLoginMutation', () => {
  it('should login with a existent user', async () => {
    const { email } = await createUser({
      username: 'nogw',
      email: 'nogw@nogw.com',
      password: 'a9218c490c89864790bf',
    });

    const mutation = `
      mutation UserLoginMutation($email: String!, $password: String!) {
        userLogin(input: { email: $email, password: $password }) {
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

    const contextValue = getContext();

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues: {
        email,
        password: 'a9218c490c89864790bf',
      },
    });

    expect(result.errors).toBeUndefined();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { token, me, error } = result.data.userLogin;

    expect(error).toBeNull();
    expect(me.id).toBeDefined();
    expect(token).toBeDefined();
  });

  it("should display error if username isn't exists", async () => {
    await createUser();

    const mutation = `
      mutation UserLoginMutation($email: String!, $password: String!) {
        userLogin(input: { email: $email, password: $password }) {
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

    const contextValue = getContext();

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues: {
        email: 'nogw@nogw',
        password: 'a9218c490c89864790bf',
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.userLogin.me).toBeNull();
    expect(result.data.userLogin.error.message).toBe('This user was not registered');
  });

  it('should display error if password is incorrect', async () => {
    const { email } = await createUser({
      email: 'nogw@nogw',
    });

    const mutation = `
      mutation UserLoginMutation($email: String!, $password: String!) {
        userLogin(input: { email: $email, password: $password }) {
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

    const contextValue = getContext();

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues: {
        email: email,
        password: 'a9218c490c89864790bf',
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.userLogin.me).toBeNull();
    expect(result.data.userLogin.error.message).toBe('This password is incorrect');
  });
});
