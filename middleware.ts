import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Basic HTTP authentication middleware. If BASIC_AUTH_USER and BASIC_AUTH_PASS environment variables
// are defined, requests must include a matching Authorization header. Otherwise, requests pass through.
export function middleware(req: NextRequest) {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASS;
  if (!user || !pass) {
    return NextResponse.next();
  }
  const auth = req.headers.get('authorization');
  if (!auth) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Restricted Area", charset="UTF-8"' },
    });
  }
  const [scheme, encoded] = auth.split(' ');
  if (scheme !== 'Basic') {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Restricted Area", charset="UTF-8"' },
    });
  }
  const decoded = Buffer.from(encoded, 'base64').toString();
  const [username, password] = decoded.split(':');
  if (username === user && password === pass) {
    return NextResponse.next();
  }
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Restricted Area", charset="UTF-8"' },
  });
}

// Exclude static assets and public files from authentication
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
