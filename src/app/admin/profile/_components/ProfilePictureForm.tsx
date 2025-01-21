'use client'

import { getMediumBoundAction } from '@/lib/forms/actions';
import AdminFormFeedback from '@/lib/forms/feedback/FormFeedback';
import FormSubmit from '@/lib/forms/feedback/FormSubmit';
import { ICollectionsWithMedium, IManager } from '@/types';
import { formInitialState } from '@/types/forms';
import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom';

type Props = { 
    manager: IManager,
    inputRef: MutableRefObject<HTMLInputElement | null>;
}

export default function ProfilePictureForm({ inputRef, manager } : Props) {

    const boundAction = getMediumBoundAction({ collection: 'managers', collectionItem: manager as ICollectionsWithMedium })
    const [ state, action ] = useFormState(boundAction, formInitialState)
    const [ file, setFile ] = useState<File | null>(null)
    const [ imageMeasurements, setImageMeasurements ] = useState<{ width: number | null, height: number | null }>({ width: null, height: null })

    const formRef = useRef<HTMLFormElement>(null)

    const emptyState = () => { 
        setFile(null)
        setImageMeasurements({ width: null, height: null })
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
            image.addEventListener('load', () => setImageMeasurements({ width: image.width, height: image.height })) 
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

        if (!imageMeasurements.height && !imageMeasurements.width) return 

        formRef.current?.submit()
        

    }, [ imageMeasurements ])

    return (
        <form
            ref={ formRef } 
            className="hidden"
            action={ action }
        >
            <AdminFormFeedback state={ state } />
            <div className='pb-2 px-2'>
                <input ref={ inputRef } type="file" name='file' accept={ 'image' } onChange={ manageFileInputChange }/>
            </div>
            <input type="hidden" name="role" value={ 'profilePic' } />
            <input type="hidden" name="domain" value={ 'test-domain' } />
            <input type="hidden" name="width" value={ imageMeasurements.width || '' } />
            <input type="hidden" name="height" value={ imageMeasurements.height || '' } />
            { !!file && <FormSubmit value='Subir archivo' pendingValue='Subiendo archivo...' /> }
        </form>
    )
}
