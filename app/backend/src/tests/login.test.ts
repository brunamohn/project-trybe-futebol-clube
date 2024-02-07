import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UsersModel';

import { Response } from 'superagent';
import UsersMock from './Mocks/usersMock';
import tokenUtil from '../utils/jwtUtil';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Login', () => {
  beforeEach(function () {
    sinon.restore();
  })

  it('Testing endpoint /login', async () => {
    const selectedUser = UserModel.build(UsersMock[0]);
    const { email, password } = selectedUser;
    sinon.stub(UserModel, 'findOne').resolves(selectedUser);
    
    const {status, body} = await chai.request(app).post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(status).to.be.eq(200);
    });
  it('Testing endpoint /login with no email', async () => {
    const selectedUser = UserModel.build(UsersMock[0]);
    const { email, password } = selectedUser;
    sinon.stub(UserModel, 'findOne').resolves(selectedUser);
    
    const {status, body} = await chai.request(app).post('/login')
      .send({ email: '', password: 'wrong_password' });

    expect(status).to.be.eq(400);
    });

    it('Testing Token generation', async () => {
      const mockPayload = { id: 1, username: '', email: 'admin@admin.com', role: 'admin' };
      const secret = 'jwt_secret';

      const token = tokenUtil.signIn(mockPayload);
      const decoded = tokenUtil.verifyToken(token);

      expect(token).to.be.a('string');
      expect(decoded).to.be.an('object');
      expect(decoded).to.have.property('id');

    })
      
});