import * as Input from '@/lib/forms/components/inputs/type'
import { isValidEmail, isValidString, processBasicTextInput } from "@/lib/forms/validation/functions"
import { ActionTarget, FormField } from "@/types/forms"

export const managerFields : { [key in Exclude<ActionTarget, "delete">]: FormField[] } = { 
    creation: [
        {
            name: 'name',
            label: 'Nombre del usuario',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'email',
            label: 'E-mail',
            instructions: null,
            validationMethod: isValidEmail,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true 
        },
        {
            name: 'password',
            label: 'Contraseña',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true 
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
            element: Input.Base,
            required: true
        },
        {
            name: 'email',
            label: 'E-mail',
            instructions: null,
            validationMethod: isValidEmail,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true 
        }
    ]
}
