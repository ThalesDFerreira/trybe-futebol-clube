import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import { before, after } from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/matches.model';

import { Response } from 'superagent';
import UsersModel from '../database/models/user.model';

chai.use(chaiHttp);

const { expect } = chai;

const VALID_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VybmFtZSIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiZXhlbXBsZUBlbWFpbC5jb20iLCJwYXNzd29yZCI6Imhhc2hlZF9wYXNzd29yZCJ9.w80bB1QW61B3LmFK7-Vzn1jWCMWhTHxQtVQsi0c_tQY';

const VALID_MATCHES = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'São Paulo',
    },
    teamAway: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 2,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'São Paulo',
    },
    teamAway: {
      teamName: 'Internacional',
    },
  },
];

const VALID_NEW_MATCH = {
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 9,
  awayTeamGoals: 0,
};

const VALID_USER = {
  id: 1,
  username: 'username',
  role: 'admin',
  email: 'exemple@email.com',
  password: 'hashed_password',
};

const VALID_MATCH_UPDATE_BODY = {
  homeTeamGoals: 3,
  awayTeamGoals: 1,
};

describe('Testa a rota matches', () => {
  before(async () => {
    sinon
      .stub(MatchesModel, 'findAll')
      .resolves(VALID_MATCHES as unknown as MatchesModel[]);
    sinon
      .stub(MatchesModel, 'findByPk')
      .resolves(VALID_MATCHES[0] as unknown as MatchesModel);
    sinon
      .stub(MatchesModel, 'create')
      .resolves({ id: 1 } as unknown as MatchesModel);
    sinon
      .stub(MatchesModel, 'update')
      .resolves([1, VALID_MATCHES as unknown as MatchesModel[]]);
    sinon.stub(jwt, 'verify').resolves(VALID_USER as UsersModel);
    sinon.stub(UsersModel, 'findOne').resolves(VALID_USER as UsersModel);
  });

  it('testa se a rota matches retorna todos os times ', async () => {
    const result = await chai.request(app).get('/teams');
    expect(result.status).equal(200);
    expect(result.body).equal(VALID_MATCHES);
  });

  it('testa se a rota matches com parâmetro 1 retorna a partida de id 1', async () => {
    const result = await chai.request(app).get('/matches/1');
    expect(result.status).equal(200);
    expect(result.body).equal(VALID_MATCHES[0]);
  });

  it('testa se a rota matches pode ser filtrada com query param', async () => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
    sinon
      .stub(MatchesModel, 'findAll')
      .resolves(
        VALID_MATCHES.filter(
          (match) => match.inProgress
        ) as unknown as MatchesModel[]
      );

    const result = await chai.request(app).get('/matches?inProgress=true');
    expect(result.status).equal(200);
    expect(result.body).equal(VALID_MATCHES[0]);

    (MatchesModel.findAll as sinon.SinonStub).restore();
    sinon
      .stub(MatchesModel, 'findAll')
      .resolves(VALID_MATCHES as unknown as MatchesModel[]);
  });

  it('testa se pode ser criada uma partida com sucesso', async () => {
    const result = await chai
      .request(app)
      .post('/matches')
      .set('authorization', VALID_TOKEN)
      .send(VALID_NEW_MATCH);
    expect(result.status).equal(201);
    expect(result.body).equal({ id: 1, ...VALID_NEW_MATCH });
  });

  it('testa se retorna erro com a falta do token ao criar', async () => {
    const result = await chai
      .request(app)
      .post('/matches')
      .send(VALID_NEW_MATCH);
    expect(result.status).equal(401);
    expect(result.body).equal({ message: 'Token must be a valid token' });
  });

  it('testa se retorna erro com a token inválido ao criar', async () => {
    const result = await chai
      .request(app)
      .post('/matches')
      .set('authorization', 'invalidotken')
      .send(VALID_NEW_MATCH);
    expect(result.status).equal(401);
    expect(result.body).equal({ message: 'Token must be a valid token' });
  });

  it('testa se retorna erro criando partida com dois times iguais', async () => {
    const result = await chai
      .request(app)
      .post('/matches')
      .set('authorization', VALID_TOKEN)
      .send({ ...VALID_NEW_MATCH, homeTeam: 1, awayTeam: 1 });
    expect(result.status).equal(422);
    expect(result.body).equal({
      message: 'It is not possible to create a match with two equal teams',
    });
  });

  it('testa se retorna erro se tentar inserir time com id inválido', async () => {
    (MatchesModel.create as sinon.SinonStub).restore();
    sinon.stub(MatchesModel, 'create').resolves();
    const result = await chai
      .request(app)
      .post('/matches')
      .set('authorization', VALID_TOKEN)
      .send({ ...VALID_NEW_MATCH, homeTeam: 99999, awayTeam: -2323 });
    expect(result.status).equal(404);
    expect(result.body).equal({
      message: 'There is no team with such id!',
    });
    (MatchesModel.create as sinon.SinonStub).restore();
    sinon
      .stub(MatchesModel, 'create')
      .resolves({ id: 1 } as unknown as MatchesModel);
  });

  it('testa se é possível atualizar partidas em andamento com base no id', async () => {
    const result = await chai
      .request(app)
      .patch('/matches/2')
      .send(VALID_MATCH_UPDATE_BODY);
    expect(result.status).equal(200);
    expect(result.body).equal({ update: 1 });
  });

  it('testa se é possível finalizar uma partida', async () => {
    (MatchesModel.findByPk as sinon.SinonStub).restore();
    sinon
      .stub(MatchesModel, 'findByPk')
      .resolves(VALID_MATCHES[1] as unknown as MatchesModel);

    const result = await chai.request(app).patch('/matches/2/finish');
    expect(result.status).equal(200);
    expect(result.body).equal({ message: 'Finished' });

    (MatchesModel.findByPk as sinon.SinonStub).restore();
    sinon
      .stub(MatchesModel, 'findByPk')
      .resolves(VALID_MATCHES[0] as unknown as MatchesModel);
  });

  it('testa se é lançado erro quando se tenta finalizar uma partida já finalizada', async () => {
    const result = await chai.request(app).patch('/matches/2/finish');
    expect(result.status).equal(500);
    expect(result.body).equal({ message: 'Match not in progress' });
  });

  after(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
    (MatchesModel.create as sinon.SinonStub).restore();
    (MatchesModel.findByPk as sinon.SinonStub).restore();
    (UsersModel.findOne as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
  });
});
