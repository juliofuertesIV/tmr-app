import { NextRequest } from "next/server";
import { decryptJWT } from "./lib/auth";
import { IManager } from "./types";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const middleware = async (req: NextRequest) => {
    
    const sessionToken = req.cookies.get('session') 
    
    const manager = await getManagerFromCookies(sessionToken)

    const { allowed, redirect } = checkIfAllowedByRouteName(req.url, manager)

    if (!allowed) {

        if (redirect) return Response.redirect(new URL(redirect as string, req.url))
        else return Response.json('Not allowed.')
    }
    
}

const checkIfAllowedByRouteName = (routeName: string, manager: IManager | null) : { allowed: boolean, redirect: string | null } => {

    if (!!manager) return {
        allowed: true,
        redirect: null,
    }

    return {
        allowed: false,
        redirect: '/login',
    }
}

const getManagerFromCookies = async (sessionToken: RequestCookie | undefined) => sessionToken ? await decryptJWT(sessionToken.value) : null

export const config = {
    matcher: ['/admin', '/admin/:path*', '/api/protected/:path'], // :path* gives logging loop 
}
