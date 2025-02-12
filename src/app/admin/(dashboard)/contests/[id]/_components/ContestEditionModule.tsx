'use client'

import { getFormSchema } from '@/lib/forms'
import Form from '@/lib/forms/components/Form'
import { AllCollections } from '@/types'
import { Contest } from '@/types/contests'
import React from 'react'

export default function ContestEditionModule({ contest } : { contest: Contest }) {

    const { id } = contest

    const { fields, bindUpdateAction } = getFormSchema({ collection: 'contests', actionTarget: 'update' })

    const boundAction = bindUpdateAction({ id })

    return (
        <div>
            <Form collectionItem={ contest as AllCollections } boundAction={ boundAction } fields={ fields }/>
        </div>
    )
}
