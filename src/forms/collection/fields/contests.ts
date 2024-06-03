import { extractSubdomain, isValidDomain, isValidString, isValidUrl, processBasicTextInput } from "@/forms/validation/functions"
import { IFormField, IMediaFormField } from "@/types/forms"

export const contestFields : IFormField[] = [
    {
        name: 'name',
        label: 'Nombre del concurso',
        type: 'text',
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        requiredForItemCreation: true
    },
    {
        name: 'domain',
        label: 'Dominio',
        type: 'text',
        validationMethod: isValidDomain,
        processingMethod: extractSubdomain,
        testAgainst: null,
        requiredForItemCreation: true
    },
    {
        name: 'year',
        label: 'Año de la edición',
        type: 'number',
        validationMethod: null,
        processingMethod: null,
        testAgainst: null,
        requiredForItemCreation: true
    },
    {
        name: 'metaUrl',
        label: 'URL del concurso',
        type: 'text',
        validationMethod: isValidUrl,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        requiredForItemCreation: false
    },
    {
        name: 'metaTitle',
        label: 'Meta título de la web',
        type: 'text',
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        requiredForItemCreation: false
    },
    {
        name: 'metaDescription',
        label: 'Meta descripción de la web',
        type: 'text',
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        requiredForItemCreation: false
    },    
    {
        name: 'postmarkToken',
        label: 'Token de Postmark',   
        type: 'text',
        validationMethod: null,
        processingMethod: null,
        testAgainst: null,
        requiredForItemCreation: false
    },
    {
        name: 'postmarkSenderAddress',
        label: 'Dirección de envío de Postmark',
        type: 'text',
        validationMethod: null,
        processingMethod: null,
        testAgainst: null,
        requiredForItemCreation: false
    },
    {
        name: 'metaPixelId',
        label: 'ID del Píxel de Meta',
        type: 'text',
        validationMethod: null,
        processingMethod: null,
        testAgainst: null,
        requiredForItemCreation: false
    },
    {
        name: 'googleTagManagerId',
        label: 'ID de Google Tag Manager',
        type: 'text',
        validationMethod: null,
        processingMethod: null,
        testAgainst: null,
        requiredForItemCreation: false
    },
    {
        name: 'googleAnalyticsId',
        label: 'ID de Google Analytics',
        type: 'text',
        validationMethod: null,
        processingMethod: null,
        testAgainst: null,
        requiredForItemCreation: false
    }
]

export const contestsMediaFields : IMediaFormField[] = [
    {
        role: 'logo',
        label: 'Logotipo',
        type: 'image',
    },
    {
        role: 'banner',
        label: 'Banner',
        type: 'image',
    },
    {
        role: 'frame',
        label: 'Marco',
        type: 'image',
    },
    {
        role: 'favicon',
        label: 'Favicon',
        type: 'image',
    },
]
