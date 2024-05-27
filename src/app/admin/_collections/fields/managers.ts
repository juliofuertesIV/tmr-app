import { IActionTarget, IFormField } from "@/types/forms"

export const managerFields = {
    creation: [
        {
            name: 'name',
            label: 'Nombre del usuario',
            required: true,
            type: 'text' 
        },
        {
            name: 'email',
            label: 'E-mail',
            required: true,
            type: 'text' 
        },
        {
            name: 'password',
            label: 'Contraseña',
            required: true,
            type: 'password' 
        },
        {
            name: 'RoleId',
            label: 'Rol',
            required: true,
            type: 'radio',
            options: [ 
                { name: 'Colaborador', value: 1 },
                { name: 'Editor', value: 2 },
                { name: 'Admin', value: 3 },
            ] 
        },
    ],
    update: [
        {
            name: 'name',
            label: 'Nombre del usuario',
            required: true,
            type: 'text' 
        },
        {
            name: 'email',
            label: 'E-mail',
            required: true,
            type: 'text' 
        },
        {
            name: 'password',
            label: 'Contraseña',
            required: true,
            type: 'password' 
        },
        {
            name: 'RoleId',
            label: 'Rol',
            required: true,
            type: 'radio',
            options: [ 
                { name: 'Colaborador', value: 1 },
                { name: 'Editor', value: 2 },
                { name: 'Admin', value: 3 },
            ] 
        },
    ],
} as {
    [key in IActionTarget]: IFormField[]
}
