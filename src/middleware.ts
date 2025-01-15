import { NextRequest } from "next/server";
import { decryptJWT } from "./lib/auth";

export const middleware = async (req: NextRequest) => {
    
    const sessionToken = req.cookies.get('session') 

    if (sessionToken) {

        console.log({ adminName: process.env.SUPERDAMIN_NAME })

        const manager = await decryptJWT(sessionToken.value) 

        if (!manager) {
            return Response.redirect(new URL('/login', req.url))
        }
    } 
    
    else {
        return Response.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: ['/admin', '/admin/:path*'],
}