import { isValidEmail, isValidString, processBasicTextInput } from "@/forms/validation/functions"
import { IFormField } from "@/types/forms"

export const inscriptionFields : IFormField[] = [
    {
        name: 'name',
        label: 'Nombre artístico',
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        type: 'text',
        requiredForItemCreation: true
    },
    {
        name: 'description',
        label: 'Descripción',
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        type: 'text',
        requiredForItemCreation: true
    },
    {
        name: 'contactName',
        label: 'Nombre de contacto',
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        type: 'text',
        requiredForItemCreation: true
    },
    {
        name: 'phone',
        label: 'Teléfono de contacto',
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        type: 'tel',
        requiredForItemCreation: true
    },
    {
        name: 'email',
        label: 'Email de contacto',
        validationMethod: isValidEmail,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        type: 'tel',
        requiredForItemCreation: true
    },
    {
        name: 'image',
        label: 'Imagen',
        validationMethod: null,
        processingMethod: null,
        testAgainst: null,
        type: 'file',
        requiredForItemCreation: true
    },
]
