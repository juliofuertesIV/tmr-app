import React, { ChangeEvent, useState } from 'react'
import { FormField } from '@/types/forms'
import { validateInput } from '@/lib/forms/validation'
import { AllCollections, CollectionWithMediumNames } from '@/types'
import Label from '../label/Label'
import MediaInput from './media/MediaInput'

type Props = { 
    field: FormField, 
    collectionItem?: AllCollections,
}

export default function FormInput({ field, collectionItem } : Props) {

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

    if (field.media) {

        if (!collection) throw new Error('No collection provided for media field.')

        return ( 
            <MediaInput 
                role={ field.media.role } 
                alt={ 'Alt text for image.' } 
                previewClassname={ field.media.previewClassname }
                collection={ collection } 
                domain={ domain || "" }
            /> 
        ) 
    }

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
