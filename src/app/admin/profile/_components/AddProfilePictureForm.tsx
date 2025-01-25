'use client'

import { getAddMediumBoundAction } from '@/lib/forms/actions';
import { ICollectionsWithMedium, IManager } from '@/types';
import { formInitialState } from '@/types/forms';
import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom';
import ProfilePlaceholder from './ProfilePlaceholder';

type Props = { 
    manager: IManager,
    inputRef: MutableRefObject<HTMLInputElement | null>;
}

export default function AddProfilePictureForm({ inputRef, manager } : Props) {

    const boundAction = getAddMediumBoundAction({ collection: 'managers', collectionItem: manager as ICollectionsWithMedium })

    const [ state, action ] = useFormState(boundAction, formInitialState)
    
    const [ file, setFile ] = useState<File | null>(null)
    
    const [ imageSize, setImageSize ] = useState<{ width: number | null, height: number | null }>({ width: null, height: null })

    const formRef = useRef<HTMLFormElement>(null)

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
        
    }, [ imageSize ])

    return (
        <form ref={ formRef } action={ action } className='flex w-full'>
            <ProfilePlaceholder/>
            <input className="hidden" ref={ inputRef } type="file" name='file' accept={ 'image' } onChange={ (e) => manageFileInputChange(e) }/>
            <input type="hidden" name="role" value={ 'profilePic' } />
            <input type="hidden" name="alt" value={ 'Profile picture of ' + manager.name } />
            <input type="hidden" name="width" value={ imageSize.width || '' } />
            <input type="hidden" name="height" value={ imageSize.height || '' } />
            <input type="hidden" name="collection" value={ 'managers' } />
        </form>
    )
}
