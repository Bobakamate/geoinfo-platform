// middleware.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  
  const isAuthPage = nextUrl.pathname.startsWith('/api/auth') || 
                     nextUrl.pathname === '/login' || 
                     nextUrl.pathname === '/register'
  
  const isProtectedRoute = nextUrl.pathname.startsWith('/dashboard') ||
                          nextUrl.pathname.startsWith('/profile') ||
                          nextUrl.pathname.startsWith('/settings')
  
  // Si l'utilisateur est connecté et essaie d'accéder à login/register
  if (isLoggedIn && (nextUrl.pathname === '/login' || nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl))
  }
  
  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Protéger les routes privées
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/login',
    '/register',
  ],
}