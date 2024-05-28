'use client'

import { TextInputWithValidation } from "@/_forms/inputs/with_validation/TextInputWithValidation"
import { IFormField } from "@/types/forms"

const contactFields : IFormField[] = [
    {
        label: 'Nombre del contacto',
        type: 'text',
        name: 'contactName',
        htmlProps: {
            required: true,
        },
    },
    {
        label: 'Teléfono de contacto',
        type: 'tel',
        name: 'contactName',
        htmlProps: {
            required: true,
        },
    },
    {
        label: 'Email de contacto',
        type: 'email',
        name: 'email',
        htmlProps: {
            required: true,
        },
    },
]

export default function ContactInfoInputs() {

    const onProcessValue = (value: string) => console.log({ value })

    return (
        <fieldset>
            {
                contactFields.map((field, index) => {

                    return (
                        <label key={ index }>
                            <p>{ field.label }</p>
                            <TextInputWithValidation 
                                field={ field }
                                onProcessValue={ onProcessValue }
                            />
                        </label>
                    )
                })
            }
        </fieldset>
    )
}
