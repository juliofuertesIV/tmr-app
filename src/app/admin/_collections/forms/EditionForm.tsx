'use client'

import { useFormState } from 'react-dom'
import FormSubmit from './FormSubmit'
import { formInitialState } from '@/types/forms'
import AdminFormFeedback from './FormFeedback'
import EditionInput from './inputs/EditionInput'
import { IOneOfCollectionNames, IOneOfCollections } from '@/types'
import { useParams } from 'next/navigation'
import { getFormByCollectionName } from '..'

export default function AdminEditionForm({ item } : { item: IOneOfCollections }) {

    const { collection } = useParams() as { collection: IOneOfCollectionNames }

    const { action, fields } = getFormByCollectionName({ collection, actionTarget: 'update' })

    const boundAction = action?.bind(null, collection, item.id as string)
    
    const [state, formAction] = useFormState(boundAction, formInitialState)

    return (
        <form 
            className="flex flex-col gap-2 w-full max-w-2xl"
            action={ formAction }
        >
            <AdminFormFeedback state={ state } />
            {
                fields.map((field, index) => {
                    return (
                        <EditionInput 
                            key={ index }
                            input={ field }
                            collectionElement={ item }
                        />
                    )
                })
            }
            <FormSubmit/>
        </form>
    )
}
