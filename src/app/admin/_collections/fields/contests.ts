import { extractSubdomain, isValidDomain, isValidString, isValidUrl, processBasicTextInput } from "@/forms/validation/functions"
import { IActionTarget, IFormField, IMediaFormField } from "@/types/forms"

export const contestFields = {
    creation: [
        {
            name: 'name',
            label: 'Nombre del concurso',
            type: 'text',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
        },
        {
            name: 'domain',
            label: 'Dominio',
            type: 'text',
            validationMethod: isValidDomain,
            processingMethod: extractSubdomain,
            testAgainst: null,
        },
        {
            name: 'year',
            label: 'Año de la edición',
            type: 'number',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
        }
    ],
    update: [
        {
            name: 'name',
            label: 'Nombre del concurso',
            type: 'text',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
        },
        {
            name: 'domain',
            label: 'Dominio',
            type: 'text',
            validationMethod: isValidDomain,
            processingMethod: extractSubdomain,
            testAgainst: null,
        },
        {
            name: 'year',
            label: 'Año de la edición',
            type: 'number',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
        },
        {
            name: 'metaUrl',
            label: 'URL del concurso',
            type: 'text',
            validationMethod: isValidUrl,
            processingMethod: processBasicTextInput,
            testAgainst: null,
        },
        {
            name: 'metaTitle',
            label: 'Meta título de la web',
            type: 'text',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
        },
        {
            name: 'metaDescription',
            label: 'Meta descripción de la web',
            type: 'text',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
        },    
        {
            name: 'postmarkToken',
            label: 'Token de Postmark',   
            type: 'text',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
        },
        {
            name: 'postmarkSenderAddress',
            label: 'Dirección de envío de Postmark',
            type: 'text',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
        },
        {
            name: 'metaPixelId',
            label: 'ID del Píxel de Meta',
            type: 'text',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
        },
        {
            name: 'googleTagManagerId',
            label: 'ID de Google Tag Manager',
            type: 'text',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
        },
        {
            name: 'googleAnalyticsId',
            label: 'ID de Google Analytics',
            type: 'text',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
        }
    ],
} as {
    [key in IActionTarget]: IFormField[]
}

export const contestsMediaFields : IMediaFormField[] = [
    {
        role: 'logo',
        label: 'Logotipo',
        instructions: 'Debe pesar menos de 2mb',
        acceptedTypes: 'image/png, image/svg+xml',
        multiple: false,
    },
    {
        role: 'banner',
        label: 'Banner',
        instructions: 'Debe pesar menos de 2mb',
        acceptedTypes: 'image/png, image/svg+xml',
        multiple: false,
    },
    {
        role: 'frame',
        label: 'Marco',
        instructions: 'Debe pesar menos de 2mb',
        acceptedTypes: 'image/png, image/svg+xml',
        multiple: false,
    },
    {
        role: 'favicon',
        label: 'Favicon',
        instructions: 'Debe ser imagen tipo .ico',
        acceptedTypes: '.ico',
        multiple: false,
    },
]
