import { addCollectionElement } from "@/app/_fetch/post"
import { updateCollectionItem } from "@/app/_fetch/put"
import { ICreationFormByCollectionName, IEditionFormByCollectionName } from "@/interfaces/forms"

export const contestCreationForm : ICreationFormByCollectionName = {
    action: addCollectionElement,
    fields: [{
        name: 'name',
        label: 'Nombre del concurso',
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
    },
    {
        name: 'StateId',
        label: '',
        required: true,
        type: 'hidden',
        defaultValue: 'hidden'
    }]
}


export const contestEditForm : IEditionFormByCollectionName = {
    action: updateCollectionItem,
    fields: [
        {
            name: 'name',
            label: 'Nombre del concurso',
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
    mediaFields: [
        {
            role: 'logo',
            label: 'Logotipo',
            instructions: 'Debe pesar menos de 2mb',
            acceptedTypes: 'image/png, image/svg+xml'
        },
        {
            role: 'banner',
            label: 'Banner',
            instructions: 'Debe pesar menos de 2mb',
            acceptedTypes: 'image/png, image/svg+xml'
        },
        {
            role: 'favicon',
            label: 'Favicon',
            instructions: 'Debe ser imagen tipo .ico',
            acceptedTypes: '.ico'
        }
    ]
}
