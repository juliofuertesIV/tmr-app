import { getEncryptedAndSignedJWT } from "@/auth";
import { IManager } from "@/types";
import { cookies } from "next/headers";
import { decryptJWT } from "./jwt";
import { NextRequest, NextResponse } from "next/server";

export async function getSession() {
    
    const session = cookies().get("session")?.value;

    if (!session) return null;

    return await decryptJWT(session);
}

export const createSession = async ({ manager } : { manager: IManager }) => {
    
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
    const parsed = await decryptJWT(session);
    parsed.expires = new Date(Date.now() + 172800000);

    const res = NextResponse.next();

    res.cookies.set({
        name: "session",
        value: await getEncryptedAndSignedJWT(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });

    return res;
}

export async function destroySession() {
    // Destroy the session
    cookies().set("session", "", { expires: new Date(0) });
}
 