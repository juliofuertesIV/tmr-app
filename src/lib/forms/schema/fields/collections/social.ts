import * as Input from '@/lib/forms/components/inputs/type'
import { isValidString, processBasicTextInput } from "@/lib/forms/validation/functions"
import { IActionTarget, IFormField } from "@/types/forms"

export const socialFields : { [key in IActionTarget]: IFormField[] } = { 
    creation: [
        {
            name: 'name',
            label: 'Nombre de la red social',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'icon',
            label: 'Ruta del icono',
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
            label: 'Nombre de la red social',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        },
        {
            name: 'icon',
            label: 'Ruta del icono',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: true
        }
    ]
}
    