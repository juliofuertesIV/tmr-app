import { NextRequest, NextResponse } from "next/server";
import { decryptJWT } from "./auth";

export const middleware = async (req: NextRequest) => {
    
    if (req.nextUrl.pathname.startsWith('/admin/login')) {
        return NextResponse.next()
      }

    const sessionToken = req.cookies.get('session')

    if (sessionToken) {

        const session = await decryptJWT(sessionToken.value)
        console.log('Accesed by ' + session.manager.name)
        console.log('Accesed by ' + session.manager.name)
        console.log('Accesed by ' + session.manager.name)
        console.log('Accesed by ' + session.manager.name)
        console.log('Accesed by ' + session.manager.name)
        console.log('Accesed by ' + session.manager.name)
        
    } 
    
    else {
        return Response.redirect(new URL('/admin/login', req.url))
    }
}

export const config = {
    matcher: '/admin/:path*',
}