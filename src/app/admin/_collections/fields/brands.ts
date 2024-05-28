import { IFormField, IActionTarget } from "@/types/forms"

export const brandFields = {
    creation: [
        {
            name: 'name',
            label: 'Nombre de la marca',
            htmlProps: {
                required: true
            },
            type: 'text' 
        },
        {
            name: 'website',
            label: 'Página web',
            htmlProps: {
                required: true
            },
            type: 'text' 
        },
        {
            name: 'instagramProfile',
            label: 'Perfil de Instagram',
            htmlProps: {
                required: true
            },
            type: 'text' 
        }
    ],
    update: [
        {
            name: 'name',
            label: 'Nombre de la marca',
            htmlProps: {
                required: false
            },
            type: 'text' 
        },
        {
            name: 'website',
            label: 'Página web',
            htmlProps: {
                required: false
            },
            type: 'text' 
        },
        {
            name: 'instagramProfile',
            label: 'Perfil de Instagram',
            htmlProps: {
                required: false
            },
            type: 'text' 
        },
        {
            name: 'tiktokProfile',
            label: 'Perfil de TikTok',
            htmlProps: {
                required: false
            },
            type: 'text' 
        },
        {
            name: 'backgroundColor',
            label: 'Color de fondo',
            htmlProps: {
                required: false
            },
            type: 'color' 
        },
        {
            name: 'foregroundColor',
            label: 'Color de texto',
            htmlProps: {
                required: false
            },
            type: 'color'
        },
        {
            name: 'accentColor',
            label: 'Color de acento',
            htmlProps: {
                required: false
            },
            type: 'color'
        }
    ]    
} as {
    [key in IActionTarget]: IFormField[]
}
