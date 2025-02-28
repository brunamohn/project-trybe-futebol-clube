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
}

export default UserModel;
