'use client'

import { IMediaFormField } from '@/types/forms'
import React, { HTMLProps } from 'react'

type Props = {
    field: IMediaFormField,
    domain: string
}

export default function MediaInput({ field, domain, ...props } : Props & HTMLProps<HTMLInputElement>) {

    // TO DO: ON LOAD change dynamically width and height inputs

    const { role, type } = field

    return (
        <>
            <input type="file" name='file' { ...props } />
            <input type="hidden" name="role" value={ role } />
            <input type="hidden" name="type" value={ type } />
            <input type="hidden" name="width" value={ 500 } />
            <input type="hidden" name="height" value={ 500 } />
        </>
    )
}
