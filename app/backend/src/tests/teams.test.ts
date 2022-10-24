import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';
import { app } from '../app';
import { Response } from 'superagent';
import TeamModel from '../database/models/teams.model';
import { ITeams } from '../interfaces/interfaces';

chai.use(chaiHttp);

const { expect } = chai;

const teamMock: ITeams = {
  id: 1,
  teamName: 'team-mock',
};

const teamArr: ITeams[] = [teamMock, teamMock, teamMock];

describe('Teste rota Teams', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  it('Verifica se recebe apenas uma equipe quando fazemos um GET /teams/:id', async () => {
    sinon.stub(TeamModel, 'findOne').resolves(teamMock as TeamModel);

    chaiHttpResponse = await chai.request(app).get('/teams/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('id');
    expect(chaiHttpResponse.body).to.haveOwnProperty('teamName');
  });

  it('Verifica se recebe um array de equipes quando fazemos um GET /teams', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teamArr as TeamModel[]);

    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.length(3);
    expect(chaiHttpResponse.body[0]).to.haveOwnProperty('id');
    expect(chaiHttpResponse.body[0]).to.haveOwnProperty('teamName');
  });
});
