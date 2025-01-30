import * as Input from '@/lib/forms/components/inputs/type'
import { isValidString, processBasicTextInput } from '@/lib/forms/validation/functions';
import { IActionTarget, IFormField } from "@/types/forms";

export const sponsorFields : { [key in IActionTarget]: IFormField[] } = { 
    creation: [
        {
            name: 'name',
            label: 'Nombre del patrocinador',
            instructions: null,
            type: 'text',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            element: Input.Base,
            required: true
        },
    ],
    update: [
        {
            name: 'name',
            label: 'Nombre del patrocinador',
            instructions: null,
            type: 'text',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            element: Input.Base,
            required: true
        },
    ]
}