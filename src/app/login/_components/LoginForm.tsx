'use client'

import { login } from "@/app/_fetch/post"
import { formInitialState } from "@/types/forms"
import { useFormState } from "react-dom"
import { useEffect } from "react"
import AdminFormFeedback from "@/app/admin/_collections/forms/FormFeedback"
import FormSubmit from "@/app/admin/_collections/forms/FormSubmit"
import { useRouter } from "next/navigation"
import { IManager } from "@/types"

export default function LoginForm({ manager } : { manager: IManager | null }) {

    const [ state, formAction ] = useFormState(login, formInitialState)

    const router = useRouter()

    useEffect(() => {

        const navigateToAdminPage = () => router.push('/admin')

        if (!!manager) navigateToAdminPage() 
        
    }, [ router, manager ])

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
