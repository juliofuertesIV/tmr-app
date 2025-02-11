import React, { ChangeEvent, useState } from 'react'
import { IFormField } from '@/types/forms'
import { validateInput } from '@/lib/forms/validation'
import { AllCollections } from '@/types'
import Label from '../label/Label'

export default function FormInput({ field, collectionItem } : { field: IFormField, collectionItem?: AllCollections }) {

    const [ value, setValue ] = useState<string | null>(null)
    const [ isValid, setIsValid ] = useState<boolean | null>(null)

    const { name, type, label, element, validationMethod, processingMethod, testAgainst, instructions, readonly, required } = field

    const onInputChange = (e: ChangeEvent<HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement>) => {
        
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

    const InputElement = element

/*     if (field.media) return ( 
        <MediaInput 
            role={ field.media.role } 
            alt={ 'Alt text for image.' } 
            previewClassname={ field.media.previewClassname }
            collection={ collection } SPECIFIC FOR MEDIA
            domain={ domain } SPECIFIC FOR MEDIA
        /> 
    ) */

    return (
        <Label textContent={ label } isValid={ isValid }>
            <InputElement
                className="pl-2 w-full bg-neutral-800 text-neutral-200 rounded-xl py-1 data-[readonly='true']:text-neutral-500 data-[readonly='true']:cursor-not-allowed"
                name={ name }
                type={ type }
                onChange={ onInputChange }
                defaultValue={ defaultValue }
                data-readonly={ !!readonly }
                readOnly={ !!readonly }
                required={ required }
            />
            <small className='text-neutral-400'>{ instructions }</small>
        </Label>
    )
}
