import { graphql } from 'graphql';

import { clearDatabaseAndRestartCounters, connectWithMongoose, disconnectWithMongoose } from '../../../../test';
import { schema } from '../../../schema/schema';

beforeAll(connectWithMongoose);

beforeEach(clearDatabaseAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('UserQueries', () => {
  it('should query an me', async () => {
    const mutation = `
      mutation UserRegisterMutation($username: String!, $email: String!, $password: String!) {
        userRegisterMutation(input: { username: $username, email: $email, password: $password }) {
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
        username: 'nogw',
        email: 'nogw@nogw.com',
        password: 'a9218c490c89864790bf',
      },
    });

    expect(result.errors).toBeUndefined();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { token, me } = result.data.userRegisterMutation;

    expect(token).toBeDefined();
    expect(me.id).toBeDefined();
  });
});
