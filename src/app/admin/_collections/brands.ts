import { IFormField, IActionTarget } from "@/types/forms"

export const brandFields = {
    creation: [
        {
            name: 'name',
            label: 'Nombre de la marca',
            required: true,
            type: 'text' 
        },
        {
            name: 'website',
            label: 'Página web',
            required: true,
            type: 'text' 
        },
        {
            name: 'instagramProfile',
            label: 'Perfil de Instagram',
            required: true,
            type: 'text' 
        }
    ],
    update: [
        {
            name: 'name',
            label: 'Nombre de la marca',
            required: false,
            type: 'text' 
        },
        {
            name: 'website',
            label: 'Página web',
            required: false,
            type: 'text' 
        },
        {
            name: 'instagramProfile',
            label: 'Perfil de Instagram',
            required: false,
            type: 'text' 
        },
        {
            name: 'tiktokProfile',
            label: 'Perfil de Instagram',
            required: false,
            type: 'text' 
        },
        {
            name: 'backgroundColor',
            label: 'Color de fondo',
            required: false,
            type: 'color' 
        },
        {
            name: 'foregroundColor',
            label: 'Color de texto',
            required: false,
            type: 'color'
        },
        {
            name: 'accentColor',
            label: 'Color de acento',
            required: false,
            type: 'color'
        }
    ]    
} as {
    [key in IActionTarget]: IFormField[]
}
