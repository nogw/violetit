import { graphql } from 'graphql';

import { clearDatabaseAndRestartCounters, connectWithMongoose, disconnectWithMongoose } from '../../../../test';
import { createCommunityWithAdmin } from '../fixtures/createCommunityWithAdmin';
import { schema } from '../../../schema/schema';
import { getContext } from '../../../context';

beforeAll(connectWithMongoose);

beforeEach(clearDatabaseAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('CommunityExitAsAdminMutation', () => {
  it('should exit a community as admin', async () => {
    const { user, community } = await createCommunityWithAdmin({ name: 'NogwCommunity' });

    const mutation = `
      mutation CommunityExitAsAdmin($communityId: String!) {
        communityExitAsAdmin(input: { communityId: $communityId }) {
          communityEdge {
            node {
              id,
              members(first: 10) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `;

    const variableValues = {
      communityId: community._id.toString(),
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue: getContext({ user }),
      variableValues,
    });

    expect(result.errors).toBeUndefined();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { communityEdge } = result.data.communityExitAsAdmin;
    expect(communityEdge).toBeNull();
  });

  it('should not exit if user is community admin', async () => {
    const { user, community } = await createCommunityWithAdmin({ name: 'NogwCommunity' });

    const mutation = `
      mutation CommunityExitMutation($communityId: String!) {
        communityExit(input: { communityId: $communityId }) {
          communityEdge {
            node {
              id
            }
          }
        }
      }
    `;

    const variableValues = {
      communityId: community._id.toString(),
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue: getContext({ user }),
      variableValues,
    });

    expect(result.data?.communityExit).toBeNull();
    expect(result.errors).toBeDefined();
    expect(result.errors && result.errors[0].message).toBe(
      'You are the community admin, use communityExitAsAdmin to exit',
    );
  });
});
