import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import MatchesMock from './Mocks/matchesMock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Matches', () => {
  beforeEach(function () {
    sinon.restore();
  })

  it('Testing endpoint /matches', async () => {
    const allMatches = MatchesModel.bulkBuild(MatchesMock);
    sinon.stub(MatchesModel, 'findAll').resolves(allMatches);

    const {status, body} = await chai.request(app).get('/matches');

    expect(status).to.be.eq(200);
    expect(body).to.be.an('array');
    expect(body.length).to.be.eq(2);
  });

  it('Testing endpoint /matches/:id', async () => {
    const selectedMatch = MatchesModel.build(MatchesMock[1]);
    sinon.stub(MatchesModel, 'findByPk').resolves(selectedMatch);

    const {status, body} = await chai.request(app).get('/matches/2');

    expect(status).to.be.eq(200);
    expect(body.awayTeamGoals).to.be.deep.eq(MatchesMock[1].awayTeamGoals);
  });

  it('Testing endpoint /matches/:id not found', async () => {
    const selectedMatch = MatchesModel.build(MatchesMock[9999]);
    sinon.stub(MatchesModel, 'findByPk').resolves(selectedMatch);

    const {status, body} = await chai.request(app).get('/matches/9999');

    expect(status).to.be.eq(404);
    expect(body).to.be.deep.eq({message: 'Match not found'});
  });

  it('Testing create Match', async () => {
    const match = MatchesMock[0];
    sinon.stub(MatchesModel, 'create').resolves(match as any);

    const {status, body} = await chai.request(app).post('/matches').send(match);

    expect(status).to.be.eq(201);
    expect(body).to.be.deep.eq(match);
  });

  it('Testing create Match with same team', async () => {
    const match = MatchesMock[0];
    match.homeTeamId = 1;
    match.awayTeamId = 1;

    const {status, body} = await chai.request(app).post('/matches').send(match);

    expect(status).to.be.eq(422);
    expect(body).to.be.deep.eq({message: 'It is not possible to create a match with two equal teams'});
  });
});
