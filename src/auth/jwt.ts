import { IManager } from "@/types";
import { SignJWT, jwtVerify } from "jose";

const secretJWTKey = process.env.SECRET_JWT_KEY

const key = new TextEncoder().encode(secretJWTKey);

export async function getEncryptedAndSignedJWT(payload: any) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7 days from now")
      .sign(key);
}


export async function decryptJWT(input: string): Promise<any> {
    
    const { payload: manager } = await jwtVerify(input, key, { algorithms: ["HS256"] }) as { payload: IManager }

    return manager;
}

  
