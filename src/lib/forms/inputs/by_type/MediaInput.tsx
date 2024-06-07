'use client'

import { IMediaFormField } from '@/types/forms'
import React, { HTMLProps } from 'react'
import Label from '../../label/Label'

type Props = {
    field: IMediaFormField,
    domain: string
}

export default function MediaInput({ field, domain, ...props } : Props & HTMLProps<HTMLInputElement>) {

    // TO DO: ON LOAD change dynamically width and height inputs

    const { role, type, label } = field

    return (
        <Label textContent={ label } isValid={ null }>
            <input type="file" name='file' { ...props } />
            <input type="hidden" name="role" value={ role } />
            <input type="hidden" name="type" value={ type } />
            <input type="hidden" name="width" value={ 500 } />
            <input type="hidden" name="height" value={ 500 } />
        </Label>
    )
}
