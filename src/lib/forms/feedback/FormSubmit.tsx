'use client'

import { useFormStatus } from 'react-dom'

type Props = {
    value?: string,
    pendingValue?: string,
    disabled?: boolean
}

export default function FormSubmit({ value = 'Enviar', pendingValue = 'Guardando...', disabled = false } : Props) {

    const { pending } = useFormStatus()

    return <input 
        className='bg-stone-300 text-stone-800 uppercase font-bold py-1 rounded-sm data-[pending="true"]:bg-orange-500'
        data-pending={ pending }
        type='submit'
        value={ pending ? pendingValue : value } 
        disabled={ disabled }
    />
        
}
