import { graphql } from 'graphql';

import { clearDatabaseAndRestartCounters, connectWithMongoose, disconnectWithMongoose } from '../../../../test';
import { createCommunity } from '../fixtures/createCommunity';
import { createUser } from '../../user/fixtures/createUser';
import { schema } from '../../../schema/schema';
import { getContext } from '../../../context';
import { fromGlobalId } from 'graphql-relay';

beforeAll(connectWithMongoose);

beforeEach(clearDatabaseAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('CommunityJoinMutation', () => {
  it('should create a new community', async () => {
    const community = (await createCommunity({ name: 'NogwCommunity' })).community;
    const user = await createUser();

    const mutation = `
      mutation CommunityJoinMutation($communityId: String!) {
        communityJoin(input: { communityId: $communityId }) {
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
    const { communityEdge } = result.data.communityJoin;
    expect(communityEdge.node.members.edges).toHaveLength(2);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const membersId = communityEdge.node.members.edges.map(edge => fromGlobalId(edge.node.id).id);
    expect(membersId).toContain(user._id.toString());
  });
});
