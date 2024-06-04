import { isValidSocialProfile, isValidString, isValidUrl, processBasicTextInput } from "@/lib/forms/validation/functions"
import { IFormField } from "@/types/forms"

export const brandFields : IFormField[] = [
        {
            name: 'name',
            label: 'Nombre de la marca',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            requiredForItemCreation: true
        },
        {
            name: 'website',
            label: 'Página web',
            validationMethod: isValidUrl,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            requiredForItemCreation: true
        },
        {
            name: 'instagramProfile',
            label: 'Perfil de Instagram',
            validationMethod: isValidSocialProfile,
            processingMethod: processBasicTextInput,
            testAgainst: 'instagram',
            type: 'text',
            requiredForItemCreation: false,
        },
        {
            name: 'tiktokProfile',
            label: 'Perfil de TikTok',
            validationMethod: isValidSocialProfile,
            processingMethod: processBasicTextInput,
            testAgainst: 'tiktok',
            type: 'text', 
            requiredForItemCreation: false,
        },
        {
            name: 'backgroundColor',
            label: 'Color de fondo',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            type: 'color', 
            requiredForItemCreation: false,
        },
        {
            name: 'foregroundColor',
            label: 'Color de texto',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            type: 'color',
            requiredForItemCreation: false,
        },
        {
            name: 'accentColor',
            label: 'Color de acento',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            type: 'color',
            requiredForItemCreation: false,
        }
    ]

