import React, { ChangeEvent, useState } from 'react'
import { RegularInput } from '@/lib/forms/inputs/by_type/RegularInput'
import { IFormField, IMediaFormField } from '@/types/forms'
import { validateInput } from '@/lib/forms/validation'
import Label from '../label/Label'
import { IAllCollections } from '@/types'

export default function FormInput({ field, collectionItem } : { field: IFormField, collectionItem?: IAllCollections }) {

    const [ value, setValue ] = useState<string | null>(null)
    const [ isValid, setIsValid ] = useState<boolean | null>(null)

    const { name, type, label, validationMethod, processingMethod, testAgainst } = field

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
                className="pl-2 w-full bg-neutral-800 text-neutral-200 rounded-xl py-1"
                name={ name }
                type={ type }
                onChange={ onInputChange }
                defaultValue={ defaultValue }
            />
        </Label>
    )
}
