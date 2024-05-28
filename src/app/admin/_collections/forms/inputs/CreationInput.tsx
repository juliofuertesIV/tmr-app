import { IValidationCriteriaFieldNames, getValidationMethodAndProcessingFromFieldName } from '@/_forms/validation'
import { IFormField } from '@/types/forms'
import React from 'react'

export default function CreationInput({ input } : { input: IFormField }) {

    const { label, name } = input

    const validationMethods = getValidationMethodAndProcessingFromFieldName(input.name as IValidationCriteriaFieldNames)

    if (!!validationMethods.validationMethod) {
        console.log({ 
            name: input.name,
            validationMethods 
        })
    }

    if (input.type === 'radio') {
        return (
            <fieldset>
                {
                    input.options?.map((option, index) => {
                        return (
                            <label key={ index }>
                                <p>{ option.name }</p>
                                <input type="radio" name={ input.name } value={ option.value } />
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
                className="w-full rounded-sm bg-stone-800 pl-1"
                type={ input.type }
                name={ name }
                required={ input.required }
            />
        </label>
    )
}
