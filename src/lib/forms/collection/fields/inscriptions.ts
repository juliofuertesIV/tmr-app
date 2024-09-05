import { isValidEmail, isValidString, processBasicTextInput } from "@/lib/forms/validation/functions"
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
        name: 'file',
        label: 'Imagen',
        instructions: null,
        validationMethod: null,
        processingMethod: null,
        testAgainst: null,
        type: 'file',
        requiredForItemCreation: true
    },
]
