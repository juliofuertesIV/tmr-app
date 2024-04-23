'use client'

import { useFormStatus } from 'react-dom'

export default function FormSubmit() {

    const { pending } = useFormStatus()

    return <input type='submit' value={ pending ? 'Guardando...' : 'Crear'} />
        
}
