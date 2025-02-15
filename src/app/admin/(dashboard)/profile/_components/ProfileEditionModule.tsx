'use client'

import Form from '@/lib/forms/components/Form'
import { AllCollections, Manager } from '@/types'
import React from 'react'
import NewPasswordInputs from './NewPasswordInputs'
import { getFormSchema } from '@/lib/forms'


export default function ProfileEditionModule({ manager } : { manager: Manager }) {

    const { bindUpdateAction, fields } = getFormSchema({ collection: 'managers', actionTarget: 'update' })

    const boundAction = bindUpdateAction({ id: manager.id })

    return (
        <Form 
            collectionItem={ manager as AllCollections }
            boundAction={ boundAction }
            fields={ fields }
        >
            <NewPasswordInputs/>
        </Form>
    )
}
