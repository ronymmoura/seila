import { UserRepository } from '@db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'E882mwxh@1991';
const EXPIRATION = 5000;

const USER_PASSWORD_SALT = 5;

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async create(name: string, email: string, password: string) {
    const existingUser = await this.userRepository.getByEmail(email);

    if (existingUser) {
      throw new Error('E-mail já cadastrado.');
    }

    password = await bcrypt.hash(password, USER_PASSWORD_SALT);

    await this.userRepository.create(name, email, password);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new Error('Usuário ou senha incorretos.');
    }

    const matchingPassword = await bcrypt.compare(password, user.password);

    if (!matchingPassword) {
      throw new Error('Usuário ou senha incorretos.');
    }

    return user;
  }

  async generateJwtToken(payload: any) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRATION });
  }
}
