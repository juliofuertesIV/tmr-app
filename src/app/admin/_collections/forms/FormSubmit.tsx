'use client'

import { useFormStatus } from 'react-dom'

type Props = {
    value?: string,
    disabled?: boolean
}

export default function FormSubmit({ value = 'Enviar', disabled = false } : Props) {

    const { pending } = useFormStatus()

    return <input 
        className='bg-stone-300 text-stone-800 uppercase font-bold py-1 rounded-sm'
        type='submit'
        value={ pending ? 'Guardando...' : value } 
        disabled={ disabled }
    />
        
}
