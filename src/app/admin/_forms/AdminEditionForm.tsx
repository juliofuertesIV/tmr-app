'use client'

import { useFormState } from 'react-dom'
import AdminFormSubmit from './AdminFormSubmit'
import { IEditionFormField, IFormEditionAction, IMediaFormField, formInitialState } from '@/interfaces/forms'
import AdminFormFeedback from './AdminFormFeedback'
import EditionInput from './inputs/EditionInput'
import { IOneOfCollectionNames, IOneOfCollections } from '@/interfaces'

type Props = {
    collection: IOneOfCollectionNames,
    action: IFormEditionAction,
    fields: IEditionFormField[],
    collectionElement: IOneOfCollections
}

export default function AdminEditionForm({ action, fields, collection, collectionElement } : Props) {

    
    const boundAction = action?.bind(null, collection, collectionElement.id as string)
    
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
                            collectionElement={ collectionElement }
                        />
                    )
                })
            }
            <AdminFormSubmit/>
        </form>
    )
}
