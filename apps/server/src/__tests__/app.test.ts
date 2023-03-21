import request from 'supertest';

import { connectWithMongoose, clearDbAndRestartCounters, disconnectWithMongoose, sanitizeTestObject } from '../../test';
import { generateJwtToken } from '../auth';
import { createUser } from '../modules/user/fixtures/createUser';
import app from '../app';

beforeAll(connectWithMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectWithMongoose);

describe('Application', () => {
  it('should return 200 and return logged user', async () => {
    const user = await createUser();
    const token = generateJwtToken(user);

    const query = `
      query Q {
        me {
          email
          username
        }
      }
    `;

    const variables = {};

    const payload = {
      query,
      variables,
    };

    const response = await request(app.callback())
      .post('/graphql')
      .set({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      })
      .send(JSON.stringify(payload));

    expect(response.status).toBe(200);
    expect(response.body.data.me.email).toBe(user.email);
    expect(response.body.data.me.username).toBe(user.username);
    expect(sanitizeTestObject(response.body)).toMatchSnapshot();
  });
});
