import * as Input from '@/lib/forms/components/inputs/type'

import { isValidEmail, isValidString, isValidUrl, processBasicTextInput } from "@/lib/forms/validation/functions"
import { IActionTarget, IFormField } from "@/types/forms"

export const inscriptionFields : { [key in IActionTarget]: IFormField[] } = { 
    creation: [
        {
            name: 'file',
            label: 'Elige una imagen',
            instructions: 'La imagen debe pesar menos de 2mb.',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            type: 'file',
            element: Input.Base,
            media: {
                role: 'inscriptions',
                accept: 'image/*',
                previewClassname: 'flex h-full w-full aspect-video border-2 border-neutral-100 rounded-md'
            },
            required: true
        },
        {
            name: 'name',
            label: 'Nombre artístico',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'description',
            label: 'Descripción',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'contactName',
            label: 'Nombre de contacto',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'phone',
            label: 'Teléfono de contacto',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'tel',
            element: Input.Base,
            required: true
        },
        {
            name: 'email',
            label: 'Email de contacto',
            instructions: null,
            validationMethod: isValidEmail,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'tel',
            element: Input.Base,
            required: true
        },
        {
            name: 'city',
            label: 'Ciudad',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'genre',
            label: 'Género',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'video',
            label: 'Enlace de YouTube',
            instructions: null,
            validationMethod: isValidUrl,
            processingMethod: null,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'instagram',
            label: 'Instagram',
            instructions: null,
            validationMethod: isValidUrl,
            processingMethod: null,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'spotify',
            label: 'Spotify',
            instructions: null,
            validationMethod: isValidUrl,
            processingMethod: null,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'tiktok',
            label: 'Tiktok',
            instructions: null,
            validationMethod: isValidUrl,
            processingMethod: null,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: false
        }
    ],    
    update: [
        {
            name: 'name',
            label: 'Nombre artístico',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'description',
            label: 'Descripción',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'contactName',
            label: 'Nombre de contacto',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'phone',
            label: 'Teléfono de contacto',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'tel',
            element: Input.Base,
            required: true
        },
        {
            name: 'email',
            label: 'Email de contacto',
            instructions: null,
            validationMethod: isValidEmail,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'tel',
            element: Input.Base,
            required: true
        },
        {
            name: 'city',
            label: 'Ciudad',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'genre',
            label: 'Género',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'video',
            label: 'Enlace de YouTube',
            instructions: null,
            validationMethod: isValidUrl,
            processingMethod: null,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'instagram',
            label: 'Instagram',
            instructions: null,
            validationMethod: isValidUrl,
            processingMethod: null,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'spotify',
            label: 'Spotify',
            instructions: null,
            validationMethod: isValidUrl,
            processingMethod: null,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'tiktok',
            label: 'Tiktok',
            instructions: null,
            validationMethod: isValidUrl,
            processingMethod: null,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: false
        }
    ]
}
