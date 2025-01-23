import { isValidEmail, isValidString, isValidUrl, processBasicTextInput } from "@/lib/forms/validation/functions"
import { IFormField } from "@/types/forms"

export const inscriptionFields : IFormField[] = [
    {
        name: 'name',
        label: 'Nombre artístico',
        instructions: null,
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        type: 'text',
        requiredForItemCreation: true
    },
    {
        name: 'description',
        label: 'Descripción',
        instructions: null,
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        type: 'text',
        requiredForItemCreation: true
    },
    {
        name: 'contactName',
        label: 'Nombre de contacto',
        instructions: null,
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        type: 'text',
        requiredForItemCreation: true
    },
    {
        name: 'phone',
        label: 'Teléfono de contacto',
        instructions: null,
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        type: 'tel',
        requiredForItemCreation: true
    },
    {
        name: 'email',
        label: 'Email de contacto',
        instructions: null,
        validationMethod: isValidEmail,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        type: 'tel',
        requiredForItemCreation: true
    },
    {
        name: 'city',
        label: 'Ciudad',
        instructions: null,
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        type: 'text',
        requiredForItemCreation: true
    },
    {
        name: 'genre',
        label: 'Género',
        instructions: null,
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        type: 'text',
        requiredForItemCreation: true
    },
    {
        name: 'video',
        label: 'Enlace de YouTube',
        instructions: null,
        validationMethod: isValidUrl,
        processingMethod: null,
        testAgainst: null,
        type: 'text',
        requiredForItemCreation: true
    },
    {
        name: 'instagram',
        label: 'Instagram',
        instructions: null,
        validationMethod: isValidUrl,
        processingMethod: null,
        testAgainst: null,
        type: 'text',
        requiredForItemCreation: true
    },
    {
        name: 'spotify',
        label: 'Spotify',
        instructions: null,
        validationMethod: isValidUrl,
        processingMethod: null,
        testAgainst: null,
        type: 'text',
        requiredForItemCreation: true
    },
    {
        name: 'tiktok',
        label: 'Tiktok',
        instructions: null,
        validationMethod: isValidUrl,
        processingMethod: null,
        testAgainst: null,
        type: 'text',
        requiredForItemCreation: false
    }
]
