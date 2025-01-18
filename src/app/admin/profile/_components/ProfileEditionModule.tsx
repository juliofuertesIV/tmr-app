'use client'

import { getFormByCollectionName } from '@/lib/forms/collection'
import Form from '@/lib/forms/Form'
import { IManager } from '@/types'
import { IFormField } from '@/types/forms'
import React from 'react'

const fields : IFormField[] = [
    { 
        name: "name",
        label: "Nombre y primer apellido",
        type: 'text',
        instructions: '',
        validationMethod: null,
        testAgainst: null,
        processingMethod: null,
        requiredForItemCreation: false

    },
    { 
        name: "email",
        label: "Email",
        instructions: "Ej: v.mestre@themusicrepublic.es",
        type: 'text',
        validationMethod: null,
        testAgainst: null,
        processingMethod: null,
        requiredForItemCreation: false
    },
    { 
        name: "password",
        label: "Nueva contraseña",
        instructions: "Al menos ocho caracteres, incluyendo letras, valor numérico y un signo de puntuación. Ej: A12345678!",
        type: 'text',
        validationMethod: null,
        testAgainst: null,
        processingMethod: null,
        requiredForItemCreation: false
    },
    { 
        name: "confirmPassword",
        label: "Contraseña",
        instructions: "Vuelve a escribir tu nueva contraseña.",
        type: 'text',
        validationMethod: null,
        testAgainst: null,
        processingMethod: null,
        requiredForItemCreation: false
    },

]

export default function ProfileEditionModule({ manager } : { manager: IManager }) {

    const { action } = getFormByCollectionName({ collection: 'managers', actionTarget: 'update' })
    return (
        <Form collection='managers' action={ action } fields={ fields }/>
    )
}
