import { ICreationFormField } from '@/interfaces/forms'
import React from 'react'

export default function CreationInput({ input } : { input: ICreationFormField }) {

    const { label, name } = input

    return (
        <label className="w-full flex flex-col pb-1">
            <div className="w-full">{ label }</div>
            <input 
                className="w-full rounded-sm bg-stone-800 pl-1"
                type={ input.type }
                name={ name }
                defaultValue={ input.defaultValue || '' }
            />
        </label>
    )
}
