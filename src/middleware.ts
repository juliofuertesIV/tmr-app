import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptJWT } from "./lib/auth";

export const middleware = async (req: NextRequest) => {
    
/*     const sessionToken = await cookies().get('session');
    const decryptedManager = sessionToken ? await decryptJWT(sessionToken.value) : null;

    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    const isApiProtectedRoute = req.nextUrl.pathname.startsWith('/api/protected');

    if (!decryptedManager) {
        if (isApiProtectedRoute) {
            return NextResponse.json({ success: false, message: 'Not allowed.' }, { status: 401 });
        }

        if (isAdminRoute) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    } */

    return NextResponse.next();
};

export const config = {
    matcher: ['/admin/:path*', '/api/protected/:path*'], // TO DO: Fix API calls to include cookies
};