import { graphql } from 'graphql';

import {
  clearDatabaseAndRestartCounters,
  connectWithMongoose,
  disconnectWithMongoose,
  sanitizeTestObject,
} from '../../../../test';

import { createUser } from '../fixture/createUser';
import { schema } from '../../../schema/schema';

beforeAll(connectWithMongoose);

beforeEach(clearDatabaseAndRestartCounters);

afterAll(disconnectWithMongoose);

it('should login an existent user', async () => {
  const { email } = await createUser({
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

  const userResult = result.data?.userLoginMutation as any;

  expect(userResult.me.id).toBeDefined;
  expect(userResult.token).toBeDefined;
  expect(sanitizeTestObject(result, ['token'])).toMatchSnapshot();
});
