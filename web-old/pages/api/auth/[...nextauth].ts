import { UserRepository } from '@db';
import { AuthService } from '@core/domain/auth';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'E-mail',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as any;

        const userRepository = new UserRepository();
        const authService = new AuthService(userRepository);
        const user = await authService.login(email, password);

        const token = await authService.generateJwtToken({ id: user.id });

        user.password = '';

        if (token) return user;

        return null;
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log({ token, user });
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login'
  }
};

export default NextAuth(authOptions);
