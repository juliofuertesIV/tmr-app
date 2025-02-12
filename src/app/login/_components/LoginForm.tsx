'use client'

import { formInitialState } from '@/lib/forms/feedback/state'
import FormSubmit from "@/lib/forms/feedback/FormSubmit"
import AdminFormFeedback from "@/lib/forms/feedback/FormFeedback"
import { login } from '@/lib/fetch/post/auth'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

export default function LoginForm() {

    const [ state, formAction ] = useFormState(login, formInitialState)

    useEffect(() => {

        if (!state.success) return
        
        window.location.href = '/admin' // TO DO: What the fuck

    }, [ state ])

    return (
        <form 
            action={ formAction }
            className="flex flex-col gap-4 w-full max-w-md bg-neutral-900 p-4 rounded-md"
        >
            <AdminFormFeedback state={ state }/>
            <label className="flex flex-col gap-1 w-full">
                <p className="text-sm">Email:</p>
                <input
                    className="pl-2 py-1 rounded-sm w-full text-neutral-800" 
                    type="email" 
                    name="email"
                    autoComplete="on"
                />
            </label>
            <label className="flex flex-col gap-1 w-full">
                <p className="text-sm">Contraseña:</p>
                <input
                    className="pl-2 py-1 rounded-sm w-full text-neutral-800" 
                    type="password" 
                    name="password"
                    autoComplete="off"
                />
            </label>
            <FormSubmit value="Iniciar sesión" pendingValue="Iniciando sesión"/>
        </form>
    )
}
