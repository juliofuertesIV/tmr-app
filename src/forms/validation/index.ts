import { extractSubdomain, isValidDomain, isValidEmail, isValidSocialProfile, isValidString, isValidUrl, processBasicTextInput } from "./functions";

type IValidationTypes = 'basicTextInput' | 'emailInput' | 'urlInput' | 'socialInput' | 'domainInput'

export type IValidationCriteriaFieldNames = keyof typeof validationCriteriaByFieldName

export const potentialValidationFields : IValidationCriteriaFieldNames[] = [
    'name',
    'contactName',
    'email',
    'phone',
    'city',
    'domain',
    'bannerHref',
    'metaUrl',
    'metaTitle',
    'metaDescription',
    'description',
    'spotify',
    'instagram',
    'tiktok',
    'video',
    'website',
    'instagramProfile',
    'tiktokProfile',
] 

const validations : { 
    [key in IValidationTypes]: { 
        validationMethod: ((value: string, testAgainst: string | null) => boolean) | null,
        processingMethod: (value: string) => string
    }
} = {
    basicTextInput: {
        validationMethod: isValidString,
        processingMethod: processBasicTextInput
    },
    emailInput: {
        validationMethod: isValidEmail,
        processingMethod: processBasicTextInput
    },
    urlInput: {
        validationMethod: isValidUrl,
        processingMethod: processBasicTextInput
    },
    socialInput: {
        validationMethod: isValidSocialProfile,
        processingMethod: processBasicTextInput
    },
    domainInput: {
        validationMethod: isValidDomain,
        processingMethod: extractSubdomain
    }
}

const validationCriteriaByFieldName = {
    name: { 
        key: 'basicTextInput',
        testAgainst: null
    },
    contactName: {
        key: 'basicTextInput',
        testAgainst: null
    },
    email: {
        key: 'emailInput',
        testAgainst: null
    },
    phone: {
        key: 'basicTextInput',
        testAgainst: null
    },
    city: {
        key: 'basicTextInput',
        testAgainst: null
    },
    domain: {
        key: 'domainInput',
        testAgainst: null
    },
    bannerHref: {
        key: 'urlInput',
        testAgainst: null
    },
    metaUrl: {
        key: 'urlInput',
        testAgainst: null
    },
    metaTitle: {
        key: 'basicTextInput',
        testAgainst: null
    },
    metaDescription: {
        key: 'basicTextInput',
        testAgainst: null
    },
    description: {
        key: 'basicTextInput',
        testAgainst: null
    },
    spotify: {
        key: 'socialInput',
        testAgainst: 'spotify'
    },
    instagram: {
        key: 'socialInput',
        testAgainst: 'instagram'
    },
    tiktok: {
        key: 'socialInput',
        testAgainst: 'tiktok'
    },
    video: {
        key: 'urlInput',
        testAgainst: 'youtube'
    },
    website: {
        key: 'urlInput',
        testAgainst: null
    },
    instagramProfile: {
        key: 'socialInput',
        testAgainst: 'instagram'
    },
    tiktokProfile: {
        key: 'socialInput',
        testAgainst: 'tiktok'
    },
}

export const getValidationMethodAndProcessingFromFieldName = (fieldName: IValidationCriteriaFieldNames) => {

    const criteria = validationCriteriaByFieldName[fieldName]

    const emptyCriteria = { validationMethod: null, processingMethod: null, valueToTestAgainst: null }

    if (!criteria) return emptyCriteria

    const { key } = criteria

    if (!key) return emptyCriteria

    const methods = validations[key as keyof typeof validations]

    if (!methods) return emptyCriteria

    const { validationMethod, processingMethod } = methods

    return { validationMethod, processingMethod, valueToTestAgainst: criteria.testAgainst }

}
