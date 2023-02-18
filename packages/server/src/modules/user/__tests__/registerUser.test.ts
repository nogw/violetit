import { graphql } from 'graphql';

import {
  clearDatabaseAndRestartCounters,
  connectWithMongoose,
  disconnectWithMongoose,
  sanitizeTestObject,
} from '../../../../test';

import { createUser } from '../fixture/createUser';
import { getContext } from '../../../context';
import { schema } from '../../../schema/schema';

beforeAll(connectWithMongoose);

beforeEach(clearDatabaseAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('UserQueries', () => {
  it('should query an me', async () => {
    const user = await createUser();

    const query = `
      query Q {
        me {
          id
          token
        }
      }
    `;

    const rootValue = {};
    const variableValues = {};
    const contextValue = getContext({ user });
    const result = await graphql({ schema, source: query, rootValue, contextValue, variableValues });

    expect(result.errors).toBeUndefined();

    const userResult = result?.data?.userRegisterMutation as any;

    expect(userResult.token).toBeDefined();
    expect(userResult.me.id).toBeDefined();
    expect(sanitizeTestObject(result)).toMatchSnapshot();
  });
});
