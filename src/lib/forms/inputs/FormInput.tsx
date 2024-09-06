import React, { ChangeEvent, useState } from 'react'
import { RegularInput } from '@/lib/forms/inputs/by_type/RegularInput'
import { IFormField } from '@/types/forms'
import { validateInput } from '@/lib/forms/validation'
import Label from '../label/Label'
import { IAllCollections } from '@/types'

export default function FormInput({ field, collectionItem } : { field: IFormField, collectionItem?: IAllCollections }) {

    const [ value, setValue ] = useState<string | null>(null)
    const [ isValid, setIsValid ] = useState<boolean | null>(null)

    const { name, type, label, validationMethod, processingMethod, testAgainst, instructions, readonly } = field

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        
        const { value, isValid } = validateInput(
            {
                value: e.currentTarget.value,
                validationMethod,
                processingMethod,
                testAgainst
            }
        )

        setValue(value)
        setIsValid(isValid)
    }

    const defaultValue = collectionItem ? collectionItem[name as keyof typeof collectionItem] as string : ''

    return (
        <Label textContent={ label } isValid={ isValid }>
            <RegularInput 
                className="pl-2 w-full bg-neutral-800 text-neutral-200 rounded-xl py-1 data-[readonly='true']:text-neutral-500 data-[readonly='true']:cursor-not-allowed"
                name={ name }
                type={ type }
                onChange={ onInputChange }
                defaultValue={ defaultValue }
                data-readonly={ !!readonly }
                readOnly={ !!readonly }
            />
            <small className='text-neutral-300'>{ instructions }</small>
        </Label>
    )
}
