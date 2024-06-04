import { isValidEmail, isValidString, processBasicTextInput } from "@/lib/forms/validation/functions"
import { IFormField } from "@/lib/types/forms"

export const managerFields : IFormField[] = [
        {
            name: 'name',
            label: 'Nombre del usuario',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            requiredForItemCreation: true
        },
        {
            name: 'email',
            label: 'E-mail',
            validationMethod: isValidEmail,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'text',
            requiredForItemCreation: true 
        },
        {
            name: 'password',
            label: 'Contraseña',
            validationMethod: isValidString,
            processingMethod: processBasicTextInput,
            testAgainst: null,
            type: 'password',
            requiredForItemCreation: true
        },
        {
            name: 'RoleId',
            label: 'Rol',
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