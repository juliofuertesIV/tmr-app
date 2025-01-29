import { isValidString, processBasicTextInput } from "@/lib/forms/validation/functions"
import { IActionTarget, IFormField } from "@/types/forms"

export const genreFields : { [key in IActionTarget]: IFormField[] } = {
    creation: [
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
    ],
    update: [
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
    ],
}
