import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Проверяем наличие токена авторизации
  const token = request.cookies.get('auth_token');
  const isProfilePage = request.nextUrl.pathname.startsWith('/profile');

  if (isProfilePage && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/profile/:path*',
};
