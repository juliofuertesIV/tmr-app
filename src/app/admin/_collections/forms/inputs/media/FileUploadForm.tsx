'use client'

import { manageCollectionMedia } from "@/app/_fetch/post"
import { IContest, IContestMedia } from "@/interfaces"
import { IMediaFormField, formInitialState } from "@/interfaces/forms"
import { useFormState } from "react-dom"
import AdminFormFeedback from "../../AdminFormFeedback"
import AdminFormSubmit from "../../AdminFormSubmit"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import FilePreview from "./FilePreview"
import Droppable from "./Droppable"
import CurrentMedia from "./CurrentMedia"

type Props = {
    collectionElement: IContest, // & IInscription
    mediaField: IMediaFormField
}

export default function FileUploadForm({ collectionElement, mediaField } : Props) {

    const { role, instructions, label } = mediaField

    const boundAction = manageCollectionMedia.bind(null, 'contests', collectionElement.id as string)
    
    const [ state, formAction ] = useFormState(boundAction, formInitialState)

    const [ file, setFile ] = useState<File | IContestMedia | null>(null)
    
    const currentMedia = (collectionElement as IContest).Media.find((element: IContestMedia) => element.role === role) || null

    const fileInputRef = useRef<HTMLInputElement>(null)

    const onSetFile = (file: File | null) => setFile(file)

    const onDiscardFile = () => setFile(null)

    const onClickDroppable = () => {
        if (!fileInputRef.current) return

        fileInputRef.current.click()
    }

    useEffect(() => {

        if (!currentMedia) return

        setFile(currentMedia)

    }, [ currentMedia, setFile ])

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.files) return

        const { files } = e.currentTarget
        const file = files[0]

        if (!file) return

        setFile(file)
    }

    console.log({ previewIsCurrentMedia: currentMedia === file })

    return (
        <form action={ formAction } className="flex flex-col w-full max-w-2xl mx-auto bg-neutral-800 px-4 pt-2 pb-4">
            <header className="flex flex-col items-center justify-between">
                <h3 className="flex-1">{ label }</h3>
            </header>
            <AdminFormFeedback state={ state }/>
            {
                !!file ? 
                <FilePreview file={ file } onDiscardFile={ onDiscardFile }/> :
                <Droppable onClickDroppable={ onClickDroppable } onSetFile={ onSetFile }/>
            }
            <input 
                ref={ fileInputRef } 
                className="hidden"
                type="file"
                name="media"
                accept="image"
                onChange={ onInputChange }
            />
            <small>{ instructions }</small>
            <input type="hidden" name="role" value={ role }/>
            <input type="hidden" name="width" value={ 500 }/>
            <input type="hidden" name="height" value={ 500 }/>
            <AdminFormSubmit value={ !!currentMedia ? "Reemplazar" : "Subir archivo" }/>
        </form>
    )
}
