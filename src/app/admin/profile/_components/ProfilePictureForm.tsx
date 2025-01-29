'use client'

import { getAddMediumBoundAction, getDeleteMediumBoundAction } from '@/lib/forms/schema/actions/collections/collections';
import { IManager } from '@/types';
import React, { ChangeEvent, MutableRefObject, useEffect, useState } from 'react'
import { useFormState } from 'react-dom';
import ProfilePlaceholder from './ProfilePlaceholder';
import AdminFormFeedback from '@/lib/forms/feedback/FormFeedback';
import { formInitialState } from '@/lib/forms/feedback/state';
import CurrentProfilePicture from './CurrentProfilePicture';

type Props = { 
    manager: IManager,
    inputRef: MutableRefObject<HTMLInputElement | null>;
    formRef: MutableRefObject<HTMLFormElement | null>;
    clickAction: () => void | undefined;
}

export default function ProfilePictureForm({ inputRef, manager, formRef, clickAction } : Props) {

    const creationBoundAction = getAddMediumBoundAction({ collection: 'managers', collectionItemId: manager.id })
    const deletionBoundAction = getDeleteMediumBoundAction({ collection: 'managers', mediumId: manager.MediumId })

    const boundAction = manager.MediumId ? deletionBoundAction : creationBoundAction

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
        <form ref={ formRef } action={ action } className='flex w-full'>
            <AdminFormFeedback state={ state } />
            { 
                manager.MediumId ? 
                <CurrentProfilePicture manager={ manager } clickAction={ clickAction }/> 
                : <ProfilePlaceholder clickAction={ clickAction }/> 
            }
            <input className="hidden" ref={ inputRef } type="file" name='file' accept={ 'image' } onChange={ (e) => manageFileInputChange(e) }/>
            <input type="hidden" name="role" value={ 'profilePic' } />
            <input type="hidden" name="alt" value={ 'Profile picture of ' + manager.name } />
            <input type="hidden" name="width" value={ imageSize.width || '' } />
            <input type="hidden" name="height" value={ imageSize.height || '' } />
            <input type="hidden" name="collection" value={ 'managers' } /> { /* WHY HERE? Should be able to get it by API route or somewhere else */}
        </form>
    )
}
