'use client'

import { login } from "@/app/_fetch/post"
import { formInitialState } from "@/types/forms"
import { useFormState } from "react-dom"
import FormSubmit from "../../_collections/forms/FormSubmit"
import AdminFormFeedback from "../../_collections/forms/FormFeedback"
import { useEffect } from "react"

export default function LoginForm() {

    const [ state, formAction ] = useFormState(login, formInitialState)

    useEffect(() => {

        console.log({ state })
        
    }, [ state ])

    return (
        <form 
            action={ formAction }
            className="flex flex-col gap-4 w-full max-w-md bg-neutral-900 p-4 rounded-md"
        >
            <AdminFormFeedback state={ state }/>
            <label className="flex gap-2 items-center">
                <p className="text-sm">Email:</p>
                <input
                    className="flex-1 pl-2 py-1 rounded-sm flex items-center text-neutral-800" 
                    type="email" 
                    name="email"
                    autoComplete="on"
                />
            </label>
            <label className="flex gap-2 items-center">
                <p className="text-sm">Contraseña:</p>
                <input
                    className="flex-1 pl-2 py-1 rounded-sm flex items-center text-neutral-800" 
                    type="password" 
                    name="password"
                    autoComplete="off"
                />
            </label>
            <FormSubmit value="Iniciar sesión"/>
        </form>
    )
}
