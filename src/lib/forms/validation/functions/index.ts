
export const isValidString = (value: string) => {
    return !!value && value.length > 1 
}

export const processBasicTextInput = (value: string) => {
    return value.trim()
}

export const isValidEmail = (value: string) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

export const isValidDomain = (value: string) => {
    
    const subdomainRegexp = /([a-z0-9\-]+\.)+[a-z0-9\-]+\.[a-z]+/

    return subdomainRegexp.test(value)
}

export const extractedSubdomainString = (value: string) => {
    

    if (value.includes('www.')) throw new Error('Subdominio mal formado. Incluye "www" y no debería.')

    const domainString = value.replace('https://', '')

    return [domainString.split('.')[0], domainString.split('.')[1]].join('-')
}

export const isValidUrl = (value: string, testAgainst: string | null) => {

    if (!testAgainst) return value.startsWith('https://')

    return value.startsWith('https://') && value.includes(testAgainst)
}

export const isValidSocialProfile = (value: string, testAgainst: string | null) => {

    return value.startsWith(`https://${ testAgainst }.com/`)

}