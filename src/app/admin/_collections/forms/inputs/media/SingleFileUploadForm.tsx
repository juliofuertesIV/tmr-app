'use client'

import { manageCollectionMedia } from "@/app/_fetch/post"
import { IContest, IContestMedia, IContestMediaRole } from "@/interfaces"
import { IMediaFormField, formInitialState } from "@/interfaces/forms"
import { useFormState } from "react-dom"
import AdminFormFeedback from "../../AdminFormFeedback"
import AdminFormSubmit from "../../AdminFormSubmit"
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react"
import FilePreview from "./single/FilePreview"
import Droppable from "./single/Droppable"
import { deleteContestMediaItem } from "@/app/_fetch/delete"

type Props = {
    collectionElement: IContest, // & IInscription
    mediaField: IMediaFormField
}

const getCurrentMedia = ({ collectionElement, role } : { collectionElement: IContest, role: IContestMediaRole }) => {
    
    if (!collectionElement.Media) return null

    if (role === 'footerElement') return null

    return collectionElement.Media.find(media => media.role === role) || null
}

export default function SingleFileUploadForm({ collectionElement, mediaField } : Props) {

    const { role, instructions, label } = mediaField

    const boundAction = manageCollectionMedia.bind(null, 'contests', collectionElement.id as string)
    
    const [ state, formAction ] = useFormState(boundAction, formInitialState)

    const [ file, setFile ] = useState<File | IContestMedia | null>(null)
    
    const currentMedia = getCurrentMedia({ collectionElement, role })

    const fileInputRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const previewIsCurrentMedia = currentMedia === file

    const onSetFileFromDropEvent = (event: DragEvent) => {
        
        if (!event.dataTransfer?.files) setFile(null)
        if (!fileInputRef.current || !event.dataTransfer) return
        
        fileInputRef.current.files = event.dataTransfer.files
    }

    const deleteCurrentMediaFile = async () => {

        if (!!currentMedia && previewIsCurrentMedia) {
            console.log('Deleting...')
            
            const res = await deleteContestMediaItem({ contestId: collectionElement.id.toString(), mediaId: currentMedia.id.toString(), role })

            console.log({ res })
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
            <small>{ instructions }</small>
            <input type="hidden" name="role" value={ role }/>
            <input type="hidden" name="width" value={ 500 }/>
            <input type="hidden" name="height" value={ 500 }/>
            <AdminFormSubmit value={ !!currentMedia ? "Reemplazar" : "Subir archivo" }/>
        </form>
    )
}
