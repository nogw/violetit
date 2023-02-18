import { graphql } from 'graphql';

import { clearDatabaseAndRestartCounters, connectWithMongoose, disconnectWithMongoose } from '../../../../test';
import { createUser } from '../fixture/createUser';
import { schema } from '../../../schema/schema';

beforeAll(connectWithMongoose);

beforeEach(clearDatabaseAndRestartCounters);

afterAll(disconnectWithMongoose);

it('should login with a existent user', async () => {
  const { email } = await createUser({
    username: 'nogw',
    email: 'nogw@nogw.com',
    password: 'a9218c490c89864790bf',
  });

  const mutation = `
    mutation UserLoginMutation($email: String!, $password: String!) {
      userLoginMutation(input: { email: $email, password: $password }) {
        token
        me {
          id
          username
        }
      }
    }
  `;

  const result = await graphql({
    schema,
    source: mutation,
    variableValues: {
      email,
      password: 'a9218c490c89864790bf',
    },
  });

  expect(result.errors).toBeUndefined();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { token, me } = result.data.userLoginMutation;

  expect(me.id).toBeDefined;
  expect(token).toBeDefined;
});

it("should display error if username isn't exists", async () => {
  await createUser();

  const mutation = `mutation UserLoginMutation($email: String!, $password: String!) {
      userLoginMutation(input: { email: $email, password: $password }) {
        token
        me {
          id
          username
        }
      }
    }
  `;

  const result = await graphql({
    schema,
    source: mutation,
    variableValues: {
      email: 'nogw@nogw',
      password: 'a9218c490c89864790bf',
    },
  });

  expect(result.data?.userLoginMutation).toBeNull();
  expect(result.errors).toBeDefined();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(result.errors[0].message).toBe('This user was not registered');
});

it('should display error if password is incorrect', async () => {
  const { email } = await createUser({
    email: 'nogw@nogw',
  });

  const mutation = `mutation UserLoginMutation($email: String!, $password: String!) {
      userLoginMutation(input: { email: $email, password: $password }) {
        token
        me {
          id
          username
        }
      }
    }
  `;

  const result = await graphql({
    schema,
    source: mutation,
    variableValues: {
      email: email,
      password: 'a9218c490c89864790bf',
    },
  });

  expect(result.data?.userLoginMutation).toBeNull();
  expect(result.errors).toBeDefined();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(result.errors[0].message).toBe('This password is incorrect');
});
