'use client'

import FormInput from "@/forms/inputs/FormInput"
import { isValidEmail, isValidString, processBasicTextInput } from "@/forms/validation/functions"
import { IFormField } from "@/types/forms"

const contactFields : IFormField[] = [
    {
        label: 'Nombre del contacto',
        type: 'text',
        name: 'contactName',
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
    },
    {
        label: 'Teléfono de contacto',
        type: 'tel',
        name: 'contactName',
        validationMethod: isValidString,
        processingMethod: processBasicTextInput,
        testAgainst: null,
    },
    {
        label: 'Email de contacto',
        type: 'email',
        name: 'email',
        validationMethod: isValidEmail,
        processingMethod: processBasicTextInput,
        testAgainst: null,
    },
]

export default function ContactInfoInputs() {

    

    return (
        <fieldset>
            {
                contactFields.map((field, index) => <FormInput key={ index } field={ field }/>)
            }
        </fieldset>
    )
}
