import bcrypt from 'bcrypt';
import { generateJwtToken } from '../../pages/api/jwtMiddleware';
import { prisma } from '../../db';

const USER_PASSWORD_SALT = 5;

export async function createUser(name: string, email: string, password: string) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    throw new Error('E-mail já cadastrado.');
  }

  password = await bcrypt.hash(password, USER_PASSWORD_SALT);

  await prisma.user.create({
    data: {
      name,
      email,
      password
    }
  });
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    throw new Error('Usuário ou senha incorretos.');
  }

  const matchingPassword = await bcrypt.compare(password, user.password);

  if (!matchingPassword) {
    throw new Error('Usuário ou senha incorretos.');
  }

  const token = generateJwtToken({ id: user.id });

  return token;
}
