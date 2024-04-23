import { IOneOfCollections } from '@/interfaces'
import { IEditionFormField } from '@/interfaces/forms'
import React from 'react'

export default function AdminEditionInput({ input, item } : { input: IEditionFormField, item: IOneOfCollections }) {

    const { label, name } = input

    return (
        <label className="w-full flex flex-col pb-1">
            <div className="w-full">{ label }</div>
            <input 
                className="w-full rounded-sm bg-stone-800 pl-1"
                type={ input.type }
                name={ name }
                defaultValue={ item[name as keyof typeof item] || '' }
            />
        </label>
    )
}
