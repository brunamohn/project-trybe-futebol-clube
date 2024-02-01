import { NextFunction, Request, Response } from 'express';
import jwtUtil from '../utils/jwtUtil';

class ValidateToken {
  static async validate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const [type, token] = authorization.split(' ');

      if (type !== 'Bearer') {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }

      const validToken = jwtUtil.decodeToken(token);
      res.locals.role = validToken;
      next();
    } catch (error) {
      console.error('Error validating token:', error);
      return res.status(401).json({ message: 'Error validating token' });
    }
  }
}
export default ValidateToken;
