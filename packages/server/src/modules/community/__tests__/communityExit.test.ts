import { graphql } from 'graphql';

import { clearDatabaseAndRestartCounters, connectWithMongoose, disconnectWithMongoose } from '../../../../test';
import { createCommunity } from '../fixtures/createCommunity';
import { addUserToCommunity } from '../fixture/addUserToCommunity';
import { createUser } from '../../user/fixtures/createUser';
import { schema } from '../../../schema/schema';
import { getContext } from '../../../context';
import { fromGlobalId } from 'graphql-relay';

beforeAll(connectWithMongoose);

beforeEach(clearDatabaseAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('CommunityExitMutation', () => {
  it('should exit a community', async () => {
    const community = (await createCommunity({ name: 'NogwCommunity' })).community;
    const user = await createUser();

    await addUserToCommunity(user, community);

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
    const { communityEdge } = result.data.communityExit;
    expect(communityEdge.node.members.edges).toHaveLength(1);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const membersId = communityEdge.node.members.edges.map(edge => fromGlobalId(edge.node.id).id);
    expect(membersId).not.toContain(user._id.toString());
  });
});
