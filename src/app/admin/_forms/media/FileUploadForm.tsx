'use client'

import { manageCollectionMedia } from "@/app/_fetch/post"
import { IContest, IContestMedia } from "@/interfaces"
import { IMediaFormField, formInitialState } from "@/interfaces/forms"
import { useFormState } from "react-dom"
import AdminFormFeedback from "../AdminFormFeedback"
import AdminFormSubmit from "../AdminFormSubmit"
import { ChangeEvent, useState } from "react"
import ImageVisualizer from "./ImageVisualizer"

type Props = {
    collectionElement: IContest, // & IInscription
    mediaField: IMediaFormField
}

export default function FileUploadForm({ collectionElement, mediaField } : Props) {

    const { role, instructions, label } = mediaField

    const boundAction = manageCollectionMedia.bind(null, 'contests', collectionElement.id as string)
    
    const [ state, formAction ] = useFormState(boundAction, formInitialState)

    const [ inputFile, setInputFile ] = useState<File | null>(null)
    
    // TO DO: Drag and drop instead of visualizer (using as background currentMedia ? currentMedia : bgcolor)

    const currentMedia = (collectionElement as IContest).Media.find((element: IContestMedia) => element.role === role) || null

    const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.files || !currentMedia) return
        setInputFile(e.currentTarget.files[0])
    }

    return (
        <form action={ formAction } className="flex flex-col mb-4">
            <h3>{ label }</h3>
            <AdminFormFeedback state={ state }/>
            <ImageVisualizer currentMedia={ currentMedia } newImage={ inputFile }/>
            <input type="file" name="media" accept="image" onChange={ onFileInputChange }/>
            <small>{ instructions }</small>
            <input type="hidden" name="role" value={ role }/>
            <input type="hidden" name="width" value={ 500 }/>
            <input type="hidden" name="height" value={ 500 }/>
            <AdminFormSubmit value={ !!currentMedia ? "Reemplazar" : "Subir archivo" }/>
        </form>
    )
}
