import { graphql } from 'graphql';

import {
  clearDbAndRestartCounters,
  connectWithMongoose,
  disconnectWithMongoose,
  sanitizeTestObject,
} from '../../../../test';
import { createCommunityWithAdmin } from '../fixtures/createCommunityWithAdmin';
import { addUserToCommunity } from '../fixtures/addUserToCommunity';
import { createUser } from '../../user/fixtures/createUser';
import { schema } from '../../../schema/schema';
import { getContext } from '../../../context';
import { fromGlobalId } from 'graphql-relay';

beforeAll(connectWithMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('CommunityExitMutation', () => {
  it('should exit a community', async () => {
    const { community } = await createCommunityWithAdmin({ name: 'NogwCommunity' });

    const temp = await createUser();
    const user = await addUserToCommunity(temp, community);

    const mutation = `
      mutation CommunityExitMutation($communityId: String!) {
        communityExit(input: { communityId: $communityId }) {
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

    const contextValue = getContext({ user });

    const variableValues = {
      communityId: community._id.toString(),
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { communityEdge } = result.data.communityExit;
    expect(communityEdge.node.members.edges).toHaveLength(1);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const membersId = communityEdge.node.members.edges.map(edge => fromGlobalId(edge.node.id).id);
    expect(membersId).not.toContain(user._id.toString());
    expect(sanitizeTestObject(result.data, ['id'])).toMatchSnapshot();
  });

  it('should not exit if user is not a community member', async () => {
    const { community } = await createCommunityWithAdmin({ name: 'NogwCommunity' });

    const user = await createUser();

    const mutation = `
      mutation CommunityExitMutation($communityId: String!) {
        communityExit(input: { communityId: $communityId }) {
          error {
            message
          }
          communityEdge {
            node {
              id
            }
          }
        }
      }
    `;

    const contextValue = getContext({ user });

    const variableValues = {
      communityId: community._id.toString(),
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.communityExit.communityEdge).toBeNull();
    expect(result.data.communityExit.error.message).toBe('You are not a member of this community');
    expect(sanitizeTestObject(result.data)).toMatchSnapshot();
  });

  it('should not exit if user is community admin', async () => {
    const { user, community } = await createCommunityWithAdmin({ name: 'NogwCommunity' });

    const mutation = `
      mutation CommunityExitMutation($communityId: String!) {
        communityExit(input: { communityId: $communityId }) {
          error {
            message
          }
          communityEdge {
            node {
              id
            }
          }
        }
      }
    `;

    const contextValue = getContext({ user });

    const variableValues = {
      communityId: community._id.toString(),
    };

    const result = await graphql({
      schema,
      source: mutation,
      contextValue,
      variableValues,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data.communityExit.communityEdge).toBeNull();
    expect(result.data.communityExit.error.message).toBe(
      'You are the community admin, use communityExitAsAdmin to exit',
    );
    expect(sanitizeTestObject(result.data)).toMatchSnapshot();
  });
});
