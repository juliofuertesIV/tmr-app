'use client'

import { IFormAction, IMediaFormField } from '@/types/forms'
import React, { HTMLProps } from 'react'
import Label from '../label/Label'
import Form from '../Form'
import { IAllCollections, ICollectionNames, ICollectionsWithMedia } from '@/types'

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

    return (
        <Form collection={ collection } action={ action } collectionItem={ collectionItem as IAllCollections }>
            <Label textContent={ label } isValid={ null }>
                <input type="file" name='file' accept={ accept } { ...props } />
            </Label>
            <input type="hidden" name="role" value={ role } />
            <input type="hidden" name="type" value={ type } />
            <input type="hidden" name="width" value={ 500 } />
            <input type="hidden" name="height" value={ 500 } />
        </Form>
    )
}
