import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    //console.log('token: ', req.nextauth.token);

    if (!req.nextauth.token) {
      return NextResponse.rewrite(new URL('/auth/login', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth).*)']
};
