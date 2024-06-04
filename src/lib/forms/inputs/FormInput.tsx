import React, { ChangeEvent, useState } from 'react'
import { TextInput } from '@/lib/forms/inputs/by_type/TextInput'
import { IFormField } from '@/types/forms'
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
            <TextInput 
                className="pl-2 w-full text-neutral-800"
                name={ name }
                type={ type }
                onChange={ onInputChange }
                defaultValue={ defaultValue }
            />
        </Label>
    )
}
