import { graphql } from 'graphql';

import { clearDatabaseAndRestartCounters, connectWithMongoose, disconnectWithMongoose } from '../../../../test';
import { createUser } from '../fixtures/createUser';
import { schema } from '../../../schema/schema';

beforeAll(connectWithMongoose);

beforeEach(clearDatabaseAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('UserRegisterMutation', () => {
  it('should registrate an user', async () => {
    const mutation = `
      mutation UserRegisterMutation($input: UserRegisterInput!) {
        userRegisterMutation(input: $input) {
          token
          me {
            id
            username
          }
        }
      }
    `;

    const rootValue = {};

    const result = await graphql({
      schema,
      source: mutation,
      rootValue,
      variableValues: {
        input: {
          username: 'nogw',
          email: 'nogw@nogw.com',
          password: 'a9218c490c89864790bf',
        },
      },
    });

    expect(result.errors).toBeUndefined();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { token, me } = result.data.userRegisterMutation;

    expect(token).toBeDefined();
    expect(me.id).toBeDefined();
  });

  it('should not registrate user if email belongs to another user', async () => {
    const { email } = await createUser({
      email: 'nogw@nogw.com',
    });

    const mutation = `
      mutation UserRegisterMutation($input: UserRegisterInput!) {
        userRegisterMutation(input: $input) {
            token
          }
        }
      `;

    const rootValue = {};

    const result = await graphql({
      schema,
      source: mutation,
      rootValue,
      variableValues: {
        input: {
          username: 'nogw',
          email,
          password: 'a9218c490c89864790bf',
        },
      },
    });

    expect(result.data?.userRegisterMutation).toBeNull();
    expect(result.errors).toBeDefined();
    expect(result.errors && result.errors[0].message).toBe('This email is already used');
  });

  it('should not registrate user if username belongs to another user', async () => {
    const { username } = await createUser({
      username: 'nogw',
    });

    const mutation = `
        mutation UserRegisterMutation($input: UserRegisterInput!) {
          userRegisterMutation(input: $input) {
            token
          }
        }
      `;

    const rootValue = {};

    const result = await graphql({
      schema,
      source: mutation,
      rootValue,
      variableValues: {
        input: {
          username,
          email: 'nogw@nogw.com',
          password: 'a9218c490c89864790bf',
        },
      },
    });

    expect(result.data?.userRegisterMutation).toBeNull();
    expect(result.errors).toBeDefined();
    expect(result.errors && result.errors[0].message).toBe('This username is already used');
  });
});
