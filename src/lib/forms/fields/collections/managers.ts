import { isValidEmail, isValidString, processBasicTextInput } from "@/lib/forms/validation/functions"
import { IActionTarget, IFormField } from "@/types/forms"

export const managerFields : { [key in IActionTarget]: IFormField[] } = { 
    creation: [
        {
            name: 'name',
            label: 'Nombre del usuario',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            requiredForItemCreation: true
        },
        {
            name: 'email',
            label: 'E-mail',
            instructions: null,
            validationMethod: isValidEmail,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            requiredForItemCreation: true 
        }
    ],
    update: [
        {
            name: 'name',
            label: 'Nombre del usuario',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            requiredForItemCreation: true
        },
        {
            name: 'email',
            label: 'E-mail',
            instructions: null,
            validationMethod: isValidEmail,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            requiredForItemCreation: true 
        }
    ]
}
