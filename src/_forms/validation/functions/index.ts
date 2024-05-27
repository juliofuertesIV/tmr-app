

export const isValidUrl = (
    { value, includes } : 
    { value: string, includes?: string }
) => {

    if (!includes) return value.startsWith('https://')

    return value.startsWith('https://') && value.includes(includes)
}

export const isValidSocialProfile = (
    { value, social } : 
    { value: string, social: 'instagram' | 'tiktok' }
) => {

    return value.startsWith(`https://${ social }.com/`)

}