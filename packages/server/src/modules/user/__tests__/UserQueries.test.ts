import { graphql } from 'graphql';

import { clearDatabaseAndRestartCounters, connectWithMongoose, disconnectWithMongoose } from '../../../../test';
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
          name
          email
        }
      }
    `;

    const rootValue = {};
    const variableValues = {};
    const contextValue = await getContext({ user });
    const result = await graphql({ schema, source: query, rootValue, contextValue, variableValues });

    expect(result.errors).toBeUndefined();
  });
});
