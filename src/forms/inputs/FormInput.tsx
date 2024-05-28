import React, { ChangeEvent, useState } from 'react'
import { TextInput } from './with_validation/TextInput'
import { IFormField } from '@/types/forms'
import { validateInput } from './with_validation'
import Label from '../label/Label'

export default function FormInput({ field } : { field: IFormField }) {

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

    return (
        <Label textContent={ label } isValid={ isValid }>
            <TextInput 
                className="pl-2 w-full text-neutral-800"
                name={ name }
                type={ type }
                onChange={ onInputChange }
            />
        </Label>
    )
}
