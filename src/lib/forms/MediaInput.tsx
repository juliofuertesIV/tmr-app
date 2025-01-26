'use client'

import { ICollectionsWithMediaNames, ICollectionsWithMediumNames } from '@/types/media'
import React, { ChangeEvent, useEffect, useState } from 'react'

export default function MediaInput({ 
    role,
    alt,
    domain,
    collection
    
} : { 
    role: string,
    alt: string,
    domain?: string,
    collection: ICollectionsWithMediaNames | ICollectionsWithMediumNames
}) {

    const [ file, setFile ] = useState<File | null>(null)
    const [ imageMeasurements, setImageMeasurements ] = useState<{ width: number, height: number }>({ width: 0, height: 0 })

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
            },
            false
        );
        reader.readAsDataURL(file)

    }, [ file ])

    const emptyState = () => { 
        setFile(null)
        setImageMeasurements({ width: 0, height: 0 })
    }

    const manageFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (!e.currentTarget.files) return emptyState()

        const file = e.currentTarget.files[0]
        setFile(file)
    }

    return (
        <>
            <label>
                <input type="file" name="file" onChange={ (e) => manageFileInputChange(e) }/>
            </label>
            <input type="hidden" name="role" value={ role }/>
            <input type="hidden" name="width" value={ imageMeasurements.width }/>
            <input type="hidden" name="height" value={ imageMeasurements.height }/>
            <input type="hidden" name="alt" value={ alt }/>
            <input type="hidden" name="domain" value={ domain }/>
            <input type="hidden" name="collection" value={ collection }/>
        </>
    )
}
