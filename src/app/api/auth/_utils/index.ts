
import crypto from 'crypto'
import { customAlphabet } from 'nanoid'

// NANOID
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export const generateUserToken = customAlphabet(alphabet, 15);

//HASH AND SALT
export const getHashAndSaltFromPassword = (password: string) => {

    if (!password || typeof password !== 'string') throw new Error('Bad password fed to hash generation.')

    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

    return { hash, salt }
}


export const getManagerCreationPayload = (
    { name, email, password, RoleId } : 
    { name: string, email: string, password: string, RoleId: 1 | 2 | 3 | 4 }
) => {

    const { hash, salt } = getHashAndSaltFromPassword(password)

    const manager = {
        name,
        email,
        hash,
        salt,
        RoleId,
        token: generateUserToken()
    }

    return manager
}

export const passwordsAreMatching = ({ hash, salt, inputPassword } : { hash: string, salt: string, inputPassword: string }) => {
    
    const inputHash = crypto
        .pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512')
        .toString('hex')

    const passwordsMatch = hash === inputHash
    
    return passwordsMatch
}