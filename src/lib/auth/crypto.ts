import crypto from 'crypto'

export const getHashAndSaltFromPassword = (password: string) => {

    if (!password || typeof password !== 'string') throw new Error('Bad password fed to hash generation.')

    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

    return { hash, salt }
}


export const passwordsAreMatching = ({ hash, salt, inputPassword } : { hash: string, salt: string, inputPassword: string }) => {

    const inputHash = crypto
        .pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512')
        .toString('hex')

    const passwordsMatch = hash === inputHash

    return passwordsMatch
}