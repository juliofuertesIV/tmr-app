'use client'

import { ICollectionsWithMedia } from '@/types'
import { IMediaFormField, formInitialState } from '@/types/forms'
import { ICollectionsWithMediaNames } from '@/types/media'
import React, { ChangeEvent, HTMLProps, useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { getMediaBoundAction, mediaElementAlreadyPresent } from './actions'
import AdminFormFeedback from './feedback/FormFeedback'
import MediaInputPreview from './inputs/media/MediaInputPreview'
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
    
    const boundAction = getMediaBoundAction({ collection, collectionItem, role })
    const [ state, action ] = useFormState(boundAction, formInitialState)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const emptyState = () => { 
        setFile(null)
        setPreviewSrc(null)
        setImageMeasurements({ width: 0, height: 0 })
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
                const src = reader.result as string // convert image file to base64 string
                if (!src) throw new Error('Error leyendo la imagen.')

                updateImageMeasurements(src)
                setPreviewSrc(src) 
            },
            false
        );
        reader.readAsDataURL(file)

    }, [ file, field ])

    const alreadyPresentMedia = mediaElementAlreadyPresent(collectionItem, role)

    useEffect(() => {

        emptyState() // empties file, src and measurements when reloading

    }, [ alreadyPresentMedia ])

    if (!!alreadyPresentMedia) {

        const { src, width, height, alt } = alreadyPresentMedia

        return (
            <form 
                className="flex flex-col justify-between w-full border border-neutral-600 bg-neutral-900"
                action={ action }
            >
                <h3 className='bg-neutral-600 text-neutral-100 text-center uppercase'>{ label }</h3>
                <AdminFormFeedback state={ state } />
                <div className='w-full h-full flex-1 flex max-h-40 p-2'>
                    <NextImage 
                        className='max-w-full max-h-full h-full w-full object-contain'
                        width={ parseInt(width) }
                        height={ parseInt(height) }
                        src={ src }
                        alt={ alt }
                    />
                </div>
                <FormSubmit value='Eliminar archivo' pendingValue='Eliminando...' />
            </form>
        )
    }

    return (
        <form 
            className="flex flex-col w-full border border-neutral-100 bg-neutral-800"
            action={ action }
        >
            <AdminFormFeedback state={ state } />
            <h3 className='bg-neutral-600 text-neutral-100 text-center uppercase'>{ label }</h3>
            <div className='pb-2 px-2'>
                <input ref={ fileInputRef } type="file" name='file' accept={ accept } { ...props } onChange={ manageFileInputChange }/>
            </div>
            <div className='py-2 w-full h-full max-h-40 p-2'>
                <MediaInputPreview src={ previewSrc } width={ imageMeasurements.width } height={ imageMeasurements.height }/>
            </div>
            <input type="hidden" name="role" value={ role } />
            <input type="hidden" name="domain" value={ 'test-domain' } />
            <input type="hidden" name="width" value={ imageMeasurements.width } />
            <input type="hidden" name="height" value={ imageMeasurements.height } />
            { !!file && <FormSubmit value='Subir archivo' pendingValue='Subiendo archivo...' /> }
        </form>
    )
}
