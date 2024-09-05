import { isValidString, processBasicTextInput } from "@/lib/forms/validation/functions"
import { IFormField } from "@/types/forms"

export const socialFields : IFormField[] = [
        {
            name: 'name',
            label: 'Nombre de la red social',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            requiredForItemCreation: true
        },
        {
            name: 'icon',
            label: 'Ruta del icono',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            requiredForItemCreation: true
        }
    ]