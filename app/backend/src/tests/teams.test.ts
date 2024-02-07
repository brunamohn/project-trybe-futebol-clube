import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';

import { Response } from 'superagent';
import TeamsMock from './Mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Teams', () => {
  beforeEach(function () {
    sinon.restore();
  })
  
  it('Testing endpoint /teams', async () => {
    const allTeams = TeamsModel.bulkBuild(TeamsMock);
    sinon.stub(TeamsModel, 'findAll').resolves(allTeams);

    const {status, body} = await chai.request(app).get('/teams');

    expect(status).to.be.eq(200);
    expect(body).to.be.an('array');
    expect(body.length).to.be.eq(16);
  });

  it('Testing endpoint /teams/:id', async () => {
    const selectedTeam = TeamsModel.build(TeamsMock[7]);
    sinon.stub(TeamsModel, 'findByPk').resolves(selectedTeam);

    const {status, body} = await chai.request(app).get('/teams/8');

    expect(status).to.be.eq(200);
    expect(body.teamName).to.be.deep.eq(TeamsMock[7].teamName);
  });

});
