import { IOneOfCollections } from '@/types'
import { IEditionFormField } from '@/types/forms'
import React from 'react'

export default function EditionInput({ input, collectionElement } : { input: IEditionFormField, collectionElement: IOneOfCollections }) {

    const { label, name } = input

    return (
        <label className="w-full flex flex-col pb-1">
            <div className="w-full">{ label }</div>
            <input 
                className="w-full rounded-sm bg-neutral-800 pl-1"
                type={ input.type }
                name={ name }
                defaultValue={ collectionElement[name as keyof typeof collectionElement] as string || '' }
            />
        </label>
    )
}
