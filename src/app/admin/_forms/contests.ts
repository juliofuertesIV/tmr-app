import { addCollectionElement } from "@/app/_fetch/post"
import { updateContest } from "@/app/_fetch/put"
import { ICreationFormByCollectionName, IEditionFormByCollectionName } from "@/interfaces/forms"

export const contestCreationForm : ICreationFormByCollectionName = {
    action: addCollectionElement,
    fields: [{
        name: 'name',
        label: 'Nombre',
        required: true,
        type: 'text' 
    },
    {
        name: 'domain',
        label: 'Dominio',
        required: true,
        type: 'text' 
    },
    {
        name: 'year',
        label: 'Año de la edición',
        required: true,
        type: 'number' 
    }]
}


export const contestEditForm : IEditionFormByCollectionName = {
    action: updateContest,
    fields: [
        {
            name: 'name',
            label: 'Nombre',
            required: false,
            type: 'text'
        },
        {
            name: 'domain',
            label: 'Dominio',
            required: false,
            type: 'text'
        },
        {
            name: 'year',
            label: 'Año de la edición',
            required: false,
            type: 'number'
        },
        {
            name: 'metaUrl',
            label: 'URL del concurso',
            required: false,
            type: 'text'
        },
        {
            name: 'metaTitle',
            label: 'Meta título de la web',
            required: false,
            type: 'text'
        },
        {
            name: 'metaDescription',
            label: 'Meta descripción de la web',
            required: false,
            type: 'text'
        },    
        {
            name: 'postmarkToken',
            label: 'Token de Postmark',   
            required: false,
            type: 'text'
        },
        {
            name: 'postmarkSenderAddress',
            label: 'Dirección de envío de Postmark',
            required: false,
            type: 'text'
        },
        {
            name: 'metaPixelId',
            label: 'ID del Píxel de Meta',
            required: false,
            type: 'text'
        },
        {
            name: 'googleTagManagerId',
            label: 'ID de Google Tag Manager',
            required: false,
            type: 'text'
        },
        {
            name: 'googleAnalyticsId',
            label: 'ID de Google Analytics',
            required: false,
            type: 'text'
        }
    ],
}