import { IOneOfCollections } from '@/types'
import { IFormField } from '@/types/forms'
import React from 'react'

export default function EditionInput({ input, collectionElement } : { input: IFormField, collectionElement: IOneOfCollections }) {

    const { label, name } = input

    if (input.type === 'radio') {
        return (
            <fieldset>
                {
                    input.options?.map((option, index) => {
                        return (
                            <label className='flex gap-2' key={ index }>
                                <input type="radio" name={ input.name } value={ option.value } />
                                <p>{ option.name }</p>
                            </label>
                        )
                    })
                }
            </fieldset>
        )
    }

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
