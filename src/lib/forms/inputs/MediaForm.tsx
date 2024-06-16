'use client'

import { IFormAction, IMediaFormField } from '@/types/forms'
import React, { ChangeEvent, HTMLProps, useEffect, useRef, useState } from 'react'
import Label from '../label/Label'
import Form from '../Form'
import { IAllCollections, ICollectionNames, ICollectionsWithMedia } from '@/types'
import MediaPreview from './media/MediaPreview'

type Props = {
    field: IMediaFormField,
    domain: string,
    action: IFormAction,
    collection: ICollectionNames,
    collectionItem?: ICollectionsWithMedia
}

export default function MediaForm({ collection, collectionItem, field, domain, action, ...props } : Props & HTMLProps<HTMLInputElement>) {

    // TO DO: ON LOAD change dynamically width and height inputs

    const { role, type, label, accept } = field

    const fileInputRef = useRef<HTMLInputElement>(null)

    const [ file, setFile ] = useState<File | null>(null)
    const [ previewSrc, setPreviewSrc ] = useState<string | null>(null)
    const [ imageMeasurements, setImageMeasurements ] = useState<{ width: number, height: number }>({ width: 0, height: 0 })

    const onFileInputchange = (e: ChangeEvent<HTMLInputElement>) => {

        if (!e.currentTarget.files) {
            setFile(null)
            setPreviewSrc(null)
            return
        }

        const file = e.currentTarget.files[0]
        setFile(file)
    }

    const discardFile = () => {
        setFile(null)
        setPreviewSrc(null)
        
        const input = fileInputRef.current

        if (!input) throw new Error('Error resetting the input element. Files still in the form.')
        
        input.value = ""
    }

    useEffect(() => {

        if (!file || field.type === 'pdf') return 

        const reader = new FileReader();

        const updateImageMeasurements = (src: string) => {
            const image = new Image()
            image.src = src
            image.addEventListener('load', () => setImageMeasurements({ width: image.width, height: image.height })) 
        }

        reader.addEventListener(
            "load",
            () => {
                const src = reader.result as string
               
                if (!src) throw new Error('Error leyendo la imagen.')

                updateImageMeasurements(src)
                
                // convert image file to base64 string
                setPreviewSrc(src)
            },
            false,
        );
        reader.readAsDataURL(file)

    }, [ file, field ])


    return (
        <Form collection={ collection } action={ action } collectionItem={ collectionItem as IAllCollections }>
            <MediaPreview src={ previewSrc } width={ imageMeasurements.width } height={ imageMeasurements.height } onDiscardFile={ discardFile }/>
            <Label textContent={ label } isValid={ null }>
                <input ref={ fileInputRef } type="file" name='file' accept={ accept } { ...props } onChange={ onFileInputchange }/>
            </Label>
            <input type="hidden" name="role" value={ role } />
            <input type="hidden" name="type" value={ type } />
            <input type="hidden" name="width" value={ imageMeasurements.width } />
            <input type="hidden" name="height" value={ imageMeasurements.height } />
        </Form>
    )
}
