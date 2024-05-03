'use client'

import { manageCollectionMedia } from "@/app/_fetch/post"
import { IContest, IContestMedia, IContestMediaRole } from "@/interfaces"
import { formInitialState } from "@/interfaces/forms"
import { useFormState } from "react-dom"
import AdminFormFeedback from "../AdminFormFeedback"
import AdminFormSubmit from "../AdminFormSubmit"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import ImageVisualizer from "./ImageVisualizer"

type Props = {
    collectionElement: IContest, // & IInscription
    label: string,
    small: string,
    acceptedTypes: string[],
    mediaType: IContestMediaRole | 'inscription',

}

export default function FileUploadForm({ collectionElement, label, mediaType } : Props) {

    const boundAction = manageCollectionMedia.bind(null, 'contests', collectionElement.id as string)
    
    const [ state, formAction ] = useFormState(boundAction, formInitialState)

    const [ inputFile, setInputFile ] = useState<File | null>(null)
    
    // TO DO: construct accept string from acceptTypes (string[])

    const currentMedia = (collectionElement as IContest).Media.find((element: IContestMedia) => element.role === mediaType) || null

    const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.files || !currentMedia) return
        setInputFile(e.currentTarget.files[0])
    }

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {

        console.log('SHOULD RESET FORM!!!')

        formRef.current?.reset()

    }, [ collectionElement ])

    return (
        <form ref={ formRef } action={ formAction } className="flex flex-col mb-4">
            <h3>{ label }</h3>
            <AdminFormFeedback state={ state }/>
            <ImageVisualizer currentMedia={ currentMedia } newImage={ inputFile }/>
            <input type="file" name="media" accept="image" onChange={ onFileInputChange }/>
            <input type="hidden" name="role" value={ mediaType }/>
            <input type="hidden" name="width" value={ 500 }/>
            <input type="hidden" name="height" value={ 500 }/>
            <AdminFormSubmit value={ !!currentMedia ? "Reemplazar" : "Subir archivo" }/>
        </form>
    )
}
