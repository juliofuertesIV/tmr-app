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
    collection?: ICollectionsWithMediaNames | ICollectionsWithMediumNames 
}) {

    if (!domain && !collection) throw new Error('Input needs either domain or collection name. Missing both.')

    return (
        <>
            <label>
                <input type="file" name="file" />
            </label>
            <input type="hidden" name="role" value={ role }/>
            <input type="hidden" name="width"/>
            <input type="hidden" name="height"/>
            <input type="hidden" name="alt" value={ alt }/>
            <input type="hidden" name="domain" value={ domain }/>
            <input type="hidden" name="collection" value={ collection }/>
        </>
    )
}
