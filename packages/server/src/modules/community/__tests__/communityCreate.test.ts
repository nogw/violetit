import { graphql } from 'graphql';

import { clearDatabaseAndRestartCounters, connectWithMongoose, disconnectWithMongoose } from '../../../../test';
import { createUser } from '../../user/fixture/createUser';
import { schema } from '../../../schema/schema';
import { getContext } from '../../../context';
import { fromGlobalId } from 'graphql-relay';

beforeAll(connectWithMongoose);

beforeEach(clearDatabaseAndRestartCounters);

afterAll(disconnectWithMongoose);

describe('CommunityCreateMutation', () => {
  it('should create a new community', async () => {
    const user = await createUser();

    const mutation = `
      mutation CommunityCreateMutation($name: String!, $title: String!) {
        communityCreate(input: { name: $name, title: $title }) {
          communityEdge {
            node {
              id,
              name,
              title,
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
      name: 'NogwCommunity',
      title: 'Nogw Community',
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
    const { communityEdge } = result.data.communityCreate;

    expect(communityEdge.node.id).toBeDefined();
    expect(communityEdge.node.name).toBe(variableValues.name);
    expect(communityEdge.node.title).toBe(variableValues.title);
    expect(communityEdge.node.members.edges).toHaveLength(1);

    const membersId = communityEdge.node.members.edges.map(edge => fromGlobalId(edge.node.id).id);

    expect(membersId).toContain(user._id.toString());
  });

  it("should not create a new community if doesn't have authorization header", async () => {
    const mutation = `
      mutation CommunityCreateMutation($name: String!, $title: String!) {
        communityCreate(input: { name: $name, title: $title }) {
          communityEdge {
            node {
              id,
            }
          }
        }
      }
    `;

    const variableValues = {
      name: 'NogwCommunity',
      title: 'Nogw Community',
    };

    const result = await graphql({
      schema,
      source: mutation,
      variableValues,
    });

    expect(result.data?.communityCreate).toBeNull();
    expect(result.errors).toBeDefined();
    expect(result.errors && result.errors[0].message).toBe('You are not logged in!');
  });

  it('should not registrate user if name belongs to another community', async () => {
    const user = await createUser();

    const mutation = `
      mutation CommunityCreateMutation($name: String!, $title: String!) {
        communityCreate(input: { name: $name, title: $title }) {
          communityEdge {
            node {
              id,
            }
          }
        }
      }
    `;

    const variableValues = {
      name: 'NogwCommunity',
      title: 'Nogw Community',
    };

    await graphql({
      schema,
      source: mutation,
      contextValue: getContext({ user }),
      variableValues,
    });

    const result = await graphql({
      schema,
      source: mutation,
      contextValue: getContext({ user }),
      variableValues,
    });

    expect(result.data?.communityCreate).toBeNull();
    expect(result.errors).toBeDefined();
    expect(result.errors && result.errors[0].message).toBe('A community with this name has already been created');
  });
});
