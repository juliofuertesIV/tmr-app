import { isValidSocialProfile, isValidString, isValidUrl, processBasicTextInput } from "@/lib/forms/validation/functions"
import { IFormField } from "@/types/forms"

export const brandFields : IFormField[] = [
        {
            name: 'name',
            label: 'Nombre de la marca',
            instructions: 'Ej: Arenal Sound o Arenal Sound DJs',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            requiredForItemCreation: true
        },
        {
            name: 'website',
            label: 'Página web',
            instructions: 'Ej: www.arenalsound.com',
            validationMethod: isValidUrl,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            requiredForItemCreation: true
        },
        {
            name: 'instagramProfile',
            label: 'Perfil de Instagram',
            instructions: 'Ej: https://instagram.com/arenalsound',
            validationMethod: isValidSocialProfile,
            processingMethod: processBasicTextInput,
            testAgainst: 'instagram',
            type: 'text',
            requiredForItemCreation: true,
        },
        {
            name: 'tiktokProfile',
            label: 'Perfil de TikTok',
            instructions: 'Ej: https://tiktok.com/@arenalsound',
            validationMethod: isValidSocialProfile,
            processingMethod: processBasicTextInput,
            testAgainst: 'tiktok',
            type: 'text', 
            requiredForItemCreation: true,
        },
        {
            name: 'backgroundColor',
            label: 'Color de fondo',
            instructions: 'El color de fondo de la app.',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            type: 'color', 
            requiredForItemCreation: false,
        },
        {
            name: 'foregroundColor',
            label: 'Color de texto',
            instructions: 'El color de texto de la app.',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            type: 'color',
            requiredForItemCreation: false,
        },
        {
            name: 'accentColor',
            label: 'Color de acento',
            instructions: 'El color de acento para links o botones.',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            type: 'color',
            requiredForItemCreation: false,
        }
    ]

