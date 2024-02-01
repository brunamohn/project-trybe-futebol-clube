import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UsersModel';
import jwtUtil from '../utils/jwtUtil';

import { UserModelInterface, LoginInterface } from '../Interfaces/UserInterface';

class UsersService {
  constructor(
    private userModel:UserModelInterface = new UserModel(),
  ) { }

  public async verifyLogin(loginData: LoginInterface) {
    const user = await this.userModel.validateUser(loginData.email);

    if (!user || !bcrypt.compareSync(loginData.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const { id, username, role } = user;

    const token = jwtUtil.signIn({ id, username, role });

    return { status: 'SUCCESSFUL', data: { token } };
  }

  // public async verifyRole(token: string) {
  //   const decoded = jwtUtil.decodeToken(token);
  //   const user = await this.userModel.getRole(decoded) as string;

  //   if (!user) {
  //     return { status: 'UNAUTHORIZED', data: { message: 'Invalid token!' } };
  //   }

  //   return { status: 'SUCCESSFUL', data: { user } };
  // }
}

export default UsersService;
