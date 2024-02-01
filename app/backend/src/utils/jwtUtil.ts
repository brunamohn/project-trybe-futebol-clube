import { sign, verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

type TokenPayload = {
  id: number,
  username: string,
  role: string,
};

function signIn(payload: TokenPayload): string {
  const token = sign(payload, secret, { algorithm: 'HS256' });
  return token;
}

function verifyToken(token: string): TokenPayload {
  const decoded = verify(token, secret) as TokenPayload;
  return decoded;
}

function decodeToken(token: string): TokenPayload | string {
  try {
    const user = verify(token, secret) as TokenPayload;
    console.log('user', user);
    return user;
  } catch (error) {
    return 'Token Invalido';
  }
}

export default {
  signIn,
  verifyToken,
  decodeToken,
};
