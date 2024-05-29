import { isValidString, processBasicTextInput } from "@/forms/validation/functions"
import { IFormField } from "@/types/forms"

export const genreFields : IFormField[] = [
    {
        name: 'name',
        label: 'Nombre del género',
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        type: 'text',
        requiredForItemCreation: true 
    }
]
