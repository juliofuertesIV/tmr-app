import { isValidString, processBasicTextInput } from "@/lib/forms/validation/functions"
import { IFormField } from "@/types/forms"

export const genreFields : IFormField[] = [
    {
        name: 'name',
        label: 'Nombre del género',
        instructions: null,
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
        type: 'text',
        requiredForItemCreation: true 
    }
]
