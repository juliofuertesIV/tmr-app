'use client'

import { IContest } from "@/lib/types"
import { IMediaFormField, formInitialState } from "@/types/forms"
import { useFormState } from "react-dom"
import { ChangeEvent, DragEvent, useEffect, useLayoutEffect, useRef, useState } from "react"
import FilePreview from "./FilePreview"
import Droppable from "./Droppable"
import { deleteContestMediaItem } from "@/lib/fetch/delete"
import { IMedia, IMediaRole } from "@/types/media"
import { manageCollectionMedia } from "@/lib/fetch/post"
import AdminFormFeedback from "@/lib/forms/feedback/FormFeedback"
import FormSubmit from "@/lib/forms/feedback/FormSubmit"

type Props = {
    collectionElement: IContest, // & IInscription
    mediaField: IMediaFormField,
    showDatabaseValue: boolean
}

const getCurrentMedia = ({ collectionElement, role } : { collectionElement: IContest, role: IMediaRole }) => {
    
    return collectionElement.Media.find(media => media.role === role) || null
}

export default function FileUploadForm({ collectionElement, mediaField, showDatabaseValue } : Props) {

    const { role, label } = mediaField

    const boundAction = manageCollectionMedia.bind(null, 'contests', collectionElement.id as string)
    
    const [ state, formAction ] = useFormState(boundAction, formInitialState)

    const [ file, setFile ] = useState<File | IMedia | null>(null)
    
    const currentMedia = getCurrentMedia({ collectionElement, role })

    const fileInputRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const previewIsCurrentMedia = showDatabaseValue ? currentMedia === file : false

    const onSetFileFromDropEvent = (event: DragEvent) => {
        
        if (!event.dataTransfer?.files) setFile(null)
        if (!fileInputRef.current || !event.dataTransfer) return
        
        fileInputRef.current.files = event.dataTransfer.files
    }

    const deleteCurrentMediaFile = async () => {

        // TO DO: Feedback en el front
        if (!!currentMedia && previewIsCurrentMedia) {           
            await deleteContestMediaItem({ contestId: collectionElement.id as string, mediaId: currentMedia.id })
        }
    }

    const onDiscardPreviewFile = () => {
        if (!formRef.current) return

        if (previewIsCurrentMedia) {
            deleteCurrentMediaFile();
        }

        formRef.current.reset()
        setFile(null)
    }

    const onClickDroppable = () => {
        if (!fileInputRef.current) return

        fileInputRef.current.click()
    }

    useEffect(() => {

        if (!currentMedia || !showDatabaseValue) return

        setFile(currentMedia)

    }, [ currentMedia, setFile, showDatabaseValue ])

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.files) return

        const { files } = e.currentTarget
        const file = files[0]

        if (!file) return

        setFile(file)
    }

    useLayoutEffect(() => {

        if (!showDatabaseValue) {
            setFile(null)
            formRef.current?.reset()
        }

    }, [ state, showDatabaseValue ])


    return (
        <form action={ formAction } ref={ formRef } className="flex flex-col w-full max-w-2xl mx-auto bg-neutral-800 px-4 pt-2 pb-4">
            <header className="flex flex-col items-center justify-between">
                <h3 className="flex-1">{ label }</h3>
            </header>
            <AdminFormFeedback state={ state }/>
            {
                !!file ? 
                <FilePreview file={ file } onDiscardFile={ onDiscardPreviewFile } previewIsCurrentMedia={ previewIsCurrentMedia }/> :
                <Droppable onClickDroppable={ onClickDroppable } onSetFile={ onSetFileFromDropEvent }/>
            }
            <input 
                ref={ fileInputRef } 
                className="hidden"
                type="file"
                name="media"
                accept="image"
                onChange={ onInputChange }
            />
            <input type="hidden" name="role" value={ role }/>
            <input type="hidden" name="width" value={ 500 }/>
            <input type="hidden" name="height" value={ 500 }/>
            <FormSubmit value={ !!currentMedia ? "Reemplazar" : "Subir archivo" }/>
        </form>
    )
}
