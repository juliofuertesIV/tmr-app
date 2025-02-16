import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {

    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isApiProtectedRoute = req.nextUrl.pathname.startsWith('/api/protected'); 
    
    let sessionToken = req.cookies.get('session');

    if (!sessionToken) {
        const cookieHeader = req.headers.get("cookie");
        console.log({ cookieHeader })
        sessionToken = cookieHeader?.split("; ")
            .find(row => row.startsWith("session="))
            ?.split("=")[1] as unknown as RequestCookie 
    }

    console.log("Url: " + req.url)
    console.log("Request method: " + req.method)
    console.log({ sessionToken })
    
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
    matcher: ['/admin/:path*', '/api/protected/:path*'], // TO DO: Fix API FETCH calls to include cookies /path* (get works fine)
};