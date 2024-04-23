'use client'

import { useFormState } from 'react-dom'
import AdminFormSubmit from './AdminFormSubmit'
import { IAPIResponse, IEditionFormField, IFormEditionAction } from '@/interfaces/forms'
import AdminFormFeedback from './AdminFormFeedback'
import AdminEditionInput from './inputs/AdminEditionInput'
import { IOneOfCollectionNames, IOneOfCollections } from '@/interfaces'

const initialState : IAPIResponse = {
    success: false,
    message: '',
    error: null,
    data: null
} 

type Props = {
    collection: IOneOfCollectionNames,
    action: IFormEditionAction,
    fields: IEditionFormField[],
    item: IOneOfCollections
}

export default function AdminEditionForm({ action, fields, collection, item } : Props) {

    const boundAction = action.bind(null, collection, item.id as string)
    
    const [state, formAction] = useFormState(boundAction, initialState)


    return (
        <form 
            className="flex flex-col gap-2 w-full"
            action={ formAction }
        >
            <AdminFormFeedback formState={ state } />
            {
                fields.map((field, index) => {
                    return (
                        <AdminEditionInput 
                            key={ index }
                            input={ field }
                            item={ item }
                        />
                    )
                })
            }
            <AdminFormSubmit/>
        </form>
    )
}
