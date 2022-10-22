import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa APP', () => {
  it('a rota /login retorna status 200 como response e um token válido na messagem', async () => {
    const httpResponseLogin = await chai
      .request(app)
      .post('/login')
      .send({ email: 'thalesferreira@gmail.com', password: '1234567' });

    expect(httpResponseLogin.status).to.equal(200);
    expect(httpResponseLogin.body).to.deep.equal({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc',
    });
  });
});
