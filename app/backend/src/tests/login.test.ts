import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';
import { app } from '../app';
import { Response } from 'superagent';
import UserModel from '../database/models/user.model';

chai.use(chaiHttp);

const { expect } = chai;

const modelResponseMock = {
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
  email: 'user@user.com',
};

const wrongRequest = {
  email: 'email@email.com',
  password: 'swrogPass',
};

describe('Teste rota Login ', () => {
  let chaiHttpResponse: Response;

  beforeEach(() =>
    sinon.stub(UserModel, 'findOne').resolves(modelResponseMock as UserModel)
  );

  afterEach(() => {
    sinon.restore();
  });

  it('Verifica se recebemos um token ao usar e-mail e senha corretos', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(modelResponseMock);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('token');
  });

  it('Verifica se recebemos um erro ao usar e-mail/senha incorretos', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: wrongRequest.email,
        password: modelResponseMock.password,
      });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({
      message: 'Incorrect email or password',
    });

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: modelResponseMock.email,
        password: wrongRequest.password,
      });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({
      message: 'Incorrect email or password',
    });
  });

  it('Verifica se recebemos um erro ao nao passar um e-mail e senha', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: modelResponseMock.password });

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.deep.equal({
      message: 'All fields must be filled',
    });

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: modelResponseMock.email });

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.deep.equal({
      message: 'All fields must be filled',
    });
  });
});
