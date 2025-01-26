'use client'

import { getFormByCollectionName } from '@/lib/forms/collection'
import Form from '@/lib/forms/Form'
import { IAllCollections, IManager } from '@/types'
import React from 'react'
import NewPasswordInputs from './NewPasswordInputs'


export default function ProfileEditionModule({ manager } : { manager: IManager }) {

    const { fields, action } = getFormByCollectionName({ collection: 'managers', actionTarget: 'updateManager' })

    return (
        <Form 
            collection='managers'
            collectionItem={ manager as IAllCollections }
            action={ action }
            fields={ fields }
            target='updateManager'
        >
            <NewPasswordInputs/>
        </Form>
    )
}
