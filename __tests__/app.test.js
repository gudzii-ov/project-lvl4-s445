import request from 'supertest';
import matchers from 'jest-supertest-matchers';

import app from '../server/server';

describe('requests', () => {
  let server;

  beforeAll(() => {
    expect.extend(matchers);
  });

  beforeEach(() => {
    server = app().listen();
  });

  it('GET 200', async () => {
    const res = await request.agent(server)
      .get('/');
    expect(res).toHaveHTTPStatus(200);

    const res2 = await request.agent(server)
      .get('/users');
    expect(res2).toHaveHTTPStatus(200);

    const res3 = await request.agent(server)
      .get('/users/new');
    expect(res3).toHaveHTTPStatus(200);

    const res4 = await request.agent(server)
      .post('/users');
    expect(res4).toHaveHTTPStatus(308);
  });

  it('GET 404', async () => {
    const res = await request.agent(server)
      .get('/wrong-path');
    expect(res).toHaveHTTPStatus(404);
  });

  afterEach((done) => {
    server.close();
    done();
  });
});
