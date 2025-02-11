import { DecryptedJWTManager, Manager } from "@/types";
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


export async function decryptJWT(input: string): Promise<DecryptedJWTManager | null> {

    if (!input) return null
    
    const data = await jwtVerify(input, key, { algorithms: ["HS256"] }).then((data) => { return data.payload }) as { manager: DecryptedJWTManager }
    
    const { manager } = data

    return manager ? manager : null;

}

  
