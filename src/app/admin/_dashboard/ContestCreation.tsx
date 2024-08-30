'use client'

import { getFormByCollectionName } from "@/lib/forms/collection"
import Form from "@/lib/forms/Form"

export default function ContestCreation() {

    const { action, fields } = getFormByCollectionName({ collection: 'contests', actionTarget: 'creation' })

    return (
        <div className='p-4 max-w-lg'>
            <Form collection={ 'contests' } action={ action } fields={ fields }/>
        </div>
    )
}
