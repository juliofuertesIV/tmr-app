import { addContest } from "@/app/_fetch/post"
import { updateContest } from "@/app/_fetch/put"
import { CreationFormByCollectionName } from "@/interfaces/forms"

export const contestCreationForm : CreationFormByCollectionName = {
    action: addContest,
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
        type: 'text' 
    }]
}


export const contestEditForm : CreationFormByCollectionName = {
    action: updateContest,
    fields: [{
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
    }],
}