export interface UserInterface {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface UserModelInterface {
  validateUser(email: string): Promise<UserInterface | null>;
}
