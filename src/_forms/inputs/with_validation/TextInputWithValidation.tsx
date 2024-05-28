'use client'

import { IValidationCriteriaFieldNames, getValidationMethodAndProcessingFromFieldName } from "@/_forms/validation"
import { IFormField } from "@/types/forms"
import { ChangeEvent, useEffect, useState } from "react"

type Props = {
    field: IFormField,
    onProcessValue: (value: string) => void
}

export function TextInputWithValidation({ field, onProcessValue } : Props) {

    const { name, htmlProps } = field

    const { validationMethod, processingMethod, valueToTestAgainst } = getValidationMethodAndProcessingFromFieldName(name as IValidationCriteriaFieldNames)

    const [ value, setValue ] = useState<string | null>(null)
    const [ processedValue, setProcessedValue ] = useState<string | null>(null)
    const [ isValid, setIsValid ] = useState<boolean | null>(null)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        setValue(prev => prev = value)
    }

    useEffect(() => {

        if (!!value) { 
            console.log('Validating...')

            const inputIsValid = validationMethod === null ? true : validationMethod(value, valueToTestAgainst)
    
            setIsValid(inputIsValid)
    
            console.log('Is valid: ' + isValid)   
        }
        else {
            setProcessedValue(null)
            setIsValid(null)
            return
        }

    }, [ value, validationMethod, processingMethod, valueToTestAgainst, isValid ])

    useEffect(() => {

        if (!value) return

        if (!isValid) return

        console.log('Processing value...')

        const processed = processingMethod ? processingMethod(value) : value

        console.log('Processed = ' + processed)

        setProcessedValue(prev => prev = processed)

    }, [ value, isValid, processingMethod ])

    useEffect(() => {

        if (!processedValue) return

        onProcessValue(processedValue)

    }, [ processedValue, onProcessValue ])

    return (
        <>
            <small>{ JSON.stringify({ valid: isValid })}</small>
            <small>{ JSON.stringify({ raw: value })}</small>
            <small>{ JSON.stringify({ processed: processedValue })}</small>
            <div className="flex gap-2 pb-4">
                <input 
                    className="pl-2 w-full text-neutral-800"
                    
                    type={ field.type }
                    name={ name }
                    onChange={ onInputChange }
                    { ...htmlProps }
                />
                <div>
                    <p 
                        className="text-neutral-400 data-[valid='true']:text-green-600 data-[valid='false']:text-red-900 data-[processed='false']:text-orange-600"
                        data-valid={ isValid }
                        data-processed={ !!processedValue }>
                            FEEDBACK
                    </p>
                </div>
            </div>
        </>
    )
}
