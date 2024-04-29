import { addCollectionElement } from "@/app/_fetch/post"
import { updateCollectionItem } from "@/app/_fetch/put"
import { ICreationFormByCollectionName, IEditionFormByCollectionName } from "@/interfaces/forms"

export const brandCreationForm : ICreationFormByCollectionName = {
    action: addCollectionElement,
    fields: [{
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
        name: 'profile',
        label: 'Perfil de Instagram',
        required: true,
        type: 'text' 
    }]
}


export const brandEditForm : IEditionFormByCollectionName = {
    action: updateCollectionItem,
    fields: [{
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
        name: 'profile',
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
    },    
    ],
}