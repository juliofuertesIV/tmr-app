import * as Input from '@/lib/forms/components/inputs/type'
import { isValidString, processBasicTextInput } from '@/lib/forms/validation/functions';
import { ActionTarget, FormField } from "@/types/forms";

export const sponsorFields : { [key in Exclude<ActionTarget, "delete">]: FormField[] } = { 
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