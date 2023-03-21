import { graphql } from 'graphql';

import {
  clearDbAndRestartCounters,
  connectWithMongoose,
  disconnectWithMongoose,
  sanitizeTestObject,
} from '../../../../test';
import { createCommunityWithAdmin } from '../fixtures/createCommunityWithAdmin';
import { createUser } from '../../user/fixtures/createUser';
import { schema } from '../../../schema/schema';
import { getContext } from '../../../context';
import { fromGlobalId } from 'graphql-relay';

beforeAll(connectWithMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('CommunityJoinMutation', () => {
  it('should create a new community', async () => {
    const community = (await createCommunityWithAdmin({ name: 'NogwCommunity' })).community;
    const user = await createUser();

    const mutation = `
      mutation CommunityJoinMutation($communityId: String!) {
        communityJoin(input: { communityId: $communityId }) {
          error {
            message
          }
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { communityEdge, error } = result.data.communityJoin;
    const membersId = communityEdge.node.members.edges.map(edge => fromGlobalId(edge.node.id).id);

    expect(result.errors).toBeUndefined();
    expect(error).toBeNull();
    expect(communityEdge.node.members.edges).toHaveLength(2);
    expect(membersId).toContain(user._id.toString());
    expect(sanitizeTestObject(result.data, ['id'])).toMatchSnapshot();
  });
});
