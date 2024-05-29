import { isValidString, processBasicTextInput } from "@/forms/validation/functions"
import { IFormField } from "@/types/forms"

export const socialFields : IFormField[] = [
    {
        name: 'name',
        label: 'Nombre',
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        type: 'text',
        requiredForItemCreation: true
    },
]
