import { extractedSubdomainString, isValidDomain, isValidString, isValidUrl, processBasicTextInput } from "@/lib/forms/validation/functions"
import { IFormField, IMediaFormField } from "@/types/forms"

export const contestFields : IFormField[] = [
    {
        name: 'name',
        label: 'Nombre del concurso',
        instructions: 'Este es el nombre oficial del concurso. Ej: Bravavisión',
        type: 'text',
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        requiredForItemCreation: true
    },
    {
        name: 'domain',
        label: 'Dominio',
        instructions: 'Para uso interno. Extraído de la URL del concurso.',
        type: 'text',
        validationMethod: isValidDomain,
        processingMethod: extractedSubdomainString,
        testAgainst: null,
        requiredForItemCreation: false,
        readonly: true
    },
    {
        name: 'metaUrl',
        label: 'URL del concurso',
        instructions: 'Ej: https://bravavision.bravamadrid.com',
        type: 'text',
        validationMethod: isValidUrl,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        requiredForItemCreation: true
    },
    {
        name: 'year',
        label: 'Año de la edición',
        instructions: 'Ej: 2024',
        type: 'number',
        validationMethod: null,
        processingMethod: null,
        testAgainst: null,
        requiredForItemCreation: true
    },
    {
        name: 'metaTitle',
        label: 'Meta título de la web',
        instructions: 'Ej: Bravavisión | Brava Madrid',
        type: 'text',
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        requiredForItemCreation: false
    },
    {
        name: 'metaDescription',
        label: 'Meta descripción de la web',
        instructions: 'Ej: El concurso de artistas de Brava Madrid.',
        type: 'text',
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        requiredForItemCreation: false
    },    
    {
        name: 'postmarkToken',
        label: 'Token de Postmark',   
        instructions: 'Ej: ...',
        type: 'text',
        validationMethod: null,
        processingMethod: null,
        testAgainst: null,
        requiredForItemCreation: false
    },
    {
        name: 'postmarkSenderAddress',
        label: 'Dirección de envío de Postmark',
        instructions: 'Ej: bravavision@bravamadrid.com',
        type: 'text',
        validationMethod: null,
        processingMethod: null,
        testAgainst: null,
        requiredForItemCreation: false
    },
    {
        name: 'metaPixelId',
        label: 'ID del Píxel de Meta',
        instructions: null,
        type: 'text',
        validationMethod: null,
        processingMethod: null,
        testAgainst: null,
        requiredForItemCreation: false
    },
    {
        name: 'googleTagManagerId',
        label: 'ID de Google Tag Manager',
        instructions: null,
        type: 'text',
        validationMethod: null,
        processingMethod: null,
        testAgainst: null,
        requiredForItemCreation: false
    },
    {
        name: 'googleAnalyticsId',
        label: 'ID de Google Analytics',
        instructions: null,
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
        name: 'logo',
        accept: 'image/svg+xml'
    },
    {
        role: 'banner',
        label: 'Banner',
        name: 'banner',
        accept: 'image/svg+xml'
    },
    {
        role: 'frame',
        label: 'Marco',
        name: 'frame',
        accept: 'image/svg+xml'
    },
    {
        role: 'favicon',
        label: 'Favicon',
        name: 'favicon',
        accept: 'image/vnd.microsoft.icon'
    }
]

export const contestFooterField : IMediaFormField[] = [
    {
        role: 'footerElement',
        label: 'Elemento de footer',
        name: 'footer',
        accept: 'image/svg+xml'
    },
]
