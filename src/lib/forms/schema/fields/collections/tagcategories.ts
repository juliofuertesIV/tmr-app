import * as Input from '@/lib/forms/components/inputs/type'
import { isValidString, processBasicTextInput } from "@/lib/forms/validation/functions"
import { IActionTarget, IFormField } from "@/types/forms"

export const tagCategoryFields : { [key in Exclude<IActionTarget, "delete">]: IFormField[] } = {
    creation: [
        {
            name: 'name',
            label: 'Nombre de la categoría de etiquetas',
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
            label: 'Nombre de la categoría de etiquetas',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            element: Input.Base,
            required: false 
        }
    ]
}
