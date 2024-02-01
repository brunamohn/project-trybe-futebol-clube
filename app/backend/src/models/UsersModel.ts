import SequelizeUsers from '../database/models/UsersModel';
import { UserInterface, UserModelInterface } from '../Interfaces/UserInterface';

class UserModel implements UserModelInterface {
  private model = SequelizeUsers;

  async validateUser(email: string): Promise<UserInterface | null> {
    const selectedUser = await this.model.findOne({ where: { email } });
    if (!selectedUser) {
      return null;
    }
    return selectedUser.dataValues;
  }

  async getRole(email: string): Promise<string | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return user.dataValues.role;
  }
}

export default UserModel;
