'use client'

import { ICollectionsWithMedia } from '@/types'
import { IMediaFormField, formInitialState } from '@/types/forms'
import { ICollectionsWithMediaNames } from '@/types/media'
import React, { ChangeEvent, HTMLProps, useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { getMediaBoundAction, mediaElementAlreadyPresent } from './actions'
import AdminFormFeedback from './feedback/FormFeedback'
import ImagePreview from './inputs/media/ImagePreview'
import Label from './label/Label'
import FormSubmit from './feedback/FormSubmit'
import NextImage from 'next/image'

type Props = {
    field: IMediaFormField,
    domain: string,
    collection: ICollectionsWithMediaNames,
    collectionItem: ICollectionsWithMedia
}

export default function MediaForm({ collection, collectionItem, field, domain, ...props } : Props & HTMLProps<HTMLInputElement>) {
    
    const { role, label, accept } = field
   
    const [ file, setFile ] = useState<File | null>(null)
    const [ previewSrc, setPreviewSrc ] = useState<string | null>(null)
    const [ imageMeasurements, setImageMeasurements ] = useState<{ width: number, height: number }>({ width: 0, height: 0 })

    const fileInputRef = useRef<HTMLInputElement>(null)

    const emptyState = () => { 
        setFile(null)
        setPreviewSrc(null)
    }

    const manageFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (!e.currentTarget.files) return emptyState()

        const file = e.currentTarget.files[0]
        setFile(file)
    }

    const discardPreview = () => {
        setFile(null)
        setPreviewSrc(null)
        
        const input = fileInputRef.current

        if (!input) throw new Error('Error resetting the input element. Files still in the form.')
        
        input.value = "" // reset file input 
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
                const src = reader.result as string // convert image file to base64 string
                if (!src) throw new Error('Error leyendo la imagen.')

                updateImageMeasurements(src)
                setPreviewSrc(src) 
            },
            false
        );
        reader.readAsDataURL(file)

    }, [ file, field ])

    const boundAction = getMediaBoundAction({ collection, collectionItem, role })
    const [ state, action ] = useFormState(boundAction, formInitialState)

    const presentMedia = mediaElementAlreadyPresent(collectionItem, role)

    if (!!presentMedia) {

        const { src, width, height, alt } = presentMedia
        return (
            <form action={ action }>
            <AdminFormFeedback state={ state } />
            <NextImage width={ parseInt(width) } height={ parseInt(height) } src={ src } alt={ alt }/>
            <FormSubmit value='Eliminar'/>
        </form>
        )
    }

    return (
        <form action={ action }>
            <AdminFormFeedback state={ state } />
            <ImagePreview src={ previewSrc } width={ imageMeasurements.width } height={ imageMeasurements.height } onDiscardFile={ discardPreview }/>
            <Label textContent={ label } isValid={ null }>
                <input ref={ fileInputRef } type="file" name='file' accept={ accept } { ...props } onChange={ manageFileInputChange }/>
            </Label>
            <input type="hidden" name="role" value={ role } />
            <input type="hidden" name="domain" value={ 'test-domain' } />
            <input type="hidden" name="width" value={ imageMeasurements.width } />
            <input type="hidden" name="height" value={ imageMeasurements.height } />
            <FormSubmit/>
        </form>
    )
}
