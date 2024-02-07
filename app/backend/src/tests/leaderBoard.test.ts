import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamsMock from './Mocks/teamsMock';
import { MatchesMock } from './Mocks/matchesMock';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import getLeaderBoardData from '../utils/LeaderBoardUtil';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing LeaderBoard', () => {
  beforeEach(function () {
    sinon.restore();
  })
  
  it('Testing endpoint /leaderboard', async () => {
    const allTeams = TeamsModel.bulkBuild(TeamsMock);
    const finishedMatches = MatchesModel.bulkBuild(MatchesMock);
    sinon.stub(TeamsModel, 'findAll').resolves(allTeams);
    sinon.stub(MatchesModel, 'findAll').resolves(finishedMatches);

    const {status, body} = await chai.request(app).get('/leaderboard');

    expect(status).to.be.eq(200);
    expect(body).to.be.an('array');
    expect(body.length).to.be.eq(16);
  });

  it('Testing getLeaderBoardData', async () => {
    const team = {
      id: 1,
      teamName: 'Avaí/Kindermann',
    }
  
    const matches = MatchesMock;

    const leaderboardData = getLeaderBoardData(team, matches);

    expect(leaderboardData).to.be.an('object');
    expect(leaderboardData).to.have.property('teamName');
    expect(leaderboardData).to.have.property('points');
  })
});
