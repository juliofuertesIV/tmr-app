'use client'

import Form from "@/lib/forms/components/Form"
import { getFormSchema } from "@/lib/forms"

export default function ContestCreation() {

    const { bindCreationAction, fields } = getFormSchema({ collection: 'contests', actionTarget: 'creation' })

    const boundAction = bindCreationAction()

    return (
        <div className='p-4 max-w-lg'>
            <Form mediaCollection={ 'contests' } boundAction={ boundAction } fields={ fields } target="creation"/>
        </div>
    )
}
