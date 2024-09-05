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
            label: 'Contraseña',
            instructions: null,
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'password',
            requiredForItemCreation: true
        },
        {
            name: 'RoleId',
            label: 'Rol',
            instructions: null,
            type: 'radio',
            validationMethod: null,
            processingMethod: null,
            testAgainst: null,
            options: [ 
                { name: 'Colaborador', value: "1" },
                { name: 'Editor', value: "2" },
                { name: 'Admin', value: "3" },
            ],
            requiredForItemCreation: true
        },
    ]