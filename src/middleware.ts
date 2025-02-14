import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {

    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isApiProtectedRoute = req.nextUrl.pathname.startsWith('/api/protected'); 
    
    const sessionToken = req.cookies.get('session');
    
    if (!sessionToken) {
        if (isApiProtectedRoute) {
            return NextResponse.json({ success: false, message: 'Not allowed.' }, { status: 401 });
        }

        if (isAdminRoute) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }
    
    return NextResponse.next();
};

export const config = {
    matcher: ['/admin/:path*', '/api/protected/:path'], // TO DO: Fix API calls to include cookies
};