import { IManager } from "@/types";
import { SignJWT, jwtVerify } from "jose";

const secretJWTKey = process.env.SECRET_JWT_KEY

const key = new TextEncoder().encode(secretJWTKey);

export async function getEncryptedAndSignedJWT(payload: any) {

    if (!secretJWTKey) throw new Error('Secret encryption key not found.')

    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7 days from now")
      .sign(key);
}


export async function decryptJWT(input: string): Promise<IManager | null> {

    if (!input) return null
    
    const { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] }) as { payload: { manager: IManager }}

    const { manager } = payload

    return manager ? manager : null;
}

  
