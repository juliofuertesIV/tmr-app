import { IActionTarget, IFormField } from "@/types/forms"

export const managerFields = {
    creation: [
        {
            name: 'name',
            label: 'Nombre del usuario',
            htmlProps: {
                required: true,
            },
            type: 'text' 
        },
        {
            name: 'email',
            label: 'E-mail',
            htmlProps: {
                required: true,
            },
            type: 'text' 
        },
        {
            name: 'password',
            label: 'Contraseña',
            htmlProps: {
                required: true,
            },
            type: 'password' 
        },
        {
            name: 'RoleId',
            label: 'Rol',
            htmlProps: {
                required: true,
            },
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
            htmlProps: {
                required: false,
            },
            type: 'text' 
        },
        {
            name: 'email',
            label: 'E-mail',
            htmlProps: {
                required: false,
            },
            type: 'text' 
        },
        {
            name: 'password',
            label: 'Contraseña',
            htmlProps: {
                required: false,
            },
            type: 'password' 
        },
        {
            name: 'RoleId',
            label: 'Rol',
            htmlProps: {
                required: false,
            },
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
