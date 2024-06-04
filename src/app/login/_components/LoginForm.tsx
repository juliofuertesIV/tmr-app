'use client'

import { formInitialState } from '@/lib/forms/feedback/state'
import { useFormState } from "react-dom"
import { useEffect } from "react"
import FormSubmit from "@/lib/forms/feedback/FormSubmit"
import { useRouter } from "next/navigation"
import { IManager } from "@/lib/types"
import { login } from "@/lib/fetch/post"
import AdminFormFeedback from "@/lib/forms/feedback/FormFeedback"

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
