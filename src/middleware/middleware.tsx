// middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { parseCookies } from 'nookies';

const checkRole = (req: NextRequest, requiredRole: string): boolean => {
  const cookies = parseCookies({ req });
  const token = cookies['accessToken']; // Asegúrate de que el token esté en las cookies
  const user = cookies['user'] ? JSON.parse(cookies['user']) : null;

  return token && user && user.role === requiredRole;
};

export function middleware(req: NextRequest) {
  // Rutas protegidas para cada rol
  if (req.url.includes('/Chef-order') && !checkRole(req, 'chef')) {
    return NextResponse.redirect(new URL('/unauthorized', req.url)); // Redirige si no es chef
  }

  if (req.url.includes('/WaiterOrder') && !checkRole(req, 'mozo')) {
    return NextResponse.redirect(new URL('/unauthorized', req.url)); // Redirige si no es mozo
  }

  if (req.url.includes('/Admin-dashboard') && !checkRole(req, 'manager')) {
    return NextResponse.redirect(new URL('/unauthorized', req.url)); // Redirige si no es manager
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/Chef-order',
    '/WaiterOrder',
    '/Admin-dashboard', // Las rutas que deseas proteger
  ],
};
