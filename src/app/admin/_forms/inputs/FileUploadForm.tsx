'use client'

import { manageCollectionMedia } from "@/app/_fetch/post"
import { IContest, IContestMediaType, IOneOfCollections } from "@/interfaces"
import { formInitialState } from "@/interfaces/forms"
import { useFormState } from "react-dom"
import AdminFormFeedback from "../AdminFormFeedback"
import AdminFormSubmit from "../AdminFormSubmit"

type Props = {
    collectionElement: IContest, // & IInscription
    label: string,
    small: string,
    acceptedTypes: string[],
    mediaType: IContestMediaType | 'inscription',

}

export default function FileUploadForm({ collectionElement, label, mediaType } : Props) {

    const boundAction = manageCollectionMedia.bind(null, 'contests', collectionElement.id as string)
    
    const [state, formAction] = useFormState(boundAction, formInitialState)

    return (
        <form action={ formAction } className="flex flex-col">
            <AdminFormFeedback state={ state }/>
            <label>
                <p>{ label }</p>
                <input type="file" name="media"/>
            </label>
            <input type="hidden" name="mediaType" value={ mediaType }/>
            <AdminFormSubmit value="Subir archivo"/>
        </form>
    )
}
