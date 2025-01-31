'use client'

import { getFormSchema } from '@/lib/forms'
import Form from '@/lib/forms/components/Form'
import { IAllCollections, IContest } from '@/types'
import React from 'react'

export default function ContestEditionModule({ contest } : { contest: IContest }) {

    const { id } = contest

    const { fields, bindUpdateAction } = getFormSchema({ collection: 'contests', actionTarget: 'update' })

    const boundAction = bindUpdateAction({ id })

    return (
        <div>
            <Form collectionItem={ contest as IAllCollections } boundAction={ boundAction } fields={ fields }/>
        </div>
    )
}
