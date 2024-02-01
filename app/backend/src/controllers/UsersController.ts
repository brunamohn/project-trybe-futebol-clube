import { Request, Response } from 'express';
import UsersService from '../services/UsersService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class UsersController {
  constructor(
    private usersService = new UsersService(),
  ) { }

  public async verifyLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const validateEmail = regexEmail.test(email);

    if (!validateEmail || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const loginData = req.body;
    const { status, data } = await this.usersService.verifyLogin(loginData);

    if (status === 'UNAUTHORIZED') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    return res.status(200).json(data);
  }
}

export default UsersController;
