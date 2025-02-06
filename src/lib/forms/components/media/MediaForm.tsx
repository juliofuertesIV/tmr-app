'use client'

import { getAddMediumBoundAction, getDeleteMediumBoundAction } from '@/lib/forms/schema/actions/collections/collections';
import { IContest, IInscription, IManager, ISponsor } from '@/types';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom';
import AdminFormFeedback from '@/lib/forms/feedback/FormFeedback';
import { formInitialState } from '@/lib/forms/feedback/state';
import { IMedia, IMediaRole } from '@/types/media';
import MediumPreview from './components/MediumPreview';

type Props = { 
    collectionItem: IContest | IManager | ISponsor | IInscription,
    collection: 'contests' | 'managers' | 'inscriptions' | 'sponsors',
    domain?: string,
    previewClassName?: string,
    role: IMediaRole
}

const getForeignKeyAndFieldIdByRole = (role: IMediaRole) => {

    const foreignKeysAndFieldIds : { [key in IMediaRole] : { foreignKey: string, fieldId: string }} = {
        logo: {
            foreignKey: 'Logo',
            fieldId: 'LogoId'
        },
        frame: {
            foreignKey: 'Frame',
            fieldId: 'FrameId'
        },
        banner: {
            foreignKey: 'Banner',
            fieldId: 'BannerId'
        },
        favicon: {
            foreignKey: 'Favicon',
            fieldId: 'FaviconId'
        },
        profile: {
            foreignKey: 'Medium',
            fieldId: 'MediumId'
        },
        sponsors: {
            foreignKey: 'Medium',
            fieldId: 'MediumId'
        },
        inscriptions: {
            foreignKey: 'Medium',
            fieldId: 'MediumId'
        },
    }

    return foreignKeysAndFieldIds[role]

}

export default function MediaForm({ collectionItem, collection, previewClassName, role, domain } : Props) {

    const inputRef = useRef<HTMLInputElement | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)

    const { foreignKey, fieldId } = getForeignKeyAndFieldIdByRole(role)

    const currentMediumId = collectionItem[fieldId as keyof typeof collectionItem] as string | null
    const currentMedium = collectionItem[foreignKey as keyof typeof collectionItem] as unknown as IMedia | null

    const activateFileInput = () => inputRef.current?.click()
    const deleteCurrentMedia = () => formRef.current?.requestSubmit()
    
    const clickAction = currentMediumId ? deleteCurrentMedia : activateFileInput

    const creationBoundAction = getAddMediumBoundAction({ collection, collectionItemId: collectionItem.id })
    const deletionBoundAction = getDeleteMediumBoundAction({ collection, mediumId: currentMediumId as string })

    const boundAction = currentMediumId ? deletionBoundAction : creationBoundAction
    const [ state, action ] = useFormState(boundAction, formInitialState)

    const [ file, setFile ] = useState<File | null>(null)
    const [ imageSize, setImageSize ] = useState<{ width: number | null, height: number | null }>({ width: null, height: null })

    const emptyState = () => { 
        setFile(null)
        setImageSize({ width: null, height: null })
    }

    const manageFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (!e.currentTarget.files) return emptyState()

        const file = e.currentTarget.files[0]
        setFile(file)
    }

    useEffect(() => {

        if (!file) return 

        const reader = new FileReader();

        const updateImageMeasurements = (src: string) => {
            const image = new Image()
            image.src = src
            image.addEventListener('load', () => setImageSize({ width: image.width, height: image.height })) 
        }

        reader.addEventListener("load", () => {
                const src = reader.result as string
                if (!src) throw new Error('Error leyendo la imagen.')

                updateImageMeasurements(src) 
            },
            false
        );
        reader.readAsDataURL(file)

    }, [ file ])

    useEffect(() => {

        if (!imageSize.height && !imageSize.width) return 

        formRef.current?.requestSubmit()
        
    }, [ imageSize, formRef ])

    return (
        <form ref={ formRef } action={ action } className='flex w-full h-full'>
            <AdminFormFeedback state={ state } />
            <MediumPreview className={ previewClassName } medium={ currentMedium as IMedia | null } onClick={ clickAction }/> 
            <input className="hidden" ref={ inputRef } type="file" name='file' accept={ 'image' } onChange={ (e) => manageFileInputChange(e) }/>
            <input type="hidden" name="role" value={ 'profile' } />
            <input type="hidden" name="alt" value={ 'Picture of ' + collectionItem.name } />
            <input type="hidden" name="width" value={ imageSize.width || '' } />
            <input type="hidden" name="height" value={ imageSize.height || '' } />
            <input type="hidden" name="collection" value={ collection } /> 
            <input type="hidden" name="domain" value={ domain || undefined } /> 
        </form>
    )
}
