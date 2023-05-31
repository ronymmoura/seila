import { prisma } from '@db';

export class UserRepository {
  async getByEmail(email: string) {
    const user = await prisma.user.findFirst({ where: { email } });

    return user;
  }

  async create(name: string, email: string, password: string) {
    await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });
  }
}
