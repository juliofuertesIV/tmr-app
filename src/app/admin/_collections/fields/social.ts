import { IActionTarget, IFormField } from "@/types/forms"

export const socialFields = {
    creation: [
        {
            name: 'name',
            label: 'Nombre de la red social',
            htmlProps: {
                required: true
            },
            type: 'text' 
        },
        {
            name: 'icon',
            label: 'Ruta del icono',
            htmlProps: {
                required: true
            },
            type: 'text' 
        }
    ],
    update: [
        {
            name: 'name',
            label: 'Nombre de la red social',
            htmlProps: {
                required: false
            },
            type: 'text' 
        },
        {
            name: 'icon',
            label: 'Ruta del icono',
            htmlProps: {
                required: false
            },
            type: 'text' 
        }
    ],
} as {
    [key in IActionTarget]: IFormField[]
}