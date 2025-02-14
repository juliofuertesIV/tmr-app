'use server'

import { getEncryptedAndSignedJWT } from "@/lib/auth";
import { DecryptedJWTManager, Manager as ManagerType } from "@/types";
import { cookies } from "next/headers";
import { decryptJWT } from "./jwt";
import { NextRequest, NextResponse } from "next/server";
import { Manager } from "@/database/models";

export const getDecryptedManager = async () : Promise<DecryptedJWTManager | null> => {
    const sessionToken = cookies().get('session');
    return sessionToken ? await decryptJWT(sessionToken.value) : null;
}
 
export async function getManagerFromSession() : Promise<ManagerType | null> {

    const decryptedManager = await getDecryptedManager()

    if (!decryptedManager) return null

    return ( 
        await Manager.findOne({ where: { id: decryptedManager.id }})
        .then(data => data)
        .catch(error => { throw new Error(error as string )})
        
    ) as unknown as ManagerType | null 
}

export const createSession = async ({ manager } : { manager: ManagerType }) => {
    
    const expires = new Date(Date.now() + 172800000); // 48h

    const payloadToEncrypt = {
        id: manager.id,
        name: manager.name,
        email: manager.email,
        RoleId: manager.Role.id
    }

    const session = await getEncryptedAndSignedJWT({ manager: payloadToEncrypt });

    return { session, expires }
}


export async function updateSession(request: NextRequest) {

    const session = request.cookies.get("session")?.value;
    if (!session) return;
  
    // Refresh the session so it doesn't expire
    const manager = await decryptJWT(session);

    const res = NextResponse.next();

    res.cookies.set({
        name: "session",
        value: await getEncryptedAndSignedJWT(manager),
        httpOnly: true,
        expires: new Date(Date.now() + 172800000)
    });

    return res;
}

export async function destroySession() {
    // Destroy the session
    (await cookies()).set('session', "")
        
}
 