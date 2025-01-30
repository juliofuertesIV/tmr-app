'use client'

import { getAddMediumBoundAction, getDeleteMediumBoundAction } from '@/lib/forms/schema/actions/collections/collections';
import { ICollectionsWithMedium } from '@/types';
import React, { ChangeEvent, MutableRefObject, useEffect, useState } from 'react'
import { useFormState } from 'react-dom';
import AdminFormFeedback from '@/lib/forms/feedback/FormFeedback';
import { formInitialState } from '@/lib/forms/feedback/state';
import { ICollectionsWithMediumNames, IMediaRole } from '@/types/media';
import MediaInputPreview from './preview/MediaInputPreview';
import { manageMediaInputChange } from './preview/functions';

type Props = { 
    collection: ICollectionsWithMediumNames,
    collectionItem: ICollectionsWithMedium,
    role: IMediaRole,
    inputRef: MutableRefObject<HTMLInputElement | null>;
    formRef: MutableRefObject<HTMLFormElement | null>;
    clickAction: () => void | undefined;
}

export default function MediumStandaloneForm({ inputRef, collection, collectionItem, role, formRef, clickAction } : Props) {

    const creationBoundAction = getAddMediumBoundAction({ collection, collectionItemId: collectionItem.id })
    const deletionBoundAction = getDeleteMediumBoundAction({ collection, mediumId: collectionItem.MediumId })

    const boundAction = collectionItem.MediumId ? deletionBoundAction : creationBoundAction

    const [ state, action ] = useFormState(boundAction, formInitialState)
    const [ file, setFile ] = useState<File | null>(null)
    const [ imageSize, setImageSize ] = useState<{ width: number | null, height: number | null }>({ width: null, height: null })

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => manageMediaInputChange({ e, setFile, setImageSize })

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
            <MediaInputPreview collectionItem={ collectionItem } clickAction={ clickAction }/>
            <input className="hidden" ref={ inputRef } type="file" name='file' accept={ 'image' } onChange={ (e) => onChangeInput(e) }/>
            <input type="hidden" name="role" value={ role } />
            <input type="hidden" name="alt" value={ 'Picture of ' + collectionItem.name } />
            <input type="hidden" name="width" value={ imageSize.width || '' } />
            <input type="hidden" name="height" value={ imageSize.height || '' } />
            <input type="hidden" name="collection" value={ 'managers' } /> { /* WHY HERE? Should be able to get it by API route or somewhere else */}
        </form>
    )
}
