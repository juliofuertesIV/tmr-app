import * as Input from '@/lib/forms/components/inputs/type'
import { extractedSubdomainString, isValidDomain, isValidString, isValidUrl, processBasicTextInput } from "@/lib/forms/validation/functions"
import { IActionTarget, IFormField, IMediaFormField } from "@/types/forms"

export const contestFields : { [key in IActionTarget]: IFormField[] } = {
    creation: [
        {
            name: 'name',
            label: 'Nombre del concurso',
            instructions: 'Este es el nombre oficial del concurso. Ej: Bravavisión',
            type: 'text',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            element: Input.Base,
            required: true
        },
        {
            name: 'metaUrl',
            label: 'URL del concurso',
            instructions: 'Ej: https://bravavision.bravamadrid.com',
            type: 'text',
            validationMethod: isValidUrl,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            element: Input.Base,
            required: true
        },
        {
            name: 'year',
            label: 'Año de la edición',
            instructions: 'Ej: 2024',
            type: 'number',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            element: Input.Base,
            required: true
        },        
    ],
    update: [
        {
            name: 'name',
            label: 'Nombre del concurso',
            instructions: 'Este es el nombre oficial del concurso. Ej: Bravavisión',
            type: 'text',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            element: Input.Base,
            required: false
        },
        {
            name: 'domain',
            label: 'Dominio',
            instructions: 'Para uso interno. Extraído de la URL del concurso.',
            type: 'text',
            validationMethod: isValidDomain,
            processingMethod: extractedSubdomainString,
            testAgainst: null,
            element: Input.Base,
            readonly: true,
            required: false
        },
        {
            name: 'metaUrl',
            label: 'URL del concurso',
            instructions: 'Ej: https://bravavision.bravamadrid.com',
            type: 'text',
            validationMethod: isValidUrl,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            element: Input.Base,
            required: false
        },
        {
            name: 'year',
            label: 'Año de la edición',
            instructions: 'Ej: 2024',
            type: 'number',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            element: Input.Base,
            required: false
        },
        {
            name: 'metaTitle',
            label: 'Meta título de la web',
            instructions: 'Ej: Bravavisión | Brava Madrid',
            type: 'text',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            element: Input.Base,
            required: false
        },
        {
            name: 'metaDescription',
            label: 'Meta descripción de la web',
            instructions: 'Ej: El concurso de artistas de Brava Madrid.',
            type: 'text',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            element: Input.Base,
            required: false
        },    
        {
            name: 'postmarkToken',
            label: 'Token de Postmark',   
            instructions: 'Ej: ...',
            type: 'text',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            element: Input.Base,
            required: false
        },
        {
            name: 'postmarkSenderAddress',
            label: 'Dirección de envío de Postmark',
            instructions: 'Ej: bravavision@bravamadrid.com',
            type: 'text',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            element: Input.Base,
            required: false
        },
        {
            name: 'metaPixelId',
            label: 'ID del Píxel de Meta',
            instructions: null,
            type: 'text',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            element: Input.Base,
            required: false
        },
        {
            name: 'googleTagManagerId',
            label: 'ID de Google Tag Manager',
            instructions: null,
            type: 'text',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            element: Input.Base,
            required: false
        },
        {
            name: 'googleAnalyticsId',
            label: 'ID de Google Analytics',
            instructions: null,
            type: 'text',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            element: Input.Base,
            required: false
        }
    ]
}
