import * as Input from '@/lib/forms/components/inputs/type'
import { isValidSocialProfile, isValidString, isValidUrl, processBasicTextInput } from "@/lib/forms/validation/functions"
import { IActionTarget, IFormField } from "@/types/forms"

export const brandFields : { [key in IActionTarget]: IFormField[] } = { 
    creation: [
        {
            name: 'name',
            label: 'Nombre de la marca',
            instructions: 'Ej: Arenal Sound o Arenal Sound DJs',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            element: Input.Base,
            required: true,
            type: 'text'
        },
        {
            name: 'website',
            label: 'Página web',
            instructions: 'Ej: www.arenalsound.com',
            validationMethod: isValidUrl,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            element: Input.Base,
            required: true,
            type: 'text'
        },
        {
            name: 'instagramProfile',
            label: 'Perfil de Instagram',
            instructions: 'Ej: https://instagram.com/arenalsound',
            validationMethod: isValidSocialProfile,
            processingMethod: processBasicTextInput,
            testAgainst: 'instagram',
            element: Input.Base,
            required: true,
            type: 'text'
        },
        {
            name: 'tiktokProfile',
            label: 'Perfil de TikTok',
            instructions: 'Ej: https://tiktok.com/@arenalsound',
            validationMethod: isValidSocialProfile,
            processingMethod: processBasicTextInput,
            testAgainst: 'tiktok',
            element: Input.Base,
            required: true,
            type: 'text',
        }
    ],    
    update: [
        {
            name: 'name',
            label: 'Nombre de la marca',
            instructions: 'Ej: Arenal Sound o Arenal Sound DJs',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            element: Input.Base,
            required: true,
            type: 'text'
        },
        {
            name: 'website',
            label: 'Página web',
            instructions: 'Ej: www.arenalsound.com',
            validationMethod: isValidUrl,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            element: Input.Base,
            required: true,
            type: 'text'
        },
        {
            name: 'instagramProfile',
            label: 'Perfil de Instagram',
            instructions: 'Ej: https://instagram.com/arenalsound',
            validationMethod: isValidSocialProfile,
            processingMethod: processBasicTextInput,
            testAgainst: 'instagram',
            element: Input.Base,
            required: true,
            type: 'text'
        },
        {
            name: 'tiktokProfile',
            label: 'Perfil de TikTok',
            instructions: 'Ej: https://tiktok.com/@arenalsound',
            validationMethod: isValidSocialProfile,
            processingMethod: processBasicTextInput,
            testAgainst: 'tiktok',
            element: Input.Base,
            required: true,
            type: 'text',
        },
        {
            name: 'backgroundColor',
            label: 'Color de fondo',
            instructions: 'El color de fondo de la app.',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            element: Input.Base,
            required: true,
            type: 'color',
        },
        {
            name: 'foregroundColor',
            label: 'Color de texto',
            instructions: 'El color de texto de la app.',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            element: Input.Base,
            required: true,
            type: 'color'
        },
        {
            name: 'accentColor',
            label: 'Color de acento',
            instructions: 'El color de acento para links o botones.',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            element: Input.Base,
            required: true,
            type: 'color'
        }
    ]
}

