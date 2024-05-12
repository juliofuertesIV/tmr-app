'use client'

import { deleteCollectionItem } from "@/app/_fetch/delete"
import { IOneOfCollectionNames } from "@/interfaces"
import { formInitialState } from "@/interfaces/forms"
import { useFormState } from "react-dom"
import AdminFormFeedback from "./AdminFormFeedback"
import AdminFormSubmit from "./AdminFormSubmit"

export default function DeleteItemForm({ collection, itemId } : { collection: IOneOfCollectionNames, itemId: string | number }) {
    
    const boundAction = deleteCollectionItem.bind(null, collection, itemId as string)
    
    const [ state, formAction ] = useFormState(boundAction, formInitialState)


    return (
        <form 
            className="flex flex-col gap-2 w-full"
            action={ formAction }
        >
            <AdminFormFeedback state={ state } />
            <AdminFormSubmit/>
        </form>
    )
}
