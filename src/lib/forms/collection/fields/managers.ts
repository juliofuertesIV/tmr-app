import { isValidEmail, isValidString, processBasicTextInput } from "@/lib/forms/validation/functions"
import { IFormField } from "@/types/forms"

export const managerFields : IFormField[] = [
        {
            name: 'name',
            label: 'Nombre del usuario',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            requiredForItemCreation: true
        },
        {
            name: 'email',
            label: 'E-mail',
            instructions: null,
            validationMethod: isValidEmail,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            requiredForItemCreation: true 
        },
        {
            name: 'password',
            label: 'Nueva contraseña',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'password',
            requiredForItemCreation: true
        },
        { 
            name: "confirmPassword",
            label: "Repetir nueva contraseña",
            instructions: "Vuelve a escribir tu nueva contraseña.",
            type: 'text',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            requiredForItemCreation: false
        }
    ]
