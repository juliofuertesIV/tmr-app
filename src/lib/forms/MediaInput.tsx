import { ICollectionsWithMediaNames, ICollectionsWithMediumNames } from '@/types/media'
import React from 'react'

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

    return (
        <>
            <label>
                <input type="file" name="file" />
            </label>
            <input type="hidden" name="role" value={ role }/>
            <input type="hidden" name="width" value="500"/>
            <input type="hidden" name="height" value="500"/>
            <input type="hidden" name="alt" value={ alt }/>
            <input type="hidden" name="domain" value={ domain }/>
            <input type="hidden" name="collection" value={ collection }/>
        </>
    )
}
