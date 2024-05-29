'use client'

import { deleteCollectionItem } from "@/app/_fetch/delete"
import { IOneOfCollectionNames } from "@/types"
import { formInitialState } from "@/types/forms"
import { useFormState } from "react-dom"
import AdminFormFeedback from "../../../../forms/feedback/FormFeedback"
import FormSubmit from "../../../../forms/feedback/FormSubmit"

export default function DeleteItemForm({ collection, itemId } : { collection: IOneOfCollectionNames, itemId: string | number }) {
    
    const boundAction = deleteCollectionItem.bind(null, collection, itemId as string)
    
    const [ state, formAction ] = useFormState(boundAction, formInitialState)

    return (
        <form 
            className="flex flex-col gap-2 w-full"
            action={ formAction }
        >
            <AdminFormFeedback state={ state } />
            <FormSubmit/>
        </form>
    )
}
